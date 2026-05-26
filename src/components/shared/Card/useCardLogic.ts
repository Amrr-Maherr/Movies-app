/**
 * Custom hook for Card component logic
 * Handles all derived state calculations and event handlers
 */

import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getMatchScore, getYear, getAgeRating } from "@/utils/movieHelpers";
import { generateSlug, formatSlugWithId } from "@/utils/slugify";
import { useMovieModal } from "@/contexts/MovieModalContext";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToList, removeFromList, selectIsInList } from "@/features/my-list/store/listSlice";
import type { HeroMedia, Episode, Season } from "@/types";

export interface UseCardLogicProps {
    movie?: HeroMedia;
    episode?: Episode;
    season?: Season;
    person?: {
        id: number;
        name: string;
        profileImage: string | null;
        role: string;
    };
    review?: {
        author: string;
        rating?: number | null;
        content: string;
        date: string;
    };
    trailer?: { videoKey: string; name: string; type?: string };
    onClick?: () => void;
    tvShowId?: number;
    seasonNumber?: number;
}

export function useCardLogic({
    movie,
    episode,
    season,
    person,
    review,
    trailer,
    onClick,
    tvShowId,
    seasonNumber,
}: UseCardLogicProps) {
    const navigate = useNavigate();
    const { openModal } = useMovieModal();
    const dispatch = useAppDispatch();
    const [isHovered, setIsHovered] = useState(false);

    // Redux: Check if item is in list
    const isInList = useAppSelector((state) =>
        movie ? selectIsInList(state, movie.id) : false,
    );

    // Helper functions
    const getMovieTitle = (media: HeroMedia): string => {
        return "title" in media ? media.title : media.name;
    };

    const getMovieReleaseDate = (media: HeroMedia): string | undefined => {
        return "release_date" in media ? media.release_date : media.first_air_date;
    };

    const isTvShow = (movie: HeroMedia): boolean => {
        if ("media_type" in movie && movie.media_type) {
            return movie.media_type === "tv";
        }
        return "first_air_date" in movie;
    };

    // Basic derived values
    const title = movie ? getMovieTitle(movie) : "";
    const releaseDate = movie ? getMovieReleaseDate(movie) : undefined;
    const tvShow = movie ? isTvShow(movie) : false;

    // URLs and paths
    const posterUrl = useMemo(() => {
        if (!movie) return "";
        return movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image";
    }, [movie]);

    const backdropUrl = useMemo(() => {
        if (!movie) return "";
        return movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
            : movie.poster_path
                ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
                : "/Netflix_Symbol_RGB.png";
    }, [movie]);

    const promoImageUrl = useMemo(() => {
        if (!movie) return "";
        return movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : movie.poster_path
                ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                : "/Netflix_Symbol_RGB.png";
    }, [movie]);

    const detailsUrl = useMemo(() => {
        if (!movie) return "";
        const slug = generateSlug(title);
        const slugWithId = formatSlugWithId(slug, movie.id);
        return `/${tvShow ? "tv" : "movie"}/${slugWithId}`;
    }, [movie, title, tvShow]);

    // Metadata
    const matchScore = useMemo(
        () => (movie ? getMatchScore(movie.vote_average) : 98),
        [movie],
    );

    const year = useMemo(() => getYear(releaseDate || ""), [releaseDate]);
    const ageRating = useMemo(
        () => (movie ? getAgeRating(movie.vote_average) : "13+"),
        [movie],
    );

    const formattedReleaseDate = useMemo(() => {
        return releaseDate
            ? new Date(releaseDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
            })
            : null;
    }, [releaseDate]);

    const ratingValue = useMemo(() => {
        return movie?.vote_average && movie.vote_average > 0
            ? movie.vote_average.toFixed(1)
            : null;
    }, [movie]);

    const calculatedMatchPercentage = useMemo(() => {
        return movie?.vote_average && movie.vote_average > 0
            ? Math.round(movie.vote_average * 10)
            : null;
    }, [movie]);

    // Event handlers
    const handleNavigate = useCallback(() => {
        if (onClick) {
            onClick();
        } else if (detailsUrl) {
            navigate(detailsUrl);
        }
    }, [onClick, navigate, detailsUrl]);

    const handleMoreInfoClick = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            e.preventDefault();
            if (movie) openModal(movie);
        },
        [openModal, movie],
    );

    const handlePlayClick = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            e.preventDefault();
            handleNavigate();
        },
        [handleNavigate],
    );

    const handleAddToList = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            e.preventDefault();
            if (movie) {
                if (isInList) {
                    dispatch(removeFromList(movie.id));
                } else {
                    dispatch(addToList(movie));
                }
            }
        },
        [dispatch, movie, isInList],
    );

    const handleCardMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleCardMouseLeave = useCallback(() => setIsHovered(false), []);

    // Episode-specific logic
    const episodeImageUrl = useMemo(() => {
        if (!episode) return null;
        return episode.still_path
            ? `https://image.tmdb.org/t/p/w300${episode.still_path}`
            : null;
    }, [episode]);

    const episodeLink = useMemo(() => {
        if (!episode || !tvShowId || seasonNumber === undefined) return "#";
        return `/tv/${tvShowId}/season/${seasonNumber}/episode/${episode.episode_number}`;
    }, [episode, tvShowId, seasonNumber]);

    const episodeAirDate = useMemo(() => {
        if (!episode?.air_date) return "TBA";
        try {
            return new Date(episode.air_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        } catch {
            return episode.air_date;
        }
    }, [episode]);

    const episodeRuntime = useMemo(() => {
        if (!episode?.runtime) return "N/A";
        const h = Math.floor(episode.runtime / 60);
        const m = episode.runtime % 60;
        return h > 0 ? `${h}h ${m}m` : `${m}m`;
    }, [episode]);

    // Person-specific logic
    const personImageUrl = useMemo(() => {
        if (!person?.profileImage) return null;
        return `https://image.tmdb.org/t/p/w185${person.profileImage}`;
    }, [person]);

    const personDetailsUrl = useMemo(() => {
        if (!person) return "#";
        const slug = generateSlug(person.name);
        return `/person/${formatSlugWithId(slug, person.id)}`;
    }, [person]);

    // Review-specific logic
    const reviewDate = useMemo(() => {
        if (!review?.date) return "";
        try {
            return new Date(review.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        } catch {
            return review.date;
        }
    }, [review]);

    const reviewRating = review?.rating && review.rating > 0 ? review.rating : null;

    const truncatedReview = useMemo(() => {
        if (!review?.content) return "";
        return review.content.length <= 150
            ? review.content
            : review.content.slice(0, 150) + "...";
    }, [review]);

    // Season-specific logic
    const seasonImageUrl = useMemo(() => {
        if (!season?.poster_path) return null;
        return `https://image.tmdb.org/t/p/w500${season.poster_path}`;
    }, [season]);

    const seasonDetailsUrl = useMemo(() => {
        if (!season || !tvShowId) return "#";
        return `/tv/${tvShowId}/season/${season.season_number}`;
    }, [season, tvShowId]);

    const seasonAirDate = useMemo(() => {
        if (!season?.air_date) return "TBA";
        try {
            return new Date(season.air_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
            });
        } catch {
            return season.air_date;
        }
    }, [season]);

    // Trailer-specific logic
    const [trailerImageLoaded, setTrailerImageLoaded] = useState(false);
    const trailerThumbUrl = useMemo(() => {
        if (!trailer?.videoKey) return "";
        return `https://img.youtube.com/vi/${trailer.videoKey}/hqdefault.jpg`;
    }, [trailer]);

    return {
        // State
        isHovered,
        isInList,
        trailerImageLoaded,

        // Basic data
        title,
        releaseDate,
        tvShow,

        // URLs
        posterUrl,
        backdropUrl,
        promoImageUrl,
        detailsUrl,
        episodeImageUrl,
        episodeLink,
        personImageUrl,
        personDetailsUrl,
        seasonImageUrl,
        seasonDetailsUrl,
        trailerThumbUrl,

        // Metadata
        matchScore,
        year,
        ageRating,
        formattedReleaseDate,
        ratingValue,
        calculatedMatchPercentage,

        // Episode data
        episodeAirDate,
        episodeRuntime,

        // Review data
        reviewDate,
        reviewRating,
        truncatedReview,

        // Season data
        seasonAirDate,

        // Event handlers
        handleNavigate,
        handleMoreInfoClick,
        handlePlayClick,
        handleAddToList,
        handleCardMouseEnter,
        handleCardMouseLeave,
        setTrailerImageLoaded,
    };
}
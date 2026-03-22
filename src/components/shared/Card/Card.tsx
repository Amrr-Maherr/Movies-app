import { motion } from "framer-motion";
import { useState, useCallback, useMemo, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMatchScore, getYear, getAgeRating } from "@/utils/movieHelpers";
import { generateSlug, formatSlugWithId } from "@/utils/slugify";
import OptimizedImage from "@/components/ui/OptimizedImage";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import type { HeroMedia, Episode, Season } from "@/types";
import { Star } from "lucide-react";
import { useMovieModal } from "@/contexts/MovieModalContext";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToList, removeFromList, selectIsInList } from "@/store/ListReucer";

// FIX: Move simple helper functions outside component to prevent recreation
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

// Sub-components
import CardPoster from "./CardPoster";
import CardHoverOverlay from "./CardHoverOverlay";
import CardBadges from "./CardBadges";
import CardMetadata from "./CardMetadata";
import {
  Top10Badge,
  NewReleaseLayout,
  AwardWinnerLayout,
  RecommendationLayout,
  EpisodeLayout,
  PersonLayout,
  ReviewLayout,
  SeasonLayout,
  TrailerLayout,
  PromoLayout,
  ContinueWatchingLayout,
  ShowcaseLayout,
  HorizontalLayout,
  LandscapeLayout,
} from "./CardVariantLayouts";

export interface CardProps {
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
  variant?:
    | "standard"
    | "compact"
    | "top10"
    | "newRelease"
    | "awardWinner"
    | "recommendation"
    | "episode"
    | "person"
    | "review"
    | "season"
    | "trailer"
    | "promo"
    | "continueWatching"
    | "showcase"
    | "horizontal"
    | "landscape";
  rank?: number;
  promoVariant?: "left" | "right" | "center";
  mediaType?: "movie" | "tv";
  progress?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isOriginal?: boolean;
  isHot?: boolean;
  matchPercentageProp?: number;
  plainLayout?: boolean;
  aspectRatio?: string;
  onClick?: () => void;
  showBadge?: boolean;
  badgeType?: "trending" | "award" | "live" | "onair" | "calendar";
  tvShowId?: number;
  seasonNumber?: number;
}

const Card = memo(
  ({
    movie,
    episode,
    season,
    person,
    review,
    trailer,
    variant = "standard",
    rank,
    onClick,
    showBadge = false,
    badgeType,
    tvShowId,
    seasonNumber,
    promoVariant,
    mediaType,
    progress,
    isNew,
    isFeatured,
    isOriginal,
    isHot,
    matchPercentageProp,
    plainLayout,
    aspectRatio,
  }: CardProps) => {
    const navigate = useNavigate();
    const { openModal } = useMovieModal();
    const dispatch = useAppDispatch();
    const [isHovered, setIsHovered] = useState(false);

    // Redux: Check if item is in list
    const isInList = useAppSelector((state) =>
      movie ? selectIsInList(state, movie.id) : false,
    );

    // FIX: Use external helper functions instead of useCallback
    const title = movie ? getMovieTitle(movie) : "";
    const releaseDate = movie ? getMovieReleaseDate(movie) : undefined;
    const tvShow = movie ? isTvShow(movie) : false;

    // Standard card derived values
    const posterUrl = useMemo(() => {
      if (!movie) return "";
      return movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";
    }, [movie]);

    const matchScore = useMemo(
      () => (movie ? getMatchScore(movie.vote_average) : 98),
      [movie],
    );
    const year = useMemo(() => getYear(releaseDate || ""), [releaseDate]);
    const ageRating = useMemo(
      () => (movie ? getAgeRating(movie.vote_average) : "13+"),
      [movie],
    );

    const detailsUrl = useMemo(() => {
      if (!movie) return "";
      const slug = generateSlug(title);
      const slugWithId = formatSlugWithId(slug, movie.id);
      return `/${tvShow ? "tv" : "movie"}/${slugWithId}`;
    }, [movie, title, tvShow]);

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

    const handleCardMouseEnter = () => setIsHovered(true);
    const handleCardMouseLeave = () => setIsHovered(false);

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

    const finalMatchPercentage =
      matchPercentageProp ?? calculatedMatchPercentage;

    // Episode Variant logic
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

    // Person Variant logic
    const personImageUrl = useMemo(() => {
      if (!person?.profileImage) return null;
      return `https://image.tmdb.org/t/p/w185${person.profileImage}`;
    }, [person]);

    const personDetailsUrl = useMemo(() => {
      if (!person) return "#";
      const slug = generateSlug(person.name);
      return `/person/${formatSlugWithId(slug, person.id)}`;
    }, [person]);

    // Review Variant logic
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

    const reviewStars = useMemo(() => {
      if (!review?.rating || review.rating <= 0) return null;
      const starCount = Math.round(review.rating / 2);
      return (
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`h-3 w-3 ${s <= starCount ? "fill-yellow-400 text-yellow-400" : "fill-zinc-700 text-zinc-700"}`}
            />
          ))}
          <span className="ml-1 text-[10px] font-medium text-yellow-400">
            {review.rating.toFixed(1)}
          </span>
        </div>
      );
    }, [review]);

    const truncatedReview = useMemo(() => {
      if (!review?.content) return "";
      return review.content.length <= 150
        ? review.content
        : review.content.slice(0, 150) + "...";
    }, [review]);

    // Season Variant logic
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

    // Trailer Variant logic
    const [trailerImageLoaded, setTrailerImageLoaded] = useState(false);
    const trailerThumbUrl = useMemo(() => {
      if (!trailer?.videoKey) return "";
      return `https://img.youtube.com/vi/${trailer.videoKey}/hqdefault.jpg`;
    }, [trailer]);

    // Promo Image logic
    const promoImageUrl = useMemo(() => {
      if (!movie) return "";
      return movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : movie.poster_path
          ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
          : "/Netflix_Symbol_RGB.png";
    }, [movie]);

    const backdropUrl = useMemo(() => {
      if (!movie) return "";
      return movie.backdrop_path
        ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
        : movie.poster_path
          ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
          : "/Netflix_Symbol_RGB.png";
    }, [movie]);

    // Compact variant for dense grids
    if (variant === "compact" && movie) {
      // Check if content is for adults only
      const isAdult = movie.adult === true;

      return (
        <LazyWrapper height={350}>
          <motion.div
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full w-full"
          >
            <Link
              to={detailsUrl}
              className="relative group cursor-pointer block"
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="relative aspect-[2/3] rounded-md shadow-lg bg-[var(--background-secondary)]">
                {/* Poster Image with Blur for Adult Content */}
                <OptimizedImage
                  src={posterUrl}
                  alt={title}
                  className={`w-full h-full transition-all duration-300 ${
                    isAdult ? "blur-md" : "transition-transform duration-500"
                  }`}
                  objectFit="cover"
                />

                {/* Dark overlay for adult content */}
                {isAdult && <div className="absolute inset-0 bg-black/60" />}

                {/* Adult Badge (+18) */}
                {isAdult && (
                  <div className="absolute top-2 right-2 z-30 bg-red-700/95 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded shadow-lg border border-red-500/50">
                    +18
                  </div>
                )}

                {/* Match Score Badge (hidden for adult content) */}
                {!isAdult && (
                  <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded">
                    <span className="text-[var(--success)] text-xs font-bold">
                      {matchScore}%
                    </span>
                  </div>
                )}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-3 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                  style={{ pointerEvents: isHovered ? "auto" : "none" }}
                >
                  {/* 
                    ACCESSIBILITY FIX: Action buttons now have minimum 48px × 48px touch targets
                    - Added min-h-[48px] for adequate touch height
                    - Added gap-3 for proper spacing between buttons (prevents accidental clicks)
                    - Added touch-manipulation for better mobile behavior
                  */}
                  <div className="flex items-center gap-3 mb-2">
                    <button
                      className="flex-1 bg-white text-black min-h-[48px] rounded font-semibold text-xs flex items-center justify-center gap-2 hover:bg-gray-200 touch-manipulation"
                      onClick={handlePlayClick}
                      aria-label={`Play ${title}`}
                    >
                      <span className="sr-only">Play</span>
                      <svg className="h-4 w-4 fill-black" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                    <button
                      className="min-w-[48px] min-h-[48px] bg-[var(--background-secondary)]/90 backdrop-blur text-white rounded hover:bg-[var(--background-tertiary)] border border-white/20 touch-manipulation flex items-center justify-center"
                      onClick={handleMoreInfoClick}
                      aria-label={`More information about ${title}`}
                    >
                      <span className="sr-only">More info</span>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4M12 8h.01" />
                      </svg>
                    </button>
                  </div>
                  <CardMetadata
                    matchScore={matchScore}
                    ageRating={ageRating}
                    variant="compact"
                  />
                </div>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-[var(--text-primary)] font-medium text-center line-clamp-1 group-hover:text-white transition-colors">
                {title}
              </p>
            </Link>
          </motion.div>
        </LazyWrapper>
      );
    }

    // Top 10 variant with large gradient number badge
    if (variant === "top10" && rank && movie) {
      return (
        <LazyWrapper height={350}>
          <motion.div
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full w-full"
          >
            <Link
              to={detailsUrl}
              className="relative group cursor-pointer block"
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
            >
              <Top10Badge rank={rank} />
              <div className="relative aspect-[2/3] rounded">
                <OptimizedImage
                  src={posterUrl}
                  alt={title}
                  className="w-full h-full transition-transform duration-500 "
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>
              </div>
            </Link>
          </motion.div>
        </LazyWrapper>
      );
    }

    // New Release variant with NEW badge and date
    if (variant === "newRelease" && movie) {
      return (
        <LazyWrapper height={350}>
          <motion.div
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full w-full"
          >
            <Link
              to={detailsUrl}
              className="group cursor-pointer block"
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
            >
              <NewReleaseLayout
                movie={movie}
                title={title}
                posterUrl={posterUrl}
                ratingValue={ratingValue ?? undefined}
                formattedReleaseDate={formattedReleaseDate ?? undefined}
                isHovered={isHovered}
              />
            </Link>
          </motion.div>
        </LazyWrapper>
      );
    }

    // Award Winner variant with gold border and award badge
    if (variant === "awardWinner" && movie) {
      return (
        <LazyWrapper height={350}>
          <motion.div
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full w-full"
          >
            <Link
              to={detailsUrl}
              className="group cursor-pointer relative block"
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
            >
              <AwardWinnerLayout
                movie={movie}
                title={title}
                posterUrl={posterUrl}
                ratingValue={ratingValue ?? undefined}
                isHovered={isHovered}
              />
            </Link>
          </motion.div>
        </LazyWrapper>
      );
    }

    // Continue Watching Variant
    if (variant === "continueWatching") {
      return (
        <LazyWrapper height={200}>
          <motion.div
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full w-full"
          >
            <ContinueWatchingLayout
              title={title}
              imageUrl={backdropUrl}
              progress={progress || 0}
            />
          </motion.div>
        </LazyWrapper>
      );
    }

    // Showcase Variant
    if (variant === "showcase") {
      return (
        <LazyWrapper height={400}>
          <motion.div
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full w-full"
          >
            <ShowcaseLayout
              title={title}
              imageUrl={promoImageUrl}
              detailsUrl={detailsUrl}
              mediaType={mediaType || (tvShow ? "tv" : "movie")}
              isNew={isNew}
              isFeatured={isFeatured}
              rating={movie?.vote_average}
              overview={movie?.overview}
              aspectRatio={aspectRatio}
            />
          </motion.div>
        </LazyWrapper>
      );
    }

    // Horizontal Variant
    if (variant === "horizontal") {
      return (
        <LazyWrapper height={plainLayout ? 100 : 250}>
          <motion.div
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full w-full"
          >
            <HorizontalLayout
              title={title}
              imageUrl={plainLayout ? posterUrl : backdropUrl}
              overview={movie?.overview}
              mediaType={mediaType || (tvShow ? "tv" : "movie")}
              isOriginal={isOriginal}
              rating={movie?.vote_average}
              detailsUrl={detailsUrl}
              plainLayout={plainLayout}
            />
          </motion.div>
        </LazyWrapper>
      );
    }

    // Landscape Variant
    if (variant === "landscape") {
      // Check if content is for adults only
      const isAdult = movie?.adult === true;

      return (
        <LazyWrapper height={250}>
          <motion.div
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full w-full"
          >
            <LandscapeLayout
              title={title}
              imageUrl={backdropUrl}
              isHot={isHot}
              matchPercentage={finalMatchPercentage || 0}
              mediaType={mediaType || (tvShow ? "tv" : "movie")}
              detailsUrl={detailsUrl}
              isAdult={isAdult}
            />
          </motion.div>
        </LazyWrapper>
      );
    }

    // Promo Variant
    if (variant === "promo" && movie) {
      return (
        <LazyWrapper height={500}>
          <motion.div
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full w-full"
          >
            <PromoLayout
              movie={movie}
              title={title}
              imageUrl={promoImageUrl}
              detailsUrl={detailsUrl}
              year={year}
              mediaType={mediaType || (tvShow ? "tv" : "movie")}
              promoVariant={promoVariant}
            />
          </motion.div>
        </LazyWrapper>
      );
    }

    // Trailer Variant
    if (variant === "trailer" && trailer) {
      return (
        <LazyWrapper height={250}>
          <motion.div
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full w-full"
          >
            <div
              className="group relative cursor-pointer"
              onClick={onClick}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
            >
              <TrailerLayout
                title={trailer.name}
                thumbnailUrl={trailerThumbUrl}
                type={trailer.type}
                imageLoaded={trailerImageLoaded}
                onImageLoad={() => setTrailerImageLoaded(true)}
              />
            </div>
          </motion.div>
        </LazyWrapper>
      );
    }

    // Recommendation variant (Because You Watched)
    if (variant === "recommendation" && movie) {
      return (
        <LazyWrapper height={350}>
          <motion.div
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full w-full"
          >
            <Link
              to={detailsUrl}
              className="group cursor-pointer block"
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
            >
              <RecommendationLayout
                movie={movie}
                title={title}
                posterUrl={posterUrl}
                matchPercentage={finalMatchPercentage ?? undefined}
                isHovered={isHovered}
              />
            </Link>
          </motion.div>
        </LazyWrapper>
      );
    }

    // Season Variant
    if (variant === "season" && season) {
      return (
        <LazyWrapper height={400}>
          <motion.div
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full w-full"
          >
            <Link
              to={seasonDetailsUrl}
              className="block group"
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
            >
              <SeasonLayout
                season={season}
                title={season.name}
                imageUrl={seasonImageUrl}
                formattedAirDate={seasonAirDate}
                isHovered={isHovered}
              />
            </Link>
          </motion.div>
        </LazyWrapper>
      );
    }

    // Review Variant
    if (variant === "review" && review) {
      return (
        <LazyWrapper height={150}>
          <motion.div
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full w-full"
          >
            <div className="h-full">
              <ReviewLayout
                author={review.author}
                formattedDate={reviewDate}
                ratingStars={reviewStars}
                truncatedContent={truncatedReview}
                content={review.content}
              />
            </div>
          </motion.div>
        </LazyWrapper>
      );
    }

    // Person Variant
    if (variant === "person" && person) {
      return (
        <LazyWrapper height={350}>
          <motion.div
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full w-full"
          >
            <Link
              to={personDetailsUrl}
              className="group relative cursor-pointer block"
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
            >
              <PersonLayout
                name={person.name}
                imageUrl={personImageUrl}
                role={person.role}
                isHovered={isHovered}
              />
            </Link>
          </motion.div>
        </LazyWrapper>
      );
    }

    // Episode Variant
    if (variant === "episode" && episode) {
      return (
        <LazyWrapper height={250}>
          <motion.div
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full w-full"
          >
            <Link
              to={episodeLink}
              className="block group"
              onClick={onClick ? () => onClick() : undefined}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
            >
              <EpisodeLayout
                episode={episode}
                title={episode.name}
                imageUrl={episodeImageUrl}
                formattedRuntime={episodeRuntime}
                formattedAirDate={episodeAirDate}
                isHovered={isHovered}
              />
            </Link>
          </motion.div>
        </LazyWrapper>
      );
    }

    // Standard Netflix Card with optional badges (requires movie)
    if (!movie) return null;

    // Check if content is for adults only
    const isAdult = movie.adult === true;

    return (
      <LazyWrapper height={350}>
        <motion.div
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full w-full"
        >
          <div
            className="relative group cursor-pointer rounded-md shadow-lg bg-[var(--background-secondary)]"
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
            onClick={handleNavigate}
          >
            <CardPoster
              movie={movie}
              title={title}
              rank={rank}
              isAdult={isAdult}
            >
              <CardBadges
                showBadge={showBadge}
                badgeType={badgeType}
                showMatchScore={!isAdult}
                matchScore={matchScore}
                isAdult={isAdult}
              />
              <CardHoverOverlay
                title={title}
                matchScore={matchScore}
                year={year}
                ageRating={ageRating}
                isHovered={isHovered}
                onPlay={handlePlayClick}
                onMoreInfo={handleMoreInfoClick}
                onAddToList={handleAddToList}
                isInList={isInList}
              />
            </CardPoster>
          </div>
        </motion.div>
      </LazyWrapper>
    );
  },
);

export default Card;

import { useMemo } from "react";
import { getMatchScore, getYear, getAgeRating } from "@/utils/movieHelpers";
import { generateSlug, formatSlugWithId } from "@/utils/slugify";
import type { HeroMedia, Episode, Season } from "@/types";

// ─── Pure helpers (no hooks) ────────────────────────────────────────────────

export const getMovieTitle = (media: HeroMedia): string =>
  "title" in media ? media.title : media.name;

export const getMovieReleaseDate = (media: HeroMedia): string | undefined =>
  "release_date" in media ? media.release_date : media.first_air_date;

export const isTvShow = (movie: HeroMedia): boolean => {
  if ("media_type" in movie && movie.media_type) return movie.media_type === "tv";
  return "first_air_date" in movie;
};

// ─── Movie derived values ────────────────────────────────────────────────────

export function useMovieDerivedValues(movie?: HeroMedia, matchPercentageProp?: number) {
  const title = movie ? getMovieTitle(movie) : "";
  const releaseDate = movie ? getMovieReleaseDate(movie) : undefined;
  const tvShow = movie ? isTvShow(movie) : false;

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
    return `/${tvShow ? "tv" : "movie"}/${formatSlugWithId(slug, movie.id)}`;
  }, [movie, title, tvShow]);

  const ratingValue = useMemo(
    () =>
      movie?.vote_average && movie.vote_average > 0
        ? movie.vote_average.toFixed(1)
        : null,
    [movie],
  );

  const formattedReleaseDate = useMemo(
    () =>
      releaseDate
        ? new Date(releaseDate).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
        : null,
    [releaseDate],
  );

  const calculatedMatchPercentage = useMemo(
    () =>
      movie?.vote_average && movie.vote_average > 0
        ? Math.round(movie.vote_average * 10)
        : null,
    [movie],
  );

  const finalMatchPercentage = matchPercentageProp ?? calculatedMatchPercentage;

  return {
    title,
    releaseDate,
    tvShow,
    posterUrl,
    backdropUrl,
    promoImageUrl,
    matchScore,
    year,
    ageRating,
    detailsUrl,
    ratingValue,
    formattedReleaseDate,
    finalMatchPercentage,
  };
}

// ─── Episode derived values ──────────────────────────────────────────────────

export function useEpisodeDerivedValues(
  episode?: Episode,
  tvShowId?: number,
  seasonNumber?: number,
) {
  const imageUrl = useMemo(
    () =>
      episode?.still_path
        ? `https://image.tmdb.org/t/p/w300${episode.still_path}`
        : null,
    [episode],
  );

  const link = useMemo(() => {
    if (!episode || !tvShowId || seasonNumber === undefined) return "#";
    return `/tv/${tvShowId}/season/${seasonNumber}/episode/${episode.episode_number}`;
  }, [episode, tvShowId, seasonNumber]);

  const airDate = useMemo(() => {
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

  const runtime = useMemo(() => {
    if (!episode?.runtime) return "N/A";
    const h = Math.floor(episode.runtime / 60);
    const m = episode.runtime % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }, [episode]);

  return { imageUrl, link, airDate, runtime };
}

// ─── Season derived values ───────────────────────────────────────────────────

export function useSeasonDerivedValues(season?: Season, tvShowId?: number) {
  const imageUrl = useMemo(
    () =>
      season?.poster_path
        ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
        : null,
    [season],
  );

  const detailsUrl = useMemo(() => {
    if (!season || !tvShowId) return "#";
    return `/tv/${tvShowId}/season/${season.season_number}`;
  }, [season, tvShowId]);

  const airDate = useMemo(() => {
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

  return { imageUrl, detailsUrl, airDate };
}

// ─── Person derived values ───────────────────────────────────────────────────

export function usePersonDerivedValues(person?: { id: number; name: string; profileImage: string | null }) {
  const imageUrl = useMemo(
    () =>
      person?.profileImage
        ? `https://image.tmdb.org/t/p/w185${person.profileImage}`
        : null,
    [person],
  );

  const detailsUrl = useMemo(() => {
    if (!person) return "#";
    const slug = generateSlug(person.name);
    return `/person/${formatSlugWithId(slug, person.id)}`;
  }, [person]);

  return { imageUrl, detailsUrl };
}

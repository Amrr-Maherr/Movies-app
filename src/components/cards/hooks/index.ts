export { useWatchlist } from "./useWatchlist";
export { useCardActions } from "./useCardActions";
export {
  useMovieDerivedValues,
  useEpisodeDerivedValues,
  useSeasonDerivedValues,
  usePersonDerivedValues,
  useReviewDerivedValues,
  getMovieTitle,
  getMovieReleaseDate,
  isTvShow,
} from "./useCardDerivedValues";

// Alias for backward compatibility
export { useMovieDerivedValues as useCardDerivedValues } from "./useCardDerivedValues";

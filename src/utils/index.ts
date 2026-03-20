/**
 * Utils - Reusable Helper Functions
 *
 * This module exports all utility functions organized by category:
 * - Date helpers: formatDate, calculateAge, getYear, getReleaseYear
 * - Format helpers: formatRuntime, formatNumber, getLanguageName
 * - Media helpers: getTitle, getReleaseDate, getRuntime
 * - Data processing: getKnownForItems, filterKeyCrew, extractKeywords, extractWatchProviders
 * - Movie helpers: getMatchScore, getAgeRating, getGenres, getTrailerEmbedUrl, getTrailerWatchUrl
 * - Hooks: useDebounce
 *
 * Note: movieHelpers.ts and tmdb.ts contain additional specialized utilities.
 */

// Date helpers
export { formatDate } from "./formatDate";
export { calculateAge } from "./calculateAge";
export { getYear } from "./movieHelpers";
export { getReleaseYear } from "./getReleaseYear";

// Format helpers
export { formatRuntime } from "./formatRuntime";
export { formatNumber } from "./formatNumber";
export { getLanguageName } from "./getLanguageName";

// Media helpers
export { getTitle } from "./getTitle";
export { getReleaseDate } from "./getReleaseDate";
export { getRuntime } from "./getRuntime";

// Data processing
export { getKnownForItems } from "./getKnownForItems";
export { filterKeyCrew } from "./filterKeyCrew";
export { extractKeywords } from "./extractKeywords";
export { extractWatchProviders } from "./extractWatchProviders";

// Movie helpers
export { getMatchScore, getAgeRating, getGenres, getTrailerEmbedUrl, getTrailerWatchUrl } from "./movieHelpers";

// Hooks
export { useDebounce } from "./useDebounce";

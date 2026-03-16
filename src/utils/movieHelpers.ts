/**
 * Movie Helper Functions
 *
 * Utility functions for movie data transformation and formatting.
 */

import type { Video } from "@/types";

/**
 * TMDB Genre ID to Name mapping
 */
const GENRE_MAP: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  10759: "Action & Adventure",
  10765: "Sci-Fi & Fantasy",
  10768: "War & Politics",
};

/**
 * Calculate match score percentage from TMDB vote average.
 *
 * @param voteAverage - TMDB vote average (0-10)
 * @returns Match score percentage (0-100)
 */
export function getMatchScore(voteAverage: number): number {
  return Math.round(voteAverage * 10);
}

/**
 * Extract release year from date string.
 *
 * @param releaseDate - Date string in format "YYYY-MM-DD"
 * @returns Year as string, or empty string if invalid
 */
export function getYear(releaseDate: string): string {
  return releaseDate?.split("-")[0] || "";
}

/**
 * Determine age rating based on vote average.
 *
 * @param voteAverage - TMDB vote average (0-10)
 * @returns Age rating string (16+, 13+, or PG)
 */
export function getAgeRating(voteAverage: number): string {
  if (voteAverage >= 7) return "16+";
  if (voteAverage >= 5) return "13+";
  return "PG";
}

/**
 * Convert genre IDs to genre names.
 *
 * @param genreIds - Array of TMDB genre IDs
 * @returns Array of genre names
 */
export function getGenres(genreIds: number[]): string[] {
  return genreIds.slice(0, 3).map((id) => GENRE_MAP[id] || "Unknown");
}

/**
 * Get YouTube trailer embed URL for background video.
 * Returns URL with autoplay, loop, and muted parameters for Netflix-style hero.
 *
 * @param videos - Object containing videos results array
 * @returns YouTube embed URL string or null if no trailer found
 */
export function getTrailerEmbedUrl(
  videos?: { results: Video[] } | null
): string | null {
  if (!videos?.results) return null;
  const trailer = videos.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
  if (!trailer?.key) return null;
  return `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&loop=1&playlist=${trailer.key}&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1&playsinline=1`;
}

/**
 * Get YouTube trailer watch URL.
 *
 * @param videos - Object containing videos results array
 * @returns YouTube watch URL string or null if no trailer found
 */
export function getTrailerWatchUrl(
  videos?: { results: Video[] } | null
): string | null {
  if (!videos?.results) return null;
  const trailer = videos.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
}

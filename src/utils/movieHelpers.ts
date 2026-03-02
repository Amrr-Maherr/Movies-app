/**
 * Movie Helper Functions
 * 
 * Utility functions for movie data transformation and formatting.
 */

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

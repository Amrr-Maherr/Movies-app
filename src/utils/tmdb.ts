/**
 * TMDB Image URL Helper
 * 
 * Provides consistent image URL generation using environment variables.
 * Handles missing environment variables gracefully.
 */

// Default fallback if env is not set
const DEFAULT_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

/**
 * Get the TMDB image base URL from environment variables.
 * Falls back to default if not configured.
 */
export function getImageBaseUrl(): string {
  return import.meta.env.VITE_TMDB_IMAGE_BASE_URL || DEFAULT_IMAGE_BASE_URL;
}

/**
 * Image size presets matching TMDB's available sizes
 */
export const IMAGE_SIZES = {
  // Backdrops
  BACKDROP_ORIGINAL: "original",
  BACKDROP_LARGE: "w1280",
  BACKDROP_MEDIUM: "w780",
  BACKDROP_SMALL: "w300",
  
  // Posters
  POSTER_ORIGINAL: "original",
  POSTER_LARGE: "w500",
  POSTER_MEDIUM: "w342",
  POSTER_SMALL: "w185",
  
  // Profile images (actors)
  PROFILE_ORIGINAL: "original",
  PROFILE_LARGE: "w185",
  PROFILE_MEDIUM: "w138",
  
  // Hero/Featured (custom Netflix-style)
  HERO: "w1920_and_h800_multi_faces",
} as const;

export type ImageSize = typeof IMAGE_SIZES[keyof typeof IMAGE_SIZES];

/**
 * Build a complete TMDB image URL.
 * 
 * @param path - The image path from TMDB API (e.g., "/abc123.jpg")
 * @param size - The image size preset (default: "original")
 * @returns Complete image URL or null if path is invalid
 * 
 * @example
 * getImageUrl("/abc123.jpg", "w500")
 * // Returns: "https://image.tmdb.org/t/p/w500/abc123.jpg"
 */
export function getImageUrl(path: string | null | undefined, size: ImageSize = IMAGE_SIZES.BACKDROP_ORIGINAL): string | null {
  if (!path) return null;
  
  const baseUrl = getImageBaseUrl();
  return `${baseUrl}/${size}${path}`;
}

/**
 * Build a backdrop image URL (optimized for hero backgrounds).
 * 
 * @param path - The backdrop path from TMDB API
 * @returns Complete image URL or null if path is invalid
 */
export function getBackdropUrl(path: string | null | undefined): string | null {
  return getImageUrl(path, IMAGE_SIZES.BACKDROP_ORIGINAL);
}

/**
 * Build a poster image URL.
 * 
 * @param path - The poster path from TMDB API
 * @param size - The poster size preset (default: w500)
 * @returns Complete image URL or null if path is invalid
 */
export function getPosterUrl(path: string | null | undefined, size: ImageSize = IMAGE_SIZES.POSTER_MEDIUM): string | null {
  return getImageUrl(path, size);
}

/**
 * Build a profile image URL (for actors/directors).
 * 
 * @param path - The profile path from TMDB API
 * @returns Complete image URL or null if path is invalid
 */
export function getProfileUrl(path: string | null | undefined): string | null {
  return getImageUrl(path, IMAGE_SIZES.PROFILE_LARGE);
}

/**
 * Preload an image to avoid flickering.
 * 
 * @param url - The image URL to preload
 */
export function preloadImage(url: string | null): void {
  if (!url) return;
  
  const img = new Image();
  img.src = url;
}

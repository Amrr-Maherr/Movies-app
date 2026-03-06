import { getYear } from "./movieHelpers";
import type { HeroMedia } from "@/types";

/**
 * Extract release year from media object (supports both movies and TV shows).
 *
 * @param media - Media object with release_date (movie) or first_air_date (TV show)
 * @returns Year as string, or undefined if not available
 *
 * @example
 * getReleaseYear({ release_date: "2023-01-15" }) // "2023"
 * getReleaseYear({ first_air_date: "2022-06-01" }) // "2022"
 */
export function getReleaseYear(media: HeroMedia): string | undefined {
  if ("release_date" in media) {
    return getYear(media.release_date);
  }
  return "first_air_date" in media ? getYear(media.first_air_date) : undefined;
}

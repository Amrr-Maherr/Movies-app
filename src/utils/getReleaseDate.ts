import type { MediaDetails } from "@/types";

/**
 * Extracts release date from media object (supports both movies and TV shows).
 *
 * @param media - MediaDetails object with either release_date or first_air_date
 * @returns The release date string
 *
 * @example
 * getReleaseDate({ release_date: "2023-01-15", ... }) // "2023-01-15"
 * getReleaseDate({ first_air_date: "2022-06-01", ... }) // "2022-06-01"
 */
export function getReleaseDate(media: MediaDetails): string {
  return "release_date" in media ? media.release_date : media.first_air_date;
}

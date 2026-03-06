import type { HeroMedia, MediaDetails } from "@/types";

/**
 * Extract title from media object (supports both movies and TV shows).
 *
 * @param media - Media object with either title (movie) or name (TV show)
 * @returns The title or name string
 *
 * @example
 * getTitle({ title: "Inception" }) // "Inception"
 * getTitle({ name: "Breaking Bad" }) // "Breaking Bad"
 */
export function getTitle(media: MediaDetails | HeroMedia): string {
  return "title" in media ? media.title : media.name;
}

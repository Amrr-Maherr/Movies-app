/**
 * URL Utility Functions
 *
 * Centralized functions for generating SEO-friendly URLs across the app.
 * This is the ONE source of truth for all URL generation.
 */

/**
 * Generates a URL-friendly slug from a title/name string.
 * Following SEO best practices:
 * - lowercase
 * - replace spaces with hyphens
 * - remove special characters
 * - normalize multiple hyphens
 * - trim edges
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
};

/**
 * Type map for media URL prefixes.
 * - "movie" -> /movie/
 * - "tv"    -> /series/
 * - "person" | "actor" -> /actor/
 */
const MEDIA_TYPE_PREFIX: Record<string, string> = {
  movie: "movie",
  tv: "series",
  series: "series",
  person: "actor",
  actor: "actor",
};

/**
 * Builds a full SEO-friendly media URL in the format: /type/slug/id
 *
 * Examples:
 *   buildMediaUrl("movie", "Iron Man", 123)     -> "/movie/iron-man/123"
 *   buildMediaUrl("tv", "Breaking Bad", 1396)   -> "/series/breaking-bad/1396"
 *   buildMediaUrl("actor", "Leonardo DiCaprio", 6193) -> "/actor/leonardo-dicaprio/6193"
 *
 * @param type  - Media type: "movie", "tv", "series", "person", or "actor"
 * @param title - The title or name to slugify
 * @param id    - The numeric media ID
 * @returns The path segment (without language prefix)
 */
export function buildMediaUrl(
  type: string,
  title: string,
  id: number | string,
): string {
  const prefix = MEDIA_TYPE_PREFIX[type] || type;
  const slug = generateSlug(title);
  return `/${prefix}/${slug}/${id}`;
}

/**
 * Generates a URL-friendly slug from a title string.
 * - Converts to lowercase
 * - Replaces spaces with hyphens
 * - Removes non-alphanumeric characters (except hyphens)
 * - Trims leading/trailing hyphens
 * 
 * @param title - The title to slugify
 * @returns The generated slug
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD") // Normalize Unicode characters (e.g., accents)
    .replace(/[\u0300-\u036f]/g, "") // Remove accents/diacritics
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
    .trim();
};

/**
 * Combines a slug and an ID into a Netflix-style URL segment.
 * Example: "spider-man-no-way-home", 634649 -> "spider-man-no-way-home-634649"
 * 
 * @param slug - The generated slug
 * @param id - The numeric ID
 * @returns Combined slug and ID
 */
export const formatSlugWithId = (slug: string, id: number | string): string => {
  return `${slug}-${id}`;
};

/**
 * Extracts the ID from a combined slug-id segment.
 * Example: "spider-man-no-way-home-634649" -> "634649"
 * 
 * @param slugWithId - The combined slug and ID from the URL
 * @returns The extracted ID segment
 */
export const extractIdFromSlug = (slugWithId: string | undefined): string | null => {
  if (!slugWithId) return null;
  const parts = slugWithId.split("-");
  return parts[parts.length - 1] || null;
};

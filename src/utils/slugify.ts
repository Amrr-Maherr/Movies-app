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



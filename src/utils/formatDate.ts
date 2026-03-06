/**
 * Formats a date string to a readable format (e.g., "January 15, 2023").
 *
 * @param dateString - Date string in ISO format or null/undefined
 * @returns Formatted date string, or empty string if invalid
 *
 * @example
 * formatDate("2023-01-15") // "January 15, 2023"
 * formatDate(null) // ""
 */
export function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

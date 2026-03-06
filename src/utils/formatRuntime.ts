/**
 * Formats runtime from minutes to hours and minutes string.
 *
 * @param minutes - Runtime in minutes, or null
 * @returns Formatted string like "2h 15m", or empty string if null
 *
 * @example
 * formatRuntime(135) // "2h 15m"
 * formatRuntime(90) // "1h 30m"
 * formatRuntime(null) // ""
 */
export function formatRuntime(minutes: number | null): string {
  if (!minutes) return "";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

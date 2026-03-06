/**
 * Formats large numbers with K/M/B suffix for readability.
 *
 * @param num - Number to format
 * @returns Formatted string with suffix (e.g., "1.5M", "2.3B", "500K")
 *
 * @example
 * formatNumber(1500000) // "1.5M"
 * formatNumber(2300000000) // "2.3B"
 * formatNumber(500) // "500"
 */
export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)}B`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(0)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(0)}K`;
  }
  return num.toString();
}

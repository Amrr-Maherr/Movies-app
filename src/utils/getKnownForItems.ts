import type { CastCredit, CrewCredit } from "@/api/PersonCredits";

/**
 * Combines and sorts credits by popularity to show "known for" items.
 * Filters out items without posters and returns top 12 sorted by popularity and vote average.
 *
 * @param cast - Array of cast credits
 * @param crew - Array of crew credits
 * @returns Array of top 12 credits sorted by popularity
 *
 * @example
 * getKnownForItems(castCredits, crewCredits) // Returns top 12 items
 */
export function getKnownForItems(cast: CastCredit[], crew: CrewCredit[]) {
  // Combine cast and crew credits
  const allCredits = [...cast, ...crew];

  // Filter out items without posters
  const withPosters = allCredits.filter(
    (credit) => credit.poster_path !== null && credit.poster_path !== undefined
  );

  // Sort by popularity and vote average
  const sorted = withPosters.sort((a, b) => {
    // First by popularity
    if (b.popularity !== a.popularity) {
      return b.popularity - a.popularity;
    }
    // Then by vote average
    return b.vote_average - a.vote_average;
  });

  // Take top 12
  return sorted.slice(0, 12);
}

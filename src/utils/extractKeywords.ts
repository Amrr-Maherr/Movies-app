import type { TvShowDetails, Keyword } from "@/types";

/**
 * Extract keywords array from TV show keywords response.
 * TMDB returns { results: Keyword[] } for TV shows.
 *
 * @param keywordsData - Keywords data from TV show details
 * @returns Array of keyword names
 *
 * @example
 * extractKeywords({ results: [{ name: "action" }, { name: "adventure" }] }) // ["action", "adventure"]
 */
export function extractKeywords(keywordsData: TvShowDetails["keywords"]): string[] {
  if (!keywordsData?.results) return [];
  return keywordsData.results.map((kw: Keyword) => kw.name);
}

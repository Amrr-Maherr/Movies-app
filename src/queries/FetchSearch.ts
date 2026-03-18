import { useQuery } from "@tanstack/react-query";
import { multiSearch } from "@/services";
import type { Movie, TvShow } from "@/types/movies";
import type { MultiSearchResult } from "@/services/searchService";

export interface SearchResult {
  item: Movie | TvShow | MultiSearchResult;
  type: "movie" | "tv" | "person";
}

/**
 * Hook for searching movies, TV shows, and people using multi-search
 * Uses debouncing to avoid excessive API calls
 */
export function useSearch(query: string) {
  const {
    data: results = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["search", "multi", query],
    queryFn: () => multiSearch(query) as Promise<MultiSearchResult[]>,
    enabled: query.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Filter and map results with type information
  const mappedResults: SearchResult[] = results
    .filter((item) => item.media_type === "movie" || item.media_type === "tv" || item.media_type === "person")
    .map((item) => ({
      item: item as Movie | TvShow | MultiSearchResult,
      type: item.media_type as "movie" | "tv" | "person",
    }));

  return {
    results: mappedResults,
    isLoading,
    error,
  };
}

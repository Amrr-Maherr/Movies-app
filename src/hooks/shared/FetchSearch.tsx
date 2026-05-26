import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { multiSearch } from "@/services";
import type { Movie, TvShow, PersonSearchResult } from "@/types";
import type { MultiSearchResult } from "@/features/search/api/searchService";

export interface MovieSearchResult {
  item: Movie;
  type: "movie";
}

export interface TvShowSearchResult {
  item: TvShow;
  type: "tv";
}

export interface PersonSearchResultItem {
  item: PersonSearchResult;
  type: "person";
}

export type SearchResult =
  | MovieSearchResult
  | TvShowSearchResult
  | PersonSearchResultItem;

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
    enabled: !!query,
    placeholderData: keepPreviousData,
  });

  // Filter and map results with type information
  const mappedResults: SearchResult[] = results
    .filter(
      (item) =>
        item.media_type === "movie" ||
        item.media_type === "tv" ||
        item.media_type === "person",
    )
    .map((item) => {
      if (item.media_type === "movie") {
        return { item: item as unknown as Movie, type: "movie" as const };
      }
      if (item.media_type === "tv") {
        return { item: item as unknown as TvShow, type: "tv" as const };
      }
      return {
        item: item as unknown as PersonSearchResult,
        type: "person" as const,
      };
    });

  return {
    results: mappedResults,
    isLoading,
    error,
  };
}

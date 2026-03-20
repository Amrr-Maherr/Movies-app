import { useQuery } from "@tanstack/react-query";
import { multiSearch, type MultiSearchResult } from "@/services";

/**
 * Hook for multi-search (movies, TV shows, and people)
 * @param query - Search query
 * @param page - Page number (default: 1)
 * @returns Multi-search results and query state
 * 
 * @example
 * const { data, isLoading, error } = useMultiSearch("inception");
 */
export function useMultiSearch(query: string, page: number = 1) {
  return useQuery<MultiSearchResult[] | null>({
    queryKey: ["search", "multi", query, page],
    queryFn: () => multiSearch(query, page),
    enabled: query.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

export default useMultiSearch;

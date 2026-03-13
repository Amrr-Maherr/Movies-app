import { useQuery } from "@tanstack/react-query";
import { GetTVSimilar } from "@/api/TVSimilar";
import type { TVSimilarResponse } from "@/api/TVSimilar";

/**
 * Hook for fetching similar TV shows
 * @param tvId - TV Show ID
 * @param page - Page number (default: 1)
 * @returns Similar TV shows data and query state
 */
export function useTVSimilar(tvId: number, page: number = 1) {
  return useQuery<TVSimilarResponse | null>({
    queryKey: ["tv", "similar", tvId, page],
    queryFn: () => GetTVSimilar(tvId, page),
    enabled: !!tvId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

export default useTVSimilar;

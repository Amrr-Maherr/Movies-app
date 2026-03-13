import { useQuery } from "@tanstack/react-query";
import { GetTVRecommendations } from "@/api/TVRecommendations";
import type { TVRecommendationsResponse } from "@/api/TVRecommendations";

/**
 * Hook for fetching TV show recommendations
 * @param tvId - TV Show ID
 * @param page - Page number (default: 1)
 * @returns Recommendations data and query state
 */
export function useTVRecommendations(tvId: number, page: number = 1) {
  return useQuery<TVRecommendationsResponse | null>({
    queryKey: ["tv", "recommendations", tvId, page],
    queryFn: () => GetTVRecommendations(tvId, page),
    enabled: !!tvId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

export default useTVRecommendations;

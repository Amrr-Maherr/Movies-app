import { useQuery } from "@tanstack/react-query";
import { GetTVReviews } from "@/api/TVReviews";
import type { TVReviewsResponse } from "@/api/TVReviews";

/**
 * Hook for fetching TV show reviews
 * @param tvId - TV Show ID
 * @param page - Page number (default: 1)
 * @returns Reviews data and query state
 */
export function useTVReviews(tvId: number, page: number = 1) {
  return useQuery<TVReviewsResponse | null>({
    queryKey: ["tv", "reviews", tvId, page],
    queryFn: () => GetTVReviews(tvId, page),
    enabled: !!tvId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

export default useTVReviews;

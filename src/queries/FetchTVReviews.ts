import { useQuery } from "@tanstack/react-query";
import { getTVReviews, type TVReviewsResponse } from "@/services";

/**
 * Hook for fetching TV show reviews
 * @param tvId - TV Show ID
 * @param page - Page number (default: 1)
 * @returns Reviews data and query state
 */
export function useTVReviews(tvId: number, page: number = 1) {
  return useQuery<TVReviewsResponse | null>({
    queryKey: ["tv", "reviews", tvId, page],
    queryFn: () => getTVReviews(tvId, page),
    enabled: !!tvId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

export default useTVReviews;

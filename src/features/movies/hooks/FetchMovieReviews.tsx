import { useQuery } from "@tanstack/react-query";
import { getMovieReviews, type MovieReviewsResponse } from "@/services";

/**
 * Hook for fetching movie reviews
 * @param movieId - Movie ID
 * @param page - Page number (default: 1)
 * @returns Reviews data and query state
 */
export function useMovieReviews(movieId: number, page: number = 1) {
  return useQuery<MovieReviewsResponse | null>({
    queryKey: ["movie", "reviews", movieId, page],
    queryFn: () => getMovieReviews(movieId, page),
    enabled: !!movieId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

export default useMovieReviews;

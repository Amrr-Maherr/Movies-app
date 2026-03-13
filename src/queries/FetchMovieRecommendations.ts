import { useQuery } from "@tanstack/react-query";
import { GetMovieRecommendations } from "@/api/MovieRecommendations";
import type { MovieRecommendationsResponse } from "@/api/MovieRecommendations";

/**
 * Hook for fetching movie recommendations
 * @param movieId - Movie ID
 * @param page - Page number (default: 1)
 * @returns Recommendations data and query state
 */
export function useMovieRecommendations(movieId: number, page: number = 1) {
  return useQuery<MovieRecommendationsResponse | null>({
    queryKey: ["movie", "recommendations", movieId, page],
    queryFn: () => GetMovieRecommendations(movieId, page),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

export default useMovieRecommendations;

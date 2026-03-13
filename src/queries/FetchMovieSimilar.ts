import { useQuery } from "@tanstack/react-query";
import { GetMovieSimilar } from "@/api/MovieSimilar";
import type { MovieSimilarResponse } from "@/api/MovieSimilar";

/**
 * Hook for fetching similar movies
 * @param movieId - Movie ID
 * @param page - Page number (default: 1)
 * @returns Similar movies data and query state
 */
export function useMovieSimilar(movieId: number, page: number = 1) {
  return useQuery<MovieSimilarResponse | null>({
    queryKey: ["movie", "similar", movieId, page],
    queryFn: () => GetMovieSimilar(movieId, page),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

export default useMovieSimilar;

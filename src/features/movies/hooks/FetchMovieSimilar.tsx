import { useQuery } from "@tanstack/react-query";
import { getMovieSimilar, type MovieSimilarResponse } from "@/services";

/**
 * Hook for fetching similar movies
 * @param movieId - Movie ID
 * @param page - Page number (default: 1)
 * @returns Similar movies data and query state
 */
export function useMovieSimilar(movieId: number, page: number = 1) {
  return useQuery<MovieSimilarResponse | null>({
    queryKey: ["movie", "similar", movieId, page],
    queryFn: () => getMovieSimilar(movieId, page),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

export default useMovieSimilar;

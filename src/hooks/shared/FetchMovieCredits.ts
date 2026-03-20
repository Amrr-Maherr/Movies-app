import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "@/services";
import type { Credits } from "@/types";

/**
 * Hook for fetching movie credits
 * @param movieId - Movie ID
 * @returns Credits data and query state
 */
export function useMovieCredits(movieId: number) {
  return useQuery<Credits | null>({
    queryKey: ["movie", "credits", movieId],
    queryFn: () => getMovieCredits(movieId),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

export default useMovieCredits;

import { useQuery } from "@tanstack/react-query";
import { getNowPlayingMovies } from "@/services";
import type { Movie } from "@/types";

/**
 * Hook for fetching now playing movies in theaters
 * @param page - Page number (default: 1)
 * @returns Now playing movies data and query state
 */
export function useNowPlayingMoviesQuery(page: number = 1) {
  return useQuery<Movie[]>({
    queryKey: ["movies", "now-playing", page],
    queryFn: async () => {
      const result = await getNowPlayingMovies(page);
      return result || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

export default useNowPlayingMoviesQuery;

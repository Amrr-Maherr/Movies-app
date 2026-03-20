import { useQuery } from "@tanstack/react-query";
import { getMovieWatchProviders, type MovieWatchProvidersResponse } from "@/services";

/**
 * Hook for fetching movie watch providers
 * @param movieId - Movie ID
 * @param region - Region code (default: "US")
 * @returns Watch providers data and query state
 */
export function useMovieWatchProviders(movieId: number, region: string = "US") {
  return useQuery<MovieWatchProvidersResponse | null>({
    queryKey: ["movie", "watch-providers", movieId, region],
    queryFn: () => getMovieWatchProviders(movieId, region),
    enabled: !!movieId,
    staleTime: 15 * 60 * 1000, // 15 minutes
    retry: 2,
  });
}

export default useMovieWatchProviders;

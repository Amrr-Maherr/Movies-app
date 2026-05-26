import { useQuery } from "@tanstack/react-query";
import { getTVWatchProviders, type TVWatchProvidersResponse } from "@/services";

/**
 * Hook for fetching TV show watch providers
 * @param tvId - TV Show ID
 * @param region - Region code (default: "US")
 * @returns Watch providers data and query state
 */
export function useTVWatchProviders(tvId: number, region: string = "US") {
  return useQuery<TVWatchProvidersResponse | null>({
    queryKey: ["tv", "watch-providers", tvId, region],
    queryFn: () => getTVWatchProviders(tvId, region),
    enabled: !!tvId,
    staleTime: 15 * 60 * 1000, // 15 minutes
    retry: 2,
  });
}

export default useTVWatchProviders;

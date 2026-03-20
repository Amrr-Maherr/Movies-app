import { useQuery } from "@tanstack/react-query";
import { getStreamingPlatforms, getPlatformMovies, getPlatformTVShows, type StreamingPlatform, type PlatformContentResponse } from "@/services";

/**
 * Hook for fetching all streaming platforms
 * @param region - Region code (default: "US")
 * @returns Streaming platforms data and query state
 * 
 * @example
 * const { data, isLoading, error } = useStreamingPlatforms("US");
 */
export function useStreamingPlatforms(region: string = "US") {
  return useQuery<StreamingPlatform[] | null>({
    queryKey: ["streaming", "platforms", region],
    queryFn: () => getStreamingPlatforms(region),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - platforms don't change often
    retry: 2,
  });
}

/**
 * Hook for fetching movies by streaming platform
 * @param platformId - Platform ID (e.g., 8 for Netflix)
 * @param page - Page number (default: 1)
 * @returns Platform movies data and query state
 * 
 * @example
 * const { data, isLoading, error } = usePlatformMovies(8);
 */
export function usePlatformMovies(platformId: number, page: number = 1) {
  return useQuery<PlatformContentResponse | null>({
    queryKey: ["platform", "movies", platformId, page],
    queryFn: () => getPlatformMovies(platformId, page),
    enabled: !!platformId,
    staleTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    retry: 2,
  });
}

/**
 * Hook for fetching TV shows by streaming platform
 * @param platformId - Platform ID (e.g., 8 for Netflix)
 * @param page - Page number (default: 1)
 * @returns Platform TV shows data and query state
 * 
 * @example
 * const { data, isLoading, error } = usePlatformTVShows(8);
 */
export function usePlatformTVShows(platformId: number, page: number = 1) {
  return useQuery<PlatformContentResponse | null>({
    queryKey: ["platform", "tv", platformId, page],
    queryFn: () => getPlatformTVShows(platformId, page),
    enabled: !!platformId,
    staleTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    retry: 2,
  });
}

export default useStreamingPlatforms;

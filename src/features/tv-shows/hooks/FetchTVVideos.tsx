import { useQuery } from "@tanstack/react-query";
import { getTVVideos, type TVVideosResponse } from "@/services";

/**
 * Hook for fetching TV show videos (trailers, teasers, clips)
 * @param tvId - TV Show ID
 * @param page - Page number (default: 1)
 * @returns Videos data and query state
 */
export function useTVVideos(tvId: number, page: number = 1) {
  return useQuery<TVVideosResponse | null>({
    queryKey: ["tv", "videos", tvId, page],
    queryFn: () => getTVVideos(tvId, page),
    enabled: !!tvId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

export default useTVVideos;

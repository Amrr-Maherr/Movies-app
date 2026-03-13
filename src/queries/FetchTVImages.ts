import { useQuery } from "@tanstack/react-query";
import { GetTVImages } from "@/api/TVImages";
import type { TVImagesResponse } from "@/api/TVImages";

/**
 * Hook for fetching TV show images (posters, backdrops, logos)
 * @param tvId - TV Show ID
 * @returns Images data and query state
 */
export function useTVImages(tvId: number) {
  return useQuery<TVImagesResponse | null>({
    queryKey: ["tv", "images", tvId],
    queryFn: () => GetTVImages(tvId),
    enabled: !!tvId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

export default useTVImages;

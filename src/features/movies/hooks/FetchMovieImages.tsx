import { useQuery } from "@tanstack/react-query";
import { getMovieImages, type MovieImagesResponse } from "@/services";

/**
 * Hook for fetching movie images (posters, backdrops, logos)
 * @param movieId - Movie ID
 * @returns Images data and query state
 */
export function useMovieImages(movieId: number) {
  return useQuery<MovieImagesResponse | null>({
    queryKey: ["movie", "images", movieId],
    queryFn: () => getMovieImages(movieId),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

export default useMovieImages;

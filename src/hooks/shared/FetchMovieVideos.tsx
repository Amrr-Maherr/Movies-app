import { useQuery } from "@tanstack/react-query";
import { getMovieVideos, type MovieVideosResponse } from "@/services";

/**
 * Hook for fetching movie videos (trailers, teasers, clips)
 * @param movieId - Movie ID
 * @param page - Page number (default: 1)
 * @returns Videos data and query state
 */
export function useMovieVideos(movieId: number, page: number = 1) {
  return useQuery<MovieVideosResponse | null>({
    queryKey: ["movie", "videos", movieId, page],
    queryFn: () => getMovieVideos(movieId, page),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

export default useMovieVideos;

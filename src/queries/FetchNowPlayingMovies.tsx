import { getNowPlayingMovies } from "@/services";
import type { Movie } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useNowPlayingMovies(page: number = 1) {
  const { data, error, refetch, isLoading } = useQuery<Movie[]>({
    queryKey: ["nowPlayingMovies", page],
    queryFn: () => getNowPlayingMovies(page) as Promise<Movie[]>,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return { data, error, refetch, isLoading };
}

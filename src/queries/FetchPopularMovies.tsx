import { getPopularMovies } from "@/services";
import type { PopularMoviesResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function usePopularMovies(page: number) {
  const { data, error, refetch, isLoading } = useQuery<PopularMoviesResponse>({
    queryKey: ["PopularMovies", page],
    queryFn: () => getPopularMovies(page) as Promise<PopularMoviesResponse>,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return { data, error, refetch, isLoading };
}

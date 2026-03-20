import { getTopRatedMovies } from "@/services";
import type { PopularMoviesResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useTopRatedMovies(page: number = 1) {
  const { data, error, refetch, isLoading } = useQuery<PopularMoviesResponse>({
    queryKey: ["topRatedMovies", page],
    queryFn: () => getTopRatedMovies(page) as Promise<PopularMoviesResponse>,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return { data, error, refetch, isLoading };
}

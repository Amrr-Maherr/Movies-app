import { GetPopularMovies } from "@/api/PopularMovies";
import type { Movie } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function usePopularMovies() {
  const { data, error, refetch, isLoading } = useQuery<Movie[]>({
    queryKey: ["PopularMovies"],
    queryFn: () => GetPopularMovies() as Promise<Movie[]>,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return { data, error, refetch, isLoading };
}

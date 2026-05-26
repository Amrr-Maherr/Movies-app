import { getTrendingMoviesWeek } from "@/services";
import type { PopularMoviesResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useTrendingMoviesWeek(page: number = 1) {
  const { data, error, refetch, isLoading } = useQuery<PopularMoviesResponse>({
    queryKey: ["trendingMoviesWeek", page],
    queryFn: () =>
      getTrendingMoviesWeek(page) as Promise<PopularMoviesResponse>,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return { data, error, refetch, isLoading };
}

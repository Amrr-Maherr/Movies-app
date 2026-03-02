import { GetTrendingMoviesDay } from "@/api/TrendingMoviesDay";
import type { Movie } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useTrendingMoviesDay(page: number = 1) {
  const { data, error, refetch, isLoading } = useQuery<Movie[]>({
    queryKey: ["trendingMoviesDay", page],
    queryFn: () => GetTrendingMoviesDay(page) as Promise<Movie[]>,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return { data, error, refetch, isLoading };
}

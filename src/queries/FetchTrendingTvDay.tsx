import { getTrendingTvShowsDay } from "@/services";
import type { TvShow } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useTrendingTvDay(page: number = 1) {
  const { data, error, refetch, isLoading } = useQuery<TvShow[]>({
    queryKey: ["trendingTvDay", page],
    queryFn: () => getTrendingTvShowsDay(page) as Promise<TvShow[]>,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return { data, error, refetch, isLoading };
}

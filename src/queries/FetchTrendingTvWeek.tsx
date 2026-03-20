import { getTrendingTvShowsWeek } from "@/services";
import type { PopularTvShowsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useTrendingTvWeek(page: number = 1) {
  const { data, error, refetch, isLoading } = useQuery<PopularTvShowsResponse>({
    queryKey: ["trendingTvWeek", page],
    queryFn: () =>
      getTrendingTvShowsWeek(page) as Promise<PopularTvShowsResponse>,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return { data, error, refetch, isLoading };
}

import { getAiringTodayTvShows } from "@/services";
import type { PopularTvShowsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useAiringTodayTv(page: number = 1) {
  const { data, error, refetch, isLoading } = useQuery<PopularTvShowsResponse>({
    queryKey: ["airingTodayTv", page],
    queryFn: () =>
      getAiringTodayTvShows(page) as Promise<PopularTvShowsResponse>,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return { data, error, refetch, isLoading };
}

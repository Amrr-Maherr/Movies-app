import { getOnTheAirTvShows } from "@/services";
import type { PopularTvShowsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useOnTheAirTv(page: number = 1) {
  const { data, error, refetch, isLoading } = useQuery<PopularTvShowsResponse>({
    queryKey: ["onTheAirTv", page],
    queryFn: () => getOnTheAirTvShows(page) as Promise<PopularTvShowsResponse>,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return { data, error, refetch, isLoading };
}

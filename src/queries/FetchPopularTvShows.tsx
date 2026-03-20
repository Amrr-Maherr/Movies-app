import { getPopularTvShows } from "@/services";
import type { PopularTvShowsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function usePopularTvShows(page: number = 1) {
  const { data, error, refetch, isLoading } = useQuery<PopularTvShowsResponse>({
    queryKey: ["popularTvShows", page],
    queryFn: () => getPopularTvShows(page) as Promise<PopularTvShowsResponse>,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return { data, error, refetch, isLoading };
}

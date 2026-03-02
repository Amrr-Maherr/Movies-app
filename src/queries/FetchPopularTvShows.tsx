import { GetPopularTvShows } from "@/api/PopularTvShows";
import type { TvShow } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function usePopularTvShows(page: number = 1) {
  const { data, error, refetch, isLoading } = useQuery<TvShow[]>({
    queryKey: ["popularTvShows", page],
    queryFn: () => GetPopularTvShows(page) as Promise<TvShow[]>,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return { data, error, refetch, isLoading };
}

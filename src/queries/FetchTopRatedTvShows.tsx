import { GetTopRatedTvShows } from "@/api/TopRatedTvShows";
import type { TvShow } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useTopRatedTvShows(page: number = 1) {
  const { data, error, refetch, isLoading } = useQuery<TvShow[]>({
    queryKey: ["topRatedTvShows", page],
    queryFn: () => GetTopRatedTvShows(page) as Promise<TvShow[]>,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return { data, error, refetch, isLoading };
}

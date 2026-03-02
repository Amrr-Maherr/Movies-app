import { GetOnTheAirTv } from "@/api/OnTheAirTv";
import type { TvShow } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useOnTheAirTv(page: number = 1) {
  const { data, error, refetch, isLoading } = useQuery<TvShow[]>({
    queryKey: ["onTheAirTv", page],
    queryFn: () => GetOnTheAirTv(page) as Promise<TvShow[]>,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return { data, error, refetch, isLoading };
}

import { getTVSeasonDetails } from "@/services";
import type { SeasonDetailsResponse } from "@/features/tv-shows/types";
import { useQuery } from "@tanstack/react-query";

interface FetchTvSeasonDetailsReturn {
  data: SeasonDetailsResponse | null | undefined;
  error: unknown;
  refetch: () => void;
  isLoading: boolean;
}

export default function FetchTvSeasonDetails(
  tvShowId: number,
  seasonNumber: number,
): FetchTvSeasonDetailsReturn {
  const { data, error, refetch, isLoading } = useQuery<SeasonDetailsResponse>({
    queryKey: ["TvSeasonDetails", tvShowId, seasonNumber],
    queryFn: () =>
      getTVSeasonDetails(tvShowId, seasonNumber) as Promise<SeasonDetailsResponse>,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    enabled: tvShowId > 0 && seasonNumber > 0,
  });

  return { data, error, refetch, isLoading };
}

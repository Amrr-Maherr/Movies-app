import { GetTvSeasonDetails } from "@/api/TvSeasonDetails";
import type { Season } from "@/types";
import { useQuery } from "@tanstack/react-query";

interface FetchTvSeasonDetailsReturn {
  data: Season | null | undefined;
  error: unknown;
  refetch: () => void;
  isLoading: boolean;
}

export default function FetchTvSeasonDetails(
  tvShowId: number,
  seasonNumber: number
): FetchTvSeasonDetailsReturn {
  const { data, error, refetch, isLoading } = useQuery<Season>({
    queryKey: ["TvSeasonDetails", tvShowId, seasonNumber],
    queryFn: () =>
      GetTvSeasonDetails(tvShowId, seasonNumber) as Promise<Season>,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    enabled: tvShowId > 0 && seasonNumber > 0,
  });

  return { data, error, refetch, isLoading };
}

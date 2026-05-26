import { getTVEpisodeDetails } from "@/services";
import type { EpisodeDetailsResponse } from "@/features/tv-shows/types";
import { useQuery } from "@tanstack/react-query";

interface FetchEpisodeDetailsReturn {
  data: EpisodeDetailsResponse | null | undefined;
  error: unknown;
  refetch: () => void;
  isLoading: boolean;
}

export default function FetchEpisodeDetails(
  tvShowId: number,
  seasonNumber: number,
  episodeNumber: number,
): FetchEpisodeDetailsReturn {
  const { data, error, refetch, isLoading } = useQuery<EpisodeDetailsResponse>({
    queryKey: ["EpisodeDetails", tvShowId, seasonNumber, episodeNumber],
    queryFn: () =>
      getTVEpisodeDetails(
        tvShowId,
        seasonNumber,
        episodeNumber,
      ),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    enabled: tvShowId > 0 && seasonNumber > 0 && episodeNumber > 0,
  });

  return { data, error, refetch, isLoading };
}

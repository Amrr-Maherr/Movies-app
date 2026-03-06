import { GetEpisodeDetails } from "@/api/GetEpisodeDetails";
import type { Episode } from "@/types";
import { useQuery } from "@tanstack/react-query";

interface FetchEpisodeDetailsReturn {
  data: Episode | null | undefined;
  error: unknown;
  refetch: () => void;
  isLoading: boolean;
}

export default function FetchEpisodeDetails(
  tvShowId: number,
  seasonNumber: number,
  episodeNumber: number
): FetchEpisodeDetailsReturn {
  const { data, error, refetch, isLoading } = useQuery<Episode>({
    queryKey: ["EpisodeDetails", tvShowId, seasonNumber, episodeNumber],
    queryFn: () =>
      GetEpisodeDetails(tvShowId, seasonNumber, episodeNumber) as Promise<Episode>,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    enabled: tvShowId > 0 && seasonNumber > 0 && episodeNumber > 0,
  });

  return { data, error, refetch, isLoading };
}

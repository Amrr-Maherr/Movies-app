import { GetTvShowDetails } from "@/api/TvShowDetails";
import type { TvShowDetails } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function FetchTvShowDetails(id: number) {
  const { data, error, refetch, isLoading } = useQuery<TvShowDetails>({
    queryKey: ["TvShowDetails", id],
    queryFn: () => GetTvShowDetails(Number(id)) as Promise<TvShowDetails>,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return { data, error, refetch, isLoading };
}

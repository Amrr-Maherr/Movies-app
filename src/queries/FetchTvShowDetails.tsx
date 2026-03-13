import { getTVShowDetails } from "@/services";
import { useQuery } from "@tanstack/react-query";

export default function FetchTvShowDetails(id: number) {
  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ["TvShowDetails", id],
    queryFn: () => getTVShowDetails(Number(id)),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return { data, error, refetch, isLoading };
}

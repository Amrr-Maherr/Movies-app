import { getStreamingPlatforms } from "@/services";
import type { StreamingPlatform } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useStreamingPlatforms() {
  const { data, error, refetch, isLoading } = useQuery<StreamingPlatform[]>({
    queryKey: ["StreamingPlatforms"],
    queryFn: () => getStreamingPlatforms() as Promise<StreamingPlatform[]>,
    staleTime: 10 * 60 * 1000, // 10 minutes - platforms don't change often
    retry: 2,
  });

  return { data, error, refetch, isLoading };
}

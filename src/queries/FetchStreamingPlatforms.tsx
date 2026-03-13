import { GetStreamingPlatforms } from "@/api/StreamingPlatforms";
import type { StreamingPlatform } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useStreamingPlatforms() {
  const { data, error, refetch, isLoading } = useQuery<StreamingPlatform[]>({
    queryKey: ["StreamingPlatforms"],
    queryFn: () => GetStreamingPlatforms() as Promise<StreamingPlatform[]>,
    staleTime: 10 * 60 * 1000, // 10 minutes - platforms don't change often
    retry: 2,
  });

  return { data, error, refetch, isLoading };
}

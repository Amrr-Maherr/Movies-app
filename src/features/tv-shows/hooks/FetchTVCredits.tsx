import { useQuery } from "@tanstack/react-query";
import { getTVCredits } from "@/services";
import type { Credits } from "@/types";

/**
 * Hook for fetching TV show credits
 * @param tvId - TV Show ID
 * @returns Credits data and query state
 */
export function useTVCredits(tvId: number) {
  return useQuery<Credits | null>({
    queryKey: ["tv", "credits", tvId],
    queryFn: () => getTVCredits(tvId),
    enabled: !!tvId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

export default useTVCredits;

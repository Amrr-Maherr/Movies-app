import { useQuery } from "@tanstack/react-query";
import { GetPersonMovieCredits, GetPersonTVCredits } from "@/api/PersonCreditsExtended";
import type { PersonMovieCreditsResponse, PersonTVCreditsResponse } from "@/api/PersonCreditsExtended";

/**
 * Hook for fetching person's movie credits
 * @param personId - Person ID
 * @returns Movie credits data and query state
 */
export function usePersonMovieCredits(personId: number) {
  return useQuery<PersonMovieCreditsResponse | null>({
    queryKey: ["person", "movie-credits", personId],
    queryFn: () => GetPersonMovieCredits(personId),
    enabled: !!personId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

/**
 * Hook for fetching person's TV credits
 * @param personId - Person ID
 * @returns TV credits data and query state
 */
export function usePersonTVCredits(personId: number) {
  return useQuery<PersonTVCreditsResponse | null>({
    queryKey: ["person", "tv-credits", personId],
    queryFn: () => GetPersonTVCredits(personId),
    enabled: !!personId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

export default { usePersonMovieCredits, usePersonTVCredits };

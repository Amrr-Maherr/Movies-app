import { useQuery } from "@tanstack/react-query";
import { GetPersonImages } from "@/api/PersonImages";
import type { PersonImagesResponse } from "@/api/PersonImages";

/**
 * Hook for fetching person's profile images
 * @param personId - Person ID
 * @returns Images data and query state
 */
export function usePersonImages(personId: number) {
  return useQuery<PersonImagesResponse | null>({
    queryKey: ["person", "images", personId],
    queryFn: () => GetPersonImages(personId),
    enabled: !!personId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

export default usePersonImages;

import { useQuery } from "@tanstack/react-query";
import { getCollectionDetails, type Collection } from "@/services";

/**
 * Hook for fetching collection details
 * @param collectionId - Collection ID
 * @returns Collection data and query state
 * 
 * @example
 * const { data, isLoading, error } = useCollectionDetails(131295); // Marvel Cinematic Universe
 */
export function useCollectionDetails(collectionId: number) {
  return useQuery<Collection | null>({
    queryKey: ["collection", "details", collectionId],
    queryFn: () => getCollectionDetails(collectionId),
    enabled: !!collectionId,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - collection details don't change often
    retry: 2,
  });
}

export default useCollectionDetails;

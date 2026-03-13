import { getMediaByLanguage } from "@/services";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useMediaByLanguage(languageCode: string) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["mediaByLanguage", languageCode],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getMediaByLanguage(
        languageCode,
        pageParam as number,
      );
      if (!result) {
        throw new Error("Failed to fetch media by language");
      }
      return {
        page: pageParam as number,
        results: result,
        total_pages: 100,
        total_results: result.length,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!languageCode,
  });

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
  };
}

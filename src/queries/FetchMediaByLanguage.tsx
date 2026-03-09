import { GetMediaByLanguage } from "@/api/MediaByLanguage";
import type { PopularMoviesResponse } from "@/types";
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
  } = useInfiniteQuery<PopularMoviesResponse>({
    queryKey: ["mediaByLanguage", languageCode],
    queryFn: ({ pageParam = 1 }) => GetMediaByLanguage(languageCode, pageParam as number) as Promise<PopularMoviesResponse>,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    enabled: !!languageCode, // Only fetch if a language is specified
  });

  return { 
    data, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    refetch, 
    isLoading 
  };
}

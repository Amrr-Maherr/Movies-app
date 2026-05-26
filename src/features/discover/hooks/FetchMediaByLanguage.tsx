import { getMediaByLanguage } from "@/services";
import { useQuery } from "@tanstack/react-query";

interface MediaByLanguageResponse {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

export default function useMediaByLanguage(
  languageCode: string,
  page: number = 1,
) {
  const { data, error, isFetching, refetch, isLoading } =
    useQuery<MediaByLanguageResponse>({
      queryKey: ["mediaByLanguage", languageCode, page],
      queryFn: async () => {
        const result = await getMediaByLanguage(languageCode, page);
        if (!result) {
          throw new Error("Failed to fetch media by language");
        }
        return {
          page,
          results: result,
          total_pages: 100,
          total_results: result.length,
        };
      },
      staleTime: 5 * 60 * 1000,
      retry: 2,
      enabled: !!languageCode,
    });

  return {
    data,
    error,
    isFetching,
    refetch,
    isLoading,
  };
}

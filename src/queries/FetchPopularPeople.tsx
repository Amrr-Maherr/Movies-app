import { useInfiniteQuery } from "@tanstack/react-query";
import { getPopularPeople } from "@/services";
import type { PopularPeopleResponse } from "@/services/personService";

const usePopularPeople = () => {
  return useInfiniteQuery<PopularPeopleResponse, Error>({
    queryKey: ["popularPeople"],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getPopularPeople(pageParam as number);
      if (!result) {
        throw new Error("Failed to fetch popular people");
      }
      return result;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export default usePopularPeople;

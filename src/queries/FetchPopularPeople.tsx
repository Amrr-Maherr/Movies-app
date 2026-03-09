import { useInfiniteQuery } from "@tanstack/react-query";
import { getPopularPeople } from "@/api/PopularPeople";
import type { PopularPeopleResponse } from "@/types/person";

const usePopularPeople = () => {
  return useInfiniteQuery<PopularPeopleResponse>({
    queryKey: ["popularPeople"],
    queryFn: ({ pageParam = 1 }) => getPopularPeople(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export default usePopularPeople;

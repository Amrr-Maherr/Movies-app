import { useQuery } from "@tanstack/react-query";
import { getPopularPeople } from "@/services";
import type { PopularPeopleResponse } from "@/services/personService";

const usePopularPeople = (page: number = 1) => {
  return useQuery<PopularPeopleResponse>({
    queryKey: ["popularPeople", page],
    queryFn: async () => {
      const result = await getPopularPeople(page);
      if (!result) {
        throw new Error("Failed to fetch popular people");
      }
      return result;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export default usePopularPeople;

import { GetKidsMovies } from "@/api/KidsMovies";
import type { Movie } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useKidsMovies(page: number = 1) {
  const { data, error, refetch, isLoading } = useQuery<Movie[]>({
    queryKey: ["kidsMovies", page],
    queryFn: () => GetKidsMovies(page) as Promise<Movie[]>,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return { data, error, refetch, isLoading };
}

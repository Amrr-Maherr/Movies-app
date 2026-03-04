import { GetMovieDetails } from "@/api/MovieDetails";
import type { Movie } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function FetchMovieDetails(id: number) {
  const { data, error, refetch, isLoading } = useQuery<Movie[]>({
    queryKey: ["MovieDetails"],
    queryFn: () => GetMovieDetails(Number(id)) as Promise<Movie[]>,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return { data, error, refetch, isLoading };
}

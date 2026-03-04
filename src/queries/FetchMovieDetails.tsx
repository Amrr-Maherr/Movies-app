import { GetMovieDetails } from "@/api/MovieDetails";
import type { MovieDetails } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function FetchMovieDetails(id: number) {
  const { data, error, refetch, isLoading } = useQuery<MovieDetails>({
    queryKey: ["MovieDetails", id],
    queryFn: () => GetMovieDetails(Number(id)) as Promise<MovieDetails>,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return { data, error, refetch, isLoading };
}

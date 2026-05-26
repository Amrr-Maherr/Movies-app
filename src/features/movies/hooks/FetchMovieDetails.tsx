import { getMovieDetails } from "@/services";
import { useQuery } from "@tanstack/react-query";

export default function FetchMovieDetails(id: number) {
  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ["MovieDetails", id],
    queryFn: () => getMovieDetails(Number(id)),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return { data, error, refetch, isLoading };
}

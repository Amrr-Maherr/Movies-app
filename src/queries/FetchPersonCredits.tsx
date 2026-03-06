import { GetPersonCombinedCredits, type CombinedCredits } from "@/api/PersonCredits";
import { useQuery } from "@tanstack/react-query";

interface FetchPersonCreditsReturn {
  data: CombinedCredits | null;
  error: unknown;
  refetch: () => void;
  isLoading: boolean;
}

export default function FetchPersonCredits(id: number): FetchPersonCreditsReturn {
  const { data, error, refetch, isLoading } = useQuery<CombinedCredits | null>({
    queryKey: ["PersonCredits", id],
    queryFn: () => GetPersonCombinedCredits(id) as Promise<CombinedCredits | null>,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return { data: data ?? null, error, refetch, isLoading };
}

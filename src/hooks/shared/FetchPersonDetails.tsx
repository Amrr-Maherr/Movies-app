import {
  getPersonDetails,
  getPersonExternalIds,
  type PersonDetails,
  type PersonExternalIds,
} from "@/services";
import { useQuery } from "@tanstack/react-query";

interface FetchPersonDetailsReturn {
  personData: PersonDetails | null;
  externalIdsData: PersonExternalIds | null;
  error: unknown;
  refetch: () => void;
  isLoading: boolean;
}

export default function FetchPersonDetails(
  id: number,
): FetchPersonDetailsReturn {
  const {
    data: personData,
    error: personError,
    refetch: refetchPerson,
    isLoading: personLoading,
  } = useQuery<PersonDetails | null>({
    queryKey: ["PersonDetails", id],
    queryFn: () => getPersonDetails(id) as Promise<PersonDetails | null>,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  const {
    data: externalIdsData,
    error: externalIdsError,
    refetch: refetchExternalIds,
    isLoading: externalIdsLoading,
  } = useQuery<PersonExternalIds | null>({
    queryKey: ["PersonExternalIds", id],
    queryFn: () =>
      getPersonExternalIds(id) as Promise<PersonExternalIds | null>,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  return {
    personData: personData ?? null,
    externalIdsData: externalIdsData ?? null,
    error: personError || externalIdsError,
    refetch: () => {
      refetchPerson();
      refetchExternalIds();
    },
    isLoading: personLoading || externalIdsLoading,
  };
}

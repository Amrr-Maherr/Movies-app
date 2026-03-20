import { useQuery } from "@tanstack/react-query";
import { getCompanyDetails, getCompanyMovies, type Company, type CompanyMoviesResponse } from "@/services";

/**
 * Hook for fetching company details
 * @param companyId - Company ID
 * @returns Company data and query state
 * 
 * @example
 * const { data, isLoading, error } = useCompanyDetails(420); // Marvel Studios
 */
export function useCompanyDetails(companyId: number) {
  return useQuery<Company | null>({
    queryKey: ["company", "details", companyId],
    queryFn: () => getCompanyDetails(companyId),
    enabled: !!companyId,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - company details don't change often
    retry: 2,
  });
}

/**
 * Hook for fetching movies by company
 * @param companyId - Company ID
 * @param page - Page number (default: 1)
 * @returns Company movies data and query state
 * 
 * @example
 * const { data, isLoading, error } = useCompanyMovies(420, 1);
 */
export function useCompanyMovies(companyId: number, page: number = 1) {
  return useQuery<CompanyMoviesResponse | null>({
    queryKey: ["company", "movies", companyId, page],
    queryFn: () => getCompanyMovies(companyId, page),
    enabled: !!companyId,
    staleTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    retry: 2,
  });
}

export default useCompanyDetails;

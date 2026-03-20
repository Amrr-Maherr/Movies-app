import { useQuery } from "@tanstack/react-query";
import { getNetworkDetails, getNetworkTVSeries, type Network, type NetworkTVSeriesResponse } from "@/services";

/**
 * Hook for fetching network details
 * @param networkId - Network ID
 * @returns Network data and query state
 * 
 * @example
 * const { data, isLoading, error } = useNetworkDetails(213); // Netflix
 */
export function useNetworkDetails(networkId: number) {
  return useQuery<Network | null>({
    queryKey: ["network", "details", networkId],
    queryFn: () => getNetworkDetails(networkId),
    enabled: !!networkId,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - network details don't change often
    retry: 2,
  });
}

/**
 * Hook for fetching TV series by network
 * @param networkId - Network ID
 * @param page - Page number (default: 1)
 * @returns Network TV series data and query state
 * 
 * @example
 * const { data, isLoading, error } = useNetworkTVSeries(213, 1);
 */
export function useNetworkTVSeries(networkId: number, page: number = 1) {
  return useQuery<NetworkTVSeriesResponse | null>({
    queryKey: ["network", "tv_series", networkId, page],
    queryFn: () => getNetworkTVSeries(networkId, page),
    enabled: !!networkId,
    staleTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    retry: 2,
  });
}

export default useNetworkDetails;

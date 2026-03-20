/**
 * Network Service
 *
 * Handles all TV network-related API calls to The Movie Database (TMDB).
 * Includes endpoints for network details and TV series by network.
 */

import axios from "axios";
import type { Network, NetworkTVSeriesResponse, TvShow } from "@/types";

// TMDB API Key - used directly in all endpoints
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// ============= Network Details Endpoint =============

/**
 * Fetch detailed information about a specific TV network.
 *
 * @param networkId - Network ID
 * @returns Network details or null on error
 *
 * @example
 * getNetworkDetails(213) // Netflix
 */
export async function getNetworkDetails(networkId: number): Promise<Network | null> {
  try {
    const response = await axios.get<Network>(`${TMDB_BASE_URL}/network/${networkId}`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching network details:", error);
    return null;
  }
}

// ============= Network TV Series Endpoint =============

/**
 * Fetch TV series produced by a specific network.
 *
 * @param networkId - Network ID
 * @param page - Page number for pagination (default: 1)
 * @returns Network TV series response or null on error
 *
 * @example
 * getNetworkTVSeries(213, 1) // Netflix shows
 */
export async function getNetworkTVSeries(
  networkId: number,
  page: number = 1
): Promise<NetworkTVSeriesResponse | null> {
  try {
    const response = await axios.get<NetworkTVSeriesResponse>(
      `${TMDB_BASE_URL}/network/${networkId}/tv_series`,
      {
        params: {
          api_key: TMDB_API_KEY,
          language: "en-US",
          page,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching network TV series:", error);
    return null;
  }
}

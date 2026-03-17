/**
 * Network Service
 *
 * Handles all TV network-related API calls to The Movie Database (TMDB).
 * Includes endpoints for network details and TV series by network.
 */

import axios from "axios";

// TMDB API Configuration
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

// ============= Types =============

export interface Network {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
  headquarters?: string;
  homepage?: string;
  description?: string;
  parent_organization?: {
    id: number;
    logo_path: string | null;
    name: string;
  } | null;
}

export interface NetworkTVSeriesResponse {
  id: number;
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
}

export interface TvShow {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
  original_language: string;
  popularity: number;
  origin_country: string[];
  original_name: string;
  vote_count: number;
}

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
    const response = await axios.get<Network>(`${API_BASE_URL}/network/${networkId}`, {
      params: {
        api_key: API_KEY,
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
      `${API_BASE_URL}/network/${networkId}/tv_series`,
      {
        params: {
          api_key: API_KEY,
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

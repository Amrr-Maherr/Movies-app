/**
 * Streaming Platform Service
 *
 * Handles all streaming platform-related API calls to The Movie Database (TMDB).
 * Includes endpoints for platform details and content by platform.
 */

import axios from "axios";
import type { Movie, TvShow } from "@/types";

// TMDB API Configuration
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

// ============= Types =============

export interface StreamingPlatform {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
  display_priority?: number;
}

export interface PlatformContentResponse {
  id: number;
  page: number;
  results: (Movie | TvShow)[];
  total_pages: number;
  total_results: number;
}

// ============= Platform Watch Providers Endpoint =============

/**
 * Fetch all available streaming platforms for a region.
 *
 * @param region - ISO 3166-1 region code (default: "US")
 * @returns Array of streaming platforms or null on error
 *
 * @example
 * getStreamingPlatforms("US") // Netflix, HBO, Disney+, etc.
 */
export async function getStreamingPlatforms(region: string = "US"): Promise<StreamingPlatform[] | null> {
  try {
    const response = await axios.get<{ results: StreamingPlatform[] }>(
      `${API_BASE_URL}/watch/providers/movie`,
      {
        params: {
          api_key: API_KEY,
          watch_region: region,
          language: "en-US",
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching streaming platforms:", error);
    return null;
  }
}

/**
 * Fetch movies available on a specific streaming platform.
 *
 * @param platformId - Platform ID (e.g., 8 for Netflix)
 * @param page - Page number for pagination (default: 1)
 * @returns Platform movies response or null on error
 *
 * @example
 * getPlatformMovies(8, 1) // Netflix movies
 */
export async function getPlatformMovies(
  platformId: number,
  page: number = 1
): Promise<PlatformContentResponse | null> {
  try {
    const response = await axios.get<PlatformContentResponse>(
      `${API_BASE_URL}/discover/movie`,
      {
        params: {
          api_key: API_KEY,
          language: "en-US",
          page,
          sort_by: "popularity.desc",
          with_watch_providers: platformId,
          watch_region: "US",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching platform movies:", error);
    return null;
  }
}

/**
 * Fetch TV shows available on a specific streaming platform.
 *
 * @param platformId - Platform ID (e.g., 8 for Netflix)
 * @param page - Page number for pagination (default: 1)
 * @returns Platform TV shows response or null on error
 *
 * @example
 * getPlatformTVShows(8, 1) // Netflix TV shows
 */
export async function getPlatformTVShows(
  platformId: number,
  page: number = 1
): Promise<PlatformContentResponse | null> {
  try {
    const response = await axios.get<PlatformContentResponse>(
      `${API_BASE_URL}/discover/tv`,
      {
        params: {
          api_key: API_KEY,
          language: "en-US",
          page,
          sort_by: "popularity.desc",
          with_watch_providers: platformId,
          watch_region: "US",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching platform TV shows:", error);
    return null;
  }
}

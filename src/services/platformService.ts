/**
 * Streaming Platform Service
 *
 * Handles all streaming platform-related API calls to The Movie Database (TMDB).
 * Includes endpoints for platform details and content by platform.
 */

import axios from "axios";
import { tmdbConfig } from "@/config/api";
import type { Movie, TvShow } from "@/types";

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
      `${tmdbConfig.baseUrl}/watch/providers/movie`,
      {
        params: {
          api_key: tmdbConfig.apiKey,
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
      `${tmdbConfig.baseUrl}/discover/movie`,
      {
        params: {
          api_key: tmdbConfig.apiKey,
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
      `${tmdbConfig.baseUrl}/discover/tv`,
      {
        params: {
          api_key: tmdbConfig.apiKey,
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

/**
 * Trending Service
 * 
 * Handles all trending-related API calls to The Movie Database (TMDB).
 * Includes endpoints for trending movies and TV shows by day and week.
 */

import axios from "axios";
import { tmdbConfig } from "@/config/api";
import type { Movie, PopularMoviesResponse, TvShow, PopularTvShowsResponse } from "@/types";

// ============= Trending Movies Endpoints =============

/**
 * Fetch trending movies for the day from TMDB API.
 * These movies that are currently trending based on user activity.
 *
 * @param page - Page number for pagination (default: 1)
 * @returns Array of trending movies or null on error
 */
export async function getTrendingMoviesDay(page: number = 1): Promise<Movie[] | null> {
  try {
    const response = await axios.get<PopularMoviesResponse>(`${tmdbConfig.baseUrl}/trending/movie/day`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        page,
        append_to_response: "videos",
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies (day):", error);
    return null;
  }
}

/**
 * Fetch trending movies for the week from TMDB API.
 * These movies that have been trending over the past week.
 *
 * @param page - Page number for pagination (default: 1)
 * @returns Array of trending movies or null on error
 */
export async function getTrendingMoviesWeek(page: number = 1): Promise<Movie[] | null> {
  try {
    const response = await axios.get<PopularMoviesResponse>(`${tmdbConfig.baseUrl}/trending/movie/week`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        page,
        append_to_response: "videos",
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies (week):", error);
    return null;
  }
}

// ============= Trending TV Shows Endpoints =============

/**
 * Fetch trending TV shows for the day from TMDB API.
 * These are TV shows that are currently trending based on user activity.
 *
 * @param page - Page number for pagination (default: 1)
 * @returns Array of trending TV shows or null on error
 */
export async function getTrendingTvShowsDay(page: number = 1): Promise<TvShow[] | null> {
  try {
    const response = await axios.get<PopularTvShowsResponse>(`${tmdbConfig.baseUrl}/trending/tv/day`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        page,
        append_to_response: "videos",
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending TV shows (day):", error);
    return null;
  }
}

/**
 * Fetch trending TV shows for the week from TMDB API.
 * These are TV shows that have been trending over the past week.
 *
 * @param page - Page number for pagination (default: 1)
 * @returns Array of trending TV shows or null on error
 */
export async function getTrendingTvShowsWeek(page: number = 1): Promise<TvShow[] | null> {
  try {
    const response = await axios.get<PopularTvShowsResponse>(`${tmdbConfig.baseUrl}/trending/tv/week`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        page,
        append_to_response: "videos",
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending TV shows (week):", error);
    return null;
  }
}

// ============= Trending People Endpoints =============

export interface TrendingPerson {
  id: number;
  name: string;
  known_for_department: string;
  profile_path: string | null;
  popularity: number;
  adult: boolean;
  gender: number;
  known_for: Array<{
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    media_type: "movie" | "tv";
  }>;
}

export interface TrendingPeopleResponse {
  page: number;
  results: TrendingPerson[];
  total_pages: number;
  total_results: number;
}

/**
 * Fetch trending people (actors, directors) for the day from TMDB API.
 * 
 * @param page - Page number for pagination (default: 1)
 * @returns Trending people response or null on error
 */
export async function getTrendingPeopleDay(page: number = 1): Promise<TrendingPeopleResponse | null> {
  try {
    const response = await axios.get<TrendingPeopleResponse>(`${tmdbConfig.baseUrl}/trending/person/day`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching trending people (day):", error);
    return null;
  }
}

/**
 * Fetch trending people (actors, directors) for the week from TMDB API.
 * 
 * @param page - Page number for pagination (default: 1)
 * @returns Trending people response or null on error
 */
export async function getTrendingPeopleWeek(page: number = 1): Promise<TrendingPeopleResponse | null> {
  try {
    const response = await axios.get<TrendingPeopleResponse>(`${tmdbConfig.baseUrl}/trending/person/week`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching trending people (week):", error);
    return null;
  }
}

// ============= Streaming Platforms Endpoints =============

export interface StreamingPlatform {
  id: number;
  name: string;
  logo_path: string;
  display_priority: number;
}

export interface StreamingPlatformsResponse {
  results: StreamingPlatform[];
}

/**
 * Fetch streaming platforms (watch providers) for movies in a specific region.
 * Returns a list of streaming services like Netflix, Disney+, HBO, etc.
 * 
 * @param region - Region code (default: "US")
 * @returns Array of streaming platforms or null on error
 */
export async function getStreamingPlatforms(region: string = "US"): Promise<StreamingPlatform[] | null> {
  try {
    const response = await axios.get<StreamingPlatformsResponse>(`${tmdbConfig.baseUrl}/watch/providers/movie`, {
      params: {
        api_key: tmdbConfig.apiKey,
        watch_region: region,
      },
    });

    // Filter and map to StreamingPlatform type - only streaming services with logos
    const platforms: StreamingPlatform[] = response.data.results
      .filter(
        (provider: { display_priority?: number; logo_path: string | null }) =>
          provider.logo_path && (provider.display_priority ?? 999) < 50
      )
      .slice(0, 50) // Limit to top 50 platforms
      .map((provider) => {
        const p = provider as unknown as { provider_id: number; provider_name: string; logo_path: string; display_priority?: number };
        return {
          id: p.provider_id,
          name: p.provider_name,
          logo_path: p.logo_path,
          display_priority: p.display_priority ?? 999,
        };
      })
      .sort((a: StreamingPlatform, b: StreamingPlatform) => a.display_priority - b.display_priority);

    return platforms;
  } catch (error) {
    console.error("Error fetching streaming platforms:", error);
    return null;
  }
}

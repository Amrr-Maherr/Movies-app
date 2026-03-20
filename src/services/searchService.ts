/**
 * Search Service
 * 
 * Handles all search-related API calls to The Movie Database (TMDB).
 * Includes endpoints for searching movies, TV shows, people, and multi-search.
 */

import axios from "axios";
import { tmdbConfig } from "@/config/api";
import type { Movie, TvShow } from "@/types";

// ============= Response Types =============

export interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface TvSearchResponse {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
}

export interface PersonSearchResult {
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

export interface PersonSearchResponse {
  page: number;
  results: PersonSearchResult[];
  total_pages: number;
  total_results: number;
}

export interface MultiSearchResult {
  id: number;
  media_type: "movie" | "tv" | "person";
  popularity: number;
  poster_path?: string | null;
  profile_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
  vote_count?: number;
  overview?: string;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  original_language?: string;
  adult?: boolean;
  genre_ids?: number[];
  origin_country?: string[];
  original_name?: string;
  known_for_department?: string;
  known_for?: Array<{
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    media_type: "movie" | "tv";
  }>;
}

export interface MultiSearchResponse {
  page: number;
  results: MultiSearchResult[];
  total_pages: number;
  total_results: number;
}

// ============= Search Endpoints =============

/**
 * Search for movies by title or keywords.
 *
 * @param query - Search query string
 * @param page - Page number for pagination (default: 1)
 * @param includeAdult - Include adult content in results (default: true)
 * @param year - Filter by release year (optional)
 * @param primaryReleaseYear - Filter by primary release year (optional)
 * @param region - Filter by region (ISO 3166-1 alpha-2) (optional)
 * @returns Array of movies matching the search or null on error
 */
export async function searchMovies(
  query: string,
  page: number = 1,
  includeAdult: boolean = true,
  year?: number,
  primaryReleaseYear?: number,
  region?: string
): Promise<Movie[] | null> {
  try {
    const response = await axios.get<MovieSearchResponse>(`${tmdbConfig.baseUrl}/search/movie`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        query,
        page,
        include_adult: includeAdult,
        ...(year && { year }),
        ...(primaryReleaseYear && { primary_release_year: primaryReleaseYear }),
        ...(region && { region }),
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return null;
  }
}

/**
 * Search for TV shows by title or keywords.
 *
 * @param query - Search query string
 * @param page - Page number for pagination (default: 1)
 * @param includeAdult - Include adult content in results (default: true)
 * @param year - Filter by first air date year (optional)
 * @param firstAirDateYear - Filter by first air date year (optional)
 * @returns Array of TV shows matching the search or null on error
 */
export async function searchTvShows(
  query: string,
  page: number = 1,
  includeAdult: boolean = true,
  year?: number,
  firstAirDateYear?: number
): Promise<TvShow[] | null> {
  try {
    const response = await axios.get<TvSearchResponse>(`${tmdbConfig.baseUrl}/search/tv`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        query,
        page,
        include_adult: includeAdult,
        ...(year && { year }),
        ...(firstAirDateYear && { first_air_date_year: firstAirDateYear }),
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching TV shows:", error);
    return null;
  }
}

/**
 * Search for people (actors, directors, crew) by name.
 *
 * @param query - Search query string
 * @param page - Page number for pagination (default: 1)
 * @param includeAdult - Include adult content in results (default: true)
 * @returns Array of people matching the search or null on error
 */
export async function searchPeople(
  query: string,
  page: number = 1,
  includeAdult: boolean = true
): Promise<PersonSearchResult[] | null> {
  try {
    const response = await axios.get<PersonSearchResponse>(`${tmdbConfig.baseUrl}/search/person`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        query,
        page,
        include_adult: includeAdult,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching people:", error);
    return null;
  }
}

/**
 * Perform a multi-search across movies, TV shows, and people in a single request.
 * This is useful for global search functionality.
 *
 * @param query - Search query string
 * @param page - Page number for pagination (default: 1)
 * @param includeAdult - Include adult content in results (default: true)
 * @returns Multi-search response with combined results or null on error
 */
export async function multiSearch(
  query: string,
  page: number = 1,
  includeAdult: boolean = true
): Promise<MultiSearchResult[] | null> {
  try {
    const response = await axios.get<MultiSearchResponse>(`${tmdbConfig.baseUrl}/search/multi`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        query,
        page,
        include_adult: includeAdult,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error performing multi-search:", error);
    return null;
  }
}

/**
 * Search Service
 *
 * Handles all search-related API calls to The Movie Database (TMDB).
 * Includes endpoints for searching movies, TV shows, people, and multi-search.
 */

import axios from "axios";
import type {
  Movie,
  TvShow,
  MovieSearchResponse,
  TvSearchResponse,
  PersonSearchResult,
  PersonSearchResponse,
  MultiSearchResult,
  MultiSearchResponse,
} from "@/types";

// Re-export types for backward compatibility
export type {
  MovieSearchResponse,
  TvSearchResponse,
  PersonSearchResult,
  PersonSearchResponse,
  MultiSearchResult,
  MultiSearchResponse,
};

// TMDB API Key - used directly in all endpoints
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

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
    const response = await axios.get<MovieSearchResponse>(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
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
    const response = await axios.get<TvSearchResponse>(`${TMDB_BASE_URL}/search/tv`, {
      params: {
        api_key: TMDB_API_KEY,
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
    const response = await axios.get<PersonSearchResponse>(`${TMDB_BASE_URL}/search/person`, {
      params: {
        api_key: TMDB_API_KEY,
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
    const response = await axios.get<MultiSearchResponse>(`${TMDB_BASE_URL}/search/multi`, {
      params: {
        api_key: TMDB_API_KEY,
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

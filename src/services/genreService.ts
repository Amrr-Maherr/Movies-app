/**
 * Genre Service
 *
 * Handles all genre-related API calls to The Movie Database (TMDB).
 * Includes endpoints for genre lists and discovering content by genre.
 */

import axios from "axios";
import { tmdbConfig } from "@/config/api";
import type { Movie, TvShow } from "@/types";

// ============= Types =============

export interface Genre {
  id: number;
  name: string;
}

export interface GenresResponse {
  genres: Genre[];
}

export interface DiscoverMoviesParams {
  page?: number;
  withGenres?: string;
  withoutGenres?: string;
  sortBy?: string;
  voteAverageGte?: number;
  primaryReleaseYear?: number;
  includeAdult?: boolean;
}

export interface DiscoverTvParams {
  page?: number;
  withGenres?: string;
  withoutGenres?: string;
  sortBy?: string;
  voteAverageGte?: number;
  firstAirDateYear?: number;
  includeAdult?: boolean;
}

export interface DiscoverResponse {
  page: number;
  results: Movie[] | TvShow[];
  total_pages: number;
  total_results: number;
}

// ============= Genre List Endpoints =============

/**
 * Fetch all official movie genres from TMDB API.
 *
 * @param language - Language code (default: "en-US")
 * @returns Array of genres or null on error
 *
 * @example
 * getMovieGenres() // Returns [{ id: 28, name: "Action" }, ...]
 */
export async function getMovieGenres(language: string = "en-US"): Promise<Genre[] | null> {
  try {
    const response = await axios.get<GenresResponse>(`${tmdbConfig.baseUrl}/genre/movie/list`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language,
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching movie genres:", error);
    return null;
  }
}

/**
 * Fetch all official TV show genres from TMDB API.
 *
 * @param language - Language code (default: "en-US")
 * @returns Array of genres or null on error
 *
 * @example
 * getTvGenres() // Returns [{ id: 10759, name: "Action & Adventure" }, ...]
 */
export async function getTvGenres(language: string = "en-US"): Promise<Genre[] | null> {
  try {
    const response = await axios.get<GenresResponse>(`${tmdbConfig.baseUrl}/genre/tv/list`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language,
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching TV genres:", error);
    return null;
  }
}

// ============= Discover by Genre Endpoints =============

/**
 * Discover movies by genre with optional filters.
 *
 * @param genreId - Genre ID to filter by
 * @param params - Additional filter parameters
 * @returns Array of movies or null on error
 *
 * @example
 * discoverMoviesByGenre(28) // Action movies
 * discoverMoviesByGenre(28, { sortBy: "vote_average.desc", voteAverageGte: 7 }) // Top rated Action
 */
export async function discoverMoviesByGenre(
  genreId: number,
  params: DiscoverMoviesParams = {}
): Promise<DiscoverResponse | null> {
  try {
    const response = await axios.get<DiscoverResponse>(`${tmdbConfig.baseUrl}/discover/movie`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        page: params.page ?? 1,
        sort_by: params.sortBy ?? "popularity.desc",
        with_genres: genreId,
        include_adult: params.includeAdult ?? false,
        ...(params.withoutGenres && { without_genres: params.withoutGenres }),
        ...(params.voteAverageGte && { "vote_average.gte": params.voteAverageGte }),
        ...(params.primaryReleaseYear && { primary_release_year: params.primaryReleaseYear }),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error discovering movies by genre:", error);
    return null;
  }
}

/**
 * Discover TV shows by genre with optional filters.
 *
 * @param genreId - Genre ID to filter by
 * @param params - Additional filter parameters
 * @returns Array of TV shows or null on error
 *
 * @example
 * discoverTvShowsByGenre(10759) // Action & Adventure TV shows
 * discoverTvShowsByGenre(10759, { sortBy: "vote_average.desc" }) // Top rated Action & Adventure
 */
export async function discoverTvShowsByGenre(
  genreId: number,
  params: DiscoverTvParams = {}
): Promise<DiscoverResponse | null> {
  try {
    const response = await axios.get<DiscoverResponse>(`${tmdbConfig.baseUrl}/discover/tv`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        page: params.page ?? 1,
        sort_by: params.sortBy ?? "popularity.desc",
        with_genres: genreId,
        include_adult: params.includeAdult ?? false,
        ...(params.withoutGenres && { without_genres: params.withoutGenres }),
        ...(params.voteAverageGte && { "vote_average.gte": params.voteAverageGte }),
        ...(params.firstAirDateYear && { first_air_date_year: params.firstAirDateYear }),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error discovering TV shows by genre:", error);
    return null;
  }
}

/**
 * Discover Service
 * 
 * Handles all discover and advanced filter API calls to The Movie Database (TMDB).
 * Includes endpoints for discovering movies and TV shows with various filters
 * such as genre, language, rating, release date, and streaming providers.
 */

import axios from "axios";
import { tmdbConfig } from "@/config/api";
import type { Movie, PopularMoviesResponse, TvShow, PopularTvShowsResponse } from "@/types";

// ============= Response Types =============

export interface DiscoverMoviesParams {
  page?: number;
  sortBy?: string;
  certification?: string;
  certificationGte?: string;
  certificationLte?: string;
  includeAdult?: boolean;
  includeVideo?: boolean;
  primaryReleaseDateGte?: string;
  primaryReleaseDateLte?: string;
  primaryReleaseYear?: number;
  releaseDateGte?: string;
  releaseDateLte?: string;
  voteAverageGte?: number;
  voteAverageLte?: number;
  voteCountGte?: number;
  voteCountLte?: number;
  withGenres?: string;
  withoutGenres?: string;
  withOriginalLanguage?: string;
  withReleaseType?: number;
  withRuntimeGte?: number;
  withRuntimeLte?: number;
  withWatchProviders?: string;
  watchRegion?: string;
  withCast?: string;
  withCrew?: string;
  withCompanies?: string;
  withKeywords?: string;
  withoutKeywords?: string;
  year?: number;
  region?: string;
}

export interface DiscoverTvParams {
  page?: number;
  sortBy?: string;
  airDateGte?: string;
  airDateLte?: string;
  firstAirDateGte?: string;
  firstAirDateLte?: string;
  firstAirDateYear?: number;
  includeAdult?: boolean;
  includeNullFirstAirDates?: boolean;
  voteAverageGte?: number;
  voteAverageLte?: number;
  voteCountGte?: number;
  voteCountLte?: number;
  withGenres?: string;
  withoutGenres?: string;
  withOriginalLanguage?: string;
  withRuntimeGte?: number;
  withRuntimeLte?: number;
  withStatus?: number;
  withType?: number;
  withWatchProviders?: string;
  watchRegion?: string;
  withCast?: string;
  withCrew?: string;
  withCompanies?: string;
  withKeywords?: string;
  withoutKeywords?: string;
  timezone?: string;
  screenedTheatrically?: boolean;
}

// ============= Discover Movies Endpoints =============

/**
 * Discover movies with advanced filtering options.
 * Allows filtering by genre, language, rating, release date, streaming providers, and more.
 * 
 * @param params - Filter parameters object
 * @returns Array of movies matching the filters or null on error
 * 
 * @example
 * // Find popular family movies for kids
 * discoverMovies({ withGenres: "10751", sortBy: "popularity.desc" })
 * 
 * // Find highly rated action movies from 2024
 * discoverMovies({ withGenres: "28", voteAverageGte: 7, primaryReleaseYear: 2024 })
 */
export async function discoverMovies(params: DiscoverMoviesParams = {}): Promise<Movie[] | null> {
  try {
    const response = await axios.get<PopularMoviesResponse>(`${tmdbConfig.baseUrl}/discover/movie`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        page: params.page ?? 1,
        sort_by: params.sortBy ?? "popularity.desc",
        include_adult: params.includeAdult ?? true,
        include_video: params.includeVideo ?? false,
        ...(params.certification && { certification: params.certification }),
        ...(params.certificationGte && { "certification.gte": params.certificationGte }),
        ...(params.certificationLte && { "certification.lte": params.certificationLte }),
        ...(params.primaryReleaseDateGte && { "primary_release_date.gte": params.primaryReleaseDateGte }),
        ...(params.primaryReleaseDateLte && { "primary_release_date.lte": params.primaryReleaseDateLte }),
        ...(params.primaryReleaseYear && { primary_release_year: params.primaryReleaseYear }),
        ...(params.releaseDateGte && { "release_date.gte": params.releaseDateGte }),
        ...(params.releaseDateLte && { "release_date.lte": params.releaseDateLte }),
        ...(params.voteAverageGte && { "vote_average.gte": params.voteAverageGte }),
        ...(params.voteAverageLte && { "vote_average.lte": params.voteAverageLte }),
        ...(params.voteCountGte && { "vote_count.gte": params.voteCountGte }),
        ...(params.voteCountLte && { "vote_count.lte": params.voteCountLte }),
        ...(params.withGenres && { with_genres: params.withGenres }),
        ...(params.withoutGenres && { without_genres: params.withoutGenres }),
        ...(params.withOriginalLanguage && { with_original_language: params.withOriginalLanguage }),
        ...(params.withReleaseType && { with_release_type: params.withReleaseType }),
        ...(params.withRuntimeGte && { "with_runtime.gte": params.withRuntimeGte }),
        ...(params.withRuntimeLte && { "with_runtime.lte": params.withRuntimeLte }),
        ...(params.withWatchProviders && { with_watch_providers: params.withWatchProviders }),
        ...(params.watchRegion && { watch_region: params.watchRegion }),
        ...(params.withCast && { with_cast: params.withCast }),
        ...(params.withCrew && { with_crew: params.withCrew }),
        ...(params.withCompanies && { with_companies: params.withCompanies }),
        ...(params.withKeywords && { with_keywords: params.withKeywords }),
        ...(params.withoutKeywords && { without_keywords: params.withoutKeywords }),
        ...(params.year && { year: params.year }),
        ...(params.region && { region: params.region }),
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error discovering movies:", error);
    return null;
  }
}

/**
 * Fetch kids/family movies using the discover endpoint.
 * This is a convenience method that filters by the Family genre (ID: 10751).
 * 
 * @param page - Page number for pagination (default: 1)
 * @returns Array of family/kids movies or null on error
 */
export async function getKidsMovies(page: number = 1): Promise<Movie[] | null> {
  return discoverMovies({
    page,
    withGenres: "10751", // Family genre ID
    sortBy: "popularity.desc",
    includeAdult: true,
  });
}

/**
 * Fetch movies filtered by original language.
 * This is useful for finding foreign language films.
 * 
 * @param languageCode - ISO 639-1 language code (e.g., "es" for Spanish, "fr" for French)
 * @param page - Page number for pagination (default: 1)
 * @returns Array of movies in the specified language or null on error
 */
export async function getMediaByLanguage(languageCode: string, page: number = 1): Promise<Movie[] | null> {
  try {
    const response = await discoverMovies({
      page,
      withOriginalLanguage: languageCode,
      sortBy: "popularity.desc",
      includeAdult: true,
    });
    return response;
  } catch (error) {
    console.error(`Error fetching media for language ${languageCode}:`, error);
    return null;
  }
}

// ============= Discover TV Shows Endpoints =============

/**
 * Discover TV shows with advanced filtering options.
 * Allows filtering by genre, language, rating, air date, streaming providers, and more.
 * 
 * @param params - Filter parameters object
 * @returns Array of TV shows matching the filters or null on error
 * 
 * @example
 * // Find popular comedy TV shows
 * discoverTvShows({ withGenres: "35", sortBy: "popularity.desc" })
 * 
 * // Find highly rated drama series from 2024
 * discoverTvShows({ withGenres: "18", voteAverageGte: 7, firstAirDateYear: 2024 })
 */
export async function discoverTvShows(params: DiscoverTvParams = {}): Promise<TvShow[] | null> {
  try {
    const response = await axios.get<PopularTvShowsResponse>(`${tmdbConfig.baseUrl}/discover/tv`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        page: params.page ?? 1,
        sort_by: params.sortBy ?? "popularity.desc",
        include_adult: params.includeAdult ?? true,
        include_null_first_air_dates: params.includeNullFirstAirDates ?? false,
        screened_theatrically: params.screenedTheatrically ?? false,
        ...(params.airDateGte && { "air_date.gte": params.airDateGte }),
        ...(params.airDateLte && { "air_date.lte": params.airDateLte }),
        ...(params.firstAirDateGte && { "first_air_date.gte": params.firstAirDateGte }),
        ...(params.firstAirDateLte && { "first_air_date.lte": params.firstAirDateLte }),
        ...(params.firstAirDateYear && { first_air_date_year: params.firstAirDateYear }),
        ...(params.voteAverageGte && { "vote_average.gte": params.voteAverageGte }),
        ...(params.voteAverageLte && { "vote_average.lte": params.voteAverageLte }),
        ...(params.voteCountGte && { "vote_count.gte": params.voteCountGte }),
        ...(params.voteCountLte && { "vote_count.lte": params.voteCountLte }),
        ...(params.withGenres && { with_genres: params.withGenres }),
        ...(params.withoutGenres && { without_genres: params.withoutGenres }),
        ...(params.withOriginalLanguage && { with_original_language: params.withOriginalLanguage }),
        ...(params.withRuntimeGte && { "with_runtime.gte": params.withRuntimeGte }),
        ...(params.withRuntimeLte && { "with_runtime.lte": params.withRuntimeLte }),
        ...(params.withStatus && { with_status: params.withStatus }),
        ...(params.withType && { with_type: params.withType }),
        ...(params.withWatchProviders && { with_watch_providers: params.withWatchProviders }),
        ...(params.watchRegion && { watch_region: params.watchRegion }),
        ...(params.withCast && { with_cast: params.withCast }),
        ...(params.withCrew && { with_crew: params.withCrew }),
        ...(params.withCompanies && { with_companies: params.withCompanies }),
        ...(params.withKeywords && { with_keywords: params.withKeywords }),
        ...(params.withoutKeywords && { without_keywords: params.withoutKeywords }),
        ...(params.timezone && { timezone: params.timezone }),
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error discovering TV shows:", error);
    return null;
  }
}

// ============= Genre Endpoints =============

export interface Genre {
  id: number;
  name: string;
}

export interface GenresResponse {
  genres: Genre[];
}

/**
 * Fetch all official movie genres from TMDB API.
 * 
 * @param language - Language code (default: "en-US")
 * @returns Array of genres or null on error
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

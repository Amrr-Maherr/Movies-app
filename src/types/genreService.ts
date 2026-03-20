/**
 * Genre Service Types
 *
 * Types for genre-related API responses from TMDB.
 */

import type { Movie, TvShow } from "./movies";

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

/**
 * Search Service Types
 *
 * Types for search-related API responses from TMDB.
 */

import type { Movie, TvShow } from "./movies";

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

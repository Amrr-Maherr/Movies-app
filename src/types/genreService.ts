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
  voteAverageLte?: number;
  voteCountGte?: number;
  voteCountLte?: number;
  primaryReleaseYear?: number;
  includeAdult?: boolean;
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
  certification?: string;
  certificationGte?: string;
  certificationLte?: string;
  includeVideo?: boolean;
  primaryReleaseDateGte?: string;
  primaryReleaseDateLte?: string;
  releaseDateGte?: string;
  releaseDateLte?: string;
}

export interface DiscoverTvParams {
  page?: number;
  withGenres?: string;
  withoutGenres?: string;
  sortBy?: string;
  voteAverageGte?: number;
  voteAverageLte?: number;
  voteCountGte?: number;
  voteCountLte?: number;
  firstAirDateYear?: number;
  includeAdult?: boolean;
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
  includeNullFirstAirDates?: boolean;
  screenedTheatrically?: boolean;
  airDateGte?: string;
  airDateLte?: string;
  firstAirDateGte?: string;
  firstAirDateLte?: string;
}

export interface DiscoverResponse {
  page: number;
  results: Movie[] | TvShow[];
  total_pages: number;
  total_results: number;
}

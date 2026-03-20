/**
 * Discover Service Types
 *
 * Types for discover-related API responses from TMDB.
 */

import type { Movie, TvShow } from "./movies";

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

export interface PlatformContentResponse {
  id: number;
  page: number;
  results: (Movie | TvShow)[];
  total_pages: number;
  total_results: number;
}

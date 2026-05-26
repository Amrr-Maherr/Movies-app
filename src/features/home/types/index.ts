/**
 * Trending Service Types
 *
 * Types for trending-related API responses from TMDB.
 */

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

export interface StreamingPlatform {
  id: number;
  name: string;
  logo_path: string;
  display_priority: number;
}

export interface StreamingPlatformsResponse {
  results: StreamingPlatform[];
}

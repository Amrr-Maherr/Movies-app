/**
 * Streaming Platform Service Types
 *
 * Types for streaming platform-related API responses from TMDB.
 */

import type { Movie, TvShow } from "./movies";

export interface StreamingPlatform {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
  display_priority?: number;
}

export interface PlatformContentResponse {
  id: number;
  page: number;
  results: (Movie | TvShow)[];
  total_pages: number;
  total_results: number;
}

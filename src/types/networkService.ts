/**
 * Network Service Types
 *
 * Types for TV network-related API responses from TMDB.
 */

import type { TvShow } from "./movies";

export interface Network {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
  headquarters?: string;
  homepage?: string;
  description?: string;
  parent_organization?: {
    id: number;
    logo_path: string | null;
    name: string;
  } | null;
}

export interface NetworkTVSeriesResponse {
  id: number;
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
}

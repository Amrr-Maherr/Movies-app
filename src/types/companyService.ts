/**
 * Company Service Types
 *
 * Types for company-related API responses from TMDB.
 */

import type { Movie } from "./movies";

export interface Company {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
  headquarters?: string;
  homepage?: string;
  description?: string;
  parent_company?: {
    id: number;
    logo_path: string | null;
    name: string;
  } | null;
}

export interface CompanyMoviesResponse {
  id: number;
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

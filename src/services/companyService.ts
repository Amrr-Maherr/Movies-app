/**
 * Company Service
 *
 * Handles all company-related API calls to The Movie Database (TMDB).
 * Includes endpoints for company details and movies by company.
 */

import axios from "axios";
import { tmdbConfig } from "@/config/api";

// ============= Types =============

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

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
  original_language: string;
  popularity: number;
  video: boolean;
  adult: boolean;
  original_title: string;
  vote_count: number;
}

// ============= Company Details Endpoint =============

/**
 * Fetch detailed information about a specific production company.
 *
 * @param companyId - Company ID
 * @returns Company details or null on error
 *
 * @example
 * getCompanyDetails(420) // Marvel Studios
 */
export async function getCompanyDetails(companyId: number): Promise<Company | null> {
  try {
    const response = await axios.get<Company>(`${tmdbConfig.baseUrl}/company/${companyId}`, {
      params: {
        api_key: tmdbConfig.apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching company details:", error);
    return null;
  }
}

// ============= Company Movies Endpoint =============

/**
 * Fetch movies produced by a specific company.
 *
 * @param companyId - Company ID
 * @param page - Page number for pagination (default: 1)
 * @returns Company movies response or null on error
 *
 * @example
 * getCompanyMovies(420, 1) // Marvel Studios movies
 */
export async function getCompanyMovies(
  companyId: number,
  page: number = 1
): Promise<CompanyMoviesResponse | null> {
  try {
    const response = await axios.get<CompanyMoviesResponse>(
      `${tmdbConfig.baseUrl}/company/${companyId}/movies`,
      {
        params: {
          api_key: tmdbConfig.apiKey,
          language: "en-US",
          page,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching company movies:", error);
    return null;
  }
}

/**
 * Company Service
 *
 * Handles all company-related API calls to The Movie Database (TMDB).
 * Includes endpoints for company details and movies by company.
 */

import axios from "axios";
import type { Company, CompanyMoviesResponse, Movie } from "@/types";

// Re-export types for backward compatibility
export type { Company, CompanyMoviesResponse };

// TMDB API Key - used directly in all endpoints
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

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
    const response = await axios.get<Company>(`${TMDB_BASE_URL}/company/${companyId}`, {
      params: {
        api_key: TMDB_API_KEY,
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
      `${TMDB_BASE_URL}/company/${companyId}/movies`,
      {
        params: {
          api_key: TMDB_API_KEY,
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

/**
 * Person Service
 * 
 * Handles all person-related API calls to The Movie Database (TMDB).
 * Includes endpoints for person details, movie credits, TV credits, images, and external IDs.
 */

import axios from "axios";`nimport { tmdbConfig } from "@/config/api";
import type { ImageFile } from "./moviesService";

// ============= Response Types =============

export interface PersonDetails {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
  adult: boolean;
  also_known_as: string[];
  gender: number;
  imdb_id: string | null;
  homepage: string | null;
}

export interface PersonExternalIds {
  id: number;
  imdb_id: string | null;
  freebase_mid: string | null;
  freebase_id: string | null;
  tvdb_id: number | null;
  tvrage_id: number | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
  wikidata_id: string | null;
}

export interface CastCredit {
  id: number;
  original_language: string;
  episode_count: number;
  overview: string;
  origin_country: string[];
  original_name: string;
  vote_count: number;
  name: string;
  media_type: "movie" | "tv";
  popularity: number;
  credit_id: string;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
  poster_path: string | null;
  character: string;
  adult: boolean;
  order?: number;
  release_date?: string;
  title?: string;
  original_title?: string;
  video?: boolean;
}

export interface CrewCredit {
  id: number;
  original_language: string;
  episode_count: number;
  overview: string;
  origin_country: string[];
  original_name: string;
  vote_count: number;
  name: string;
  media_type: "movie" | "tv";
  popularity: number;
  credit_id: string;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
  poster_path: string | null;
  adult: boolean;
  department: string;
  job: string;
  release_date?: string;
  title?: string;
  original_title?: string;
  video?: boolean;
}

export interface PersonMovieCreditsResponse {
  id: number;
  cast: CastCredit[];
  crew: CrewCredit[];
}

export interface PersonTVCreditsResponse {
  id: number;
  cast: CastCredit[];
  crew: CrewCredit[];
}

export interface CombinedCredits {
  cast: CastCredit[];
  crew: CrewCredit[];
  id: number;
}

export interface PersonImagesResponse {
  id: number;
  profiles: ImageFile[];
}

export interface PopularPeopleResponse {
  page: number;
  results: PersonDetails[];
  total_pages: number;
  total_results: number;
}

// ============= Person Details Endpoints =============

/**
 * Fetch detailed information about a specific person (actor, director, crew).
 * 
 * @param id - Person ID
 * @returns Person details object or null on error
 */
export async function getPersonDetails(id: number): Promise<PersonDetails | null> {
  try {
    const response = await axios.get<PersonDetails>(`${tmdbConfig.baseUrl}/person/${id}`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching person details:", error);
    return null;
  }
}

/**
 * Fetch external IDs (IMDB, social media) for a specific person.
 * 
 * @param id - Person ID
 * @returns External IDs object or null on error
 */
export async function getPersonExternalIds(id: number): Promise<PersonExternalIds | null> {
  try {
    const response = await axios.get<PersonExternalIds>(`${tmdbConfig.baseUrl}/person/${id}/external_ids`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching person external IDs:", error);
    return null;
  }
}

// ============= Person Credits Endpoints =============

/**
 * Fetch all movie credits for a specific person.
 * Includes both cast and crew roles.
 * 
 * @param id - Person ID
 * @returns Movie credits response or null on error
 */
export async function getPersonMovieCredits(id: number): Promise<PersonMovieCreditsResponse | null> {
  try {
    const response = await axios.get<PersonMovieCreditsResponse>(`${tmdbConfig.baseUrl}/person/${id}/movie_credits`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching person movie credits:", error);
    return null;
  }
}

/**
 * Fetch all TV credits for a specific person.
 * Includes both cast and crew roles.
 * 
 * @param id - Person ID
 * @returns TV credits response or null on error
 */
export async function getPersonTVCredits(id: number): Promise<PersonTVCreditsResponse | null> {
  try {
    const response = await axios.get<PersonTVCreditsResponse>(`${tmdbConfig.baseUrl}/person/${id}/tv_credits`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching person TV credits:", error);
    return null;
  }
}

/**
 * Fetch combined credits (movies + TV shows) for a specific person.
 * This is useful for displaying a person's complete filmography.
 * 
 * @param id - Person ID
 * @returns Combined credits object or null on error
 */
export async function getPersonCombinedCredits(id: number): Promise<CombinedCredits | null> {
  try {
    const response = await axios.get<CombinedCredits>(`${tmdbConfig.baseUrl}/person/${id}/combined_credits`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching person combined credits:", error);
    return null;
  }
}

// ============= Person Images Endpoints =============

/**
 * Fetch profile images for a specific person.
 * 
 * @param id - Person ID
 * @returns Person images response with profiles array or null on error
 */
export async function getPersonImages(id: number): Promise<PersonImagesResponse | null> {
  try {
    const response = await axios.get<PersonImagesResponse>(`${tmdbConfig.baseUrl}/person/${id}/images`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching person images:", error);
    return null;
  }
}

// ============= Popular People Endpoints =============

/**
 * Fetch popular people (actors, directors) from TMDB API.
 * 
 * @param page - Page number for pagination (default: 1)
 * @returns Popular people response or null on error
 */
export async function getPopularPeople(page: number = 1): Promise<PopularPeopleResponse | null> {
  try {
    const response = await axios.get<PopularPeopleResponse>(`${tmdbConfig.baseUrl}/person/popular`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popular people:", error);
    return null;
  }
}

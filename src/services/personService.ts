/**
 * Person Service
 *
 * Handles all person-related API calls to The Movie Database (TMDB).
 * Includes endpoints for person details, movie credits, TV credits, images, and external IDs.
 */

import axios from "axios";
import type {
  ImageFile,
  PersonDetails,
  PersonExternalIds,
  CastCredit,
  CrewCredit,
  PersonMovieCreditsResponse,
  PersonTVCreditsResponse,
  CombinedCredits,
  PersonImagesResponse,
  PopularPeopleResponse,
} from "@/types";

// TMDB API Key - used directly in all endpoints
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// ============= Person Details Endpoints =============

/**
 * Fetch detailed information about a specific person (actor, director, crew).
 * 
 * @param id - Person ID
 * @returns Person details object or null on error
 */
export async function getPersonDetails(id: number): Promise<PersonDetails | null> {
  try {
    const response = await axios.get<PersonDetails>(`${TMDB_BASE_URL}/person/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
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
    const response = await axios.get<PersonExternalIds>(`${TMDB_BASE_URL}/person/${id}/external_ids`, {
      params: {
        api_key: TMDB_API_KEY,
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
    const response = await axios.get<PersonMovieCreditsResponse>(`${TMDB_BASE_URL}/person/${id}/movie_credits`, {
      params: {
        api_key: TMDB_API_KEY,
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
    const response = await axios.get<PersonTVCreditsResponse>(`${TMDB_BASE_URL}/person/${id}/tv_credits`, {
      params: {
        api_key: TMDB_API_KEY,
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
    const response = await axios.get<CombinedCredits>(`${TMDB_BASE_URL}/person/${id}/combined_credits`, {
      params: {
        api_key: TMDB_API_KEY,
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
    const response = await axios.get<PersonImagesResponse>(`${TMDB_BASE_URL}/person/${id}/images`, {
      params: {
        api_key: TMDB_API_KEY,
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
    const response = await axios.get<PopularPeopleResponse>(`${TMDB_BASE_URL}/person/popular`, {
      params: {
        api_key: TMDB_API_KEY,
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

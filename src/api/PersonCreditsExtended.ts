import axios from "axios";
import type { CastCredit, CrewCredit } from "./PersonCredits";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

export interface PersonMovieCreditsResponse {
  id: number;
  cast: CastCredit[];
  crew: CrewCredit[];
}

/**
 * Fetch person's movie credits from TMDB API
 * @param id - Person ID
 * @returns Movie credits including cast and crew roles
 */
export const GetPersonMovieCredits = async (id: number): Promise<PersonMovieCreditsResponse | null> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/person/${id}/movie_credits`, {
      params: {
        api_key: apiKey,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching person movie credits:", error);
    return null;
  }
};

export interface PersonTVCreditsResponse {
  id: number;
  cast: CastCredit[];
  crew: CrewCredit[];
}

/**
 * Fetch person's TV credits from TMDB API
 * @param id - Person ID
 * @returns TV credits including cast and crew roles
 */
export const GetPersonTVCredits = async (id: number): Promise<PersonTVCreditsResponse | null> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/person/${id}/tv_credits`, {
      params: {
        api_key: apiKey,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching person TV credits:", error);
    return null;
  }
};

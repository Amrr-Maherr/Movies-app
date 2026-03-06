import axios from "axios";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

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

/**
 * Fetch person details from TMDB API
 * @param id - Person ID
 * @returns Person details
 */
export const GetPersonDetails = async (id: number): Promise<PersonDetails | null> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/person/${id}`, {
      params: {
        api_key: apiKey,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching person details:", error);
    return null;
  }
};

/**
 * Fetch person external IDs from TMDB API
 * @param id - Person ID
 * @returns External IDs including social media links
 */
export const GetPersonExternalIds = async (id: number): Promise<PersonExternalIds | null> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/person/${id}/external_ids`, {
      params: {
        api_key: apiKey,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching person external IDs:", error);
    return null;
  }
};

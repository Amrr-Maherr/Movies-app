import axios from "axios";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

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

export interface CombinedCredits {
  cast: CastCredit[];
  crew: CrewCredit[];
  id: number;
}

/**
 * Fetch person combined credits (movies + TV shows) from TMDB API
 * @param id - Person ID
 * @returns Combined credits including cast and crew
 */
export const GetPersonCombinedCredits = async (id: number): Promise<CombinedCredits | null> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/person/${id}/combined_credits`, {
      params: {
        api_key: apiKey,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching person combined credits:", error);
    return null;
  }
};

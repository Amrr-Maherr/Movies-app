import axios from "axios";
import type { HeroMedia } from "@/types";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

export interface MovieSimilarResponse {
  page: number;
  results: HeroMedia[];
  total_pages: number;
  total_results: number;
}

/**
 * Fetch similar movies from TMDB API
 * @param id - Movie ID
 * @param page - Page number (default: 1)
 * @returns Similar movies
 */
export const GetMovieSimilar = async (id: number, page: number = 1): Promise<MovieSimilarResponse | null> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/movie/${id}/similar`, {
      params: {
        api_key: apiKey,
        language: "en-US",
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    return null;
  }
};

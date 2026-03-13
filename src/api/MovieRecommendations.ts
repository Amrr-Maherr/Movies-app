import axios from "axios";
import type { HeroMedia } from "@/types";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

export interface MovieRecommendationsResponse {
  page: number;
  results: HeroMedia[];
  total_pages: number;
  total_results: number;
}

/**
 * Fetch movie recommendations from TMDB API
 * @param id - Movie ID
 * @param page - Page number (default: 1)
 * @returns Recommended movies
 */
export const GetMovieRecommendations = async (id: number, page: number = 1): Promise<MovieRecommendationsResponse | null> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/movie/${id}/recommendations`, {
      params: {
        api_key: apiKey,
        language: "en-US",
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie recommendations:", error);
    return null;
  }
};

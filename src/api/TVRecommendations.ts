import axios from "axios";
import type { HeroMedia } from "@/types";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

export interface TVRecommendationsResponse {
  page: number;
  results: HeroMedia[];
  total_pages: number;
  total_results: number;
}

/**
 * Fetch TV show recommendations from TMDB API
 * @param id - TV Show ID
 * @param page - Page number (default: 1)
 * @returns Recommended TV shows
 */
export const GetTVRecommendations = async (id: number, page: number = 1): Promise<TVRecommendationsResponse | null> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/tv/${id}/recommendations`, {
      params: {
        api_key: apiKey,
        language: "en-US",
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching TV show recommendations:", error);
    return null;
  }
};

import axios from "axios";
import type { HeroMedia } from "@/types";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

export interface TVSimilarResponse {
  page: number;
  results: HeroMedia[];
  total_pages: number;
  total_results: number;
}

/**
 * Fetch similar TV shows from TMDB API
 * @param id - TV Show ID
 * @param page - Page number (default: 1)
 * @returns Similar TV shows
 */
export const GetTVSimilar = async (id: number, page: number = 1): Promise<TVSimilarResponse | null> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/tv/${id}/similar`, {
      params: {
        api_key: apiKey,
        language: "en-US",
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching similar TV shows:", error);
    return null;
  }
};

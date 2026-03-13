import axios from "axios";
import type { Video } from "@/types";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

export interface TVVideosResponse {
  id: number;
  results: Video[];
}

/**
 * Fetch TV show videos (trailers, teasers, clips) from TMDB API
 * @param id - TV Show ID
 * @param page - Page number (default: 1)
 * @returns Videos response
 */
export const GetTVVideos = async (id: number, page: number = 1): Promise<TVVideosResponse | null> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/tv/${id}/videos`, {
      params: {
        api_key: apiKey,
        language: "en-US",
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching TV show videos:", error);
    return null;
  }
};

import axios from "axios";
import type { Video } from "@/types";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

export interface MovieVideosResponse {
  id: number;
  results: Video[];
}

/**
 * Fetch movie videos (trailers, teasers, clips) from TMDB API
 * @param id - Movie ID
 * @param page - Page number (default: 1)
 * @returns Videos response
 */
export const GetMovieVideos = async (id: number, page: number = 1): Promise<MovieVideosResponse | null> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/movie/${id}/videos`, {
      params: {
        api_key: apiKey,
        language: "en-US",
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    return null;
  }
};

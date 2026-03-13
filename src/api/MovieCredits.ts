import axios from "axios";
import type { Credits } from "@/types";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

/**
 * Fetch movie credits (cast and crew) from TMDB API
 * @param id - Movie ID
 * @returns Credits including cast and crew
 */
export const GetMovieCredits = async (id: number): Promise<Credits | null> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/movie/${id}/credits`, {
      params: {
        api_key: apiKey,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    return null;
  }
};

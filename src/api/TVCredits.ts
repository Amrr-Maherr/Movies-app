import axios from "axios";
import type { Credits } from "@/types";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

/**
 * Fetch TV show credits (cast and crew) from TMDB API
 * @param id - TV Show ID
 * @returns Credits including cast and crew
 */
export const GetTVCredits = async (id: number): Promise<Credits | null> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/tv/${id}/credits`, {
      params: {
        api_key: apiKey,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching TV show credits:", error);
    return null;
  }
};

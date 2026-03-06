import axios from "axios";
import type { Season } from "@/types";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

/**
 * Fetch TV season details including episodes
 * @param tvShowId - The TV show ID
 * @param seasonNumber - The season number to fetch
 * @returns Season details with episodes array
 */
export const GetTvSeasonDetails = async (
  tvShowId: number,
  seasonNumber: number
): Promise<Season | null> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/tv/${tvShowId}/season/${seasonNumber}`,
      {
        params: {
          api_key: apiKey,
          language: "en-US",
          append_to_response: "videos,images,external_ids,credits",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching TV season details:", error);
    return null;
  }
};

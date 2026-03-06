import axios from "axios";
import type { Episode } from "@/types";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

export const GetSeasonEpisodes = async (
  tvShowId: number,
  seasonNumber: number
): Promise<Episode[] | null> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/tv/${tvShowId}/season/${seasonNumber}`,
      {
        params: {
          api_key: apiKey,
          language: "en-US",
        },
      }
    );
    return response.data.episodes || null;
  } catch (error) {
    console.error("Error fetching season episodes:", error);
    return null;
  }
};

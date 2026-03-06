import axios from "axios";
import type { Episode } from "@/types";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

export const GetEpisodeDetails = async (
  tvShowId: number,
  seasonNumber: number,
  episodeNumber: number
): Promise<Episode | null> => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/tv/${tvShowId}/season/${seasonNumber}/episode/${episodeNumber}`,
      {
        params: {
          api_key: apiKey,
          language: "en-US",
          append_to_response: "credits,videos,images,external_ids"
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching episode details:", error);
    return null;
  }
};

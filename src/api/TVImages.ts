import axios from "axios";
import type { ImageFile } from "./MovieImages";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

export interface TVImagesResponse {
  id: number;
  backdrops: ImageFile[];
  logos: ImageFile[];
  posters: ImageFile[];
}

/**
 * Fetch TV show images (posters, backdrops, logos) from TMDB API
 * @param id - TV Show ID
 * @returns Images response with backdrops, logos, and posters
 */
export const GetTVImages = async (id: number): Promise<TVImagesResponse | null> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/tv/${id}/images`, {
      params: {
        api_key: apiKey,
        language: "en-US",
        include_image_language: "en,null",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching TV show images:", error);
    return null;
  }
};

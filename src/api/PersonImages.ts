import axios from "axios";
import type { ImageFile } from "./MovieImages";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

export interface PersonImagesResponse {
  id: number;
  profiles: ImageFile[];
}

/**
 * Fetch person's profile images from TMDB API
 * @param id - Person ID
 * @returns Profile images
 */
export const GetPersonImages = async (id: number): Promise<PersonImagesResponse | null> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/person/${id}/images`, {
      params: {
        api_key: apiKey,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching person images:", error);
    return null;
  }
};

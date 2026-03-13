import axios from "axios";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

export interface ImageFile {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface MovieImagesResponse {
  id: number;
  backdrops: ImageFile[];
  logos: ImageFile[];
  posters: ImageFile[];
}

/**
 * Fetch movie images (posters, backdrops, logos) from TMDB API
 * @param id - Movie ID
 * @returns Images response with backdrops, logos, and posters
 */
export const GetMovieImages = async (id: number): Promise<MovieImagesResponse | null> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/movie/${id}/images`, {
      params: {
        api_key: apiKey,
        language: "en-US",
        include_image_language: "en,null",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie images:", error);
    return null;
  }
};

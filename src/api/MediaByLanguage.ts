import axios from "axios";
import type { PopularMoviesResponse } from "@/types";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiEndPoint = "/discover/movie";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

export const GetMediaByLanguage = async (languageCode: string, page: number = 1): Promise<PopularMoviesResponse | null> => {
  try {
    const response = await axios.get<PopularMoviesResponse>(`${apiBaseUrl}${apiEndPoint}`, {
      params: {
        api_key: apiKey,
        // Using with_original_language to filter properly on TMDB
        with_original_language: languageCode,
        page,
        include_adult: false,
        sort_by: "popularity.desc",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching media for language ${languageCode}:`, error);
    return null;
  }
};

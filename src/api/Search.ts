import axios from "axios";
import type { Movie, TvShow } from "@/types/movies";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

export interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface TvSearchResponse {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
}

/**
 * Search for movies by title/keywords
 */
export const SearchMovies = async (query: string, page: number = 1): Promise<Movie[] | null> => {
  try {
    const response = await axios.get<MovieSearchResponse>(`${apiBaseUrl}/search/movie`, {
      params: {
        api_key: apiKey,
        language: "en-US",
        query,
        page,
        include_adult: false,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return null;
  }
};

/**
 * Search for TV shows by title/keywords
 */
export const SearchTvShows = async (query: string, page: number = 1): Promise<TvShow[] | null> => {
  try {
    const response = await axios.get<TvSearchResponse>(`${apiBaseUrl}/search/tv`, {
      params: {
        api_key: apiKey,
        language: "en-US",
        query,
        page,
        include_adult: false,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching TV shows:", error);
    return null;
  }
};

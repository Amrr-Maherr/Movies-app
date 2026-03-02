import axios from "axios";
import type { Movie, PopularMoviesResponse } from "@/types";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiEndPoint = "/trending/movie/day";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

export const GetTrendingMoviesDay = async (page: number = 1): Promise<Movie[] | null> => {
  try {
    const response = await axios.get<PopularMoviesResponse>(`${apiBaseUrl}${apiEndPoint}`, {
      params: {
        api_key: apiKey,
        language: "en-US",
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies (day):", error);
    return null;
  }
};

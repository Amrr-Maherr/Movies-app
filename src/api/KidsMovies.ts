import axios from "axios";
import type { Movie, PopularMoviesResponse } from "@/types";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiEndPoint = "/discover/movie";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

export const GetKidsMovies = async (page: number = 1): Promise<Movie[] | null> => {
  try {
    const response = await axios.get<PopularMoviesResponse>(`${apiBaseUrl}${apiEndPoint}`, {
      params: {
        api_key: apiKey,
        language: "en-US",
        page,
        include_adult: false,
        with_genres: "10751", // Family genre ID
        sort_by: "popularity.desc",
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching kids movies:", error);
    return null;
  }
};

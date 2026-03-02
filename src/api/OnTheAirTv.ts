import axios from "axios";
import type { TvShow, PopularTvShowsResponse } from "@/types";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiEndPoint = "/tv/on_the_air";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

export const GetOnTheAirTv = async (page: number = 1): Promise<TvShow[] | null> => {
  try {
    const response = await axios.get<PopularTvShowsResponse>(`${apiBaseUrl}${apiEndPoint}`, {
      params: {
        api_key: apiKey,
        language: "en-US",
        page,
        include_adult: false,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching on the air TV shows:", error);
    return null;
  }
};

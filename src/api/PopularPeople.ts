import axios from "axios";
import type { PopularPeopleResponse } from "@/types/person";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiEndPoint = "/person/popular";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

export const getPopularPeople = async (page: number = 1): Promise<PopularPeopleResponse> => {
  const response = await axios.get<PopularPeopleResponse>(`${apiBaseUrl}${apiEndPoint}`, {
    params: {
      api_key: apiKey,
      language: "en-US",
      page,
    },
  });
  return response.data;
};

export default getPopularPeople;

import axios from "axios";
import type { WatchProviderRegion } from "./MovieWatchProviders";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

export interface TVWatchProvidersResponse {
  id: number;
  results?: {
    US?: WatchProviderRegion;
    GB?: WatchProviderRegion;
    CA?: WatchProviderRegion;
    [key: string]: WatchProviderRegion | undefined;
  };
}

/**
 * Fetch TV show watch providers from TMDB API
 * @param id - TV Show ID
 * @param region - Region code (default: "US")
 * @returns Watch providers response by region
 */
export const GetTVWatchProviders = async (id: number, region: string = "US"): Promise<TVWatchProvidersResponse | null> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/tv/${id}/watch/providers`, {
      params: {
        api_key: apiKey,
        watch_region: region,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching TV show watch providers:", error);
    return null;
  }
};

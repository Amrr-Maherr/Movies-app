import axios from "axios";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

export interface ProviderInfo {
  provider_id: number;
  provider_name: string;
  logo_path: string | null;
  display_priority?: number;
}

export interface WatchProviderRegion {
  link?: string;
  flatrate?: ProviderInfo[];
  rent?: ProviderInfo[];
  buy?: ProviderInfo[];
  free?: ProviderInfo[];
}

export interface MovieWatchProvidersResponse {
  id: number;
  results?: {
    US?: WatchProviderRegion;
    GB?: WatchProviderRegion;
    CA?: WatchProviderRegion;
    [key: string]: WatchProviderRegion | undefined;
  };
}

/**
 * Fetch movie watch providers from TMDB API
 * @param id - Movie ID
 * @param region - Region code (default: "US")
 * @returns Watch providers response by region
 */
export const GetMovieWatchProviders = async (id: number, region: string = "US"): Promise<MovieWatchProvidersResponse | null> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/movie/${id}/watch/providers`, {
      params: {
        api_key: apiKey,
        watch_region: region,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie watch providers:", error);
    return null;
  }
};

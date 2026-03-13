import axios from "axios";
import type { StreamingPlatform } from "@/types";

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

/**
 * Fetch streaming platforms (watch providers) for US region
 * Returns a list of streaming services like Netflix, Disney+, HBO, etc.
 */
export const GetStreamingPlatforms = async (): Promise<StreamingPlatform[] | null> => {
  try {
    // Fetch watch providers for movies (US region)
    const providersResponse = await axios.get(`${apiBaseUrl}/watch/providers/movie`, {
      params: {
        api_key: apiKey,
        watch_region: "US",
      },
    });

    // Filter and map to StreamingPlatform type - only streaming services
    const platforms: StreamingPlatform[] = providersResponse.data.results
      .filter((provider: { display_priority?: number; logo_path: string | null }) =>
        provider.logo_path && (provider.display_priority ?? 999) < 50
      )
      .slice(0, 50) // Limit to top 12 platforms
      .map((provider: { provider_id: number; provider_name: string; logo_path: string; display_priority?: number }) => ({
        id: provider.provider_id,
        name: provider.provider_name,
        logo_path: provider.logo_path,
        display_priority: provider.display_priority ?? 999,
      }))
      .sort((a: StreamingPlatform, b: StreamingPlatform) =>
        a.display_priority - b.display_priority
      );

    return platforms;
  } catch (error) {
    console.error("Error fetching streaming platforms:", error);
    return null;
  }
};

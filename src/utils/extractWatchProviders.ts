import type { TvShowDetails, Provider } from "@/types";

/**
 * Extract watch providers from TV show watch/providers response.
 * Checks US region first, then collects all provider types.
 *
 * @param tvShow - TV show details with watch_providers
 * @returns Array of providers with id, name, logo_path, and provider_type
 *
 * @example
 * extractWatchProviders(tvShowDetails) // Returns array of providers
 */
export function extractWatchProviders(tvShow: TvShowDetails): Provider[] {
  const providers: Provider[] = [];

  // Check US region first, then fallback to any region
  const usProviders = tvShow.watch_providers?.US;

  if (usProviders) {
    if (usProviders.flatrate) {
      usProviders.flatrate.forEach((p: { provider_id: number; logo_path: string; provider_name: string }) => {
        providers.push({ id: p.provider_id, name: p.provider_name, logo_path: p.logo_path, provider_type: "Subscription" });
      });
    }
    if (usProviders.rent) {
      usProviders.rent.forEach((p: { provider_id: number; logo_path: string; provider_name: string }) => {
        providers.push({ id: p.provider_id, name: p.provider_name, logo_path: p.logo_path, provider_type: "Rent" });
      });
    }
    if (usProviders.buy) {
      usProviders.buy.forEach((p: { provider_id: number; logo_path: string; provider_name: string }) => {
        providers.push({ id: p.provider_id, name: p.provider_name, logo_path: p.logo_path, provider_type: "Buy" });
      });
    }
    if (usProviders.free) {
      usProviders.free.forEach((p: { provider_id: number; logo_path: string; provider_name: string }) => {
        providers.push({ id: p.provider_id, name: p.provider_name, logo_path: p.logo_path, provider_type: "Free" });
      });
    }
  }

  return providers;
}

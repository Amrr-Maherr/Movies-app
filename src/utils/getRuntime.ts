import type { MediaDetails } from "@/types";

/**
 * Gets runtime from media object (supports both movies and TV shows).
 * For TV shows, tries to get runtime from last_episode_to_air if runtime is not available.
 *
 * @param media - MediaDetails object
 * @returns Runtime in minutes, or null if not available
 *
 * @example
 * getRuntime({ runtime: 120, ... }) // 120
 * getRuntime({ last_episode_to_air: { runtime: 45 }, ... }) // 45
 */
export function getRuntime(media: MediaDetails): number | null {
  if ("runtime" in media && media.runtime) {
    return media.runtime;
  }
  // For TV shows, try last_episode_to_air runtime
  if ("last_episode_to_air" in media && media.last_episode_to_air?.runtime) {
    return media.last_episode_to_air.runtime;
  }
  return null;
}

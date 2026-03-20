/**
 * Collection Service
 *
 * Handles all collection-related API calls to The Movie Database (TMDB).
 * Includes endpoints for collection details.
 */

import axios from "axios";
import type { Collection, MoviePart } from "@/types";

// TMDB API Key - used directly in all endpoints
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// ============= Collection Details Endpoint =============

/**
 * Fetch detailed information about a specific movie collection.
 *
 * @param collectionId - Collection ID
 * @returns Collection details or null on error
 *
 * @example
 * getCollectionDetails(131295) // Marvel Cinematic Universe
 */
export async function getCollectionDetails(collectionId: number): Promise<Collection | null> {
  try {
    const response = await axios.get<Collection>(`${TMDB_BASE_URL}/collection/${collectionId}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching collection details:", error);
    return null;
  }
}

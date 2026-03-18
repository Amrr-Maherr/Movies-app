/**
 * Collection Service
 *
 * Handles all collection-related API calls to The Movie Database (TMDB).
 * Includes endpoints for collection details.
 */

import axios from "axios";
import { tmdbConfig } from "@/config/api";

// ============= Types =============

export interface Collection {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  parts: MoviePart[];
}

export interface MoviePart {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
  original_language: string;
  popularity: number;
  video: boolean;
  adult: boolean;
  original_title: string;
  vote_count: number;
}

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
    const response = await axios.get<Collection>(`${tmdbConfig.baseUrl}/collection/${collectionId}`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching collection details:", error);
    return null;
  }
}

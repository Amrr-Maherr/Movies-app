/**
 * TV Service
 * 
 * Handles all TV show-related API calls to The Movie Database (TMDB).
 * Includes endpoints for popular, top-rated, airing today, on the air TV shows,
 * as well as TV show details, credits, reviews, recommendations, seasons, and episodes.
 */

import axios from "axios";
import type { TvShow, PopularTvShowsResponse, Credits, HeroMedia, Season, Episode } from "@/types";

// TMDB API Configuration
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || "aa9d055a1e5bce0d2c4d627c24422d51";

// ============= Response Types =============

export interface TVDetailsResponse {
  id: number;
  name: string;
  overview: string;
  tagline: string;
  status: string;
  type: string;
  homepage: string | null;
  imdb_id: string | null;
  original_language: string;
  original_name: string;
  in_production: boolean;
  languages: string[];
  number_of_episodes: number;
  number_of_seasons: number;
  episode_run_time: number[];
  first_air_date: string;
  last_air_date: string;
  next_episode_to_air: Episode | null;
  last_episode_to_air: Episode | null;
  networks: Array<{ id: number; name: string; logo_path: string | null; origin_country: string }>;
  genres: Array<{ id: number; name: string }>;
  production_companies: Array<{ id: number; name: string; logo_path: string | null; origin_country: string }>;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  spoken_languages: Array<{ iso_639_1: string; name: string; english_name: string }>;
  vote_average: number;
  vote_count: number;
  popularity: number;
  backdrop_path: string | null;
  poster_path: string | null;
  adult: boolean;
  seasons: Season[];
  credits: Credits;
  videos: { results: Video[] };
  images: TVImagesResponse;
  reviews: TVReviewsResponse;
  similar: TVSimilarResponse;
  recommendations: TVRecommendationsResponse;
  external_ids: TVExternalIds;
  keywords: { results: Array<{ id: number; name: string }> };
  "watch/providers"?: {
    results?: {
      US?: WatchProviderRegion;
      GB?: WatchProviderRegion;
      CA?: WatchProviderRegion;
      [key: string]: WatchProviderRegion | undefined;
    };
  };
}

export interface TVExternalIds {
  imdb_id: string | null;
  freebase_mid: string | null;
  freebase_id: string | null;
  tvdb_id: number | null;
  tvrage_id: number | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
  wikidata_id: string | null;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  size: number;
  official: boolean;
  published_at: string;
}

export interface ImageFile {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface TVImagesResponse {
  id: number;
  backdrops: ImageFile[];
  logos: ImageFile[];
  posters: ImageFile[];
}

export interface TVReview {
  id: string;
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  created_at: string;
  updated_at: string;
  url: string;
}

export interface TVReviewsResponse {
  id: number;
  page: number;
  results: TVReview[];
  total_pages: number;
  total_results: number;
}

export interface TVVideosResponse {
  id: number;
  results: Video[];
}

export interface TVSimilarResponse {
  page: number;
  results: HeroMedia[];
  total_pages: number;
  total_results: number;
}

export interface TVRecommendationsResponse {
  page: number;
  results: HeroMedia[];
  total_pages: number;
  total_results: number;
}

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

export interface TVWatchProvidersResponse {
  id: number;
  results?: {
    US?: WatchProviderRegion;
    GB?: WatchProviderRegion;
    CA?: WatchProviderRegion;
    [key: string]: WatchProviderRegion | undefined;
  };
}

// ============= TV Show List Endpoints =============

/**
 * Fetch popular TV shows from TMDB API.
 * 
 * @param page - Page number for pagination (default: 1)
 * @returns Array of popular TV shows or null on error
 */
export async function getPopularTvShows(page: number = 1): Promise<TvShow[] | null> {
  try {
    const response = await axios.get<PopularTvShowsResponse>(`${API_BASE_URL}/tv/popular`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page,
        include_adult: false,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular TV shows:", error);
    return null;
  }
}

/**
 * Fetch top-rated TV shows from TMDB API.
 * 
 * @param page - Page number for pagination (default: 1)
 * @returns Array of top-rated TV shows or null on error
 */
export async function getTopRatedTvShows(page: number = 1): Promise<TvShow[] | null> {
  try {
    const response = await axios.get<PopularTvShowsResponse>(`${API_BASE_URL}/tv/top_rated`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page,
        include_adult: false,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching top-rated TV shows:", error);
    return null;
  }
}

/**
 * Fetch TV shows airing today from TMDB API.
 * 
 * @param page - Page number for pagination (default: 1)
 * @returns Array of TV shows airing today or null on error
 */
export async function getAiringTodayTvShows(page: number = 1): Promise<TvShow[] | null> {
  try {
    const response = await axios.get<PopularTvShowsResponse>(`${API_BASE_URL}/tv/airing_today`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page,
        include_adult: false,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching airing today TV shows:", error);
    return null;
  }
}

/**
 * Fetch TV shows currently broadcasting new episodes from TMDB API.
 * 
 * @param page - Page number for pagination (default: 1)
 * @returns Array of TV shows on the air or null on error
 */
export async function getOnTheAirTvShows(page: number = 1): Promise<TvShow[] | null> {
  try {
    const response = await axios.get<PopularTvShowsResponse>(`${API_BASE_URL}/tv/on_the_air`, {
      params: {
        api_key: API_KEY,
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
}

// ============= TV Show Details Endpoints =============

/**
 * Fetch detailed information about a specific TV show.
 * Includes credits, videos, images, reviews, similar, recommendations, and external IDs.
 * 
 * @param id - TV Show ID
 * @returns TV show details object or null on error
 */
export async function getTVShowDetails(id: number): Promise<TVDetailsResponse | null> {
  try {
    const response = await axios.get<TVDetailsResponse>(`${API_BASE_URL}/tv/${id}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        include_adult: false,
        append_to_response: "credits,videos,images,reviews,similar,external_ids,keywords,watch/providers",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching TV show details:", error);
    return null;
  }
}

/**
 * Fetch cast and crew for a specific TV show.
 * 
 * @param id - TV Show ID
 * @returns Credits object with cast and crew arrays or null on error
 */
export async function getTVCredits(id: number): Promise<Credits | null> {
  try {
    const response = await axios.get<Credits>(`${API_BASE_URL}/tv/${id}/credits`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching TV show credits:", error);
    return null;
  }
}

/**
 * Fetch user reviews for a specific TV show.
 * 
 * @param id - TV Show ID
 * @param page - Page number for pagination (default: 1)
 * @returns Reviews response with pagination or null on error
 */
export async function getTVReviews(id: number, page: number = 1): Promise<TVReviewsResponse | null> {
  try {
    const response = await axios.get<TVReviewsResponse>(`${API_BASE_URL}/tv/${id}/reviews`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching TV show reviews:", error);
    return null;
  }
}

/**
 * Fetch recommended TV shows based on a specific show.
 * 
 * @param id - TV Show ID
 * @param page - Page number for pagination (default: 1)
 * @returns Recommendations response or null on error
 */
export async function getTVRecommendations(id: number, page: number = 1): Promise<TVRecommendationsResponse | null> {
  try {
    const response = await axios.get<TVRecommendationsResponse>(`${API_BASE_URL}/tv/${id}/recommendations`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching TV show recommendations:", error);
    return null;
  }
}

/**
 * Fetch TV shows similar to a specific show.
 * 
 * @param id - TV Show ID
 * @param page - Page number for pagination (default: 1)
 * @returns Similar TV shows response or null on error
 */
export async function getTVSimilar(id: number, page: number = 1): Promise<TVSimilarResponse | null> {
  try {
    const response = await axios.get<TVSimilarResponse>(`${API_BASE_URL}/tv/${id}/similar`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching similar TV shows:", error);
    return null;
  }
}

/**
 * Fetch video trailers, teasers, and clips for a TV show.
 * 
 * @param id - TV Show ID
 * @param page - Page number for pagination (default: 1)
 * @returns Videos response or null on error
 */
export async function getTVVideos(id: number, page: number = 1): Promise<TVVideosResponse | null> {
  try {
    const response = await axios.get<TVVideosResponse>(`${API_BASE_URL}/tv/${id}/videos`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching TV show videos:", error);
    return null;
  }
}

/**
 * Fetch poster and backdrop images for a TV show.
 * 
 * @param id - TV Show ID
 * @returns Images response with backdrops, logos, and posters or null on error
 */
export async function getTVImages(id: number): Promise<TVImagesResponse | null> {
  try {
    const response = await axios.get<TVImagesResponse>(`${API_BASE_URL}/tv/${id}/images`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        include_image_language: "en,null",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching TV show images:", error);
    return null;
  }
}

/**
 * Fetch streaming availability (watch providers) for a TV show.
 * 
 * @param id - TV Show ID
 * @param region - Region code (default: "US")
 * @returns Watch providers response by region or null on error
 */
export async function getTVWatchProviders(id: number, region: string = "US"): Promise<TVWatchProvidersResponse | null> {
  try {
    const response = await axios.get<TVWatchProvidersResponse>(`${API_BASE_URL}/tv/${id}/watch/providers`, {
      params: {
        api_key: API_KEY,
        watch_region: region,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching TV show watch providers:", error);
    return null;
  }
}

// ============= Season & Episode Endpoints =============

/**
 * Fetch detailed information about a specific TV season.
 * Includes episodes, credits, videos, images, and external IDs.
 * 
 * @param tvShowId - TV Show ID
 * @param seasonNumber - Season number
 * @returns Season details object or null on error
 */
export async function getTVSeasonDetails(
  tvShowId: number,
  seasonNumber: number
): Promise<Season | null> {
  try {
    const response = await axios.get<Season>(
      `${API_BASE_URL}/tv/${tvShowId}/season/${seasonNumber}`,
      {
        params: {
          api_key: API_KEY,
          language: "en-US",
          append_to_response: "videos,images,external_ids,credits",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching TV season details:", error);
    return null;
  }
}

/**
 * Fetch detailed information about a specific episode.
 * Includes credits, videos, images, and external IDs.
 * 
 * @param tvShowId - TV Show ID
 * @param seasonNumber - Season number
 * @param episodeNumber - Episode number
 * @returns Episode details object or null on error
 */
export async function getTVEpisodeDetails(
  tvShowId: number,
  seasonNumber: number,
  episodeNumber: number
): Promise<Episode | null> {
  try {
    const response = await axios.get<Episode>(
      `${API_BASE_URL}/tv/${tvShowId}/season/${seasonNumber}/episode/${episodeNumber}`,
      {
        params: {
          api_key: API_KEY,
          language: "en-US",
          append_to_response: "credits,videos,images,external_ids",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching TV episode details:", error);
    return null;
  }
}

/**
 * Fetch episodes for a specific TV season.
 * 
 * @param tvShowId - TV Show ID
 * @param seasonNumber - Season number
 * @returns Array of episodes or null on error
 */
export async function getSeasonEpisodes(
  tvShowId: number,
  seasonNumber: number
): Promise<Episode[] | null> {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/tv/${tvShowId}/season/${seasonNumber}`,
      {
        params: {
          api_key: API_KEY,
          language: "en-US",
        },
      }
    );
    return response.data.episodes || null;
  } catch (error) {
    console.error("Error fetching season episodes:", error);
    return null;
  }
}

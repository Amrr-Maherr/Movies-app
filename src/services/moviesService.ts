/**
 * Movies Service
 *
 * Handles all movie-related API calls to The Movie Database (TMDB).
 * Includes endpoints for popular, top-rated, upcoming, now playing movies,
 * as well as movie details, credits, reviews, recommendations, and more.
 */

import axios from "axios";
import type { Movie, PopularMoviesResponse, Credits, HeroMedia } from "@/types";
import { tmdbConfig } from "@/config/api";

// Re-export PopularMoviesResponse for use in other modules
export type { PopularMoviesResponse };

// ============= Response Types =============

export interface MovieDetailsResponse {
  id: number;
  title: string;
  overview: string;
  runtime: number;
  release_date: string;
  budget: number;
  revenue: number;
  vote_average: number;
  vote_count: number;
  popularity: number;
  status: string;
  tagline: string;
  homepage: string | null;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  adult: boolean;
  video: boolean;
  backdrop_path: string | null;
  poster_path: string | null;
  genres: Array<{ id: number; name: string }>;
  production_companies: Array<{ id: number; name: string; logo_path: string | null; origin_country: string }>;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  spoken_languages: Array<{ iso_639_1: string; name: string; english_name: string }>;
  credits: Credits;
  videos: { results: Video[] };
  images: MovieImagesResponse;
  reviews: MovieReviewsResponse;
  similar: MovieSimilarResponse;
  recommendations: MovieRecommendationsResponse;
  external_ids: { imdb_id: string | null };
  keywords: { results: Array<{ id: number; name: string }> };
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

export interface MovieImagesResponse {
  id: number;
  backdrops: ImageFile[];
  logos: ImageFile[];
  posters: ImageFile[];
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

export interface MovieReview {
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

export interface MovieReviewsResponse {
  id: number;
  page: number;
  results: MovieReview[];
  total_pages: number;
  total_results: number;
}

export interface MovieVideosResponse {
  id: number;
  results: Video[];
}

export interface MovieSimilarResponse {
  page: number;
  results: HeroMedia[];
  total_pages: number;
  total_results: number;
}

export interface MovieRecommendationsResponse {
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

export interface MovieWatchProvidersResponse {
  id: number;
  results?: {
    US?: WatchProviderRegion;
    GB?: WatchProviderRegion;
    CA?: WatchProviderRegion;
    [key: string]: WatchProviderRegion | undefined;
  };
}

// ============= Movie List Endpoints =============

/**
 * Fetch popular movies from TMDB API.
 * 
 * @param page - Page number for pagination (default: 1)
 * @returns Array of popular movies or null on error
 */
export async function getPopularMovies(page: number = 1): Promise<Movie[] | null> {
  try {
    const response = await axios.get<PopularMoviesResponse>(`${tmdbConfig.baseUrl}/movie/popular`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        page,
        include_adult: false,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return null;
  }
}

/**
 * Fetch top-rated movies from TMDB API.
 * 
 * @param page - Page number for pagination (default: 1)
 * @returns Array of top-rated movies or null on error
 */
export async function getTopRatedMovies(page: number = 1): Promise<Movie[] | null> {
  try {
    const response = await axios.get<PopularMoviesResponse>(`${tmdbConfig.baseUrl}/movie/top_rated`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        page,
        include_adult: false,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching top-rated movies:", error);
    return null;
  }
}

/**
 * Fetch upcoming movies from TMDB API.
 * 
 * @param page - Page number for pagination (default: 1)
 * @returns Array of upcoming movies or null on error
 */
export async function getUpcomingMovies(page: number = 1): Promise<Movie[] | null> {
  try {
    const response = await axios.get<PopularMoviesResponse>(`${tmdbConfig.baseUrl}/movie/upcoming`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        page,
        include_adult: false,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return null;
  }
}

/**
 * Fetch movies currently in theaters from TMDB API.
 * 
 * @param page - Page number for pagination (default: 1)
 * @returns Array of now playing movies or null on error
 */
export async function getNowPlayingMovies(page: number = 1): Promise<Movie[] | null> {
  try {
    const response = await axios.get<PopularMoviesResponse>(`${tmdbConfig.baseUrl}/movie/now_playing`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        page,
        include_adult: false,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    return null;
  }
}

// ============= Movie Details Endpoints =============

/**
 * Fetch detailed information about a specific movie.
 * Includes credits, videos, images, reviews, similar, and recommendations.
 * 
 * @param id - Movie ID
 * @returns Movie details object or null on error
 */
export async function getMovieDetails(id: number): Promise<MovieDetailsResponse | null> {
  try {
    const response = await axios.get<MovieDetailsResponse>(`${tmdbConfig.baseUrl}/movie/${id}`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        include_adult: false,
        append_to_response: "credits,videos,images,reviews,similar,external_ids,keywords",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
}

/**
 * Fetch cast and crew for a specific movie.
 * 
 * @param id - Movie ID
 * @returns Credits object with cast and crew arrays or null on error
 */
export async function getMovieCredits(id: number): Promise<Credits | null> {
  try {
    const response = await axios.get<Credits>(`${tmdbConfig.baseUrl}/movie/${id}/credits`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    return null;
  }
}

/**
 * Fetch user reviews for a specific movie.
 * 
 * @param id - Movie ID
 * @param page - Page number for pagination (default: 1)
 * @returns Reviews response with pagination or null on error
 */
export async function getMovieReviews(id: number, page: number = 1): Promise<MovieReviewsResponse | null> {
  try {
    const response = await axios.get<MovieReviewsResponse>(``${tmdbConfig.baseUrl}/movie/${id}/reviews`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    return null;
  }
}

/**
 * Fetch recommended movies based on a specific movie.
 * 
 * @param id - Movie ID
 * @param page - Page number for pagination (default: 1)
 * @returns Recommendations response or null on error
 */
export async function getMovieRecommendations(id: number, page: number = 1): Promise<MovieRecommendationsResponse | null> {
  try {
    const response = await axios.get<MovieRecommendationsResponse>(``${tmdbConfig.baseUrl}/movie/${id}/recommendations`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie recommendations:", error);
    return null;
  }
}

/**
 * Fetch movies similar to a specific movie.
 * 
 * @param id - Movie ID
 * @param page - Page number for pagination (default: 1)
 * @returns Similar movies response or null on error
 */
export async function getMovieSimilar(id: number, page: number = 1): Promise<MovieSimilarResponse | null> {
  try {
    const response = await axios.get<MovieSimilarResponse>(``${tmdbConfig.baseUrl}/movie/${id}/similar`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    return null;
  }
}

/**
 * Fetch video trailers, teasers, and clips for a movie.
 * 
 * @param id - Movie ID
 * @param page - Page number for pagination (default: 1)
 * @returns Videos response or null on error
 */
export async function getMovieVideos(id: number, page: number = 1): Promise<MovieVideosResponse | null> {
  try {
    const response = await axios.get<MovieVideosResponse>(``${tmdbConfig.baseUrl}/movie/${id}/videos`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    return null;
  }
}

/**
 * Fetch poster and backdrop images for a movie.
 * 
 * @param id - Movie ID
 * @returns Images response with backdrops, logos, and posters or null on error
 */
export async function getMovieImages(id: number): Promise<MovieImagesResponse | null> {
  try {
    const response = await axios.get<MovieImagesResponse>(``${tmdbConfig.baseUrl}/movie/${id}/images`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: "en-US",
        include_image_language: "en,null",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie images:", error);
    return null;
  }
}

/**
 * Fetch streaming availability (watch providers) for a movie.
 * 
 * @param id - Movie ID
 * @param region - Region code (default: "US")
 * @returns Watch providers response by region or null on error
 */
export async function getMovieWatchProviders(id: number, region: string = "US"): Promise<MovieWatchProvidersResponse | null> {
  try {
    const response = await axios.get<MovieWatchProvidersResponse>(`${tmdbConfig.baseUrl}/movie/${id}/watch/providers`, {
      params: {
        api_key: tmdbConfig.apiKey,
        watch_region: region,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie watch providers:", error);
    return null;
  }
}

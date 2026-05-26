/**
 * Movies Service
 *
 * Handles all movie-related API calls to The Movie Database (TMDB).
 * Includes endpoints for popular, top-rated, upcoming, now playing movies,
 * as well as movie details, credits, reviews, recommendations, and more.
 */

import axios from "axios";
import type {
  Movie,
  PopularMoviesResponse,
  Credits,
  HeroMedia,
  MovieDetailsResponse,
  Video,
  MovieImagesResponse,
  ImageFile,
  MovieReview,
  MovieReviewsResponse,
  MovieVideosResponse,
  MovieSimilarResponse,
  MovieRecommendationsResponse,
  ProviderInfo,
  WatchProviderRegion,
  MovieWatchProvidersResponse,
} from "@/types";

// Re-export types for backward compatibility
export type {
  MovieDetailsResponse,
  MovieImagesResponse,
  MovieReviewsResponse,
  MovieVideosResponse,
  MovieSimilarResponse,
  MovieRecommendationsResponse,
  MovieWatchProvidersResponse,
  ImageFile,
  Video,
  MovieReview,
  ProviderInfo,
  WatchProviderRegion,
};

// TMDB API Key - used directly in all endpoints
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// ============= Movie List Endpoints =============

/**
 * Fetch popular movies from TMDB API.
 *
 * @param page - Page number for pagination (default: 1)
 * @returns PopularMoviesResponse or null on error
 */
export async function getPopularMovies(page: number = 1): Promise<PopularMoviesResponse | null> {
  try {
    const response = await axios.get<PopularMoviesResponse>(`${TMDB_BASE_URL}/discover/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        language: "en-US",
        page,
        include_adult: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return null;
  }
}

/**
 * Fetch top-rated movies from TMDB API.
 *
 * @param page - Page number for pagination (default: 1)
 * @returns PopularMoviesResponse or null on error
 */
export async function getTopRatedMovies(page: number = 1): Promise<PopularMoviesResponse | null> {
  try {
    const response = await axios.get<PopularMoviesResponse>(`${TMDB_BASE_URL}/movie/top_rated`, {
      params: {
        api_key: TMDB_API_KEY,
        language: "en-US",
        page,
        include_adult: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching top-rated movies:", error);
    return null;
  }
}

/**
 * Fetch upcoming movies from TMDB API.
 *
 * @param page - Page number for pagination (default: 1)
 * @returns PopularMoviesResponse or null on error
 */
export async function getUpcomingMovies(page: number = 1): Promise<PopularMoviesResponse | null> {
  try {
    const response = await axios.get<PopularMoviesResponse>(`${TMDB_BASE_URL}/movie/upcoming`, {
      params: {
        api_key: TMDB_API_KEY,
        language: "en-US",
        page,
        include_adult: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return null;
  }
}

/**
 * Fetch movies currently in theaters from TMDB API.
 *
 * @param page - Page number for pagination (default: 1)
 * @returns PopularMoviesResponse or null on error
 */
export async function getNowPlayingMovies(page: number = 1): Promise<PopularMoviesResponse | null> {
  try {
    const response = await axios.get<PopularMoviesResponse>(`${TMDB_BASE_URL}/movie/now_playing`, {
      params: {
        api_key: TMDB_API_KEY,
        language: "en-US",
        page,
        include_adult: true,
      },
    });
    return response.data;
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
    const response = await axios.get<MovieDetailsResponse>(`${TMDB_BASE_URL}/movie/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: "en-US",
        include_adult: true,
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
    const response = await axios.get<Credits>(`${TMDB_BASE_URL}/movie/${id}/credits`, {
      params: {
        api_key: TMDB_API_KEY,
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
    const response = await axios.get<MovieReviewsResponse>(`${TMDB_BASE_URL}/movie/${id}/reviews`, {
      params: {
        api_key: TMDB_API_KEY,
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
    const response = await axios.get<MovieRecommendationsResponse>(`${TMDB_BASE_URL}/movie/${id}/recommendations`, {
      params: {
        api_key: TMDB_API_KEY,
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
    const response = await axios.get<MovieSimilarResponse>(`${TMDB_BASE_URL}/movie/${id}/similar`, {
      params: {
        api_key: TMDB_API_KEY,
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
    const response = await axios.get<MovieVideosResponse>(`${TMDB_BASE_URL}/movie/${id}/videos`, {
      params: {
        api_key: TMDB_API_KEY,
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
    const response = await axios.get<MovieImagesResponse>(`${TMDB_BASE_URL}/movie/${id}/images`, {
      params: {
        api_key: TMDB_API_KEY,
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
    const response = await axios.get<MovieWatchProvidersResponse>(`${TMDB_BASE_URL}/movie/${id}/watch/providers`, {
      params: {
        api_key: TMDB_API_KEY,
        watch_region: region,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie watch providers:", error);
    return null;
  }
}

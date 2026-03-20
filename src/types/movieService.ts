/**
 * Movie Service Types
 *
 * Types for movie-related API responses from TMDB.
 */

import type { Credits, HeroMedia } from "./mediaDetails";

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

export interface MovieImagesResponse {
  id: number;
  backdrops: ImageFile[];
  logos: ImageFile[];
  posters: ImageFile[];
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

/**
 * TV Service Types
 *
 * Types for TV show-related API responses from TMDB.
 */

import type { Credits, Season, Episode, Video, Genre, ImageFile } from "./movieDetails";
import type { HeroMedia } from "./hero";

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

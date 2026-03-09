/**
 * Shared Media Details types for Movies and TV Shows
 * Includes credits, videos, keywords, and genres from TMDB API
 */

import type { Genre, CastMember, Credits, Video, Videos, Keyword, Keywords, MovieDetails, CrewMember, Season, MediaImages } from './movieDetails';

/**
 * Extended TV Show details with all appended responses from TMDB API
 */
export interface TvShowDetails {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  last_air_date: string | null;
  status: string;
  tagline: string;
  type: string;
  original_language: string;
  popularity: number;
  adult: boolean;
  homepage: string | null;
  in_production: boolean;
  languages: string[];
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    air_date: string;
    episode_number: number;
    production_code: string;
    runtime: number | null;
    season_number: number;
    show_id: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
  } | null;
  next_episode_to_air: unknown | null;
  number_of_episodes: number;
  number_of_seasons: number;
  networks: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
  genres: Genre[];
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  spoken_languages: {
    iso_639_1: string;
    name: string;
    english_name: string;
  }[];
  seasons: Season[];
  credits: Credits;
  videos: Videos;
  keywords: {
    results: Keyword[];
  };
  similar: {
    page: number;
    results: {
      id: number;
      name: string;
      overview: string;
      poster_path: string | null;
      backdrop_path: string | null;
      vote_average: number;
      first_air_date: string;
      genre_ids: number[];
      adult: boolean;
      original_language: string;
      original_name: string;
      popularity: number;
      origin_country: string[];
      vote_count: number;
    }[];
    total_pages: number;
    total_results: number;
  };
  external_ids: {
    imdb_id: string | null;
    facebook_id: string | null;
    instagram_id: string | null;
    twitter_id: string | null;
    tvdb_id: number | null;
  };
  watch_providers?: {
    US?: {
      link?: string;
      flatrate?: { provider_id: number; logo_path: string; provider_name: string }[];
      rent?: { provider_id: number; logo_path: string; provider_name: string }[];
      buy?: { provider_id: number; logo_path: string; provider_name: string }[];
      free?: { provider_id: number; logo_path: string; provider_name: string }[];
    };
  };
  reviews?: {
    results: {
      id: string;
      author: string;
      content: string;
      created_at: string;
      author_details?: { rating?: number | null };
    }[];
  };
  images?: MediaImages;
}

/**
 * Union type for media details (Movie or TV Show)
 */
export type MediaDetails = MovieDetails | TvShowDetails;

/**
 * Props for MediaHero component
 */
export interface MediaHeroProps {
  media: MediaDetails;
  onPlayTrailer?: () => void;
  onAddToList?: () => void;
}

/**
 * Watch Provider types from TMDB API
 */
export interface Provider {
  id: number;
  name: string;
  logo_path: string | null;
  display_priority?: number;
  provider_type?: "Rent" | "Buy" | "Free" | "Subscription";
}

/**
 * Props for WatchProvidersSection component
 */
export interface WatchProvidersSectionProps {
  providers: Provider[];
}

// Re-export common types for convenience
export type { Genre, CastMember, CrewMember, Credits, Video, Videos, Keyword, Keywords };

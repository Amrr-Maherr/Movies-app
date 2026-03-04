/**
 * Extended Movie Details types for full movie information
 * Includes credits, videos, keywords, and genres from TMDB API
 */

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Credits {
  cast: CastMember[];
  crew: unknown[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

export interface Videos {
  results: Video[];
}

export interface Keyword {
  id: number;
  name: string;
}

export interface Keywords {
  keywords: Keyword[];
}

/**
 * Extended Movie with all appended responses from TMDB API
 */
export interface MovieDetails {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  runtime: number | null;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  original_language: string;
  popularity: number;
  adult: boolean;
  video: boolean;
  homepage: string | null;
  imdb_id: string | null;
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
  credits: Credits;
  videos: Videos;
  keywords: Keywords;
  similar: {
    page: number;
    results: {
      id: number;
      title: string;
      poster_path: string | null;
      backdrop_path: string | null;
      vote_average: number;
      release_date: string;
    }[];
    total_pages: number;
    total_results: number;
  };
  external_ids: {
    imdb_id: string | null;
    facebook_id: string | null;
    instagram_id: string | null;
    twitter_id: string | null;
  };
}

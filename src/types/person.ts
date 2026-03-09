/**
 * Person / Actor types for TMDB API
 * Includes person details, external IDs, and credits
 */

export interface PersonDetails {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
  adult: boolean;
  also_known_as: string[];
  gender: number;
  imdb_id: string | null;
  homepage: string | null;
}

export interface PersonExternalIds {
  id: number;
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

export interface CastCredit {
  id: number;
  original_language: string;
  episode_count: number;
  overview: string;
  origin_country: string[];
  original_name: string;
  vote_count: number;
  name: string;
  media_type: "movie" | "tv";
  popularity: number;
  credit_id: string;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
  poster_path: string | null;
  character: string;
  adult: boolean;
  order?: number;
  release_date?: string;
  title?: string;
  original_title?: string;
  video?: boolean;
}

export interface CrewCredit {
  id: number;
  original_language: string;
  episode_count: number;
  overview: string;
  origin_country: string[];
  original_name: string;
  vote_count: number;
  name: string;
  media_type: "movie" | "tv";
  popularity: number;
  credit_id: string;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
  poster_path: string | null;
  adult: boolean;
  department: string;
  job: string;
  release_date?: string;
  title?: string;
  original_title?: string;
  video?: boolean;
}

export interface CombinedCredits {
  cast: CastCredit[];
  crew: CrewCredit[];
  id: number;
}

/**
 * HeroMedia type extension to support media_type for person credits
 */
export interface HeroMediaWithMediaType {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_name?: string;
  original_title?: string;
  popularity: number;
  media_type?: "movie" | "tv";
}

export interface PopularPersonResult {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
  gender: number;
  popularity: number;
  adult: boolean;
  known_for: HeroMediaWithMediaType[];
}

export interface PopularPeopleResponse {
  page: number;
  results: PopularPersonResult[];
  total_pages: number;
  total_results: number;
}

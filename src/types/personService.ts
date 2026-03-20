/**
 * Person Service Types
 *
 * Types for person-related API responses from TMDB.
 */

import type { ImageFile } from "./movieDetails";

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

export interface PersonMovieCreditsResponse {
  id: number;
  cast: CastCredit[];
  crew: CrewCredit[];
}

export interface PersonTVCreditsResponse {
  id: number;
  cast: CastCredit[];
  crew: CrewCredit[];
}

export interface CombinedCredits {
  cast: CastCredit[];
  crew: CrewCredit[];
  id: number;
}

export interface PersonImagesResponse {
  id: number;
  profiles: ImageFile[];
}

export interface PopularPeopleResponse {
  page: number;
  results: PersonDetails[];
  total_pages: number;
  total_results: number;
}

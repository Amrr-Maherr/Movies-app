/**
 * Collection Service Types
 *
 * Types for collection-related API responses from TMDB.
 */

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

export interface Collection {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  parts: MoviePart[];
}

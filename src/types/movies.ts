/**
 * Movie-related TypeScript types and interfaces
 * Used across the application for movie data structures
 */

/**
 * Movie data structure from TMDB API
 */
export interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
  vote_count: number;
}

/**
 * TMDB API response structure for popular movies
 */
export interface PopularMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

/**
 * Props for movie metadata display component
 */
export interface MovieMetaDataProps {
  movie: Movie;
}

/**
 * Props for movie action buttons component
 */
export interface MovieActionButtonsProps {
  movie: Movie;
}

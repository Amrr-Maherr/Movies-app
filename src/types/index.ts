/**
 * Central type exports for the application
 * Import types from this file for cleaner imports
 */

// Movie types
export type {
  Movie,
  PopularMoviesResponse,
  MovieMetaDataProps,
  MovieActionButtonsProps,
  TvShow,
  PopularTvShowsResponse,
} from "./movies";

// Hero types
export type {
  HeroBackgroundProps,
  HeroContentProps,
  HeroSlideProps,
  HeroSectionProps,
  HeroMedia,
} from "./hero";

// Movie Details types
export type {
  MovieDetails,
  Genre,
  CastMember,
  Credits,
  Video,
  Videos,
  Keyword,
  Keywords,
} from "./movieDetails";

// Media Details types (shared for Movies and TV Shows)
export type {
  TvShowDetails,
  MediaDetails,
  MediaHeroProps,
} from "./mediaDetails";

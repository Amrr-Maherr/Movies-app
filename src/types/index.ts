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
  StreamingPlatform,
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
  CrewMember,
  Credits,
  Video,
  Videos,
  Keyword,
  Keywords,
  Episode,
  Season,
} from "./movieDetails";

// Media Details types (shared for Movies and TV Shows)
export type {
  TvShowDetails,
  MediaDetails,
  MediaHeroProps,
  Provider,
  WatchProvidersSectionProps,
} from "./mediaDetails";

// Person types
export type {
  PersonDetails,
  PersonExternalIds,
  CastCredit,
  CrewCredit,
  CombinedCredits,
} from "./person";

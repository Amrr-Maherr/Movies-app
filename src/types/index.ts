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

// Movie Details types (canonical sources for Video, Genre, Credits, Season, Episode, ImageFile)
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
  ImageFile,
  MediaImage,
  MediaImages,
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
  PersonMovieCreditsResponse,
  PersonTVCreditsResponse,
  PersonImagesResponse,
  PopularPeopleResponse,
  HeroMediaWithMediaType,
  PopularPersonResult,
} from "./personService";

// TV Service types
export type {
  TVDetailsResponse,
  TVExternalIds,
  TVImagesResponse,
  TVReview,
  TVReviewsResponse,
  TVVideosResponse,
  TVSimilarResponse,
  TVRecommendationsResponse,
  ProviderInfo,
  WatchProviderRegion,
  TVWatchProvidersResponse,
} from "./tvService";

// Movie Service types
export type {
  MovieDetailsResponse,
  MovieImagesResponse,
  MovieReview,
  MovieReviewsResponse,
  MovieVideosResponse,
  MovieSimilarResponse,
  MovieRecommendationsResponse,
  MovieWatchProvidersResponse,
} from "./movieService";

// Trending Service types
export type {
  TrendingPerson,
  TrendingPeopleResponse,
  StreamingPlatformsResponse,
} from "./trendingService";

// Search Service types
export type {
  MovieSearchResponse,
  TvSearchResponse,
  PersonSearchResult,
  PersonSearchResponse,
  MultiSearchResult,
  MultiSearchResponse,
} from "./searchService";

// Genre Service types
export type {
  GenresResponse,
  DiscoverMoviesParams,
  DiscoverTvParams,
  DiscoverResponse,
} from "./genreService";

// Discover Service types
export type {
  PlatformContentResponse,
} from "./discoverService";

// Auth Service types
export type {
  SignupData,
  LoginData,
  AuthResponse,
  ApiError,
} from "./authService";

// Collection Service types
export type {
  Collection,
  MoviePart,
} from "./collectionService";

// Company Service types
export type {
  Company,
  CompanyMoviesResponse,
} from "./companyService";

// Network Service types
export type {
  Network,
  NetworkTVSeriesResponse,
} from "./networkService";

// Platform Service types
export type {
  StreamingPlatform as PlatformStreamingPlatform,
  PlatformContentResponse as PlatformServiceContentResponse,
} from "./platformService";

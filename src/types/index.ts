/**
 * Central type exports for the application
 * Re-exports types from their respective feature directories.
 */

// Shared/Movie types (shared across features)
export type {
  Movie,
  PopularMoviesResponse,
  TvShow,
  PopularTvShowsResponse,
  StreamingPlatform,
} from "../shared/types/movies";

// Hero types (shared across features)
export type {
  HeroBackgroundProps,
  HeroContentProps,
  HeroSlideProps,
  HeroSectionProps,
  HeroMedia,
} from "../shared/types/hero";

// Movie Details types (shared across features)
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
} from "../shared/types/movieDetails";

// Media Details types (TV Show specific - moved to tv-shows feature)
export type {
  TvShowDetails,
  MediaDetails,
  MediaHeroProps,
  Provider,
  WatchProvidersSectionProps,
} from "../features/tv-shows/types";

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
} from "../features/people/types";

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
} from "../features/tv-shows/types/tvServiceTypes";

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
} from "../features/movies/types";

// Trending Service types
export type {
  TrendingPerson,
  TrendingPeopleResponse,
  StreamingPlatformsResponse,
} from "../features/home/types";

// Search Service types
export type {
  MovieSearchResponse,
  TvSearchResponse,
  PersonSearchResult,
  PersonSearchResponse,
  MultiSearchResult,
  MultiSearchResponse,
} from "../features/search/types";

// Genre Service types
export type {
  GenresResponse,
  DiscoverMoviesParams,
  DiscoverTvParams,
  DiscoverResponse,
} from "../features/discover/types/genreServiceTypes";

// Discover Service types
export type {
  PlatformContentResponse,
} from "../features/discover/types/discoverServiceTypes";

// Auth Service types
export type {
  SignupData,
  LoginData,
  AuthResponse,
  ApiError,
} from "../features/auth/types";

// Collection Service types
export type {
  Collection,
  MoviePart,
} from "../features/discover/types/collectionServiceTypes";

// Company Service types
export type {
  Company,
  CompanyMoviesResponse,
} from "../features/discover/types/companyServiceTypes";

// Network Service types
export type {
  Network,
  NetworkTVSeriesResponse,
} from "../features/discover/types/networkServiceTypes";

// Platform Service types
export type {
  StreamingPlatform as PlatformStreamingPlatform,
  PlatformContentResponse as PlatformServiceContentResponse,
} from "../features/discover/types/platformServiceTypes";

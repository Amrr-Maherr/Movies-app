/**
 * Services Index
 * 
 * Central export point for all API service modules.
 * Import services from this file for cleaner imports throughout the application.
 * 
 * @example
 * // Import specific functions
 * import { getPopularMovies, getMovieDetails } from '@/services';
 * 
 * // Import entire service modules
 * import * as moviesService from '@/services/moviesService';
 * import * as tvService from '@/services/tvService';
 */

// ============= Movies Service =============
export {
  // Movie Lists
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  // Movie Details
  getMovieDetails,
  getMovieCredits,
  getMovieReviews,
  getMovieRecommendations,
  getMovieSimilar,
  getMovieVideos,
  getMovieImages,
  getMovieWatchProviders,
  // Types
  type MovieDetailsResponse,
  type MovieImagesResponse,
  type MovieReviewsResponse,
  type MovieVideosResponse,
  type MovieSimilarResponse,
  type MovieRecommendationsResponse,
  type MovieWatchProvidersResponse,
  type ImageFile,
  type Video,
  type MovieReview,
  type ProviderInfo,
  type WatchProviderRegion,
} from "./moviesService";

// ============= TV Service =============
export {
  // TV Show Lists
  getPopularTvShows,
  getTopRatedTvShows,
  getAiringTodayTvShows,
  getOnTheAirTvShows,
  // TV Show Details
  getTVShowDetails,
  getTVCredits,
  getTVReviews,
  getTVRecommendations,
  getTVSimilar,
  getTVVideos,
  getTVImages,
  getTVWatchProviders,
  // Season & Episode
  getTVSeasonDetails,
  getTVEpisodeDetails,
  getSeasonEpisodes,
  // Types
  type TVDetailsResponse,
  type TVImagesResponse,
  type TVReviewsResponse,
  type TVVideosResponse,
  type TVSimilarResponse,
  type TVRecommendationsResponse,
  type TVWatchProvidersResponse,
  type TVExternalIds,
} from "./tvService";

// ============= Person Service =============
export {
  // Person Details
  getPersonDetails,
  getPersonExternalIds,
  // Person Credits
  getPersonMovieCredits,
  getPersonTVCredits,
  getPersonCombinedCredits,
  // Person Images
  getPersonImages,
  // Popular People
  getPopularPeople,
  // Types
  type PersonDetails,
  type PersonExternalIds,
  type PersonMovieCreditsResponse,
  type PersonTVCreditsResponse,
  type CombinedCredits,
  type PersonImagesResponse,
  type CastCredit,
  type CrewCredit,
  type PopularPeopleResponse,
} from "./personService";

// ============= Search Service =============
export {
  // Search Functions
  searchMovies,
  searchTvShows,
  searchPeople,
  multiSearch,
  // Types
  type MovieSearchResponse,
  type TvSearchResponse,
  type PersonSearchResult,
  type PersonSearchResponse,
  type MultiSearchResult,
  type MultiSearchResponse,
} from "./searchService";

// ============= Discover Service =============
export {
  // Discover Functions
  discoverMovies,
  discoverTvShows,
  getKidsMovies,
  getMediaByLanguage,
  // Genres
  getMovieGenres,
  getTvGenres,
  // Types
  type DiscoverMoviesParams,
  type DiscoverTvParams,
  type Genre,
  type GenresResponse,
} from "./discoverService";

// ============= Trending Service =============
export {
  // Trending Functions
  getTrendingMoviesDay,
  getTrendingMoviesWeek,
  getTrendingTvShowsDay,
  getTrendingTvShowsWeek,
  getTrendingPeopleDay,
  getTrendingPeopleWeek,
  // Streaming Platforms
  getStreamingPlatforms,
  // Types
  type TrendingPerson,
  type TrendingPeopleResponse,
  type StreamingPlatform,
  type StreamingPlatformsResponse,
} from "./trendingService";

// ============= Auth Service =============
export {
  // Auth Functions
  signup,
  login,
  // Types
  type SignupData,
  type LoginData,
  type AuthResponse,
  type ApiError,
} from "./authService";

// ============= Company Service =============
export {
  // Company Functions
  getCompanyDetails,
  getCompanyMovies,
  // Types
  type Company,
  type CompanyMoviesResponse,
} from "./companyService";

// ============= Collection Service =============
export {
  // Collection Functions
  getCollectionDetails,
  // Types
  type Collection,
  type MoviePart,
} from "./collectionService";

/**
 * Services Index
 * 
 * Central export point for all API service modules.
 * Re-exports all API functions from their respective feature directories.
 * 
 * @example
 * // Import specific functions
 * import { getPopularMovies, getMovieDetails } from '@/services';
 * 
 * // Import entire service modules
 * import * as moviesService from '@/services/moviesService';
 * import * as tvService from '@/services/tvService';
 */

// ============= Auth Service =============
export {
  signup,
  login,
  type SignupData,
  type LoginData,
  type AuthResponse,
  type ApiError,
} from "../features/auth/api/authService";

// ============= Movies Service =============
export {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getMovieDetails,
  getMovieCredits,
  getMovieReviews,
  getMovieRecommendations,
  getMovieSimilar,
  getMovieVideos,
  getMovieImages,
  getMovieWatchProviders,
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
} from "../features/movies/api/moviesService";

// ============= TV Service =============
export {
  getPopularTvShows,
  getTopRatedTvShows,
  getAiringTodayTvShows,
  getOnTheAirTvShows,
  getTVShowDetails,
  getTVCredits,
  getTVReviews,
  getTVRecommendations,
  getTVSimilar,
  getTVVideos,
  getTVImages,
  getTVWatchProviders,
  getTVSeasonDetails,
  getTVEpisodeDetails,
  getSeasonEpisodes,
  type TVDetailsResponse,
  type TVImagesResponse,
  type TVReviewsResponse,
  type TVVideosResponse,
  type TVSimilarResponse,
  type TVRecommendationsResponse,
  type TVWatchProvidersResponse,
  type TVExternalIds,
} from "../features/tv-shows/api/tvService";

// ============= Person Service =============
export {
  getPersonDetails,
  getPersonExternalIds,
  getPersonMovieCredits,
  getPersonTVCredits,
  getPersonCombinedCredits,
  getPersonImages,
  getPopularPeople,
  type PersonDetails,
  type PersonExternalIds,
  type PersonMovieCreditsResponse,
  type PersonTVCreditsResponse,
  type CombinedCredits,
  type PersonImagesResponse,
  type CastCredit,
  type CrewCredit,
  type PopularPeopleResponse,
} from "../features/people/api/personService";

// ============= Search Service =============
export {
  searchMovies,
  searchTvShows,
  searchPeople,
  multiSearch,
  type MovieSearchResponse,
  type TvSearchResponse,
  type PersonSearchResult,
  type PersonSearchResponse,
  type MultiSearchResult,
  type MultiSearchResponse,
} from "../features/search/api/searchService";

// ============= Discover Service =============
export {
  discoverMovies,
  discoverTvShows,
  getKidsMovies,
  getMediaByLanguage,
  getMovieGenres,
  getTvGenres,
  type DiscoverMoviesParams,
  type DiscoverTvParams,
  type Genre,
  type GenresResponse,
} from "../features/discover/api/discoverService";

// ============= Trending Service =============
export {
  getTrendingMoviesDay,
  getTrendingMoviesWeek,
  getTrendingTvShowsDay,
  getTrendingTvShowsWeek,
  getTrendingPeopleDay,
  getTrendingPeopleWeek,
  getStreamingPlatforms,
  type TrendingPerson,
  type TrendingPeopleResponse,
  type StreamingPlatform,
  type StreamingPlatformsResponse,
} from "../features/home/api/trendingService";

// ============= Company Service =============
export {
  getCompanyDetails,
  getCompanyMovies,
  type Company,
  type CompanyMoviesResponse,
} from "../features/discover/api/companyService";

// ============= Collection Service =============
export {
  getCollectionDetails,
  type Collection,
  type MoviePart,
} from "../features/discover/api/collectionService";

// ============= Network Service =============
export {
  getNetworkDetails,
  getNetworkTVSeries,
  type Network,
  type NetworkTVSeriesResponse,
} from "../features/discover/api/networkService";

// ============= Genre Service =============
export {
  discoverMoviesByGenre,
  discoverTvShowsByGenre,
  type DiscoverResponse,
} from "../features/discover/api/genreService";

// ============= Platform Service =============
export {
  getPlatformMovies,
  getPlatformTVShows,
  type PlatformContentResponse,
} from "../features/discover/api/platformService";

// Export all query hooks for easier imports
// Re-exports from feature directories

// Movie list hooks
export { default as usePopularMovies } from "../../features/movies/hooks/FetchPopularMovies";
export { default as useTopRatedMovies } from "../../features/movies/hooks/FetchTopRatedMovies";
export { default as useNowPlayingMovies } from "../../features/movies/hooks/FetchNowPlayingMovies";
export { default as useNowPlayingMoviesQuery } from "../../features/movies/hooks/FetchNowPlayingMoviesQuery";
export { default as useTrendingMoviesWeek } from "../../features/home/hooks/FetchTrendingMoviesWeek";
export { default as useTrendingMoviesDay } from "../../features/home/hooks/FetchTrendingMoviesDay";
export { default as useUpcomingMovies } from "../../features/movies/hooks/FetchUpcomingMovies";

// TV show list hooks
export { default as usePopularTvShows } from "../../features/tv-shows/hooks/FetchPopularTvShows";
export { default as useTrendingTvWeek } from "../../features/home/hooks/FetchTrendingTvWeek";
export { default as useTrendingTvDay } from "../../features/home/hooks/FetchTrendingTvDay";
export { default as useTopRatedTvShows } from "../../features/tv-shows/hooks/FetchTopRatedTvShows";
export { default as useAiringTodayTv } from "../../features/tv-shows/hooks/FetchAiringTodayTv";
export { default as useOnTheAirTv } from "../../features/tv-shows/hooks/FetchOnTheAirTv";

// Details hooks
export { default as FetchTvShowDetails } from "../../features/tv-shows/hooks/FetchTvShowDetails";
export { default as FetchTvSeasonDetails } from "../../features/tv-shows/hooks/FetchTvSeasonDetails";
export { default as FetchPersonDetails } from "../../features/people/hooks/FetchPersonDetails";
export { default as FetchPersonCredits } from "../../features/people/hooks/FetchPersonCredits";

// Movie detail sub-pages hooks
export { default as useMovieCredits } from "../../features/movies/hooks/FetchMovieCredits";
export { default as useMovieReviews } from "../../features/movies/hooks/FetchMovieReviews";
export { default as useMovieRecommendations } from "../../features/movies/hooks/FetchMovieRecommendations";
export { default as useMovieSimilar } from "../../features/movies/hooks/FetchMovieSimilar";
export { default as useMovieVideos } from "../../features/movies/hooks/FetchMovieVideos";
export { default as useMovieImages } from "../../features/movies/hooks/FetchMovieImages";
export { default as useMovieWatchProviders } from "../../features/movies/hooks/FetchMovieWatchProviders";

// TV detail sub-pages hooks
export { default as useTVCredits } from "../../features/tv-shows/hooks/FetchTVCredits";
export { default as useTVReviews } from "../../features/tv-shows/hooks/FetchTVReviews";
export { default as useTVRecommendations } from "../../features/tv-shows/hooks/FetchTVRecommendations";
export { default as useTVSimilar } from "../../features/tv-shows/hooks/FetchTVSimilar";
export { default as useTVVideos } from "../../features/tv-shows/hooks/FetchTVVideos";
export { default as useTVImages } from "../../features/tv-shows/hooks/FetchTVImages";
export { default as useTVWatchProviders } from "../../features/tv-shows/hooks/FetchTVWatchProviders";

// Person detail sub-pages hooks
export { usePersonMovieCredits, usePersonTVCredits } from "../../features/people/hooks/FetchPersonCreditsExtended";
export { default as usePersonImages } from "../../features/people/hooks/FetchPersonImages";

// Other hooks
export { default as useStreamingPlatforms } from "../../features/home/hooks/FetchStreamingPlatforms";
export { useSearch } from "../../features/search/hooks/FetchSearch";

// Auth hooks
export { useSignup, useLogin } from "../../features/auth/hooks/useAuth";

// Company hooks
export { useCompanyDetails, useCompanyMovies } from "../../features/discover/hooks/useCompany";

// Collection hooks
export { useCollectionDetails } from "../../features/discover/hooks/useCollection";

// Network hooks
export { useNetworkDetails, useNetworkTVSeries } from "../../features/discover/hooks/useNetwork";

// Genre hooks
export { useMovieGenres, useTvGenres, useMoviesByGenre, useTvShowsByGenre } from "../../features/discover/hooks/useGenre";

// Platform hooks
export { usePlatformMovies, usePlatformTVShows } from "../../features/discover/hooks/usePlatform";

// Search hooks
export { useMultiSearch } from "../../features/search/hooks/useMultiSearch";

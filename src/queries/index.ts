// Export all query hooks for easier imports

// Movie list hooks
export { default as usePopularMovies } from "./FetchPopularMovies";
export { default as useTopRatedMovies } from "./FetchTopRatedMovies";
export { default as useNowPlayingMovies } from "./FetchNowPlayingMovies";
export { default as useNowPlayingMoviesQuery } from "./FetchNowPlayingMoviesQuery";
export { default as useTrendingMoviesWeek } from "./FetchTrendingMoviesWeek";
export { default as useTrendingMoviesDay } from "./FetchTrendingMoviesDay";
export { default as useUpcomingMovies } from "./FetchUpcomingMovies";

// TV show list hooks
export { default as usePopularTvShows } from "./FetchPopularTvShows";
export { default as useTrendingTvWeek } from "./FetchTrendingTvWeek";
export { default as useTrendingTvDay } from "./FetchTrendingTvDay";
export { default as useTopRatedTvShows } from "./FetchTopRatedTvShows";
export { default as useAiringTodayTv } from "./FetchAiringTodayTv";
export { default as useOnTheAirTv } from "./FetchOnTheAirTv";

// Details hooks
export { default as FetchTvShowDetails } from "./FetchTvShowDetails";
export { default as FetchTvSeasonDetails } from "./FetchTvSeasonDetails";
export { default as FetchPersonDetails } from "./FetchPersonDetails";
export { default as FetchPersonCredits } from "./FetchPersonCredits";

// Movie detail sub-pages hooks
export { default as useMovieCredits } from "./FetchMovieCredits";
export { default as useMovieReviews } from "./FetchMovieReviews";
export { default as useMovieRecommendations } from "./FetchMovieRecommendations";
export { default as useMovieSimilar } from "./FetchMovieSimilar";
export { default as useMovieVideos } from "./FetchMovieVideos";
export { default as useMovieImages } from "./FetchMovieImages";
export { default as useMovieWatchProviders } from "./FetchMovieWatchProviders";

// TV detail sub-pages hooks
export { default as useTVCredits } from "./FetchTVCredits";
export { default as useTVReviews } from "./FetchTVReviews";
export { default as useTVRecommendations } from "./FetchTVRecommendations";
export { default as useTVSimilar } from "./FetchTVSimilar";
export { default as useTVVideos } from "./FetchTVVideos";
export { default as useTVImages } from "./FetchTVImages";
export { default as useTVWatchProviders } from "./FetchTVWatchProviders";

// Person detail sub-pages hooks
export { usePersonMovieCredits, usePersonTVCredits } from "./FetchPersonCreditsExtended";
export { default as usePersonImages } from "./FetchPersonImages";

// Other hooks
export { default as useStreamingPlatforms } from "./FetchStreamingPlatforms";
export { useSearch } from "./FetchSearch";

// Auth hooks
export { useSignup, useLogin } from "./useAuth";

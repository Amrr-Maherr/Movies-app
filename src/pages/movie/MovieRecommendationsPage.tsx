import { memo, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import { PageSkeleton, SectionSkeleton, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import FetchMovieDetails from "@/queries/FetchMovieDetails";
import { useMovieRecommendations } from "@/queries";
import DetailPageNav from "@/components/shared/DetailPageNav";
import RecommendationsSection from "@/components/sections/RecommendationsSection";
import { Heart, TrendingUp, Star } from "lucide-react";

/**
 * MovieRecommendationsPage Component
 * Dedicated page for displaying movie recommendations and similar titles
 * Route: /movie/:id/recommendations
 */
const MovieRecommendationsPage = memo(function MovieRecommendationsPage() {
  const { slugWithId } = useParams<{ slugWithId: string }>();
  const movieId = extractIdFromSlug(slugWithId);
  const numericId = Number(movieId);

  // Fetch movie details for metadata
  const {
    data: movieData,
    isLoading: movieLoading,
    error: movieError,
    refetch: refetchMovie,
  } = FetchMovieDetails(numericId);

  // Fetch recommendations
  const {
    data: recommendationsData,
    isLoading: recommendationsLoading,
    error: recommendationsError,
    refetch: refetchRecommendations,
  } = useMovieRecommendations(numericId);

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetchMovie();
    refetchRecommendations();
  }, [refetchMovie, refetchRecommendations]);

  // Memoized: Extract recommendations
  const recommendations = useMemo(() => {
    return recommendationsData?.results || [];
  }, [recommendationsData]);

  const isLoading = movieLoading || recommendationsLoading;
  const error = movieError || recommendationsError;

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error || !movieData) {
    return (
      <Error
        fullscreen
        title="Failed to load recommendations"
        message="We couldn't load the recommendation information. Please try again."
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      {/* SEO Meta Tags */}
      <HelmetMeta
        name={`${movieData.title} - Recommendations & Similar Movies`}
        description={`Discover movies similar to ${movieData.title}. Get personalized recommendations based on your preferences.`}
        image={
          movieData.poster_path
            ? `https://image.tmdb.org/t/p/original${movieData.poster_path}`
            : undefined
        }
        url={window.location.href}
        type="video.movie"
      />

      {/* Header Section */}
      <section className="bg-gradient-to-b from-black to-neutral-900 py-8 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Movie Poster */}
            <img
              src={`https://image.tmdb.org/t/p/w342${movieData.poster_path}`}
              alt={movieData.title}
              className="w-32 h-48 object-cover rounded-lg shadow-2xl"
            />

            {/* Movie Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {movieData.title}
              </h1>
              <p className="text-white/60 text-sm mb-4">
                {movieData.release_date?.substring(0, 4)} • {movieData.runtime}{" "}
                min •{" "}
                {movieData.genres
                  ?.slice(0, 3)
                  .map((g) => g.name)
                  .join(", ")}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-gradient-to-r from-red-600/20 to-red-600/10 px-4 py-2 rounded-lg border border-red-600/30">
                  <Heart className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-white font-bold">
                      {recommendations.length}
                    </p>
                    <p className="text-white/60 text-xs">Recommendations</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-white font-bold">
                      {movieData.vote_average.toFixed(1)}
                    </p>
                    <p className="text-white/60 text-xs">Rating</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-white font-bold">
                      {Math.round(movieData.popularity)}
                    </p>
                    <p className="text-white/60 text-xs">Popularity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <DetailPageNav type="movie" slugWithId={slugWithId || ""} />

      {/* Recommendations Section */}
      {recommendations.length > 0 ? (
        <>
          <section className="bg-black py-8">
            <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                  Recommended For You
                </h2>
                <p className="text-white/60 text-sm">
                  Based on {movieData.title} • {recommendations.length} movies
                </p>
              </div>
            </div>
          </section>

          <RecommendationsSection
            recommendations={recommendations}
            title="More Like This"
            variant="recommendations"
          />
        </>
      ) : (
        <section className="bg-black py-16">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl text-center">
            <Heart className="w-20 h-20 text-white/20 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              No Recommendations Available
            </h2>
            <p className="text-white/60 text-lg">
              We don't have enough data to recommend similar movies yet.
            </p>
          </div>
        </section>
      )}

      {/* Additional Info */}
      <section className="bg-black py-8 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl text-center">
          <p className="text-white/60 text-sm">
            💡 Recommendations are based on ratings, popularity, genres, and
            viewing patterns
          </p>
        </div>
      </section>
    </div>
  );
});

export default MovieRecommendationsPage;

import { memo, useMemo, useCallback, Suspense } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { PageSkeleton, SectionSkeleton, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import FetchMovieDetails from "@/queries/FetchMovieDetails";
import { useMovieRecommendations, useMovieSimilar } from "@/queries";
import DetailPageNav from "@/components/shared/DetailPageNav";
import RecommendationsSection from "@/components/sections/RecommendationsSection";

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
  } = useMovieRecommendations(numericId, 1);

  // Fetch similar movies
  const {
    data: similarData,
    isLoading: similarLoading,
    error: similarError,
    refetch: refetchSimilar,
  } = useMovieSimilar(numericId, 1);

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetchMovie();
    refetchRecommendations();
    refetchSimilar();
  }, [refetchMovie, refetchRecommendations, refetchSimilar]);

  // Memoized: Extract recommendations and similar
  const recommendations = useMemo(() => {
    return recommendationsData?.results || [];
  }, [recommendationsData]);

  const similar = useMemo(() => {
    return similarData?.results || [];
  }, [similarData]);

  const isLoading = movieLoading || recommendationsLoading || similarLoading;
  const error = movieError || recommendationsError || similarError;

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
        description={`Discover movies similar to ${movieData.title} on Netflix`}
        image={
          movieData.poster_path
            ? `https://image.tmdb.org/t/p/original${movieData.poster_path}`
            : undefined
        }
        url={window.location.href}
        type="video.movie"
      />

      {/* Header Section */}
      <section className="bg-black py-8 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          {/* Page Title */}
          <div className="flex items-center gap-4">
            <img
              src={`https://image.tmdb.org/t/p/w92${movieData.poster_path}`}
              alt={movieData.title}
              className="w-20 h-28 object-cover rounded-lg shadow-lg"
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {movieData.title}
              </h1>
              <p className="text-white/60 text-sm mb-2">
                {movieData.release_date?.substring(0, 4)} • {movieData.runtime}{" "}
                min
              </p>
              <div className="flex items-center gap-4">
                <span className="text-white/60 text-sm">
                  <span className="text-red-500 font-bold">
                    {recommendations.length}
                  </span>{" "}
                  Recommendations
                </span>
                <span className="text-white/60 text-sm">
                  <span className="text-yellow-500 font-bold">
                    {similar.length}
                  </span>{" "}
                  Similar Movies
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <DetailPageNav type="movie" slugWithId={slugWithId || ""} />

      {/* Recommendations Section */}
      <LazyWrapper height={500}>
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
          {recommendations.length > 0 && (
            <RecommendationsSection
              recommendations={recommendations}
              title="Recommended For You"
              variant="recommendations"
            />
          )}
        </Suspense>
      </LazyWrapper>

      {/* Similar Movies Section */}
      <LazyWrapper height={500}>
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
          {similar.length > 0 && (
            <RecommendationsSection
              recommendations={similar}
              title="Similar Movies"
              variant="similar"
            />
          )}
        </Suspense>
      </LazyWrapper>

      {/* Empty State */}
      {recommendations.length === 0 && similar.length === 0 && (
        <section className="bg-black py-12">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl text-center">
            <p className="text-white/60 text-lg">
              No recommendations or similar movies available yet.
            </p>
          </div>
        </section>
      )}
    </div>
  );
});

export default MovieRecommendationsPage;

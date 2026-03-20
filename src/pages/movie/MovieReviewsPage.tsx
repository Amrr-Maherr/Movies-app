import { memo, useMemo, useCallback, Suspense } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { PageSkeleton, SectionSkeleton, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import DetailHeader from "@/components/shared/DetailHeader";
import FetchMovieDetails from '@/hooks/shared/FetchMovieDetails';
import { useMovieReviews } from "@/hooks/shared";
import DetailPageNav from "@/components/shared/DetailPageNav";
import ReviewsSection from "@/components/sections/ReviewsSection";

/**
 * MovieReviewsPage Component
 * Dedicated page for displaying all movie reviews
 * Route: /movie/:id/reviews
 */
const MovieReviewsPage = memo(function MovieReviewsPage() {
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

  // Fetch movie reviews
  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    error: reviewsError,
    refetch: refetchReviews,
  } = useMovieReviews(numericId, 1);

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetchMovie();
    refetchReviews();
  }, [refetchMovie, refetchReviews]);

  // Memoized: Extract reviews
  const reviews = useMemo(() => {
    return (
      reviewsData?.results?.filter(
        (review) => review.author && review.content?.trim(),
      ) || []
    );
  }, [reviewsData]);

  const isLoading = movieLoading || reviewsLoading;
  const error = movieError || reviewsError;

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error || !movieData) {
    return (
      <Error
        fullscreen
        title="Failed to load reviews"
        message="We couldn't load the review information. Please try again."
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      {/* SEO Meta Tags */}
      <HelmetMeta
        name={`${movieData.title} - Reviews`}
        description={`Read user reviews for ${movieData.title} on Netflix`}
        image={
          movieData.poster_path
            ? `https://image.tmdb.org/t/p/original${movieData.poster_path}`
            : undefined
        }
        url={window.location.href}
        type="video.movie"
      />

      {/* Header Section */}
      <DetailHeader media={movieData} type="movie" />

      {/* Navigation Tabs */}
      <DetailPageNav type="movie" slugWithId={slugWithId || ""} />

      {/* Reviews Section */}
      <LazyWrapper height={600}>
        <Suspense fallback={<SectionSkeleton variant="list" cardCount={5} />}>
          {reviews.length > 0 ? (
            <ReviewsSection reviews={reviews} />
          ) : (
            <section className="bg-black py-12">
              <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl text-center">
                <p className="text-white/60 text-lg">
                  No reviews available for this movie yet.
                </p>
              </div>
            </section>
          )}
        </Suspense>
      </LazyWrapper>

      {/* Reviews Count Info */}
      {reviewsData && reviewsData.total_pages > 1 && (
        <section className="bg-black py-8 border-t border-white/10">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl text-center">
            <p className="text-white/60 text-sm">
              Showing page 1 of {reviewsData.total_pages} •{" "}
              {reviewsData.total_results} total reviews
            </p>
          </div>
        </section>
      )}
    </div>
  );
});

export default MovieReviewsPage;

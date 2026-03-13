import { memo, useMemo, useCallback, Suspense } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { PageSkeleton, SectionSkeleton, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import FetchTvShowDetails from "@/queries/FetchTvShowDetails";
import { useTVReviews } from "@/queries";
import DetailPageNav from "@/components/shared/DetailPageNav";
import ReviewsSection from "@/components/sections/ReviewsSection";

/**
 * TVReviewsPage Component
 * Dedicated page for displaying all TV show reviews
 * Route: /tv/:id/reviews
 */
const TVReviewsPage = memo(function TVReviewsPage() {
  const { slugWithId } = useParams<{ slugWithId: string }>();
  const tvId = extractIdFromSlug(slugWithId);
  const numericId = Number(tvId);

  // Fetch TV show details for metadata
  const {
    data: tvData,
    isLoading: tvLoading,
    error: tvError,
    refetch: refetchTv,
  } = FetchTvShowDetails(numericId);

  // Fetch TV reviews
  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    error: reviewsError,
    refetch: refetchReviews,
  } = useTVReviews(numericId, 1);

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetchTv();
    refetchReviews();
  }, [refetchTv, refetchReviews]);

  // Memoized: Extract reviews
  const reviews = useMemo(() => {
    return (
      reviewsData?.results?.filter(
        (review) => review.author && review.content?.trim(),
      ) || []
    );
  }, [reviewsData]);

  const isLoading = tvLoading || reviewsLoading;
  const error = tvError || reviewsError;

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error || !tvData) {
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
        name={`${tvData.name} - Reviews`}
        description={`Read user reviews for ${tvData.name} on Netflix`}
        image={
          tvData.poster_path
            ? `https://image.tmdb.org/t/p/original${tvData.poster_path}`
            : undefined
        }
        url={window.location.href}
        type="video.tv_series"
      />

      {/* Header Section */}
      <section className="bg-black py-8 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          {/* Page Title */}
          <div className="flex items-center gap-4">
            <img
              src={`https://image.tmdb.org/t/p/w92${tvData.poster_path}`}
              alt={tvData.name}
              className="w-20 h-28 object-cover rounded-lg shadow-lg"
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {tvData.name}
              </h1>
              <p className="text-white/60 text-sm mb-2">
                {tvData.first_air_date?.substring(0, 4)} •{" "}
                {tvData.number_of_seasons} Seasons
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">
                    {Math.round(tvData.vote_average * 10)}%
                  </span>
                  <span className="text-white/60 text-sm">Match Score</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 font-bold">
                    {tvData.vote_average.toFixed(1)}
                  </span>
                  <span className="text-white/60 text-sm">/ 10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <DetailPageNav type="tv" slugWithId={slugWithId || ""} />

      {/* Reviews Section */}
      <LazyWrapper height={600}>
        <Suspense fallback={<SectionSkeleton variant="list" cardCount={5} />}>
          {reviews.length > 0 ? (
            <ReviewsSection reviews={reviews} />
          ) : (
            <section className="bg-black py-12">
              <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl text-center">
                <p className="text-white/60 text-lg">
                  No reviews available for this TV show yet.
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

export default TVReviewsPage;

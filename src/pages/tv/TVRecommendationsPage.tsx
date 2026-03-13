import { memo, useMemo, useCallback, Suspense } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { PageSkeleton, SectionSkeleton, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import FetchTvShowDetails from "@/queries/FetchTvShowDetails";
import { useTVRecommendations, useTVSimilar } from "@/queries";
import DetailPageNav from "@/components/shared/DetailPageNav";
import RecommendationsSection from "@/components/sections/RecommendationsSection";

/**
 * TVRecommendationsPage Component
 * Dedicated page for displaying TV show recommendations and similar shows
 * Route: /tv/:id/recommendations
 */
const TVRecommendationsPage = memo(function TVRecommendationsPage() {
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

  // Fetch recommendations
  const {
    data: recommendationsData,
    isLoading: recommendationsLoading,
    error: recommendationsError,
    refetch: refetchRecommendations,
  } = useTVRecommendations(numericId, 1);

  // Fetch similar TV shows
  const {
    data: similarData,
    isLoading: similarLoading,
    error: similarError,
    refetch: refetchSimilar,
  } = useTVSimilar(numericId, 1);

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetchTv();
    refetchRecommendations();
    refetchSimilar();
  }, [refetchTv, refetchRecommendations, refetchSimilar]);

  // Memoized: Extract recommendations and similar
  const recommendations = useMemo(() => {
    return recommendationsData?.results || [];
  }, [recommendationsData]);

  const similar = useMemo(() => {
    return similarData?.results || [];
  }, [similarData]);

  const isLoading = tvLoading || recommendationsLoading || similarLoading;
  const error = tvError || recommendationsError || similarError;

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error || !tvData) {
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
        name={`${tvData.name} - Recommendations & Similar Shows`}
        description={`Discover TV shows similar to ${tvData.name} on Netflix`}
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
                  Similar Shows
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <DetailPageNav type="tv" slugWithId={slugWithId || ""} />

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

      {/* Similar TV Shows Section */}
      <LazyWrapper height={500}>
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
          {similar.length > 0 && (
            <RecommendationsSection
              recommendations={similar}
              title="Similar TV Shows"
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
              No recommendations or similar shows available yet.
            </p>
          </div>
        </section>
      )}
    </div>
  );
});

export default TVRecommendationsPage;

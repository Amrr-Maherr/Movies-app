import { memo, useMemo, useCallback, Suspense } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { PageSkeleton, SectionSkeleton, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import DetailHeader from "@/components/shared/DetailHeader";
import FetchTvShowDetails from "@/queries/FetchTvShowDetails";
import { useTVWatchProviders } from "@/queries";
import DetailPageNav from "@/components/shared/DetailPageNav";
import WatchProvidersDetail from "@/components/sections/WatchProvidersDetail";

/**
 * TVWatchProvidersPage Component
 * Dedicated page for displaying TV show streaming providers
 * Route: /tv/:id/watch
 */
const TVWatchProvidersPage = memo(function TVWatchProvidersPage() {
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

  // Fetch watch providers
  const {
    data: providersData,
    isLoading: providersLoading,
    error: providersError,
    refetch: refetchProviders,
  } = useTVWatchProviders(numericId, "US");

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetchTv();
    refetchProviders();
  }, [refetchTv, refetchProviders]);

  // Memoized: Extract US providers
  const usProviders = useMemo(() => {
    return providersData?.results?.US;
  }, [providersData]);

  const isLoading = tvLoading || providersLoading;
  const error = tvError || providersError;

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error || !tvData) {
    return (
      <Error
        fullscreen
        title="Failed to load streaming information"
        message="We couldn't load the streaming provider information. Please try again."
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      {/* SEO Meta Tags */}
      <HelmetMeta
        name={`${tvData.name} - Where to Watch`}
        description={`Stream ${tvData.name} on Netflix. Find all streaming options and providers.`}
        image={
          tvData.poster_path
            ? `https://image.tmdb.org/t/p/original${tvData.poster_path}`
            : undefined
        }
        url={window.location.href}
        type="video.tv_series"
      />

      {/* Header Section */}
      <DetailHeader
        media={tvData}
        providerCount={
          usProviders
            ? (usProviders.flatrate?.length || 0) +
              (usProviders.rent?.length || 0) +
              (usProviders.buy?.length || 0) +
              (usProviders.free?.length || 0)
            : 0
        }
        providers={usProviders}
        type="tv"
      />

      {/* Navigation Tabs */}
      <DetailPageNav type="tv" slugWithId={slugWithId || ""} />

      {/* Watch Providers Section */}
      <LazyWrapper height={600}>
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
          <WatchProvidersDetail
            providers={usProviders}
            region="US"
            title="Streaming Providers"
          />
        </Suspense>
      </LazyWrapper>

      {/* Additional Info */}
      <section className="bg-black py-8 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          <div className="bg-gradient-to-r from-red-600/20 to-red-600/5 rounded-xl p-6 border border-red-600/30">
            <h3 className="text-lg font-bold text-white mb-2">
              💡 Streaming Tips
            </h3>
            <ul className="text-white/70 text-sm space-y-2">
              <li>• Prices and availability may vary by region</li>
              <li>• Some providers offer free trials for new subscribers</li>
              <li>• Check provider apps for the latest content library</li>
              <li>• TV show seasons may be released on different schedules</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
});

export default TVWatchProvidersPage;

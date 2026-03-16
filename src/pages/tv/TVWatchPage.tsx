import { memo, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import { PageSkeleton, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import DetailHeader from "@/components/shared/DetailHeader";
import FetchTvShowDetails from "@/queries/FetchTvShowDetails";
import { useTVWatchProviders } from "@/queries";
import DetailPageNav from "@/components/shared/DetailPageNav";
import WatchProvidersDetail from "@/components/sections/WatchProvidersDetail";
import { Link as LinkIcon, Tv } from "lucide-react";

/**
 * TVWatchPage Component
 * Dedicated page for displaying where to watch a TV show
 * Route: /tv/:id/watch
 */
const TVWatchPage = memo(function TVWatchPage() {
  const { slugWithId } = useParams<{ slugWithId: string }>();
  const tvId = extractIdFromSlug(slugWithId);
  const numericId = Number(tvId);

  // Fetch TV show details for metadata
  const {
    data: tvData,
    isLoading: tvLoading,
    error: tvError,
    refetch: refetchTV,
  } = FetchTvShowDetails(numericId);

  // Fetch watch providers
  const {
    data: providersData,
    isLoading: providersLoading,
    error: providersError,
    refetch: refetchProviders,
  } = useTVWatchProviders(numericId);

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetchTV();
    refetchProviders();
  }, [refetchTV, refetchProviders]);

  // Memoized: Extract providers for US region
  const usProviders = useMemo(() => {
    return providersData?.results?.US;
  }, [providersData]);

  // Memoized: Count total providers
  const providerCount = useMemo(() => {
    if (!usProviders) return 0;
    return (
      (usProviders.flatrate?.length || 0) +
      (usProviders.rent?.length || 0) +
      (usProviders.buy?.length || 0) +
      (usProviders.free?.length || 0)
    );
  }, [usProviders]);

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
        description={`Stream, rent, or buy ${tvData.name} on Netflix. Find all streaming options in one place.`}
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
        providerCount={providerCount}
        providers={usProviders}
        type="tv"
      />

      {/* Navigation Tabs */}
      <DetailPageNav type="tv" slugWithId={slugWithId || ""} />

      {/* Streaming Providers Section */}
      {usProviders ? (
        <WatchProvidersDetail
          providers={usProviders}
          region="US"
          title="Streaming & Viewing Options"
        />
      ) : (
        <section className="bg-black py-16">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl text-center">
            <Tv className="w-20 h-20 text-white/20 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              No Streaming Information Available
            </h2>
            <p className="text-white/60 text-lg">
              We don't have streaming provider information for this TV show in
              your region yet.
            </p>
          </div>
        </section>
      )}

      {/* Additional Info */}
      <section className="bg-black py-8 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <LinkIcon className="w-4 h-4" />
            <p>
              Streaming options may vary by region. Prices and availability
              subject to change.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
});

export default TVWatchPage;

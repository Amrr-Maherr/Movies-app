import { memo, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import { PageSkeleton, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import FetchTvShowDetails from "@/queries/FetchTvShowDetails";
import { useTVWatchProviders } from "@/queries";
import DetailPageNav from "@/components/shared/DetailPageNav";
import WatchProvidersDetail from "@/components/sections/WatchProvidersDetail";
import { Tv, DollarSign, Gift, Link as LinkIcon } from "lucide-react";

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
      <section className="bg-gradient-to-b from-black to-neutral-900 py-8 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* TV Show Poster */}
            <img
              src={`https://image.tmdb.org/t/p/w342${tvData.poster_path}`}
              alt={tvData.name}
              className="w-32 h-48 object-cover rounded-lg shadow-2xl"
            />

            {/* TV Show Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {tvData.name}
              </h1>
              <p className="text-white/60 text-sm mb-4">
                {tvData.first_air_date?.substring(0, 4)} •{" "}
                {tvData.number_of_seasons}{" "}
                {tvData.number_of_seasons === 1 ? "Season" : "Seasons"} •{" "}
                {tvData.genres
                  ?.slice(0, 3)
                  .map((g) => g.name)
                  .join(", ")}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                  <Tv className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-white font-bold">{providerCount}</p>
                    <p className="text-white/60 text-xs">Providers</p>
                  </div>
                </div>
                {usProviders?.flatrate && (
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                    <Tv className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-white font-bold">
                        {usProviders.flatrate.length}
                      </p>
                      <p className="text-white/60 text-xs">Subscription</p>
                    </div>
                  </div>
                )}
                {usProviders?.rent && (
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                    <DollarSign className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-white font-bold">
                        {usProviders.rent.length}
                      </p>
                      <p className="text-white/60 text-xs">Rent</p>
                    </div>
                  </div>
                )}
                {usProviders?.buy && (
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                    <DollarSign className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="text-white font-bold">
                        {usProviders.buy.length}
                      </p>
                      <p className="text-white/60 text-xs">Buy</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

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

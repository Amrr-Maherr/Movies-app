import { memo, useMemo, useCallback, Suspense } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { PageSkeleton, SectionSkeleton, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import DetailHeader from "@/components/shared/DetailHeader";
import FetchMovieDetails from '@/hooks/shared/FetchMovieDetails';
import { useMovieWatchProviders } from "@/hooks/shared";
import DetailPageNav from "@/components/shared/DetailPageNav";
import WatchProvidersDetail from "@/components/sections/WatchProvidersDetail";

/**
 * MovieWatchProvidersPage Component
 * Dedicated page for displaying movie streaming providers
 * Route: /movie/:id/watch
 */
const MovieWatchProvidersPage = memo(function MovieWatchProvidersPage() {
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

  // Fetch watch providers
  const {
    data: providersData,
    isLoading: providersLoading,
    error: providersError,
    refetch: refetchProviders,
  } = useMovieWatchProviders(numericId, "US");

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetchMovie();
    refetchProviders();
  }, [refetchMovie, refetchProviders]);

  // Memoized: Extract US providers
  const usProviders = useMemo(() => {
    return providersData?.results?.US;
  }, [providersData]);

  const isLoading = movieLoading || providersLoading;
  const error = movieError || providersError;

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error || !movieData) {
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
        name={`${movieData.title} - Where to Watch`}
        description={`Stream ${movieData.title} on Netflix. Find all streaming options and providers.`}
        image={
          movieData.poster_path
            ? `https://image.tmdb.org/t/p/original${movieData.poster_path}`
            : undefined
        }
        url={window.location.href}
        type="video.movie"
      />

      {/* Header Section */}
      <DetailHeader
        media={movieData}
        providerCount={
          usProviders
            ? (usProviders.flatrate?.length || 0) +
              (usProviders.rent?.length || 0) +
              (usProviders.buy?.length || 0) +
              (usProviders.free?.length || 0)
            : 0
        }
        providers={usProviders}
        type="movie"
      />

      {/* Navigation Tabs */}
      <DetailPageNav type="movie" slugWithId={slugWithId || ""} />

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
              <li>• Rental purchases typically expire after 30 days</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
});

export default MovieWatchProvidersPage;

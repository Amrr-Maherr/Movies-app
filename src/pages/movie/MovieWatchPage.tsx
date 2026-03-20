import { memo, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import { PageSkeleton, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import DetailHeader from "@/components/shared/DetailHeader";
import FetchMovieDetails from '@/hooks/shared/FetchMovieDetails';
import { useMovieWatchProviders } from "@/hooks/shared";
import DetailPageNav from "@/components/shared/DetailPageNav";
import WatchProvidersDetail from "@/components/sections/WatchProvidersDetail";
import { Link as LinkIcon, Tv } from "lucide-react";

/**
 * MovieWatchPage Component
 * Dedicated page for displaying where to watch a movie
 * Route: /movie/:id/watch
 */
const MovieWatchPage = memo(function MovieWatchPage() {
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
  } = useMovieWatchProviders(numericId);

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetchMovie();
    refetchProviders();
  }, [refetchMovie, refetchProviders]);

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
        description={`Stream, rent, or buy ${movieData.title} on Netflix. Find all streaming options in one place.`}
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
        providerCount={providerCount}
        providers={usProviders}
        type="movie"
      />

      {/* Navigation Tabs */}
      <DetailPageNav type="movie" slugWithId={slugWithId || ""} />

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
              We don't have streaming provider information for this movie in
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

export default MovieWatchPage;

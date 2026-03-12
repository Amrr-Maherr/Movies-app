import { memo, useState, useCallback, lazy, Suspense, useMemo } from "react";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { LoadingFallback } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import MovieFilters, { MovieFilterOption } from "@/components/shared/MovieFilters";
import MediaGridSkeleton from "@/components/shared/MediaGridSkeleton";
import type { Movie, HeroMedia } from "@/types";

// Hooks
import usePopularMovies from "@/queries/FetchPopularMovies";
import useTopRatedMovies from "@/queries/FetchTopRatedMovies";
import useNowPlayingMovies from "@/queries/FetchNowPlayingMovies";
import useUpcomingMovies from "@/queries/FetchUpcomingMovies";

const HeroSection = lazy(() => import("@/components/shared/heroSection/HeroSection"));
const MediaGrid = lazy(() => import("@/components/shared/MediaGrid"));

const Movie = memo(function Movie() {
  const [activeFilter, setActiveFilter] = useState<MovieFilterOption>("popular");

  const popularQuery = usePopularMovies();
  const topRatedQuery = useTopRatedMovies(1);
  const nowPlayingQuery = useNowPlayingMovies(1);
  const upcomingQuery = useUpcomingMovies(1);

  const getCurrentQuery = useCallback(() => {
    switch (activeFilter) {
      case "topRated":
        return topRatedQuery;
      case "nowPlaying":
        return nowPlayingQuery;
      case "upcoming":
        return upcomingQuery;
      case "popular":
      default:
        return popularQuery;
    }
  }, [activeFilter, popularQuery, topRatedQuery, nowPlayingQuery, upcomingQuery]);

  const currentQuery = getCurrentQuery();
  const { data: movies, isLoading, error, refetch } = currentQuery;

  // Memoized: Pre-computed movies array
  const moviesData = useMemo(() => (movies || []) as unknown as HeroMedia[], [movies]);

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  // FIX #6: Memoized filter change handler to prevent re-creation on every render
  // This prevents MovieFilters from re-rendering unnecessarily
  const handleFilterChange = useCallback((filter: MovieFilterOption) => {
    setActiveFilter(filter);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background-primary)] page-transition">
      <HelmetMeta
        name="Movies"
        description="Movies move us like nothing else can, whether they're scary, funny, dramatic, romantic or anywhere in-between."
      />

      <Suspense fallback={<LoadingFallback />}>
        <LazyWrapper height={400}>
          <HeroSection
            data={moviesData as Movie[] | undefined}
            isLoading={isLoading}
            error={error}
            onRetry={handleRetry}
          />
        </LazyWrapper>
      </Suspense>

      <div className="px-4 sm:px-8 mb-6 mt-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Movies</h1>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl">
          Movies move us like nothing else can, whether they&apos;re scary, funny, dramatic, romantic or anywhere in-between.
        </p>
      </div>

      <LazyWrapper height={250}>
        <MovieFilters activeFilter={activeFilter} onFilterChange={handleFilterChange} />
      </LazyWrapper>

      {error ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <p className="text-xl text-[var(--error)] font-medium mb-4">
            Failed to load Movies. Please try again.
          </p>
          <button
            onClick={handleRetry}
            className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-white/80 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : (
        <LazyWrapper height={500}>
          {isLoading ? (
            <div className="fade-in">
              <MediaGridSkeleton />
            </div>
          ) : (
            <Suspense fallback={<LoadingFallback />}>
              <div className="slide-up">
                <MediaGrid items={moviesData} emptyMessage="No Movies found for this filter." />
              </div>
            </Suspense>
          )}
        </LazyWrapper>
      )}
    </div>
  );
});

export default Movie;

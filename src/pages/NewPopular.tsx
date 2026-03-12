import { memo, useState, useCallback, lazy, Suspense, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { LoadingFallback } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import NewPopularFilters, { NewPopularFilterOption } from "@/components/shared/NewPopularFilters";
import MediaGridSkeleton from "@/components/shared/MediaGridSkeleton";
import type { HeroMedia } from "@/types";

// Hooks
import useTrendingMoviesWeek from "@/queries/FetchTrendingMoviesWeek";
import useTrendingTvWeek from "@/queries/FetchTrendingTvWeek";
import useNowPlayingMovies from "@/queries/FetchNowPlayingMovies";
import usePopularMovies from "@/queries/FetchPopularMovies";

const HeroSection = lazy(() => import("@/components/shared/heroSection/HeroSection"));
const MediaGrid = lazy(() => import("@/components/shared/MediaGrid"));

const NewPopular = memo(function NewPopular() {
  const [activeFilter, setActiveFilter] = useState<NewPopularFilterOption>("trendingMovies");

  const trendingMoviesQuery = useTrendingMoviesWeek(1);
  const trendingTvQuery = useTrendingTvWeek(1);
  const nowPlayingQuery = useNowPlayingMovies(1);
  const popularMoviesQuery = usePopularMovies();

  const getCurrentQuery = useCallback(() => {
    switch (activeFilter) {
      case "trendingTv":
        return trendingTvQuery;
      case "nowPlaying":
        return nowPlayingQuery;
      case "popularMovies":
        return popularMoviesQuery;
      case "trendingMovies":
      default:
        return trendingMoviesQuery;
    }
  }, [activeFilter, trendingMoviesQuery, trendingTvQuery, nowPlayingQuery, popularMoviesQuery]);

  const currentQuery = getCurrentQuery();
  const { data: mediaItems, isLoading, error, refetch } = currentQuery;

  // Memoized: Pre-computed mediaItems array
  const mediaData = useMemo(() => (mediaItems || []) as unknown as HeroMedia[], [mediaItems]);

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  // FIX #6: Memoized filter change handler to prevent re-creation on every render
  // This prevents NewPopularFilters from re-rendering unnecessarily
  const handleFilterChange = useCallback((filter: NewPopularFilterOption) => {
    setActiveFilter(filter);
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-[var(--background-primary)]"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <HelmetMeta
        name="New & Popular"
        description="See what's trending, highly anticipated, and making waves right now on Netflix."
      />

      <Suspense fallback={<LoadingFallback />}>
        <LazyWrapper height={400}>
          <HeroSection
            data={mediaData as HeroMedia[] | undefined}
            isLoading={isLoading}
            error={error}
            onRetry={handleRetry}
          />
        </LazyWrapper>
      </Suspense>

      <div className="px-4 sm:px-8 mb-6 mt-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">New & Popular</h1>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl">
          See what&apos;s trending, highly anticipated, and making waves right now.
        </p>
      </div>

      <LazyWrapper height={250}>
        <NewPopularFilters activeFilter={activeFilter} onFilterChange={handleFilterChange} />
      </LazyWrapper>

      {error ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <p className="text-xl text-[var(--error)] font-medium mb-4">
            Failed to load New & Popular titles. Please try again.
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
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MediaGridSkeleton />
              </motion.div>
            ) : (
              <Suspense fallback={<LoadingFallback />}>
                <motion.div
                  key={`grid-${activeFilter}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <MediaGrid items={mediaData} emptyMessage="No titles found for this filter." />
                </motion.div>
              </Suspense>
            )}
          </AnimatePresence>
        </LazyWrapper>
      )}
    </motion.div>
  );
});

export default NewPopular;

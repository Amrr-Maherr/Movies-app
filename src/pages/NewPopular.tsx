import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLazyLoad } from "@/hooks/useLazyLoad";
import NewPopularFilters, { NewPopularFilterOption } from "@/components/shared/NewPopularFilters";
import MediaGrid from "@/components/shared/MediaGrid";
import MediaGridSkeleton from "@/components/shared/MediaGridSkeleton";
import HeroSection from "@/components/shared/heroSection/HeroSection";
import type { HeroMedia } from "@/types";

// Hooks
import useTrendingMoviesWeek from "@/queries/FetchTrendingMoviesWeek";
import useTrendingTvWeek from "@/queries/FetchTrendingTvWeek";
import useNowPlayingMovies from "@/queries/FetchNowPlayingMovies";
import usePopularMovies from "@/queries/FetchPopularMovies";

export default function NewPopular() {
  const [activeFilter, setActiveFilter] = useState<NewPopularFilterOption>("trendingMovies");

  // Call all hooks (react-query caches perfectly)
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

  const { data: mediaItems, isLoading, error, refetch } = getCurrentQuery();

  // Lazy load hooks for each section
  const { ref: heroRef, isVisible: heroVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: titleRef, isVisible: titleVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: filtersRef, isVisible: filtersVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: gridRef, isVisible: gridVisible } = useLazyLoad<HTMLDivElement>();

  return (
    <motion.div
      className="min-h-screen bg-[var(--background-primary)]"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div ref={heroRef}>
        {heroVisible && (
          <HeroSection
            data={mediaItems as HeroMedia[] | undefined}
            isLoading={isLoading}
            error={error}
            onRetry={refetch}
          />
        )}
      </div>

      <div ref={titleRef} className="px-4 sm:px-8 mb-6 mt-8">
        {titleVisible && (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">New & Popular</h1>
            <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl">
              See what&apos;s trending, highly anticipated, and making waves right now.
            </p>
          </>
        )}
      </div>

      <div ref={filtersRef}>
        {filtersVisible && (
          <NewPopularFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        )}
      </div>

      {error ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <p className="text-xl text-[var(--error)] font-medium mb-4">
            Failed to load New & Popular titles. Please try again.
          </p>
          <button
            onClick={() => refetch()}
            className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-white/80 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : (
        <div ref={gridRef} className="mt-4">
          {gridVisible && (
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
                <motion.div
                  key={`grid-${activeFilter}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <MediaGrid items={(mediaItems || []) as unknown as HeroMedia[]} emptyMessage="No titles found for this filter." />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      )}
    </motion.div>
  );
}

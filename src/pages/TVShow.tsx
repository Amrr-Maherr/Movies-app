import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLazyLoad } from "@/hooks/useLazyLoad";
import TVShowFilters, { TVShowFilterOption } from "@/components/shared/TVShowFilters";
import MediaGrid from "@/components/shared/MediaGrid";
import MediaGridSkeleton from "@/components/shared/MediaGridSkeleton";
import HeroSection from "@/components/shared/heroSection/HeroSection";
import type { TvShow, HeroMedia } from "@/types";

// Hooks
import usePopularTvShows from "@/queries/FetchPopularTvShows";
import useTopRatedTvShows from "@/queries/FetchTopRatedTvShows";
import useAiringTodayTv from "@/queries/FetchAiringTodayTv";
import useOnTheAirTv from "@/queries/FetchOnTheAirTv";

export default function TVShow() {
  const [activeFilter, setActiveFilter] = useState<TVShowFilterOption>("popular");

  // Call all hooks (they will be disabled via `enabled` feature if configured, but react-query caches perfectly)
  const popularQuery = usePopularTvShows(1);
  const topRatedQuery = useTopRatedTvShows(1);
  const airingTodayQuery = useAiringTodayTv(1);
  const onTheAirQuery = useOnTheAirTv(1);

  const getCurrentQuery = useCallback(() => {
    switch (activeFilter) {
      case "topRated":
        return topRatedQuery;
      case "airingToday":
        return airingTodayQuery;
      case "onTheAir":
        return onTheAirQuery;
      case "popular":
      default:
        return popularQuery;
    }
  }, [activeFilter, popularQuery, topRatedQuery, airingTodayQuery, onTheAirQuery]);

  const { data: tvShows, isLoading, error, refetch } = getCurrentQuery();

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
            data={tvShows as TvShow[] | undefined}
            isLoading={isLoading}
            error={error}
            onRetry={refetch}
          />
        )}
      </div>

      <div ref={titleRef} className="px-4 sm:px-8 mb-6 mt-8">
        {titleVisible && (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">TV Shows</h1>
            <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl">
              Browse the most popular, highly-rated, and currently airing TV series.
            </p>
          </>
        )}
      </div>

      <div ref={filtersRef}>
        {filtersVisible && (
          <TVShowFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        )}
      </div>

      {error ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <p className="text-xl text-[var(--error)] font-medium mb-4">
            Failed to load TV Shows. Please try again.
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
                  <MediaGrid items={(tvShows || []) as unknown as HeroMedia[]} emptyMessage="No TV Shows found for this filter." />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      )}
    </motion.div>
  );
}

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import HelmetMeta from "@/components/shared/HelmetMeta";
import MovieFilters, { MovieFilterOption } from "@/components/shared/MovieFilters";
import MediaGrid from "@/components/shared/MediaGrid";
import MediaGridSkeleton from "@/components/shared/MediaGridSkeleton";
import HeroSection from "@/components/shared/heroSection/HeroSection";
import type { Movie, HeroMedia } from "@/types";

// Hooks
import usePopularMovies from "@/queries/FetchPopularMovies";
import useTopRatedMovies from "@/queries/FetchTopRatedMovies";
import useNowPlayingMovies from "@/queries/FetchNowPlayingMovies";
import useUpcomingMovies from "@/queries/FetchUpcomingMovies";

export default function Movie() {
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

  const { data: movies, isLoading, error, refetch } = getCurrentQuery();

  return (
    <motion.div
      className="min-h-screen bg-[var(--background-primary)]"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <HelmetMeta
        name="Movies"
        description="Movies move us like nothing else can, whether they're scary, funny, dramatic, romantic or anywhere in-between."
      />

      <LazyWrapper height={400}>
        <HeroSection
          data={movies as Movie[] | undefined}
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
        />
      </LazyWrapper>

      <div className="px-4 sm:px-8 mb-6 mt-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Movies</h1>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl">
          Movies move us like nothing else can, whether they&apos;re scary, funny, dramatic, romantic or anywhere in-between.
        </p>
      </div>

      <LazyWrapper>
        <MovieFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </LazyWrapper>

      {error ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <p className="text-xl text-[var(--error)] font-medium mb-4">
            Failed to load Movies. Please try again.
          </p>
          <button
            onClick={() => refetch()}
            className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-white/80 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : (
        <LazyWrapper>
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
                <MediaGrid items={(movies || []) as unknown as HeroMedia[]} emptyMessage="No Movies found for this filter." />
              </motion.div>
            )}
          </AnimatePresence>
        </LazyWrapper>
      )}
    </motion.div>
  );
}

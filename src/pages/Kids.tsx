import { motion, AnimatePresence } from "framer-motion";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import MediaGrid from "@/components/shared/MediaGrid";
import MediaGridSkeleton from "@/components/shared/MediaGridSkeleton";
import HeroSection from "@/components/shared/heroSection/HeroSection";
import type { Movie, HeroMedia } from "@/types";

// Hooks
import useKidsMovies from "@/queries/FetchKidsMovies";

export default function Kids() {
  const { data: movies, isLoading, error, refetch } = useKidsMovies(1);

  return (
    <motion.div
      className="min-h-screen bg-[var(--background-primary)]"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <LazyWrapper threshold={0.01} rootMargin="100px" height={400}>
        <HeroSection
          data={movies as Movie[] | undefined}
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
        />
      </LazyWrapper>

      <div className="px-4 sm:px-8 mb-6 mt-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Kids & Family</h1>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl">
          Discover movies that are perfect for the whole family.
        </p>
      </div>

      {error ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <p className="text-xl text-[var(--error)] font-medium mb-4">
            Failed to load Kids Movies. Please try again.
          </p>
          <button
            onClick={() => refetch()}
            className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-white/80 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : (
        <LazyWrapper threshold={0.01} rootMargin="200px">
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
                key="grid-kids"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MediaGrid items={(movies || []) as unknown as HeroMedia[]} emptyMessage="No Kids Movies found." />
              </motion.div>
            )}
          </AnimatePresence>
        </LazyWrapper>
      )}
    </motion.div>
  );
}

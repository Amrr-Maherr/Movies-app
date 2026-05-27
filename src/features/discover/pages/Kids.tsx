import { memo, lazy, Suspense, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { OptimizedSectionWrapper } from "@/components/optimized-section-wrapper";
import { SectionSkeleton } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import type { Movie, HeroMedia } from "@/types";

// Hooks
import useKidsMovies from "@/features/discover/hooks/FetchKidsMovies";

const HeroSection = lazy(
  () => import("@/components/shared/heroSection/HeroSection"),
);
const MediaGrid = lazy(() => import("@/components/shared/MediaGrid"));

const Kids = memo(function Kids() {
  const { t } = useTranslation();
  const { data: movies, isLoading, error, refetch } = useKidsMovies(1);

  // Memoized: Pre-computed movies array
  const moviesData = useMemo(
    () => (movies || []) as unknown as HeroMedia[],
    [movies],
  );

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      <HelmetMeta
        name={t('discover:kids')}
        description="Discover movies that are perfect for the whole family on Netflix."
      />

      <OptimizedSectionWrapper
        data={moviesData}
        isLoading={isLoading}
        fallback={<SectionSkeleton variant="hero" />}
        height="100dvh"
        title="Hero Section"
      >
        {(data) => (
          <HeroSection
            data={data as Movie[] | undefined}
            isLoading={isLoading}
            error={error}
            onRetry={handleRetry}
          />
        )}
      </OptimizedSectionWrapper>

      <div className="container !mb-6 !mt-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          {t('discover:kids')}
        </h1>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl">
          Discover movies that are perfect for the whole family.
        </p>
      </div>

      {error ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <p className="text-xl text-[var(--error)] font-medium mb-4">
            {t('common:errors.somethingWentWrong')}
          </p>
          <button
            onClick={handleRetry}
            className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-white/80 transition-colors"
          >
            {t('common:common.retry')}
          </button>
        </div>
      ) : (
        <OptimizedSectionWrapper
          data={true}
          isLoading={false}
          fallback={<SectionSkeleton variant="grid" cardCount={12} />}
          height={500}
          title="Kids Movies Grid"
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <SectionSkeleton variant="grid" cardCount={12} />
            ) : (
              <motion.div
                key="grid-kids"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MediaGrid
                  items={moviesData}
                  emptyMessage={t('common:common.noData')}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </OptimizedSectionWrapper>
      )}
    </div>
  );
});

export default Kids;

import { useState, memo, useMemo, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { SectionSkeleton } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import Pagination from "@/components/Pagination";
import type { HeroMedia } from "@/types";
import useMediaByLanguage from '@/hooks/shared/FetchMediaByLanguage';
import LanguagesFilter, {
  SUPPORTED_LANGUAGES,
} from "@/components/BrowseByLanguages/LanguagesFilter";

const MediaGrid = lazy(() => import("@/components/shared/MediaGrid"));

const BrowseByLanguages = memo(function BrowseByLanguages() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    SUPPORTED_LANGUAGES[0].code,
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isLoading, error, refetch, isFetching } = useMediaByLanguage(
    selectedLanguage,
    currentPage,
  );

  const handleLanguageSelect = useCallback((code: string) => {
    setSelectedLanguage(code);
    setCurrentPage(1); // Reset to first page when language changes
  }, []);

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const totalPages = data?.total_pages ?? 1;
  const allItems = useMemo(() => data?.results || [], [data]);

  return (
    <div className="min-h-screen bg-[var(--background-primary)] pt-24 container">
      <HelmetMeta
        name="Browse by Languages"
        description="Discover movies and TV shows based on their original language on Netflix."
      />

      <LazyWrapper height={150}>
        <>
          <div className="container my-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Browse by Languages
            </h1>
            <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl">
              Discover movies and TV shows based on their original language.
            </p>
          </div>
        </>
      </LazyWrapper>

      {/* Language Filter Tags */}
      <LazyWrapper height={100}>
        <LanguagesFilter
          selectedLanguage={selectedLanguage}
          onLanguageSelect={handleLanguageSelect}
        />
      </LazyWrapper>

      {error ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <p className="text-xl text-[var(--error)] font-medium mb-4">
            Failed to load content for the selected language. Please try again.
          </p>
          <button
            onClick={handleRetry}
            className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-white/80 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <LazyWrapper height={600}>
            <AnimatePresence mode="wait">
              {isLoading ? (
                <SectionSkeleton variant="grid" cardCount={12} />
              ) : (
                <Suspense
                  fallback={<SectionSkeleton variant="grid" cardCount={12} />}
                >
                  <motion.div
                    key={`grid-lang-${selectedLanguage}-${currentPage}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MediaGrid
                      items={allItems as unknown as HeroMedia[]}
                      emptyMessage="No content available for this language."
                    />
                  </motion.div>
                </Suspense>
              )}
            </AnimatePresence>
          </LazyWrapper>

          {/* Pagination Component */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            isLoading={isFetching}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
});

export default BrowseByLanguages;

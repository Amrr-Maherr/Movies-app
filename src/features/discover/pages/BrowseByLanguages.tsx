import { useState, memo, useMemo, useCallback } from "react";
import { motion as motionFramer, AnimatePresence as AnimatePresenceFramer } from "framer-motion";
import { SectionSkeleton } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import Pagination from "@/components/shared/Pagination";
import type { HeroMedia } from "@/types";
import useMediaByLanguage from "@/features/discover/hooks/FetchMediaByLanguage";
import LanguagesFilter, {
  SUPPORTED_LANGUAGES,
} from "@/features/discover/components/LanguagesFilter";
import { OptimizedSectionWrapper } from "@/components/optimized-section-wrapper";
import MediaGrid from "@/components/shared/MediaGrid";

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

      <OptimizedSectionWrapper
        data={true}
        isLoading={false}
        fallback={<div className="h-[150px] animate-pulse bg-white/5" />}
        height={150}
        title="Header"
      >
        <div className="container my-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Browse by Languages
          </h1>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl">
            Discover movies and TV shows based on their original language.
          </p>
        </div>
      </OptimizedSectionWrapper>

      {/* Language Filter Tags */}
      <OptimizedSectionWrapper
        data={true}
        isLoading={false}
        fallback={<div className="h-[100px] animate-pulse bg-white/5" />}
        height={100}
        title="Languages Filter"
      >
        <LanguagesFilter
          selectedLanguage={selectedLanguage}
          onLanguageSelect={handleLanguageSelect}
        />
      </OptimizedSectionWrapper>

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
          <OptimizedSectionWrapper
            data={allItems.length > 0 ? allItems : null}
            isLoading={isLoading}
            fallback={<SectionSkeleton variant="grid" cardCount={12} />}
            height={600}
            title="Language Media Grid"
            isEmptyFallback={
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <p className="text-xl text-white/60 font-medium">
                  No content available for this language.
                </p>
              </div>
            }
          >
            {(items) => (
              <AnimatePresenceFramer mode="wait">
                <motionFramer.div
                  key={`grid-lang-${selectedLanguage}-${currentPage}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <MediaGrid
                    items={items as unknown as HeroMedia[]}
                    emptyMessage="No content available for this language."
                  />
                </motionFramer.div>
              </AnimatePresenceFramer>
            )}
          </OptimizedSectionWrapper>

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

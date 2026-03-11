import { useState, memo, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import InfiniteScroll from "react-infinite-scroll-component";
import MediaGrid from "@/components/shared/MediaGrid";
import MediaGridSkeleton from "@/components/shared/MediaGridSkeleton";
import type { HeroMedia } from "@/types";
import useMediaByLanguage from "@/queries/FetchMediaByLanguage";
import LanguagesFilter, { SUPPORTED_LANGUAGES } from "@/components/BrowseByLanguages/LanguagesFilter";
import { Loader } from "@/components/ui";

const BrowseByLanguages = memo(function BrowseByLanguages() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(SUPPORTED_LANGUAGES[0].code);
  const {
    data,
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage
  } = useMediaByLanguage(selectedLanguage);

  const handleLanguageSelect = useCallback((code: string) => {
    setSelectedLanguage(code);
  }, []);

  const allItems = useMemo(() =>
    data?.pages.flatMap((page) => page.results) || [],
    [data]
  );

  return (
    <motion.div
      className="min-h-screen bg-[var(--background-primary)] pt-24"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <LazyWrapper>
        <>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Browse by Languages</h1>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl">
            Discover movies and TV shows based on their original language.
          </p>
        </>
      </LazyWrapper>

      {/* Language Filter Tags */}
      <LazyWrapper>
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
                key={`grid-lang-${selectedLanguage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <InfiniteScroll
                  dataLength={allItems.length}
                  next={fetchNextPage}
                  hasMore={!!hasNextPage}
                  loader={
                    <div className="h-24 flex items-center justify-center w-full">
                      <Loader />
                    </div>
                  }
                  endMessage={
                    <div className="py-10 text-center text-[var(--text-secondary)]">
                      <p>You&apos;ve reached the end of the list.</p>
                    </div>
                  }
                  style={{ overflow: "hidden" }}
                  scrollThreshold={0.9}
                >
                  <MediaGrid
                    items={allItems as unknown as HeroMedia[]}
                    emptyMessage="No content available for this language."
                  />
                </InfiniteScroll>
              </motion.div>
            )}
          </AnimatePresence>
        </LazyWrapper>
      )}
    </motion.div>
  );
});

export default BrowseByLanguages;

import { useState, memo, useMemo, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { SectionSkeleton } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import InfiniteScroll from "react-infinite-scroll-component";
import usePopularPeople from "@/queries/FetchPopularPeople";

const PeopleFiltersLazy = lazy(() => import("@/components/Actors/PeopleFilters"));
const MediaGrid = lazy(() => import("@/components/shared/MediaGrid"));



const ActorsPage = memo(function ActorsPage() {
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedLetter, setSelectedLetter] = useState<string>("all");

  const {
    data,
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage
  } = usePopularPeople();

  const handleGenderSelect = useCallback((gender: string) => {
    setSelectedGender(gender);
  }, []);

  const handleLetterSelect = useCallback((letter: string) => {
    setSelectedLetter(letter);
  }, []);

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  const allItems = useMemo(() => {
    let items = data?.pages.flatMap((page) => page.results) || [];

    if (selectedGender !== "all") {
      items = items.filter((person) => person.gender.toString() === selectedGender);
    }

    if (selectedLetter !== "all") {
      items = items.filter((person) =>
        person.name.toUpperCase().startsWith(selectedLetter)
      );
    }

    return items;
  }, [data, selectedGender, selectedLetter]);

  return (
    <div className="min-h-screen bg-[var(--background-primary)] pt-24">
      <HelmetMeta
        name="Popular Actors"
        description="Explore the most popular actors and celebrities in the industry today on Netflix."
      />

      {/* Header Section */}
      <div className="px-4 sm:px-8 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Popular Actors
        </h1>
        <p className="text-[var(--text-secondary)] text-sm md:text-lg max-w-3xl leading-relaxed">
          Explore the most popular actors and celebrities in the industry today.
        </p>
      </div>

      {/* Filters Section */}
      <LazyWrapper height={100}>
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={1} />}>
          <PeopleFiltersLazy
            selectedGender={selectedGender}
            onGenderSelect={handleGenderSelect}
            selectedLetter={selectedLetter}
            onLetterSelect={handleLetterSelect}
          />
        </Suspense>
      </LazyWrapper>

      {error ? (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
          <p className="text-xl text-[var(--error)] font-semibold mb-6">
            Something went wrong while fetching actors. Please check your
            connection.
          </p>
          <button
            onClick={handleRetry}
            className="px-8 py-3 bg-white text-black font-bold rounded-md hover:bg-gray-200 transition-all hover:scale-105 shadow-xl"
          >
            Try Again
          </button>
        </div>
      ) : (
        <LazyWrapper height={600}>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <SectionSkeleton variant="grid" cardCount={12} />
            ) : (
              <motion.div
                key={`grid-actors-${selectedGender}-${selectedLetter}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <InfiniteScroll
                  dataLength={allItems.length}
                  next={fetchNextPage}
                  hasMore={!!hasNextPage}
                  loader={
                    isLoading ? (
                      <div className="py-10 flex items-center justify-center w-full">
                        <SectionSkeleton variant="grid" cardCount={6} />
                      </div>
                    ) : null
                  }
                  endMessage={
                    <div className="py-16 text-center text-[var(--text-secondary)] border-t border-zinc-800/50 mt-10">
                      <p className="text-lg font-medium italic">
                        You&apos;ve explored all the popular stars!
                      </p>
                    </div>
                  }
                  style={{ overflow: "hidden" }}
                  scrollThreshold={0.8}
                >
                  <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
                    <MediaGrid
                      items={allItems}
                      type="person"
                      emptyMessage={
                        !isLoading && allItems.length === 0
                          ? "No actors match your current filters. Try adjust them!"
                          : ""
                      }
                    />
                  </Suspense>
                </InfiniteScroll>
              </motion.div>
            )}
          </AnimatePresence>
        </LazyWrapper>
      )}
    </div>
  );
});

export default ActorsPage;

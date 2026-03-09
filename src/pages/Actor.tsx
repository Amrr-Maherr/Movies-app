import { useState, memo, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import MediaGrid from "@/components/shared/MediaGrid";
import MediaGridSkeleton from "@/components/shared/MediaGridSkeleton";
import usePopularPeople from "@/queries/FetchPopularPeople";
import PeopleFilters from "@/components/Actors/PeopleFilters";
import { Loader } from "@/components/ui";

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

  // Flatten and filter items
  const allItems = useMemo(() => {
    let items = data?.pages.flatMap((page) => page.results) || [];

    // Client-side filtering as TMDB popular people endpoint has limited filters
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
    <motion.div
      className="min-h-screen bg-[var(--background-primary)] pt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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
      <PeopleFilters
        selectedGender={selectedGender}
        onGenderSelect={handleGenderSelect}
        selectedLetter={selectedLetter}
        onLetterSelect={handleLetterSelect}
      />

      {error ? (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
          <p className="text-xl text-[var(--error)] font-semibold mb-6">
            Something went wrong while fetching actors. Please check your
            connection.
          </p>
          <button
            onClick={() => refetch()}
            className="px-8 py-3 bg-white text-black font-bold rounded-md hover:bg-gray-200 transition-all hover:scale-105 shadow-xl"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="pb-20">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <MediaGridSkeleton />
              </motion.div>
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
                        <Loader size="lg" />
                      </div>
                    ) : null
                  }
                  endMessage={
                    <div className="py-16 text-center text-[var(--text-secondary)] border-t border-zinc-800/50 mt-10">
                      <p className="text-lg font-medium italic">
                        You've explored all the popular stars!
                      </p>
                    </div>
                  }
                  style={{ overflow: "hidden" }}
                  scrollThreshold={0.8}
                >
                  <MediaGrid
                    items={allItems}
                    type="person"
                    emptyMessage={
                      !isLoading && allItems.length === 0
                        ? "No actors match your current filters. Try adjust them!"
                        : ""
                    }
                  />
                </InfiniteScroll>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
});

export default ActorsPage;

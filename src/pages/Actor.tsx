import { useState, memo, useMemo, useCallback, lazy, Suspense } from "react";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { SectionSkeleton } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import InfiniteScroll from "react-infinite-scroll-component";
import usePopularPeople from "@/queries/FetchPopularPeople";

const PeopleFiltersLazy = lazy(
  () => import("@/components/Actors/PeopleFilters"),
);
const MediaGrid = lazy(() => import("@/components/shared/MediaGrid"));

const ActorsPage = memo(function ActorsPage() {
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedLetter, setSelectedLetter] = useState<string>("all");

  const { data, isLoading, error, refetch, fetchNextPage, hasNextPage } =
    usePopularPeople();

  const handleGenderSelect = useCallback((gender: string) => {
    setSelectedGender(gender);
  }, []);

  const handleLetterSelect = useCallback((letter: string) => {
    setSelectedLetter(letter);
  }, []);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  const allItems = useMemo(() => {
    const pages = data?.pages ?? [];
    let items = pages.flatMap((page) => page.results ?? []);

    if (selectedGender !== "all") {
      items = items.filter(
        (person) => person.gender.toString() === selectedGender,
      );
    }

    if (selectedLetter !== "all") {
      items = items.filter((person) =>
        person.name.toUpperCase().startsWith(selectedLetter),
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

      <div className="px-4 sm:px-8 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Popular Actors
        </h1>
        <p className="text-[var(--text-secondary)] text-sm md:text-lg max-w-3xl leading-relaxed">
          Explore the most popular actors and celebrities in the industry today.
        </p>
      </div>

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
            className="px-6 py-3 bg-[var(--brand-primary)] text-white rounded-md font-medium hover:bg-[var(--brand-primary)]/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : isLoading ? (
        <SectionSkeleton variant="grid" cardCount={20} />
      ) : (
        <div className="px-4 sm:px-8 pb-16">
          <InfiniteScroll
            dataLength={allItems.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<SectionSkeleton variant="grid" cardCount={20} />}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          >
            <Suspense
              fallback={<SectionSkeleton variant="grid" cardCount={20} />}
            >
              <MediaGrid items={allItems} type="person" />
            </Suspense>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
});

export default ActorsPage;

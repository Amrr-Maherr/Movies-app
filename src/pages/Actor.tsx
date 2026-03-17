import { useState, memo, useMemo, useCallback, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { SectionSkeleton } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import InfiniteScroll from "react-infinite-scroll-component";
import usePopularPeople from "@/queries/FetchPopularPeople";
import { TrendingUp } from "lucide-react";

const PeopleFiltersLazy = lazy(
  () => import("@/components/Actors/PeopleFilters"),
);
const MediaGrid = lazy(() => import("@/components/shared/MediaGrid"));

const ActorsPage = memo(function ActorsPage() {
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedLetter, setSelectedLetter] = useState<string>("all");

  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = usePopularPeople();

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
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Popular Actors
          </h1>
          <Link
            to="/trending/actors"
            className="flex items-center gap-2 text-[var(--netflix-red)] hover:underline font-semibold"
          >
            <TrendingUp className="w-5 h-5" />
            <span>Trending Now</span>
          </Link>
        </div>
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
      ) : isLoading && allItems.length === 0 ? (
        <SectionSkeleton variant="grid" cardCount={6} />
      ) : (
        <div className="px-4 sm:px-8 pb-16">
          <InfiniteScroll
            dataLength={allItems.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={null}
            className=""
          >
            <Suspense
              fallback={<SectionSkeleton variant="grid" cardCount={6} />}
            >
              <MediaGrid items={allItems} type="person" />
            </Suspense>
            {isFetching && hasNextPage && (
              <SectionSkeleton variant="grid" cardCount={6} />
            )}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
});

export default ActorsPage;

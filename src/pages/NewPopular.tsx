import { memo, useState, useCallback, lazy, Suspense, useMemo } from "react";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { SectionSkeleton } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import NewPopularFilters, {
  NewPopularFilterOption,
} from "@/components/shared/NewPopularFilters";
import type {
  HeroMedia,
  PopularMoviesResponse,
  PopularTvShowsResponse,
} from "@/types";
import Pagination from "@/components/Pagination";

// Hooks
import useTrendingMoviesWeek from '@/hooks/shared/FetchTrendingMoviesWeek';
import useTrendingTvWeek from '@/hooks/shared/FetchTrendingTvWeek';
import useNowPlayingMovies from '@/hooks/shared/FetchNowPlayingMovies';
import usePopularMovies from '@/hooks/shared/FetchPopularMovies';

const HeroSection = lazy(
  () => import("@/components/shared/heroSection/HeroSection"),
);
const MediaGrid = lazy(() => import("@/components/shared/MediaGrid"));

const NewPopular = memo(function NewPopular() {
  const [page, setPage] = useState(1);
  const [activeFilter, setActiveFilter] =
    useState<NewPopularFilterOption>("trendingMovies");

  const trendingMoviesQuery = useTrendingMoviesWeek(page);
  const trendingTvQuery = useTrendingTvWeek(page);
  const nowPlayingQuery = useNowPlayingMovies(page);
  const popularMoviesQuery = usePopularMovies(page);

  const getCurrentQuery = useCallback(() => {
    switch (activeFilter) {
      case "trendingTv":
        return trendingTvQuery;
      case "nowPlaying":
        return nowPlayingQuery;
      case "popularMovies":
        return popularMoviesQuery;
      case "trendingMovies":
      default:
        return trendingMoviesQuery;
    }
  }, [
    activeFilter,
    trendingMoviesQuery,
    trendingTvQuery,
    nowPlayingQuery,
    popularMoviesQuery,
  ]);

  const currentQuery = getCurrentQuery();
  const { data: mediaItems, isLoading, error, refetch } = currentQuery;
  const AllPages = (
    mediaItems as PopularMoviesResponse | PopularTvShowsResponse
  )?.total_pages;

  // Memoized: Pre-computed mediaItems array
  const mediaData = useMemo(
    () =>
      ((mediaItems as PopularMoviesResponse | PopularTvShowsResponse)
        ?.results || []) as unknown as HeroMedia[],
    [(mediaItems as PopularMoviesResponse | PopularTvShowsResponse)?.results],
  );

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  // FIX #6: Memoized filter change handler to prevent re-creation on every render
  // This prevents NewPopularFilters from re-rendering unnecessarily
  const handleFilterChange = useCallback((filter: NewPopularFilterOption) => {
    setActiveFilter(filter);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      <HelmetMeta
        name="New & Popular"
        description="See what's trending, highly anticipated, and making waves right now on Netflix."
      />

      <Suspense fallback={<SectionSkeleton variant="hero" />}>
        <LazyWrapper height={400}>
          <HeroSection
            data={mediaData as HeroMedia[] | undefined}
            isLoading={isLoading}
            error={error}
            onRetry={handleRetry}
          />
        </LazyWrapper>
      </Suspense>
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={1} />}>
        <LazyWrapper height={400}>
          <div className="px-4 sm:px-8 mb-6 mt-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              New & Popular
            </h1>
            <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl">
              See what&apos;s trending, highly anticipated, and making waves
              right now.
            </p>
          </div>
        </LazyWrapper>
      </Suspense>

      <LazyWrapper height={250}>
        <NewPopularFilters
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
      </LazyWrapper>

      {error ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <p className="text-xl text-[var(--error)] font-medium mb-4">
            Failed to load New & Popular titles. Please try again.
          </p>
          <button
            onClick={handleRetry}
            className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-white/80 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : (
        <LazyWrapper height={500}>
          {isLoading ? (
            <SectionSkeleton variant="grid" cardCount={12} />
          ) : (
            <Suspense
              fallback={<SectionSkeleton variant="grid" cardCount={12} />}
            >
              <div className="slide-up">
                <MediaGrid
                  items={mediaData}
                  emptyMessage="No titles found for this filter."
                />
              </div>
            </Suspense>
          )}
          <Pagination
            currentPage={page}
            totalPages={AllPages}
            isLoading={isLoading}
            onPageChange={setPage}
          />
        </LazyWrapper>
      )}
    </div>
  );
});

export default NewPopular;

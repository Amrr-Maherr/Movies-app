import { memo, useState, useCallback, lazy, Suspense, useMemo } from "react";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { SectionSkeleton } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import MovieFilters, {
  MovieFilterOption,
} from "@/components/shared/MovieFilters";
import type { Movie, HeroMedia, PopularMoviesResponse } from "@/types";
import Pagination from "@/components/Pagination";

// Hooks
import usePopularMovies from "@/queries/FetchPopularMovies";
import useTopRatedMovies from "@/queries/FetchTopRatedMovies";
import useUpcomingMovies from "@/queries/FetchUpcomingMovies";
import useNowPlayingMovies from "@/queries/FetchNowPlayingMovies";

const HeroSection = lazy(
  () => import("@/components/shared/heroSection/HeroSection"),
);
const MediaGrid = lazy(() => import("@/components/shared/MediaGrid"));

const Movie = memo(function Movie() {
  const [page, setPage] = useState(1);
  const [activeFilter, setActiveFilter] =
    useState<MovieFilterOption>("popular");

  const popularQuery = usePopularMovies(page);
  const topRatedQuery = useTopRatedMovies(page);
  const upcomingQuery = useUpcomingMovies(page);
  const nowPlayingQuery = useNowPlayingMovies(page);

  const getCurrentQuery = useCallback(() => {
    switch (activeFilter) {
      case "topRated":
        return topRatedQuery;
      case "upcoming":
        return upcomingQuery;
      case "nowPlaying":
        return nowPlayingQuery;
      case "popular":
      default:
        return popularQuery;
    }
  }, [
    activeFilter,
    popularQuery,
    topRatedQuery,
    upcomingQuery,
    nowPlayingQuery,
  ]);

  const currentQuery = getCurrentQuery();
  const { data: movies, isLoading, error, refetch } = currentQuery;
  const AllPages = movies?.total_pages;

  // Memoized: Pre-computed movies array
  const moviesData = useMemo(
    () => (movies?.results || []) as unknown as HeroMedia[],
    [movies?.results],
  );

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  // Memoized filter change handler
  const handleFilterChange = useCallback((filter: MovieFilterOption) => {
    setActiveFilter(filter);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      <HelmetMeta
        name="Movies"
        description="Movies move us like nothing else can, whether they're scary, funny, dramatic, romantic or anywhere in-between."
      />

      <Suspense fallback={<SectionSkeleton variant="hero" />}>
        <LazyWrapper height={400}>
          <HeroSection
            data={moviesData as Movie[] | undefined}
            isLoading={isLoading}
            error={error}
            onRetry={handleRetry}
          />
        </LazyWrapper>
      </Suspense>

      <div className="px-4 sm:px-8 mb-6 mt-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Movies
        </h1>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl">
          Movies move us like nothing else can, whether they&apos;re scary,
          funny, dramatic, romantic or anywhere in-between.
        </p>
      </div>

      <LazyWrapper height={250}>
        <MovieFilters
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
      </LazyWrapper>

      {error ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <p className="text-xl text-[var(--error)] font-medium mb-4">
            Failed to load Movies. Please try again.
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
                <MediaGrid items={moviesData} emptyMessage="No Movies found." />
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

export default Movie;

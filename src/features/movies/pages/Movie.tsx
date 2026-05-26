import { memo, useState, useCallback, lazy, Suspense, useMemo, useEffect } from "react";
import { OptimizedSectionWrapper } from "@/components/optimized-section-wrapper";
import { SectionSkeleton } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import MovieFilters, {
  MovieFilterOption,
} from "@/features/movies/components/MovieFilters";
import type { Movie, HeroMedia} from "@/types";
import Pagination from "@/components/shared/Pagination";
import { useOnboarding } from "@/features/onboarding/providers/OnboardingProvider";

// Hooks
import usePopularMovies from "@/features/movies/hooks/FetchPopularMovies";
import useTopRatedMovies from "@/features/movies/hooks/FetchTopRatedMovies";
import useUpcomingMovies from "@/features/movies/hooks/FetchUpcomingMovies";
import useNowPlayingMovies from "@/features/movies/hooks/FetchNowPlayingMovies";

const HeroSection = lazy(
  () => import("@/components/shared/heroSection/HeroSection"),
);
const MediaGrid = lazy(() => import("@/components/shared/MediaGrid"));

const Movie = memo(function Movie() {
  const { startTour } = useOnboarding();
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

  useEffect(() => {
    if (moviesData.length > 0) {
      const timer = setTimeout(() => {
        startTour("movies");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [moviesData.length, startTour]);

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      <HelmetMeta
        name="Movies"
        description="Movies move us like nothing else can, whether they're scary, funny, dramatic, romantic or anywhere in-between."
      />

      <OptimizedSectionWrapper
        data={moviesData}
        isLoading={isLoading}
        fallback={<SectionSkeleton variant="hero" />}
        height={400}
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

      <div className="container !mb-6 !mt-8 movie-filters media-grid">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Movies
        </h1>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl">
          Movies move us like nothing else can, whether they&apos;re scary,
          funny, dramatic, romantic or anywhere in-between.
        </p>
      </div>

      <OptimizedSectionWrapper
        data={true}
        isLoading={false}
        fallback={<SectionSkeleton variant="grid" cardCount={1} />}
        height={250}
        title="Filters"
      >
        <MovieFilters
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
      </OptimizedSectionWrapper>

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
        <div className="container pb-20 media-grid">
          <OptimizedSectionWrapper
            data={true}
            isLoading={false}
            fallback={<SectionSkeleton variant="grid" cardCount={12} />}
            height={500}
            title="Movies Grid"
          >
            {isLoading ? (
              <SectionSkeleton variant="grid" cardCount={12} />
            ) : (
              <div className="slide-up">
                <MediaGrid items={moviesData} emptyMessage="No Movies found." />
              </div>
            )}
            <Pagination
              currentPage={page}
              totalPages={AllPages}
              isLoading={isLoading}
              onPageChange={setPage}
            />
          </OptimizedSectionWrapper>
        </div>
      )}
    </div>
  );
});

export default Movie;

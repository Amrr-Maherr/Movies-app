import { memo, useState, useCallback, lazy, Suspense, useMemo, useEffect } from "react";
import { OptimizedSectionWrapper } from "@/components/optimized-section-wrapper";
import { SectionSkeleton } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import TVShowFilters, {
  TVShowFilterOption,
} from "@/components/shared/TVShowFilters";
import type { TvShow, HeroMedia, PopularTvShowsResponse } from "@/types";
import Pagination from "@/components/shared/Pagination";
import { useOnboarding } from "@/features/onboarding/providers/OnboardingProvider";

// Hooks
import usePopularTvShows from "@/features/tv-shows/hooks/FetchPopularTvShows";
import useTopRatedTvShows from "@/features/tv-shows/hooks/FetchTopRatedTvShows";
import useAiringTodayTv from "@/features/tv-shows/hooks/FetchAiringTodayTv";
import useOnTheAirTv from "@/features/tv-shows/hooks/FetchOnTheAirTv";

const HeroSection = lazy(
  () => import("@/components/shared/heroSection/HeroSection"),
);
const MediaGrid = lazy(() => import("@/components/shared/MediaGrid"));

const TVShow = memo(function TVShow() {
  const { startTour } = useOnboarding();
  const [page, setPage] = useState(1);
  const [activeFilter, setActiveFilter] =
    useState<TVShowFilterOption>("popular");

  const popularQuery = usePopularTvShows(page);
  const topRatedQuery = useTopRatedTvShows(page);
  const airingTodayQuery = useAiringTodayTv(page);
  const onTheAirQuery = useOnTheAirTv(page);

  const getCurrentQuery = useCallback(() => {
    switch (activeFilter) {
      case "topRated":
        return topRatedQuery;
      case "airingToday":
        return airingTodayQuery;
      case "onTheAir":
        return onTheAirQuery;
      case "popular":
      default:
        return popularQuery;
    }
  }, [
    activeFilter,
    popularQuery,
    topRatedQuery,
    airingTodayQuery,
    onTheAirQuery,
  ]);

  const currentQuery = getCurrentQuery();
  const { data: tvShows, isLoading, error, refetch } = currentQuery;
  const AllPages = tvShows?.total_pages;

  // Memoized: Pre-computed tvShows array
  const tvShowsData = useMemo(
    () => (tvShows?.results || []) as unknown as HeroMedia[],
    [tvShows?.results],
  );

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  // Memoized filter change handler
  const handleFilterChange = useCallback((filter: TVShowFilterOption) => {
    setActiveFilter(filter);
  }, []);

  useEffect(() => {
    if (tvShowsData.length > 0) {
      const timer = setTimeout(() => {
        startTour("tv-shows");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [tvShowsData.length, startTour]);

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      <HelmetMeta
        name="TV Shows"
        description="Browse the most popular, highly-rated, and currently airing TV series on Netflix."
      />

      <OptimizedSectionWrapper
        data={tvShowsData}
        isLoading={isLoading}
        fallback={<SectionSkeleton variant="hero" />}
        height={400}
        title="Hero Section"
      >
        {(data) => (
          <HeroSection
            data={data as TvShow[] | undefined}
            isLoading={isLoading}
            error={error}
            onRetry={handleRetry}
          />
        )}
      </OptimizedSectionWrapper>

      <div className="container !mb-6 !mt-8 movie-filters">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          TV Shows
        </h1>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl">
          Browse the most popular, highly-rated, and currently airing TV series.
        </p>
      </div>

      <OptimizedSectionWrapper
        data={true}
        isLoading={false}
        fallback={<SectionSkeleton variant="grid" cardCount={1} />}
        height={250}
        title="Filters"
      >
        <TVShowFilters
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
      </OptimizedSectionWrapper>

      {error ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <p className="text-xl text-[var(--error)] font-medium mb-4">
            Failed to load TV Shows. Please try again.
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
              title="TV Shows Grid"
            >
              {isLoading ? (
                <SectionSkeleton variant="grid" cardCount={12} />
              ) : (
                <div className="slide-up">
                  <MediaGrid items={tvShowsData} emptyMessage="No TV shows found." />
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

export default TVShow;

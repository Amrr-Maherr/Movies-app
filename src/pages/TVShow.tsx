import { memo, useState, useCallback, lazy, Suspense, useMemo } from "react";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { SectionSkeleton } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import TVShowFilters, { TVShowFilterOption } from "@/components/shared/TVShowFilters";
import type { TvShow, HeroMedia } from "@/types";

// Hooks
import usePopularTvShows from "@/queries/FetchPopularTvShows";
import useTopRatedTvShows from "@/queries/FetchTopRatedTvShows";
import useAiringTodayTv from "@/queries/FetchAiringTodayTv";
import useOnTheAirTv from "@/queries/FetchOnTheAirTv";

const HeroSection = lazy(() => import("@/components/shared/heroSection/HeroSection"));
const MediaGrid = lazy(() => import("@/components/shared/MediaGrid"));

const TVShow = memo(function TVShow() {
  const [activeFilter, setActiveFilter] = useState<TVShowFilterOption>("popular");

  const popularQuery = usePopularTvShows(1);
  const topRatedQuery = useTopRatedTvShows(1);
  const airingTodayQuery = useAiringTodayTv(1);
  const onTheAirQuery = useOnTheAirTv(1);

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
  }, [activeFilter, popularQuery, topRatedQuery, airingTodayQuery, onTheAirQuery]);

  const currentQuery = getCurrentQuery();
  const { data: tvShows, isLoading, error, refetch } = currentQuery;

  // Memoized: Pre-computed tvShows array
  const tvShowsData = useMemo(() => (tvShows || []) as unknown as HeroMedia[], [tvShows]);

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  // FIX #6: Memoized filter change handler to prevent re-creation on every render
  // This prevents TVShowFilters from re-rendering unnecessarily
  const handleFilterChange = useCallback((filter: TVShowFilterOption) => {
    setActiveFilter(filter);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      <HelmetMeta
        name="TV Shows"
        description="Browse the most popular, highly-rated, and currently airing TV series on Netflix."
      />

      <Suspense fallback={<SectionSkeleton variant="hero" />}>
        <LazyWrapper height={400}>
          <HeroSection
            data={tvShowsData as TvShow[] | undefined}
            isLoading={isLoading}
            error={error}
            onRetry={handleRetry}
          />
        </LazyWrapper>
      </Suspense>

      <div className="px-4 sm:px-8 mb-6 mt-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">TV Shows</h1>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl">
          Browse the most popular, highly-rated, and currently airing TV series.
        </p>
      </div>

      <LazyWrapper height={250}>
        <TVShowFilters activeFilter={activeFilter} onFilterChange={handleFilterChange} />
      </LazyWrapper>

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
        <LazyWrapper height={500}>
          {isLoading ? (
            <SectionSkeleton variant="grid" cardCount={12} />
          ) : (
            <Suspense fallback={<SectionSkeleton variant="grid" cardCount={12} />}>
              <div className="slide-up">
                <MediaGrid items={tvShowsData} emptyMessage="No TV Shows found for this filter." />
              </div>
            </Suspense>
          )}
        </LazyWrapper>
      )}
    </div>
  );
});

export default TVShow;

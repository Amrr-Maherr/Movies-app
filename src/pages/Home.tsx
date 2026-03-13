import { memo, useMemo, useCallback, lazy, Suspense } from "react";
import { Error as ErrorComponent, SectionSkeleton } from "@/components/ui";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import HelmetMeta from "@/components/shared/HelmetMeta";
import "@/index.css";

import useTrendingMoviesWeek from "@/queries/FetchTrendingMoviesWeek";
import useTrendingTvWeek from "@/queries/FetchTrendingTvWeek";
import useUpcomingMovies from "@/queries/FetchUpcomingMovies";
import usePopularTvShows from "@/queries/FetchPopularTvShows";
import useTopRatedMovies from "@/queries/FetchTopRatedMovies";
import useStreamingPlatforms from "@/queries/FetchStreamingPlatforms";

const HeroSection = lazy(
  () => import("@/components/shared/heroSection/HeroSection"),
);
const TopPicksSection = lazy(
  () => import("@/components/sections/TopPicksSection"),
);
const MediaSection = lazy(() => import("@/components/shared/MediaSection"));
const NewReleasesSection = lazy(
  () => import("@/components/sections/NewReleasesSection"),
);
const MoviePromo = lazy(() => import("@/components/sections/MoviePromo"));
const OnlyOnNetflixSection = lazy(
  () => import("@/components/sections/OnlyOnNetflixSection"),
);
const AwardWinnersSection = lazy(
  () => import("@/components/sections/AwardWinnersSection"),
);
const PricingSection = lazy(
  () => import("@/components/sections/PricingSection"),
);
const AskedQuestions = lazy(
  () => import("@/components/sections/AskedQuestions"),
);
const PlatformsSection = lazy(
  () => import("@/components/sections/PlatformsSection"),
);

const Home = memo(function Home() {
  const {
    data: trendingMoviesWeek,
    isLoading: trendingWeekLoading,
    error: trendingWeekError,
    refetch: trendingWeekRefetch,
  } = useTrendingMoviesWeek();
  const {
    data: trendingTvWeek,
    isLoading: trendingTvWeekLoading,
    error: trendingTvWeekError,
    refetch: trendingTvWeekRefetch,
  } = useTrendingTvWeek();
  const {
    data: upcomingMovies,
    isLoading: upcomingLoading,
    refetch: upcomingRefetch,
  } = useUpcomingMovies();
  const {
    data: popularTv,
    isLoading: popularTvLoading,
    refetch: popularTvRefetch,
  } = usePopularTvShows();
  const { data: topRatedMovies, isLoading: topRatedLoading } =
    useTopRatedMovies();
  const {
    data: platforms,
    isLoading: platformsLoading,
    error: platformsError,
    refetch: platformsRefetch,
  } = useStreamingPlatforms();

  // FIX: Only take a few items for hero section to prevent swiper from overworking
  const heroData = useMemo(
    () => [
      ...(trendingMoviesWeek?.slice(0, 5) || []),
      ...(trendingTvWeek?.slice(0, 5) || []),
    ],
    [trendingMoviesWeek, trendingTvWeek],
  );

  const handleRetry = useCallback(() => {
    trendingWeekRefetch();
    upcomingRefetch();
    trendingTvWeekRefetch();
    popularTvRefetch();
    platformsRefetch();
  }, [
    trendingWeekRefetch,
    upcomingRefetch,
    trendingTvWeekRefetch,
    popularTvRefetch,
    platformsRefetch,
  ]);

  // Only show full page error if absolutely no critical data is available
  if (!trendingMoviesWeek && trendingWeekError) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)] flex items-center justify-center">
        <ErrorComponent retryButtonText="Try Again" onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      <HelmetMeta
        name="Netflix Egypt - Watch TV Shows Online, Watch Movies Online"
        description="Watch unlimited movies and TV shows on Netflix. Stream anytime, anywhere on any device."
      />

      {/* Hero Section */}
      <Suspense fallback={<SectionSkeleton variant="hero" />}>
        <HeroSection
          data={heroData}
          isLoading={
            heroData.length === 0 &&
            (trendingWeekLoading || trendingTvWeekLoading)
          }
          error={null}
          onRetry={() => {}}
        />
      </Suspense>

      {/* Top 10 Movies Section */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
        <LazyWrapper height={300}>
          {trendingMoviesWeek ? (
            <TopPicksSection
              movies={trendingMoviesWeek}
              title="Top 6 Movies in Egypt Today"
            />
          ) : trendingWeekLoading ? (
            <SectionSkeleton variant="grid" cardCount={6} />
          ) : null}
        </LazyWrapper>
      </Suspense>

      {/* Trending Now */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
        <LazyWrapper height={250}>
          <div className="py-6 md:py-8 container">
            <MediaSection
              title="Trending Now"
              data={trendingMoviesWeek}
              isLoading={trendingWeekLoading}
              error={trendingWeekError}
              onRetry={trendingWeekRefetch}
            />
          </div>
        </LazyWrapper>
      </Suspense>

      {/* New Releases Section */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={4} />}>
        <LazyWrapper height={350}>
          {upcomingMovies ? (
            <NewReleasesSection
              movies={upcomingMovies}
              title="New Releases This Week"
            />
          ) : upcomingLoading ? (
            <SectionSkeleton variant="grid" cardCount={4} />
          ) : null}
        </LazyWrapper>
      </Suspense>

      {/* Trending TV Shows */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
        <LazyWrapper height={250}>
          <div className="py-6 md:py-8 container">
            <MediaSection
              title="Trending TV Shows"
              data={trendingTvWeek}
              isLoading={trendingTvWeekLoading}
              error={trendingTvWeekError}
              onRetry={trendingTvWeekRefetch}
            />
          </div>
        </LazyWrapper>
      </Suspense>

      {/* Featured Movie */}
      <Suspense fallback={<SectionSkeleton variant="hero" />}>
        <LazyWrapper height={500}>
          {upcomingMovies && upcomingMovies[0] ? (
            <MoviePromo
              movie={upcomingMovies[0]}
              mediaType="movie"
              variant="left"
            />
          ) : null}
        </LazyWrapper>
      </Suspense>

      {/* Only on Netflix Section */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
        <LazyWrapper height={400}>
          {popularTv ? (
            <OnlyOnNetflixSection movies={popularTv} mediaType="tv" />
          ) : popularTvLoading ? (
            <SectionSkeleton variant="grid" cardCount={6} />
          ) : null}
        </LazyWrapper>
      </Suspense>

      {/* Platforms Section */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
        <LazyWrapper height={350}>
          {platforms ? (
            <PlatformsSection
              platforms={platforms}
              isLoading={platformsLoading}
              error={platformsError}
            />
          ) : platformsLoading ? (
            <SectionSkeleton variant="grid" cardCount={6} />
          ) : null}
        </LazyWrapper>
      </Suspense>

      {/* Award Winners Section */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
        <LazyWrapper height={350}>
          {topRatedMovies ? (
            <AwardWinnersSection movies={topRatedMovies} mediaType="movie" />
          ) : topRatedLoading ? (
            <SectionSkeleton variant="grid" cardCount={6} />
          ) : null}
        </LazyWrapper>
      </Suspense>

      {/* Pricing Section */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={3} />}>
        <LazyWrapper height={550}>
          <PricingSection />
        </LazyWrapper>
      </Suspense>

      {/* FAQ Section */}
      <Suspense fallback={<SectionSkeleton variant="list" cardCount={6} />}>
        <LazyWrapper height={500}>
          <AskedQuestions />
        </LazyWrapper>
      </Suspense>
    </div>
  );
});

export default Home;

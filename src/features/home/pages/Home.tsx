import { memo, useMemo, useCallback, lazy, Suspense, useEffect } from "react";
import { Error as ErrorComponent, SectionSkeleton } from "@/components/ui";
import { OptimizedSectionWrapper } from "@/components/optimized-section-wrapper";
import HelmetMeta from "@/components/shared/HelmetMeta";
import "@/index.css";
import { useOnboarding } from "@/features/onboarding/providers/OnboardingProvider";

import useTrendingMoviesWeek from '@/features/home/hooks/FetchTrendingMoviesWeek';
import useTrendingTvWeek from '@/features/home/hooks/FetchTrendingTvWeek';
import useUpcomingMovies from '@/features/movies/hooks/FetchUpcomingMovies';
import usePopularTvShows from '@/features/tv-shows/hooks/FetchPopularTvShows';
import useTopRatedMovies from '@/features/movies/hooks/FetchTopRatedMovies';
import useStreamingPlatforms from '@/features/home/hooks/FetchStreamingPlatforms';

const HeroSection = lazy(
  () => import("@/components/shared/heroSection/HeroSection"),
);
const TopPicksSection = lazy(
  () => import("@/features/home/components/sections/TopPicksSection"),
);
const MediaSection = lazy(() => import("@/components/shared/MediaSection"));
const NewReleasesSection = lazy(
  () => import("@/features/home/components/sections/NewReleasesSection"),
);
const MoviePromo = lazy(() => import("@/features/home/components/sections/MoviePromo"));
const OnlyOnNetflixSection = lazy(
  () => import("@/features/home/components/sections/OnlyOnNetflixSection"),
);
const AwardWinnersSection = lazy(
  () => import("@/features/home/components/sections/AwardWinnersSection"),
);
const PricingSection = lazy(
  () => import("@/features/home/components/sections/PricingSection"),
);
const AskedQuestions = lazy(
  () => import("@/features/home/components/sections/AskedQuestions"),
);
const PlatformsSection = lazy(
  () => import("@/features/home/components/sections/PlatformsSection"),
);
const MoreReasonsSection = lazy(
  () => import("@/features/home/components/sections/MoreReasonsSection"),
);

const Home = memo(function Home() {
  const { startTour } = useOnboarding();
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
  } = useUpcomingMovies(1);
  const {
    data: popularTv,
    isLoading: popularTvLoading,
    refetch: popularTvRefetch,
  } = usePopularTvShows(1);
  const { data: topRatedMovies, isLoading: topRatedLoading } =
    useTopRatedMovies(1);
  const {
    data: platforms,
    isLoading: platformsLoading,
    error: platformsError,
    refetch: platformsRefetch,
  } = useStreamingPlatforms();

  // FIX: Only take a few items for hero section to prevent swiper from overworking
  const heroData = useMemo(
    () => [
      ...(trendingMoviesWeek?.results?.slice(0, 5) || []),
      ...(trendingTvWeek?.results?.slice(0, 5) || []),
    ],
    [trendingMoviesWeek, trendingTvWeek],
  );

  useEffect(() => {
    if (heroData.length > 0) {
      const isSubscribed = localStorage.getItem("paymentStatus") === "success";
      const timer = setTimeout(() => {
        if (!isSubscribed) {
          startTour("subscription-warning");
        } else {
          startTour("home");
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [heroData.length, startTour]);

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
      <OptimizedSectionWrapper
        data={trendingMoviesWeek?.results}
        isLoading={trendingWeekLoading}
        fallback={<SectionSkeleton variant="grid" cardCount={6} />}
        height={300}
        title="Top 6 Movies"
      >
        {(movies) => (
          <TopPicksSection
            movies={movies}
            title="Top 6 Movies in Egypt Today"
          />
        )}
      </OptimizedSectionWrapper>

      {/* Trending Now */}
      <OptimizedSectionWrapper
        data={trendingMoviesWeek?.results}
        isLoading={trendingWeekLoading}
        fallback={<SectionSkeleton variant="grid" cardCount={6} />}
        height={250}
        title="Trending Now"
      >
        {(data) => (
          <MediaSection
            title="Trending Now"
            data={data}
            isLoading={trendingWeekLoading}
            error={trendingWeekError}
            onRetry={trendingWeekRefetch}
          />
        )}
      </OptimizedSectionWrapper>

      {/* New Releases Section */}
      <OptimizedSectionWrapper
        data={upcomingMovies?.results}
        isLoading={upcomingLoading}
        fallback={<SectionSkeleton variant="grid" cardCount={4} />}
        height={350}
        title="New Releases"
      >
        {(movies) => (
          <NewReleasesSection
            movies={movies}
            title="New Releases This Week"
          />
        )}
      </OptimizedSectionWrapper>

      {/* Trending TV Shows */}
      <OptimizedSectionWrapper
        data={trendingTvWeek?.results}
        isLoading={trendingTvWeekLoading}
        fallback={<SectionSkeleton variant="grid" cardCount={6} />}
        height={250}
        title="Trending TV Shows"
      >
        {(data) => (
          <MediaSection
            title="Trending TV Shows"
            data={data}
            isLoading={trendingTvWeekLoading}
            error={trendingTvWeekError}
            onRetry={trendingTvWeekRefetch}
          />
        )}
      </OptimizedSectionWrapper>

      {/* Featured Movie */}
      <OptimizedSectionWrapper
        data={upcomingMovies?.results?.[0]}
        isLoading={upcomingLoading}
        fallback={<SectionSkeleton variant="hero" />}
        height={500}
        title="Featured Movie"
      >
        {(movie) => (
          <MoviePromo
            movie={movie}
            mediaType="movie"
            variant="left"
          />
        )}
      </OptimizedSectionWrapper>

      {/* Only on Netflix Section */}
      <OptimizedSectionWrapper
        data={popularTv?.results}
        isLoading={popularTvLoading}
        fallback={<SectionSkeleton variant="grid" cardCount={6} />}
        height={400}
        title="Only on Netflix"
      >
        {(movies) => (
          <OnlyOnNetflixSection movies={movies} mediaType="tv" />
        )}
      </OptimizedSectionWrapper>

      {/* Platforms Section */}
      <OptimizedSectionWrapper
        data={platforms}
        isLoading={platformsLoading}
        fallback={<SectionSkeleton variant="grid" cardCount={6} />}
        height={350}
        title="Platforms"
      >
        {(platformsData) => (
          <PlatformsSection
            platforms={platformsData}
            isLoading={platformsLoading}
            error={platformsError}
          />
        )}
      </OptimizedSectionWrapper>

      {/* Award Winners Section */}
      <OptimizedSectionWrapper
        data={topRatedMovies?.results}
        isLoading={topRatedLoading}
        fallback={<SectionSkeleton variant="grid" cardCount={6} />}
        height={350}
        title="Award Winners"
      >
        {(movies) => (
          <AwardWinnersSection
            movies={movies}
            mediaType="movie"
          />
        )}
      </OptimizedSectionWrapper>

      {/* More Reasons to Join Section */}
      <OptimizedSectionWrapper
        data={true} // Always render once visible
        isLoading={false}
        fallback={<SectionSkeleton variant="grid" cardCount={4} />}
        height={400}
        title="More Reasons"
      >
        <MoreReasonsSection />
      </OptimizedSectionWrapper>

      {/* Pricing Section */}
      <OptimizedSectionWrapper
        data={true} // Always render once visible
        isLoading={false}
        fallback={<SectionSkeleton variant="grid" cardCount={3} />}
        height={550}
        title="Pricing"
      >
        <PricingSection />
      </OptimizedSectionWrapper>

      {/* FAQ Section */}
      <OptimizedSectionWrapper
        data={true} // Always render once visible
        isLoading={false}
        fallback={<SectionSkeleton variant="list" cardCount={6} />}
        height={500}
        title="FAQ"
      >
        <AskedQuestions />
      </OptimizedSectionWrapper>
    </div>
  );
});

export default Home;

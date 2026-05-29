import { memo, useMemo, useCallback, lazy, Suspense, useEffect } from "react";
import { Error as ErrorComponent, SectionSkeleton } from "@/components/ui";
import { OptimizedSectionWrapper } from "@/components/optimized-section-wrapper";
import HelmetMeta from "@/components/shared/HelmetMeta";
import { useTranslation } from "react-i18next";
import "@/index.css";
import { useOnboarding } from "@/features/onboarding/providers/OnboardingProvider";

import useTrendingMoviesWeek from '@/features/home/hooks/FetchTrendingMoviesWeek';
import useTrendingTvWeek from '@/features/home/hooks/FetchTrendingTvWeek';
import useUpcomingMovies from '@/features/movies/hooks/FetchUpcomingMovies';
import useTopRatedMovies from '@/features/movies/hooks/FetchTopRatedMovies';

const HeroSection = lazy(
  () => import("@/components/shared/heroSection/HeroSection"),
);
const TopPicksSection = lazy(
  () => import("@/features/home/components/sections/TopPicksSection"),
);
const NewReleasesSection = lazy(
  () => import("@/features/home/components/sections/NewReleasesSection"),
);
const TrendingTvSection = lazy(
  () => import("@/features/home/components/sections/TrendingTvSection"),
);
const AwardWinnersSection = lazy(
  () => import("@/features/home/components/sections/AwardWinnersSection"),
);
const PricingSection = lazy(
  () => import("@/features/home/components/sections/PricingSection"),
);

const Home = memo(function Home() {
  const { t } = useTranslation();
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
    refetch: trendingTvWeekRefetch,
  } = useTrendingTvWeek();
  const {
    data: upcomingMovies,
    isLoading: upcomingLoading,
    refetch: upcomingRefetch,
  } = useUpcomingMovies(1);
  const { data: topRatedMovies, isLoading: topRatedLoading } =
    useTopRatedMovies(1);

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
  }, [
    trendingWeekRefetch,
    upcomingRefetch,
    trendingTvWeekRefetch,
  ]);

  // Only show full page error if absolutely no critical data is available
  if (!trendingMoviesWeek && trendingWeekError) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)] flex items-center justify-center">
        <ErrorComponent retryButtonText={t('common.tryAgain')} onRetry={handleRetry} />
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

      {/* Top Picks Section */}
      <OptimizedSectionWrapper
        data={trendingMoviesWeek?.results}
        isLoading={trendingWeekLoading}
        fallback={<SectionSkeleton variant="grid" cardCount={6} />}
        height={300}
        title={t('home.top6Movies')}
      >
        {(movies) => (
          <TopPicksSection
            movies={movies}
            title={t('home.top6Movies')}
          />
        )}
      </OptimizedSectionWrapper>

      {/* New Releases Section */}
      <OptimizedSectionWrapper
        data={upcomingMovies?.results}
        isLoading={upcomingLoading}
        fallback={<SectionSkeleton variant="grid" cardCount={6} />}
        height={350}
        title={t('home.newReleases')}
      >
        {(movies) => (
          <NewReleasesSection
            movies={movies}
            title={t('home.newReleases')}
          />
        )}
      </OptimizedSectionWrapper>

      {/* Trending TV Shows */}
      <OptimizedSectionWrapper
        data={trendingTvWeek?.results}
        isLoading={trendingTvWeekLoading}
        fallback={<SectionSkeleton variant="grid" cardCount={6} />}
        height={300}
        title={t('home.trendingTvShows')}
      >
        {(data) => (
          <TrendingTvSection
            data={data}
            title={t('home.trendingTvShows')}
          />
        )}
      </OptimizedSectionWrapper>

      {/* Award Winners Section */}
      <OptimizedSectionWrapper
        data={topRatedMovies?.results}
        isLoading={topRatedLoading}
        fallback={<SectionSkeleton variant="grid" cardCount={6} />}
        height={350}
        title={t('home.awardWinners')}
      >
        {(movies) => (
          <AwardWinnersSection
            movies={movies}
            mediaType="movie"
          />
        )}
      </OptimizedSectionWrapper>

      {/* Pricing Section */}
      <OptimizedSectionWrapper
        data={true}
        isLoading={false}
        fallback={<SectionSkeleton variant="grid" cardCount={3} />}
        height={550}
        title={t('home.pricing')}
      >
        <PricingSection />
      </OptimizedSectionWrapper>
    </div>
  );
});

export default Home;

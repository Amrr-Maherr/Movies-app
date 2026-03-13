import { memo, useMemo, useCallback, lazy, Suspense } from "react";
import { Loader, Error as ErrorComponent, LoadingFallback } from "@/components/ui";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import HelmetMeta from "@/components/shared/HelmetMeta";
import "@/index.css";

import usePopularMovies from "@/queries/FetchPopularMovies";
import useTopRatedMovies from "@/queries/FetchTopRatedMovies";
import useNowPlayingMovies from "@/queries/FetchNowPlayingMovies";
import useTrendingMoviesWeek from "@/queries/FetchTrendingMoviesWeek";
import useTrendingMoviesDay from "@/queries/FetchTrendingMoviesDay";
import useUpcomingMovies from "@/queries/FetchUpcomingMovies";
import usePopularTvShows from "@/queries/FetchPopularTvShows";
import useTrendingTvWeek from "@/queries/FetchTrendingTvWeek";
import useTrendingTvDay from "@/queries/FetchTrendingTvDay";
import useTopRatedTvShows from "@/queries/FetchTopRatedTvShows";
import useAiringTodayTv from "@/queries/FetchAiringTodayTv";
import useOnTheAirTv from "@/queries/FetchOnTheAirTv";

const HeroSection = lazy(() => import("@/components/shared/heroSection/HeroSection"));
const MediaSection = lazy(() => import("@/components/shared/MediaSection"));
const TopPicksSection = lazy(() => import("@/components/sections/TopPicksSection"));
const MoviePromo = lazy(() => import("@/components/sections/MoviePromo"));
const ContinueWatchingSection = lazy(() => import("@/components/sections/ContinueWatchingSection"));
const GenreShowcaseSection = lazy(() => import("@/components/sections/GenreShowcaseSection"));
const BecauseYouWatchedSection = lazy(() => import("@/components/sections/BecauseYouWatchedSection"));
const NewReleasesSection = lazy(() => import("@/components/sections/NewReleasesSection"));
const OnlyOnNetflixSection = lazy(() => import("@/components/sections/OnlyOnNetflixSection"));
const AwardWinnersSection = lazy(() => import("@/components/sections/AwardWinnersSection"));
const BingeWorthySection = lazy(() => import("@/components/sections/BingeWorthySection"));
const WeekendWatchSection = lazy(() => import("@/components/sections/WeekendWatchSection"));
const PricingSection = lazy(() => import("@/components/sections/PricingSection"));
const AskedQuestions = lazy(() => import("@/components/sections/AskedQuestions"));

const Home = memo(function Home() {
  const {
    data: popularMovies,
    isLoading: popularLoading,
    error: popularError,
    refetch: popularRefetch,
  } = usePopularMovies();
  const { data: topRatedMovies } = useTopRatedMovies();
  const {
    data: nowPlayingMovies,
    isLoading: nowPlayingLoading,
    error: nowPlayingError,
    refetch: nowPlayingRefetch,
  } = useNowPlayingMovies();
  const {
    data: trendingMoviesWeek,
    isLoading: trendingWeekLoading,
    error: trendingWeekError,
    refetch: trendingWeekRefetch,
  } = useTrendingMoviesWeek();
  const {
    data: trendingMoviesDay,
    isLoading: trendingDayLoading,
    error: trendingDayError,
    refetch: trendingDayRefetch,
  } = useTrendingMoviesDay();
  const {
    data: upcomingMovies,
    isLoading: upcomingLoading,
    error: upcomingError,
    refetch: upcomingRefetch,
  } = useUpcomingMovies();

  const {
    data: popularTv,
    isLoading: popularTvLoading,
    error: popularTvError,
    refetch: popularTvRefetch,
  } = usePopularTvShows();
  const {
    data: trendingTvWeek,
    isLoading: trendingTvWeekLoading,
    error: trendingTvWeekError,
    refetch: trendingTvWeekRefetch,
  } = useTrendingTvWeek();
  const {
    data: trendingTvDay,
    isLoading: trendingTvDayLoading,
    error: trendingTvDayError,
    refetch: trendingTvDayRefetch,
  } = useTrendingTvDay();
  const { data: topRatedTv } = useTopRatedTvShows();
  const {
    data: airingTodayTv,
    isLoading: airingTodayLoading,
    error: airingTodayError,
    refetch: airingTodayRefetch,
  } = useAiringTodayTv();
  const {
    data: onTheAirTv,
    isLoading: onTheAirLoading,
    error: onTheAirError,
    refetch: onTheAirRefetch,
  } = useOnTheAirTv();

  const AllData = useMemo(
    () => [
      ...(trendingMoviesWeek || []),
      ...(trendingTvWeek || []),
      ...(trendingMoviesDay || []),
      ...(trendingTvDay || []),
      ...(popularMovies || []),
      ...(popularTv || []),
      ...(topRatedMovies || []),
      ...(topRatedTv || []),
      ...(upcomingMovies || []),
      ...(airingTodayTv || []),
      ...(nowPlayingMovies || []),
      ...(onTheAirTv || []),
    ],
    [
      trendingMoviesWeek,
      trendingTvWeek,
      trendingMoviesDay,
      trendingTvDay,
      popularMovies,
      popularTv,
      topRatedMovies,
      topRatedTv,
      upcomingMovies,
      airingTodayTv,
      nowPlayingMovies,
      onTheAirTv,
    ],
  );

  // FIX: Simplified loading state - direct boolean expression instead of useMemo
  const isLoading =
    popularLoading ||
    trendingWeekLoading ||
    trendingDayLoading ||
    upcomingLoading ||
    nowPlayingLoading ||
    popularTvLoading ||
    trendingTvWeekLoading ||
    trendingTvDayLoading ||
    airingTodayLoading ||
    onTheAirLoading;

  // FIX: Simplified error state - direct boolean expression instead of useMemo
  const error =
    popularError ||
    trendingWeekError ||
    trendingDayError ||
    upcomingError ||
    nowPlayingError ||
    popularTvError ||
    trendingTvWeekError ||
    trendingTvDayError ||
    airingTodayError ||
    onTheAirError;

  // FIX: Simplified retry handler - empty functions defined inline where needed
  const handleRetry = useCallback(() => {
    popularRefetch();
    trendingWeekRefetch();
    trendingDayRefetch();
    upcomingRefetch();
    nowPlayingRefetch();
    popularTvRefetch();
    trendingTvWeekRefetch();
    trendingTvDayRefetch();
    airingTodayRefetch();
    onTheAirRefetch();
  }, [
    popularRefetch,
    trendingWeekRefetch,
    trendingDayRefetch,
    upcomingRefetch,
    nowPlayingRefetch,
    popularTvRefetch,
    trendingTvWeekRefetch,
    trendingTvDayRefetch,
    airingTodayRefetch,
    onTheAirRefetch,
  ]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)] flex items-center justify-center">
        <ErrorComponent
          retryButtonText="Try Again"
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)] page-transition">
      <HelmetMeta
        name="Netflix Egypt - Watch TV Shows Online, Watch Movies Online"
        description="Watch unlimited movies and TV shows on Netflix. Stream anytime, anywhere on any device."
      />

      {/* Hero Section - always visible, no lazy loading */}
      {AllData && (
        <Suspense fallback={<LoadingFallback />}>
          <LazyWrapper height={300}>
            <HeroSection
              data={AllData}
              isLoading={false}
              error={null}
              onRetry={() => {}}
            />
          </LazyWrapper>
        </Suspense>
      )}

      {/* Top 10 Movies Section */}
      {trendingMoviesWeek && (
        <Suspense fallback={<LoadingFallback />}>
          <LazyWrapper height={300}>
            <TopPicksSection
              movies={trendingMoviesWeek}
              title="Top 10 Movies in Egypt Today"
            />
          </LazyWrapper>
        </Suspense>
      )}

      {/* Trending Now */}
      <Suspense fallback={<LoadingFallback />}>
        <LazyWrapper height={250}>
          <div className="py-6 md:py-8 container">
            <MediaSection
              title="Trending Now"
              data={trendingMoviesWeek}
              isLoading={false}
              error={null}
              onRetry={() => {}}
            />
          </div>
        </LazyWrapper>
      </Suspense>

      {/* New Releases Section */}
      {upcomingMovies && (
        <Suspense fallback={<LoadingFallback />}>
          <LazyWrapper height={350}>
            <NewReleasesSection
              movies={upcomingMovies}
              title="New Releases This Week"
            />
          </LazyWrapper>
        </Suspense>
      )}

      {/* Continue Watching Section */}
      {trendingTvWeek && (
        <Suspense fallback={<LoadingFallback />}>
          <LazyWrapper height={350}>
            <ContinueWatchingSection
              movies={trendingTvWeek}
              title="Continue Watching"
              mediaType="tv"
            />
          </LazyWrapper>
        </Suspense>
      )}

      {/* Trending TV Shows */}
      <Suspense fallback={<LoadingFallback />}>
        <LazyWrapper height={250}>
          <div className="py-6 md:py-8 container">
            <MediaSection
              title="Trending TV Shows"
              data={trendingTvWeek}
              isLoading={false}
              error={null}
              onRetry={() => {}}
            />
          </div>
        </LazyWrapper>
      </Suspense>

      {/* First Promo - Left Aligned */}
      {popularMovies && popularMovies[0] && (
        <Suspense fallback={<LoadingFallback />}>
          <LazyWrapper height={500}>
            <MoviePromo
              movie={popularMovies[0]}
              mediaType="movie"
              variant="left"
            />
          </LazyWrapper>
        </Suspense>
      )}

      {/* Only on Netflix Section */}
      {popularTv && (
        <Suspense fallback={<LoadingFallback />}>
          <LazyWrapper height={400}>
            <OnlyOnNetflixSection movies={popularTv} mediaType="tv" />
          </LazyWrapper>
        </Suspense>
      )}

      {/* Genre Showcase - Action */}
      {trendingMoviesDay && (
        <Suspense fallback={<LoadingFallback />}>
          <LazyWrapper height={400}>
            <GenreShowcaseSection
              movies={trendingMoviesDay}
              genre="Action & Adventure"
              mediaType="movie"
            />
          </LazyWrapper>
        </Suspense>
      )}

      {/* Trending Today */}
      <Suspense fallback={<LoadingFallback />}>
        <LazyWrapper height={250}>
          <div className="py-6 md:py-8 container">
            <MediaSection
              title="Trending Today"
              data={trendingMoviesDay}
              isLoading={false}
              error={null}
              onRetry={() => {}}
            />
          </div>
        </LazyWrapper>
      </Suspense>

      {/* Weekend Watch Section */}
      {popularMovies && (
        <Suspense fallback={<LoadingFallback />}>
          <LazyWrapper height={400}>
            <WeekendWatchSection movies={popularMovies} mediaType="movie" />
          </LazyWrapper>
        </Suspense>
      )}

      {/* Because You Watched Section */}
      {trendingTvDay && (
        <Suspense fallback={<LoadingFallback />}>
          <LazyWrapper height={300}>
            <BecauseYouWatchedSection
              movies={trendingTvDay}
              basedOn="Stranger Things"
              mediaType="tv"
            />
          </LazyWrapper>
        </Suspense>
      )}

      {/* Hot TV Shows Today & Popular Movies */}
      <Suspense fallback={<LoadingFallback />}>
        <LazyWrapper height={500}>
          <div className="py-6 md:py-8 container">
            <MediaSection
              title="Hot TV Shows Today"
              data={trendingTvDay}
              isLoading={false}
              error={null}
              onRetry={() => {}}
            />
            <MediaSection
              title="Popular Movies"
              data={popularMovies}
              isLoading={false}
              error={null}
              onRetry={() => {}}
            />
          </div>
        </LazyWrapper>
      </Suspense>

      {/* Second Promo - Right Aligned */}
      {popularTv && popularTv[1] && (
        <Suspense fallback={<LoadingFallback />}>
          <LazyWrapper height={500}>
            <MoviePromo movie={popularTv[1]} mediaType="tv" variant="right" />
          </LazyWrapper>
        </Suspense>
      )}

      {/* Binge-Worthy Section */}
      {onTheAirTv && (
        <Suspense fallback={<LoadingFallback />}>
          <LazyWrapper height={350}>
            <BingeWorthySection movies={onTheAirTv} mediaType="tv" />
          </LazyWrapper>
        </Suspense>
      )}

      {/* Top 10 TV Shows */}
      {popularTv && (
        <Suspense fallback={<LoadingFallback />}>
          <LazyWrapper height={300}>
            <TopPicksSection
              movies={popularTv}
              title="Top 10 TV Shows in Egypt Today"
            />
          </LazyWrapper>
        </Suspense>
      )}

      {/* Popular TV Shows & Coming Soon */}
      <Suspense fallback={<LoadingFallback />}>
        <LazyWrapper height={500}>
          <div className="py-6 md:py-8 container">
            <MediaSection
              title="Popular TV Shows"
              data={popularTv}
              isLoading={false}
              error={null}
              onRetry={() => {}}
            />
            <MediaSection
              title="Coming Soon"
              data={upcomingMovies}
              isLoading={false}
              error={null}
              onRetry={() => {}}
            />
          </div>
        </LazyWrapper>
      </Suspense>

      {/* Award Winners Section */}
      {topRatedMovies && (
        <Suspense fallback={<LoadingFallback />}>
          <LazyWrapper height={350}>
            <AwardWinnersSection movies={topRatedMovies} mediaType="movie" />
          </LazyWrapper>
        </Suspense>
      )}

      {/* Third Promo - Center Aligned */}
      {topRatedMovies && topRatedMovies[2] && (
        <Suspense fallback={<LoadingFallback />}>
          <LazyWrapper height={500}>
            <MoviePromo
              movie={topRatedMovies[2]}
              mediaType="movie"
              variant="center"
            />
          </LazyWrapper>
        </Suspense>
      )}

      {/* Genre Showcase - Drama */}
      {airingTodayTv && (
        <Suspense fallback={<LoadingFallback />}>
          <LazyWrapper height={400}>
            <GenreShowcaseSection
              movies={airingTodayTv}
              genre="Drama Series"
              mediaType="tv"
            />
          </LazyWrapper>
        </Suspense>
      )}

      {/* Airing Today */}
      <Suspense fallback={<LoadingFallback />}>
        <LazyWrapper height={250}>
          <div className="py-6 md:py-8 container">
            <MediaSection
              title="Airing Today"
              data={airingTodayTv}
              isLoading={false}
              error={null}
              onRetry={() => {}}
            />
          </div>
        </LazyWrapper>
      </Suspense>

      {/* New Episodes This Week */}
      {airingTodayTv && (
        <Suspense fallback={<LoadingFallback />}>
          <LazyWrapper height={350}>
            <NewReleasesSection
              movies={airingTodayTv}
              title="New Episodes This Week"
            />
          </LazyWrapper>
        </Suspense>
      )}

      {/* Now Playing in Theaters */}
      <Suspense fallback={<LoadingFallback />}>
        <LazyWrapper height={250}>
          <div className="py-6 md:py-8 container">
            <MediaSection
              title="Now Playing in Theaters"
              data={nowPlayingMovies}
              isLoading={false}
              error={null}
              onRetry={() => {}}
            />
          </div>
        </LazyWrapper>
      </Suspense>

      {/* Fourth Promo - Left Aligned */}
      {topRatedTv && topRatedTv[3] && (
        <Suspense fallback={<LoadingFallback />}>
          <LazyWrapper height={500}>
            <MoviePromo movie={topRatedTv[3]} mediaType="tv" variant="left" />
          </LazyWrapper>
        </Suspense>
      )}

      {/* Award Winners TV */}
      {topRatedTv && (
        <Suspense fallback={<LoadingFallback />}>
          <LazyWrapper height={350}>
            <AwardWinnersSection movies={topRatedTv} mediaType="tv" />
          </LazyWrapper>
        </Suspense>
      )}

      {/* Because You Watched Section 2 */}
      {nowPlayingMovies && (
        <Suspense fallback={<LoadingFallback />}>
          <LazyWrapper height={300}>
            <BecauseYouWatchedSection
              movies={nowPlayingMovies}
              basedOn="The Dark Knight"
              mediaType="movie"
            />
          </LazyWrapper>
        </Suspense>
      )}

      {/* Currently Airing */}
      <Suspense fallback={<LoadingFallback />}>
        <LazyWrapper height={250}>
          <div className="py-6 md:py-8 container">
            <MediaSection
              title="Currently Airing"
              data={onTheAirTv}
              isLoading={false}
              error={null}
              onRetry={() => {}}
            />
          </div>
        </LazyWrapper>
      </Suspense>

      {/* Pricing Section */}
      <Suspense fallback={<LoadingFallback />}>
        <LazyWrapper height={550}>
          <PricingSection />
        </LazyWrapper>
      </Suspense>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingFallback />}>
        <LazyWrapper height={500}>
          <AskedQuestions />
        </LazyWrapper>
      </Suspense>
    </div>
  );
});

export default Home;

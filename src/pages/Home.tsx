import { memo, useMemo, useCallback, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Loader, Error as ErrorComponent } from "@/components/ui";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import HeroSection from "@/components/shared/heroSection/HeroSection";

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

  const isLoading = useMemo(
    () =>
      popularLoading ||
      trendingWeekLoading ||
      trendingDayLoading ||
      upcomingLoading ||
      nowPlayingLoading ||
      popularTvLoading ||
      trendingTvWeekLoading ||
      trendingTvDayLoading ||
      airingTodayLoading ||
      onTheAirLoading,
    [
      popularLoading,
      trendingWeekLoading,
      trendingDayLoading,
      upcomingLoading,
      nowPlayingLoading,
      popularTvLoading,
      trendingTvWeekLoading,
      trendingTvDayLoading,
      airingTodayLoading,
      onTheAirLoading,
    ],
  );

  const error = useMemo(
    () =>
      popularError ||
      trendingWeekError ||
      trendingDayError ||
      upcomingError ||
      nowPlayingError ||
      popularTvError ||
      trendingTvWeekError ||
      trendingTvDayError ||
      airingTodayError ||
      onTheAirError,
    [
      popularError,
      trendingWeekError,
      trendingDayError,
      upcomingError,
      nowPlayingError,
      popularTvError,
      trendingTvWeekError,
      trendingTvDayError,
      airingTodayError,
      onTheAirError,
    ],
  );

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

  const handleEmptyRetry = useCallback(() => {}, []);
  const handleEmptyHeroRetry = useCallback(() => {}, []);

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
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--background-primary)] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <motion.div
        className="min-h-screen bg-[var(--background-primary)]"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section - always visible, no lazy loading */}
        <HeroSection
          data={AllData}
          isLoading={false}
          error={null}
          onRetry={handleEmptyHeroRetry}
        />

        {/* Top 10 Movies Section */}
        {trendingMoviesWeek && (
          <LazyWrapper>
            <TopPicksSection
              movies={trendingMoviesWeek}
              title="Top 10 Movies in Egypt Today"
            />
          </LazyWrapper>
        )}

        {/* Trending Now */}
        <LazyWrapper>
          <div className="py-6 md:py-8 container">
            <MediaSection
              title="Trending Now"
              data={trendingMoviesWeek}
              isLoading={false}
              error={null}
              onRetry={handleEmptyRetry}
            />
          </div>
        </LazyWrapper>

        {/* New Releases Section */}
        {upcomingMovies && (
          <LazyWrapper>
            <NewReleasesSection
              movies={upcomingMovies}
              title="New Releases This Week"
            />
          </LazyWrapper>
        )}

        {/* Continue Watching Section */}
        {trendingTvWeek && (
          <LazyWrapper>
            <ContinueWatchingSection
              movies={trendingTvWeek}
              title="Continue Watching"
              mediaType="tv"
            />
          </LazyWrapper>
        )}

        {/* Trending TV Shows */}
        <LazyWrapper>
          <div className="py-6 md:py-8 container">
            <MediaSection
              title="Trending TV Shows"
              data={trendingTvWeek}
              isLoading={false}
              error={null}
              onRetry={handleEmptyRetry}
            />
          </div>
        </LazyWrapper>

        {/* First Promo - Left Aligned */}
        {popularMovies && popularMovies[0] && (
          <LazyWrapper height={400}>
            <MoviePromo
              movie={popularMovies[0]}
              mediaType="movie"
              variant="left"
            />
          </LazyWrapper>
        )}

        {/* Only on Netflix Section */}
        {popularTv && (
          <LazyWrapper>
            <OnlyOnNetflixSection movies={popularTv} mediaType="tv" />
          </LazyWrapper>
        )}

        {/* Genre Showcase - Action */}
        {trendingMoviesDay && (
          <LazyWrapper>
            <GenreShowcaseSection
              movies={trendingMoviesDay}
              genre="Action & Adventure"
              mediaType="movie"
            />
          </LazyWrapper>
        )}

        {/* Trending Today */}
        <LazyWrapper>
          <div className="py-6 md:py-8 container">
            <MediaSection
              title="Trending Today"
              data={trendingMoviesDay}
              isLoading={false}
              error={null}
              onRetry={handleEmptyRetry}
            />
          </div>
        </LazyWrapper>

        {/* Weekend Watch Section */}
        {popularMovies && (
          <LazyWrapper>
            <WeekendWatchSection
              movies={popularMovies}
              mediaType="movie"
            />
          </LazyWrapper>
        )}

        {/* Because You Watched Section */}
        {trendingTvDay && (
          <LazyWrapper>
            <BecauseYouWatchedSection
              movies={trendingTvDay}
              basedOn="Stranger Things"
              mediaType="tv"
            />
          </LazyWrapper>
        )}

        {/* Hot TV Shows Today & Popular Movies */}
        <LazyWrapper>
          <div className="py-6 md:py-8 container">
            <MediaSection
              title="Hot TV Shows Today"
              data={trendingTvDay}
              isLoading={false}
              error={null}
              onRetry={handleEmptyRetry}
            />
            <MediaSection
              title="Popular Movies"
              data={popularMovies}
              isLoading={false}
              error={null}
              onRetry={handleEmptyRetry}
            />
          </div>
        </LazyWrapper>

        {/* Second Promo - Right Aligned */}
        {popularTv && popularTv[1] && (
          <LazyWrapper height={400}>
            <MoviePromo
              movie={popularTv[1]}
              mediaType="tv"
              variant="right"
            />
          </LazyWrapper>
        )}

        {/* Binge-Worthy Section */}
        {onTheAirTv && (
          <LazyWrapper>
            <BingeWorthySection movies={onTheAirTv} mediaType="tv" />
          </LazyWrapper>
        )}

        {/* Top 10 TV Shows */}
        {popularTv && (
          <LazyWrapper>
            <TopPicksSection
              movies={popularTv}
              title="Top 10 TV Shows in Egypt Today"
            />
          </LazyWrapper>
        )}

        {/* Popular TV Shows & Coming Soon */}
        <LazyWrapper>
          <div className="py-6 md:py-8 container">
            <MediaSection
              title="Popular TV Shows"
              data={popularTv}
              isLoading={false}
              error={null}
              onRetry={handleEmptyRetry}
            />
            <MediaSection
              title="Coming Soon"
              data={upcomingMovies}
              isLoading={false}
              error={null}
              onRetry={handleEmptyRetry}
            />
          </div>
        </LazyWrapper>

        {/* Award Winners Section */}
        {topRatedMovies && (
          <LazyWrapper>
            <AwardWinnersSection movies={topRatedMovies} mediaType="movie" />
          </LazyWrapper>
        )}

        {/* Third Promo - Center Aligned */}
        {topRatedMovies && topRatedMovies[2] && (
          <LazyWrapper height={400}>
            <MoviePromo
              movie={topRatedMovies[2]}
              mediaType="movie"
              variant="center"
            />
          </LazyWrapper>
        )}

        {/* Genre Showcase - Drama */}
        {airingTodayTv && (
          <LazyWrapper>
            <GenreShowcaseSection
              movies={airingTodayTv}
              genre="Drama Series"
              mediaType="tv"
            />
          </LazyWrapper>
        )}

        {/* Airing Today */}
        <LazyWrapper>
          <div className="py-6 md:py-8 container">
            <MediaSection
              title="Airing Today"
              data={airingTodayTv}
              isLoading={false}
              error={null}
              onRetry={handleEmptyRetry}
            />
          </div>
        </LazyWrapper>

        {/* New Episodes This Week */}
        {airingTodayTv && (
          <LazyWrapper>
            <NewReleasesSection
              movies={airingTodayTv}
              title="New Episodes This Week"
            />
          </LazyWrapper>
        )}

        {/* Now Playing in Theaters */}
        <LazyWrapper>
          <div className="py-6 md:py-8 container">
            <MediaSection
              title="Now Playing in Theaters"
              data={nowPlayingMovies}
              isLoading={false}
              error={null}
              onRetry={handleEmptyRetry}
            />
          </div>
        </LazyWrapper>

        {/* Fourth Promo - Left Aligned */}
        {topRatedTv && topRatedTv[3] && (
          <LazyWrapper height={400}>
            <MoviePromo
              movie={topRatedTv[3]}
              mediaType="tv"
              variant="left"
            />
          </LazyWrapper>
        )}

        {/* Award Winners TV */}
        {topRatedTv && (
          <LazyWrapper>
            <AwardWinnersSection movies={topRatedTv} mediaType="tv" />
          </LazyWrapper>
        )}

        {/* Because You Watched Section 2 */}
        {nowPlayingMovies && (
          <LazyWrapper>
            <BecauseYouWatchedSection
              movies={nowPlayingMovies}
              basedOn="The Dark Knight"
              mediaType="movie"
            />
          </LazyWrapper>
        )}

        {/* Currently Airing */}
        <LazyWrapper>
          <div className="py-6 md:py-8 container">
            <MediaSection
              title="Currently Airing"
              data={onTheAirTv}
              isLoading={false}
              error={null}
              onRetry={handleEmptyRetry}
            />
          </div>
        </LazyWrapper>

        {/* Pricing Section */}
        <LazyWrapper>
          <PricingSection />
        </LazyWrapper>

        {/* FAQ Section */}
        <LazyWrapper>
          <AskedQuestions />
        </LazyWrapper>
      </motion.div>
    </Suspense>
  );
});

export default Home;

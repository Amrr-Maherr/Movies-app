import { memo, useMemo, useCallback, lazy, Suspense } from "react";
import { Error as ErrorComponent, SectionSkeleton } from "@/components/ui";
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
  const { data: topRatedMovies, isLoading: topRatedLoading } = useTopRatedMovies();
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
  const { data: topRatedTv, isLoading: topRatedTvLoading } = useTopRatedTvShows();
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

  // FIX: Only take a few items for hero section to prevent swiper from overworking
  const heroData = useMemo(
    () => [
      ...(trendingMoviesWeek?.slice(0, 5) || []),
      ...(trendingTvWeek?.slice(0, 5) || []),
    ],
    [trendingMoviesWeek, trendingTvWeek],
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

  // Only show full page error if absolutely no critical data is available
  if (!popularMovies && (popularError || trendingWeekError || trendingDayError)) {
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
    <div className="min-h-screen bg-[var(--background-primary)]">
      <HelmetMeta
        name="Netflix Egypt - Watch TV Shows Online, Watch Movies Online"
        description="Watch unlimited movies and TV shows on Netflix. Stream anytime, anywhere on any device."
      />

      {/* Hero Section - prioritized */}
      <Suspense fallback={<SectionSkeleton variant="hero" />}>
        <HeroSection
          data={heroData}
          isLoading={heroData.length === 0 && (trendingWeekLoading || trendingTvWeekLoading)}
          error={null}
          onRetry={() => { }}
        />
      </Suspense>

      {/* Top 10 Movies Section */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={10} />}>
        <LazyWrapper height={300}>
          {trendingMoviesWeek ? (
             <TopPicksSection
             movies={trendingMoviesWeek}
             title="Top 10 Movies in Egypt Today"
           />
          ) : trendingWeekLoading ? (
            <SectionSkeleton variant="grid" cardCount={10} />
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
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
        <LazyWrapper height={350}>
          {upcomingMovies ? (
            <NewReleasesSection
              movies={upcomingMovies}
              title="New Releases This Week"
            />
          ) : upcomingLoading ? (
            <SectionSkeleton variant="grid" cardCount={6} />
          ) : null}
        </LazyWrapper>
      </Suspense>

      {/* Continue Watching Section */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
        <LazyWrapper height={350}>
          {trendingTvWeek ? (
            <ContinueWatchingSection
              movies={trendingTvWeek}
              title="Continue Watching"
              mediaType="tv"
            />
          ) : trendingTvWeekLoading ? (
            <SectionSkeleton variant="grid" cardCount={6} />
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

      {/* First Promo - Left Aligned */}
      <Suspense fallback={<SectionSkeleton variant="hero" />}>
        <LazyWrapper height={500}>
           {popularMovies && popularMovies[0] ? (
             <MoviePromo
               movie={popularMovies[0]}
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

      {/* Genre Showcase - Action */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
        <LazyWrapper height={400}>
          {trendingMoviesDay ? (
            <GenreShowcaseSection
              movies={trendingMoviesDay}
              genre="Action & Adventure"
              mediaType="movie"
            />
          ) : trendingDayLoading ? (
            <SectionSkeleton variant="grid" cardCount={6} />
          ) : null}
        </LazyWrapper>
      </Suspense>

      {/* Trending Today */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
        <LazyWrapper height={250}>
          <div className="py-6 md:py-8 container">
            <MediaSection
              title="Trending Today"
              data={trendingMoviesDay}
              isLoading={trendingDayLoading}
              error={trendingDayError}
              onRetry={trendingDayRefetch}
            />
          </div>
        </LazyWrapper>
      </Suspense>

      {/* Weekend Watch Section */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
        <LazyWrapper height={400}>
          {popularMovies ? (
            <WeekendWatchSection movies={popularMovies} mediaType="movie" />
          ) : popularLoading ? (
            <SectionSkeleton variant="grid" cardCount={6} />
          ) : null}
        </LazyWrapper>
      </Suspense>

      {/* Because You Watched Section */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
        <LazyWrapper height={300}>
          {trendingTvDay ? (
            <BecauseYouWatchedSection
              movies={trendingTvDay}
              basedOn="Stranger Things"
              mediaType="tv"
            />
          ) : trendingTvDayLoading? (
            <SectionSkeleton variant="grid" cardCount={6} />
          ) : null}
        </LazyWrapper>
      </Suspense>

      {/* Hot TV Shows Today & Popular Movies */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={12} />}>
        <LazyWrapper height={500}>
          <div className="py-6 md:py-8 container">
            <MediaSection
              title="Hot TV Shows Today"
              data={trendingTvDay}
              isLoading={trendingTvDayLoading}
              error={trendingTvDayError}
              onRetry={trendingTvDayRefetch}
            />
            <MediaSection
              title="Popular Movies"
              data={popularMovies}
              isLoading={popularLoading}
              error={popularError}
              onRetry={popularRefetch}
            />
          </div>
        </LazyWrapper>
      </Suspense>

      {/* Second Promo - Right Aligned */}
      <Suspense fallback={<SectionSkeleton variant="hero" />}>
        <LazyWrapper height={500}>
          {popularTv && popularTv[1] ? (
            <MoviePromo movie={popularTv[1]} mediaType="tv" variant="left" />
          ) : null}
        </LazyWrapper>
      </Suspense>

      {/* Binge-Worthy Section */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
        <LazyWrapper height={350}>
          {onTheAirTv ? (
            <BingeWorthySection movies={onTheAirTv} mediaType="tv" />
          ) : onTheAirLoading ? (
            <SectionSkeleton variant="grid" cardCount={6} />
          ) : null}
        </LazyWrapper>
      </Suspense>

      {/* Top 10 TV Shows */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={10} />}>
        <LazyWrapper height={300}>
          {popularTv ? (
            <TopPicksSection
              movies={popularTv}
              title="Top 10 TV Shows in Egypt Today"
            />
          ) : popularTvLoading ? (
            <SectionSkeleton variant="grid" cardCount={10} />
          ) : null}
        </LazyWrapper>
      </Suspense>

      {/* Popular TV Shows & Coming Soon */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={12} />}>
        <LazyWrapper height={500}>
          <div className="py-6 md:py-8 container">
            <MediaSection
              title="Popular TV Shows"
              data={popularTv}
              isLoading={popularTvLoading}
              error={popularTvError}
              onRetry={popularTvRefetch}
            />
            <MediaSection
              title="Coming Soon"
              data={upcomingMovies}
              isLoading={upcomingLoading}
              error={upcomingError}
              onRetry={upcomingRefetch}
            />
          </div>
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

      {/* Third Promo - Center Aligned */}
      <Suspense fallback={<SectionSkeleton variant="hero" />}>
        <LazyWrapper height={500}>
          {topRatedMovies && topRatedMovies[2] ? (
            <MoviePromo
              movie={topRatedMovies[2]}
              mediaType="movie"
              variant="center"
            />
          ) : null}
        </LazyWrapper>
      </Suspense>

      {/* Genre Showcase - Drama */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
        <LazyWrapper height={400}>
          {airingTodayTv ? (
            <GenreShowcaseSection
              movies={airingTodayTv}
              genre="Drama Series"
              mediaType="tv"
            />
          ) : airingTodayLoading ? (
            <SectionSkeleton variant="grid" cardCount={6} />
          ) : null}
        </LazyWrapper>
      </Suspense>

      {/* Airing Today */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
        <LazyWrapper height={250}>
          <div className="py-6 md:py-8 container">
            <MediaSection
              title="Airing Today"
              data={airingTodayTv}
              isLoading={airingTodayLoading}
              error={airingTodayError}
              onRetry={airingTodayRefetch}
            />
          </div>
        </LazyWrapper>
      </Suspense>

      {/* New Episodes This Week */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
        <LazyWrapper height={350}>
          {airingTodayTv ? (
            <NewReleasesSection
              movies={airingTodayTv}
              title="New Episodes This Week"
            />
          ) : airingTodayLoading ? (
            <SectionSkeleton variant="grid" cardCount={6} />
          ) : null}
        </LazyWrapper>
      </Suspense>

      {/* Now Playing in Theaters */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
        <LazyWrapper height={250}>
          <div className="py-6 md:py-8 container">
            <MediaSection
              title="Now Playing in Theaters"
              data={nowPlayingMovies}
              isLoading={nowPlayingLoading}
              error={nowPlayingError}
              onRetry={nowPlayingRefetch}
            />
          </div>
        </LazyWrapper>
      </Suspense>

      {/* Fourth Promo - Left Aligned */}
      <Suspense fallback={<SectionSkeleton variant="hero" />}>
        <LazyWrapper height={500}>
          {topRatedTv && topRatedTv[3] ? (
            <MoviePromo movie={topRatedTv[3]} mediaType="tv" variant="left" />
          ) : null}
        </LazyWrapper>
      </Suspense>

      {/* Award Winners TV */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
        <LazyWrapper height={350}>
          {topRatedTv ? (
            <AwardWinnersSection movies={topRatedTv} mediaType="tv" />
          ) : topRatedTvLoading ? (
            <SectionSkeleton variant="grid" cardCount={6} />
          ) : null}
        </LazyWrapper>
      </Suspense>

      {/* Because You Watched Section 2 */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
        <LazyWrapper height={300}>
          {nowPlayingMovies ? (
            <BecauseYouWatchedSection
              movies={nowPlayingMovies}
              basedOn="The Dark Knight"
              mediaType="movie"
            />
          ) : nowPlayingLoading ? (
            <SectionSkeleton variant="grid" cardCount={6} />
          ) : null}
        </LazyWrapper>
      </Suspense>

      {/* Currently Airing */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
        <LazyWrapper height={250}>
          <div className="py-6 md:py-8 container">
            <MediaSection
              title="Currently Airing"
              data={onTheAirTv}
              isLoading={onTheAirLoading}
              error={onTheAirError}
              onRetry={onTheAirRefetch}
            />
          </div>
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

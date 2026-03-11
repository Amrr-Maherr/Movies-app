import { memo, useMemo, useCallback, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Loader, Error as ErrorComponent } from "@/components/ui";
import { useLazyLoad } from "@/hooks/useLazyLoad";

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

// Lazy-loaded components
const HeroSection = lazy(() => import("@/components/shared/heroSection").then((m) => ({ default: m.HeroSection })));
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

// Loading fallback component for Suspense - shown globally while any lazy component loads
const SectionLoader = () => (
  <div className="min-h-screen bg-[var(--background-primary)] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

// Memoized Home component - avoids re-renders when parent updates
const Home = memo(function Home() {
  // ======== Movies Queries ========
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

  // ======== TV Shows Queries ========
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

  // Memoized: Combine all data for HeroSection - avoids array operations on every render
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

  // Memoized: Global Loading State
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

  // Memoized: Global Error State
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

  // Memoized: Global Retry Function
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

  // Memoized: Empty handlers for lazy-loaded components (avoid inline arrow functions)
  const handleEmptyRetry = useCallback(() => {}, []);
  const handleEmptyHeroRetry = useCallback(() => {}, []);

  // ======== Lazy Load Hooks for Each Section ========
  const { ref: heroRef, isVisible: heroVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: top10MoviesRef, isVisible: top10MoviesVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: trendingNowRef, isVisible: trendingNowVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: newReleasesRef, isVisible: newReleasesVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: continueWatchingRef, isVisible: continueWatchingVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: trendingTvRef, isVisible: trendingTvVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: firstPromoRef, isVisible: firstPromoVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: onlyOnNetflixRef, isVisible: onlyOnNetflixVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: genreActionRef, isVisible: genreActionVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: trendingTodayRef, isVisible: trendingTodayVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: weekendWatchRef, isVisible: weekendWatchVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: becauseYouWatchedRef, isVisible: becauseYouWatchedVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: hotTvShowsRef, isVisible: hotTvShowsVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: secondPromoRef, isVisible: secondPromoVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: bingeWorthyRef, isVisible: bingeWorthyVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: top10TvRef, isVisible: top10TvVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: popularTvComingSoonRef, isVisible: popularTvComingSoonVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: awardWinnersMoviesRef, isVisible: awardWinnersMoviesVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: thirdPromoRef, isVisible: thirdPromoVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: genreDramaRef, isVisible: genreDramaVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: airingTodayRef, isVisible: airingTodayVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: newEpisodesRef, isVisible: newEpisodesVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: nowPlayingRef, isVisible: nowPlayingVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: fourthPromoRef, isVisible: fourthPromoVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: awardWinnersTvRef, isVisible: awardWinnersTvVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: becauseYouWatched2Ref, isVisible: becauseYouWatched2Visible } = useLazyLoad<HTMLDivElement>();
  const { ref: currentlyAiringRef, isVisible: currentlyAiringVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: pricingRef, isVisible: pricingVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: faqRef, isVisible: faqVisible } = useLazyLoad<HTMLDivElement>();

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
    <Suspense fallback={<SectionLoader />}>
      <motion.div
        className="min-h-screen bg-[var(--background-primary)]"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <div ref={heroRef}>
          {heroVisible && (
            <HeroSection
              data={AllData}
              isLoading={false}
              error={null}
              onRetry={handleEmptyHeroRetry}
            />
          )}
        </div>

        {/* Top 10 Movies Section */}
        <div ref={top10MoviesRef}>
          {top10MoviesVisible && trendingMoviesWeek && (
            <TopPicksSection
              movies={trendingMoviesWeek}
              title="Top 10 Movies in Egypt Today"
            />
          )}
        </div>

        {/* Trending Now */}
        <div ref={trendingNowRef} className="py-6 md:py-8">
          {trendingNowVisible && (
            <div className="container">
              <MediaSection
                title="Trending Now"
                data={trendingMoviesWeek}
                isLoading={false}
                error={null}
                onRetry={handleEmptyRetry}
              />
            </div>
          )}
        </div>

        {/* New Releases Section */}
        <div ref={newReleasesRef}>
          {newReleasesVisible && upcomingMovies && (
            <NewReleasesSection
              movies={upcomingMovies}
              title="New Releases This Week"
            />
          )}
        </div>

        {/* Continue Watching Section */}
        <div ref={continueWatchingRef}>
          {continueWatchingVisible && trendingTvWeek && (
            <ContinueWatchingSection
              movies={trendingTvWeek}
              title="Continue Watching"
              mediaType="tv"
            />
          )}
        </div>

        {/* Trending TV Shows */}
        <div ref={trendingTvRef} className="py-6 md:py-8">
          {trendingTvVisible && (
            <div className="container">
              <MediaSection
                title="Trending TV Shows"
                data={trendingTvWeek}
                isLoading={false}
                error={null}
                onRetry={handleEmptyRetry}
              />
            </div>
          )}
        </div>

        {/* First Promo - Left Aligned */}
        <div ref={firstPromoRef}>
          {firstPromoVisible && popularMovies && popularMovies[0] && (
            <MoviePromo
              movie={popularMovies[0]}
              mediaType="movie"
              variant="left"
            />
          )}
        </div>

        {/* Only on Netflix Section */}
        <div ref={onlyOnNetflixRef}>
          {onlyOnNetflixVisible && popularTv && (
            <OnlyOnNetflixSection movies={popularTv} mediaType="tv" />
          )}
        </div>

        {/* Genre Showcase - Action */}
        <div ref={genreActionRef}>
          {genreActionVisible && trendingMoviesDay && (
            <GenreShowcaseSection
              movies={trendingMoviesDay}
              genre="Action & Adventure"
              mediaType="movie"
            />
          )}
        </div>

        {/* Trending Today */}
        <div ref={trendingTodayRef} className="py-6 md:py-8">
          {trendingTodayVisible && (
            <div className="container">
              <MediaSection
                title="Trending Today"
                data={trendingMoviesDay}
                isLoading={false}
                error={null}
                onRetry={handleEmptyRetry}
              />
            </div>
          )}
        </div>

        {/* Weekend Watch Section */}
        <div ref={weekendWatchRef}>
          {weekendWatchVisible && popularMovies && (
            <WeekendWatchSection
              movies={popularMovies}
              mediaType="movie"
            />
          )}
        </div>

        {/* Because You Watched Section */}
        <div ref={becauseYouWatchedRef}>
          {becauseYouWatchedVisible && trendingTvDay && (
            <BecauseYouWatchedSection
              movies={trendingTvDay}
              basedOn="Stranger Things"
              mediaType="tv"
            />
          )}
        </div>

        {/* Hot TV Shows Today & Popular Movies */}
        <div ref={hotTvShowsRef} className="py-6 md:py-8">
          {hotTvShowsVisible && (
            <div className="container">
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
          )}
        </div>

        {/* Second Promo - Right Aligned */}
        <div ref={secondPromoRef}>
          {secondPromoVisible && popularTv && popularTv[1] && (
            <MoviePromo
              movie={popularTv[1]}
              mediaType="tv"
              variant="right"
            />
          )}
        </div>

        {/* Binge-Worthy Section */}
        <div ref={bingeWorthyRef}>
          {bingeWorthyVisible && onTheAirTv && (
            <BingeWorthySection movies={onTheAirTv} mediaType="tv" />
          )}
        </div>

        {/* Top 10 TV Shows */}
        <div ref={top10TvRef}>
          {top10TvVisible && popularTv && (
            <TopPicksSection
              movies={popularTv}
              title="Top 10 TV Shows in Egypt Today"
            />
          )}
        </div>

        {/* Popular TV Shows & Coming Soon */}
        <div ref={popularTvComingSoonRef} className="py-6 md:py-8">
          {popularTvComingSoonVisible && (
            <div className="container">
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
          )}
        </div>

        {/* Award Winners Section */}
        <div ref={awardWinnersMoviesRef}>
          {awardWinnersMoviesVisible && topRatedMovies && (
            <AwardWinnersSection movies={topRatedMovies} mediaType="movie" />
          )}
        </div>

        {/* Third Promo - Center Aligned */}
        <div ref={thirdPromoRef}>
          {thirdPromoVisible && topRatedMovies && topRatedMovies[2] && (
            <MoviePromo
              movie={topRatedMovies[2]}
              mediaType="movie"
              variant="center"
            />
          )}
        </div>

        {/* Genre Showcase - Drama */}
        <div ref={genreDramaRef}>
          {genreDramaVisible && airingTodayTv && (
            <GenreShowcaseSection
              movies={airingTodayTv}
              genre="Drama Series"
              mediaType="tv"
            />
          )}
        </div>

        {/* Airing Today */}
        <div ref={airingTodayRef} className="py-6 md:py-8">
          {airingTodayVisible && (
            <div className="container">
              <MediaSection
                title="Airing Today"
                data={airingTodayTv}
                isLoading={false}
                error={null}
                onRetry={handleEmptyRetry}
              />
            </div>
          )}
        </div>

        {/* New Episodes This Week */}
        <div ref={newEpisodesRef}>
          {newEpisodesVisible && airingTodayTv && (
            <NewReleasesSection
              movies={airingTodayTv}
              title="New Episodes This Week"
            />
          )}
        </div>

        {/* Now Playing in Theaters */}
        <div ref={nowPlayingRef} className="py-6 md:py-8">
          {nowPlayingVisible && (
            <div className="container">
              <MediaSection
                title="Now Playing in Theaters"
                data={nowPlayingMovies}
                isLoading={false}
                error={null}
                onRetry={handleEmptyRetry}
              />
            </div>
          )}
        </div>

        {/* Fourth Promo - Left Aligned */}
        <div ref={fourthPromoRef}>
          {fourthPromoVisible && topRatedTv && topRatedTv[3] && (
            <MoviePromo
              movie={topRatedTv[3]}
              mediaType="tv"
              variant="left"
            />
          )}
        </div>

        {/* Award Winners TV */}
        <div ref={awardWinnersTvRef}>
          {awardWinnersTvVisible && topRatedTv && (
            <AwardWinnersSection movies={topRatedTv} mediaType="tv" />
          )}
        </div>

        {/* Because You Watched Section 2 */}
        <div ref={becauseYouWatched2Ref}>
          {becauseYouWatched2Visible && nowPlayingMovies && (
            <BecauseYouWatchedSection
              movies={nowPlayingMovies}
              basedOn="The Dark Knight"
              mediaType="movie"
            />
          )}
        </div>

        {/* Currently Airing */}
        <div ref={currentlyAiringRef} className="py-6 md:py-8">
          {currentlyAiringVisible && (
            <div className="container">
              <MediaSection
                title="Currently Airing"
                data={onTheAirTv}
                isLoading={false}
                error={null}
                onRetry={handleEmptyRetry}
              />
            </div>
          )}
        </div>

        {/* Pricing Section */}
        <div ref={pricingRef}>
          {pricingVisible && <PricingSection />}
        </div>

        {/* FAQ Section */}
        <div ref={faqRef}>
          {faqVisible && <AskedQuestions />}
        </div>
      </motion.div>
    </Suspense>
  );
});

export default Home;

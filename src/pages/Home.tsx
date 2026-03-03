import { motion } from "framer-motion";
import { HeroSection } from "@/components/shared/heroSection";
import MediaSection from "@/components/shared/MediaSection";
import TopPicksSection from "@/components/sections/TopPicksSection";
import MoviePromo from "@/components/sections/MoviePromo";
import ContinueWatchingSection from "@/components/sections/ContinueWatchingSection";
import GenreShowcaseSection from "@/components/sections/GenreShowcaseSection";
import BecauseYouWatchedSection from "@/components/sections/BecauseYouWatchedSection";
import NewReleasesSection from "@/components/sections/NewReleasesSection";
import OnlyOnNetflixSection from "@/components/sections/OnlyOnNetflixSection";
import AwardWinnersSection from "@/components/sections/AwardWinnersSection";
import BingeWorthySection from "@/components/sections/BingeWorthySection";
import WeekendWatchSection from "@/components/sections/WeekendWatchSection";
import PricingSection from "@/components/sections/PricingSection";
import AskedQuestions from "@/components/sections/AskedQuestions";
import { Loader, Error as ErrorComponent } from "@/components/ui";

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

const Home = () => {
  // ======== Movies Queries ========
  const { data: popularMovies, isLoading: popularLoading, error: popularError, refetch: popularRefetch } = usePopularMovies();
  const { data: topRatedMovies } = useTopRatedMovies();
  const { data: nowPlayingMovies, isLoading: nowPlayingLoading, error: nowPlayingError, refetch: nowPlayingRefetch } = useNowPlayingMovies();
  const { data: trendingMoviesWeek, isLoading: trendingWeekLoading, error: trendingWeekError, refetch: trendingWeekRefetch } = useTrendingMoviesWeek();
  const { data: trendingMoviesDay, isLoading: trendingDayLoading, error: trendingDayError, refetch: trendingDayRefetch } = useTrendingMoviesDay();
  const { data: upcomingMovies, isLoading: upcomingLoading, error: upcomingError, refetch: upcomingRefetch } = useUpcomingMovies();

  // ======== TV Shows Queries ========
  const { data: popularTv, isLoading: popularTvLoading, error: popularTvError, refetch: popularTvRefetch } = usePopularTvShows();
  const { data: trendingTvWeek, isLoading: trendingTvWeekLoading, error: trendingTvWeekError, refetch: trendingTvWeekRefetch } = useTrendingTvWeek();
  const { data: trendingTvDay, isLoading: trendingTvDayLoading, error: trendingTvDayError, refetch: trendingTvDayRefetch } = useTrendingTvDay();
  const { data: topRatedTv } = useTopRatedTvShows();
  const { data: airingTodayTv, isLoading: airingTodayLoading, error: airingTodayError, refetch: airingTodayRefetch } = useAiringTodayTv();
  const { data: onTheAirTv, isLoading: onTheAirLoading, error: onTheAirError, refetch: onTheAirRefetch } = useOnTheAirTv();

  // ===== Combine all data for HeroSection =====
  const AllData = [
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
  ];

  // ===== Global Loading State =====
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

  // ===== Global Error State =====
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

  // ===== Global Retry Function =====
  const handleRetry = () => {
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
  };

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
        <ErrorComponent retryButtonText="Try Again" onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-[var(--background-primary)]"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <HeroSection
        data={AllData}
        isLoading={false}
        error={null}
        onRetry={() => {}}
      />

      {/* Top 10 Movies Section */}
      {trendingMoviesWeek && (
        <TopPicksSection
          movies={trendingMoviesWeek}
          title="Top 10 Movies in Egypt Today"
        />
      )}

      {/* Trending Now */}
      <div className="py-6 md:py-8">
        <div className="container">
          <MediaSection
            title="Trending Now"
            data={trendingMoviesWeek}
            isLoading={false}
            error={null}
            onRetry={() => {}}
          />
        </div>
      </div>

      {/* New Releases Section */}
      {upcomingMovies && (
        <NewReleasesSection
          movies={upcomingMovies}
          title="New Releases This Week"
        />
      )}

      {/* Continue Watching Section */}
      {trendingTvWeek && (
        <ContinueWatchingSection
          movies={trendingTvWeek}
          title="Continue Watching"
          mediaType="tv"
        />
      )}

      {/* Trending TV Shows */}
      <div className="py-6 md:py-8">
        <div className="container">
          <MediaSection
            title="Trending TV Shows"
            data={trendingTvWeek}
            isLoading={false}
            error={null}
            onRetry={() => {}}
          />
        </div>
      </div>

      {/* First Promo - Left Aligned */}
      {popularMovies && popularMovies[0] && (
        <MoviePromo
          movie={popularMovies[0]}
          mediaType="movie"
          variant="left"
        />
      )}

      {/* Only on Netflix Section */}
      {popularTv && (
        <OnlyOnNetflixSection
          movies={popularTv}
          mediaType="tv"
        />
      )}

      {/* Genre Showcase - Action */}
      {trendingMoviesDay && (
        <GenreShowcaseSection
          movies={trendingMoviesDay}
          genre="Action & Adventure"
          mediaType="movie"
        />
      )}

      {/* Trending Today */}
      <div className="py-6 md:py-8">
        <div className="container">
          <MediaSection
            title="Trending Today"
            data={trendingMoviesDay}
            isLoading={false}
            error={null}
            onRetry={() => {}}
          />
        </div>
      </div>

      {/* Weekend Watch Section */}
      {popularMovies && (
        <WeekendWatchSection
          movies={popularMovies}
          mediaType="movie"
        />
      )}

      {/* Because You Watched Section */}
      {trendingTvDay && (
        <BecauseYouWatchedSection
          movies={trendingTvDay}
          basedOn="Stranger Things"
          mediaType="tv"
        />
      )}

      {/* Hot TV Shows Today & Popular Movies */}
      <div className="py-6 md:py-8">
        <div className="container">
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
      </div>

      {/* Second Promo - Right Aligned */}
      {popularTv && popularTv[1] && (
        <MoviePromo
          movie={popularTv[1]}
          mediaType="tv"
          variant="right"
        />
      )}

      {/* Binge-Worthy Section */}
      {onTheAirTv && (
        <BingeWorthySection
          movies={onTheAirTv}
          mediaType="tv"
        />
      )}

      {/* Top 10 TV Shows */}
      {popularTv && (
        <TopPicksSection
          movies={popularTv}
          title="Top 10 TV Shows in Egypt Today"
        />
      )}

      {/* Popular TV Shows & Coming Soon */}
      <div className="py-6 md:py-8">
        <div className="container">
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
      </div>

      {/* Award Winners Section */}
      {topRatedMovies && (
        <AwardWinnersSection
          movies={topRatedMovies}
          mediaType="movie"
        />
      )}

      {/* Third Promo - Center Aligned */}
      {topRatedMovies && topRatedMovies[2] && (
        <MoviePromo
          movie={topRatedMovies[2]}
          mediaType="movie"
          variant="center"
        />
      )}

      {/* Genre Showcase - Drama */}
      {airingTodayTv && (
        <GenreShowcaseSection
          movies={airingTodayTv}
          genre="Drama Series"
          mediaType="tv"
        />
      )}

      {/* Airing Today */}
      <div className="py-6 md:py-8">
        <div className="container">
          <MediaSection
            title="Airing Today"
            data={airingTodayTv}
            isLoading={false}
            error={null}
            onRetry={() => {}}
          />
        </div>
      </div>

      {/* New Episodes This Week */}
      {airingTodayTv && (
        <NewReleasesSection
          movies={airingTodayTv}
          title="New Episodes This Week"
        />
      )}

      {/* Now Playing in Theaters */}
      <div className="py-6 md:py-8">
        <div className="container">
          <MediaSection
            title="Now Playing in Theaters"
            data={nowPlayingMovies}
            isLoading={false}
            error={null}
            onRetry={() => {}}
          />
        </div>
      </div>

      {/* Fourth Promo - Left Aligned */}
      {topRatedTv && topRatedTv[3] && (
        <MoviePromo
          movie={topRatedTv[3]}
          mediaType="tv"
          variant="left"
        />
      )}

      {/* Award Winners TV */}
      {topRatedTv && (
        <AwardWinnersSection
          movies={topRatedTv}
          mediaType="tv"
        />
      )}

      {/* Because You Watched Section 2 */}
      {nowPlayingMovies && (
        <BecauseYouWatchedSection
          movies={nowPlayingMovies}
          basedOn="The Dark Knight"
          mediaType="movie"
        />
      )}

      {/* Currently Airing */}
      <div className="py-6 md:py-8">
        <div className="container">
          <MediaSection
            title="Currently Airing"
            data={onTheAirTv}
            isLoading={false}
            error={null}
            onRetry={() => {}}
          />
        </div>
      </div>

      {/* Pricing Section */}
      <PricingSection />

      {/* FAQ Section */}
      <AskedQuestions />
    </motion.div>
  );
};

export default Home;

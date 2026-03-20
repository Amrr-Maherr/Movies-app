import { memo, useMemo, useCallback, Suspense, useState } from "react";
import { motion } from "framer-motion";
import { Film, Calendar, Star, TrendingUp } from "lucide-react";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { PageSkeleton, SectionSkeleton, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import { useNowPlayingMoviesQuery } from "@/hooks/shared";
import MediaGrid from "@/components/shared/MediaGrid";
import HeroSection from "@/components/shared/heroSection/HeroSection";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import Slider from "@/components/shared/Slider/slider";
import Card from "@/components/shared/Card/Card";
import type { Movie } from "@/types";

/**
 * NowPlayingMoviesPage Component
 * Dedicated page for displaying movies currently in theaters
 * Route: /movies/now-playing
 */
const NowPlayingMoviesPage = memo(function NowPlayingMoviesPage() {
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch now playing movies
  const {
    data: movies,
    isLoading,
    error,
    refetch,
  } = useNowPlayingMoviesQuery(currentPage);

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  // Memoized: Get featured movies for hero (top 5)
  const featuredMovies = useMemo(() => {
    if (!movies?.results || movies.results.length === 0) return [];
    return movies.results
      .filter((m: Movie) => m.backdrop_path)
      .sort((a: Movie, b: Movie) => b.popularity - a.popularity)
      .slice(0, 5);
  }, [movies]);

  // Memoized: Get trending movies for slider
  const trendingMovies = useMemo(() => {
    if (!movies?.results || movies.results.length === 0) return [];
    return movies.results
      .filter((m: Movie) => m.vote_average >= 7)
      .sort((a: Movie, b: Movie) => b.vote_average - a.vote_average)
      .slice(0, 10);
  }, [movies]);

  // Memoized: Get new releases
  const newReleases = useMemo(() => {
    if (!movies?.results || movies.results.length === 0) return [];
    const now = new Date();
    const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
    return movies.results
      .filter((m: Movie) => {
        if (!m.release_date) return false;
        return new Date(m.release_date) >= oneMonthAgo;
      })
      .slice(0, 10);
  }, [movies]);

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error || !movies) {
    return (
      <Error
        fullscreen
        title="Failed to load now playing movies"
        message="We couldn't load the movies currently in theaters. Please try again."
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      {/* SEO Meta Tags */}
      <HelmetMeta
        name="Now Playing in Theaters"
        description="Discover movies currently playing in theaters near you. Watch trailers, read reviews, and find showtimes."
        image={
          featuredMovies[0]?.backdrop_path
            ? `https://image.tmdb.org/t/p/original${featuredMovies[0].backdrop_path}`
            : undefined
        }
        url={window.location.href}
        type="website"
      />

      {/* Hero Section with Featured Movies */}
      {featuredMovies.length > 0 && (
        <LazyWrapper height={600}>
          <Suspense fallback={<SectionSkeleton variant="hero" />}>
            <HeroSection
              data={featuredMovies}
              isLoading={false}
              error={null}
              onRetry={handleRetry}
            />
          </Suspense>
        </LazyWrapper>
      )}

      {/* Page Header */}
      <section className="bg-black py-8 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-600 rounded-lg">
              <Film className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Now Playing in Theaters
              </h1>
              <p className="text-white/60 text-sm">
                {movies.results.length} movies currently showing • Updated daily
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Now Section */}
      {trendingMovies.length > 0 && (
        <section className="bg-black py-8">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
            <SectionHeader
              title="Trending Now"
              subtitle="Highest rated movies this week"
              icon={TrendingUp}
              iconColor="text-red-500"
              badgeText="Hot"
            />
            <LazyWrapper height={400}>
              <Suspense
                fallback={<SectionSkeleton variant="grid" cardCount={6} />}
              >
                <Slider
                  slidesPerView={6}
                  slidesPerViewMobile={3}
                  spaceBetween={16}
                  hideNavigation={false}
                >
                  {trendingMovies.map((movie) => (
                    <Card
                      key={movie.id}
                      movie={movie}
                      variant="standard"
                      showBadge
                      badgeType="trending"
                    />
                  ))}
                </Slider>
              </Suspense>
            </LazyWrapper>
          </div>
        </section>
      )}

      {/* New Releases Section */}
      {newReleases.length > 0 && (
        <section className="bg-black py-8">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
            <SectionHeader
              title="New Releases"
              subtitle="Fresh in theaters this month"
              icon={Calendar}
              iconColor="text-blue-500"
              badgeText="New"
              badgeColor="text-blue-500"
            />
            <LazyWrapper height={400}>
              <Suspense
                fallback={<SectionSkeleton variant="grid" cardCount={6} />}
              >
                <Slider
                  slidesPerView={6}
                  slidesPerViewMobile={3}
                  spaceBetween={16}
                  hideNavigation={false}
                >
                  {newReleases.map((movie) => (
                    <Card
                      key={movie.id}
                      movie={movie}
                      variant="newRelease"
                      isNew
                    />
                  ))}
                </Slider>
              </Suspense>
            </LazyWrapper>
          </div>
        </section>
      )}

      {/* All Now Playing Movies Grid */}
      <section className="bg-black py-8">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          <SectionHeader
            title="All Movies in Theaters"
            subtitle={`Showing ${movies.results.length} movies`}
            icon={Star}
            iconColor="text-yellow-500"
          />
          <LazyWrapper height={1200}>
            <Suspense
              fallback={<SectionSkeleton variant="grid" cardCount={12} />}
            >
              <MediaGrid items={movies.results} type="movie" />
            </Suspense>
          </LazyWrapper>
        </div>
      </section>

      {/* Pagination Info */}
      <section className="bg-black py-8 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl text-center">
          <div className="flex items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-6 py-2 bg-white/10 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              Previous
            </motion.button>
            <span className="text-white/80">Page {currentPage}</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={movies.results.length < 20}
              className="px-6 py-2 bg-white/10 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              Next
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
});

export default NowPlayingMoviesPage;

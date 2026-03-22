import { memo, useMemo, useCallback, Suspense, useState, lazy } from "react";
import { Film, Star } from "lucide-react";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { PageSkeleton, SectionSkeleton, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import ShadcnPagination from "@/components/shared/Pagination/ShadcnPagination";
import { useNowPlayingMoviesQuery } from "@/hooks/shared";
import type { Movie } from "@/types";

// Lazy-loaded components
const MediaGrid = lazy(() => import("@/components/shared/MediaGrid"));
const HeroSection = lazy(
  () => import("@/components/shared/heroSection/HeroSection"),
);
const SectionHeader = lazy(
  () => import("@/components/shared/SectionHeader/SectionHeader"),
);

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

      {/* All Now Playing Movies Grid */}
      <section className="bg-black py-8">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          <Suspense fallback={<SectionSkeleton variant="list" cardCount={1} />}>
            <SectionHeader
              title="All Movies in Theaters"
              subtitle={`Showing ${movies.results.length} movies`}
              icon={Star}
              iconColor="text-yellow-500"
            />
          </Suspense>
          <LazyWrapper height={1200}>
            <Suspense
              fallback={<SectionSkeleton variant="grid" cardCount={12} />}
            >
              <MediaGrid items={movies.results} type="movie" />
            </Suspense>
          </LazyWrapper>
        </div>
      </section>

      {/* Pagination */}
      <ShadcnPagination
        currentPage={currentPage}
        totalPages={movies.total_pages}
        isLoading={isLoading}
        onPageChange={setCurrentPage}
      />
    </div>
  );
});

export default NowPlayingMoviesPage;

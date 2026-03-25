import { memo, useMemo, lazy, Suspense } from "react";
import { useMovieGenres, useTvGenres } from "@/hooks/shared";
import { SectionSkeleton, Error } from "@/components/ui";
import { Film, Tv } from "lucide-react";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import HelmetMeta from "@/components/shared/HelmetMeta";

// Lazy-loaded components
const GenreCard = lazy(() => import("@/components/GenreCard"));

const Genres = memo(function Genres() {
  const {
    data: movieGenres,
    isLoading: movieGenresLoading,
    error: movieGenresError,
  } = useMovieGenres();

  const {
    data: tvGenres,
    isLoading: tvGenresLoading,
    error: tvGenresError,
  } = useTvGenres();

  const isLoading = useMemo(
    () => movieGenresLoading || tvGenresLoading,
    [movieGenresLoading, tvGenresLoading],
  );

  const hasError = useMemo(
    () => movieGenresError || tvGenresError,
    [movieGenresError, tvGenresError],
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)]">
        <SectionSkeleton variant="grid" cardCount={12} />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)] flex items-center justify-center">
        <Error
          message="Failed to load genres"
          retryButtonText="Try Again"
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)] pt-20">
      <HelmetMeta
        name="Browse by Genre"
        description="Explore movies and TV shows organized by category. Find your favorite genres and discover new content on Netflix."
      />
      <div className="container">
        {/* Page Header */}
        <div className="mb-10 mt-4">
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-3">
            Browse by Genre
          </h1>
          <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-2xl">
            Explore movies and TV shows organized by category
          </p>
        </div>

        {/* Movie Genres Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Film className="w-5 h-5 text-[var(--netflix-red)]" />
            <h2 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)]">
              Movies
            </h2>
          </div>

          {movieGenres && movieGenres.length > 0 ? (
            <Suspense
              fallback={<SectionSkeleton variant="grid" cardCount={12} />}
            >
              <LazyWrapper height={300}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                  {movieGenres.map((genre) => (
                    <GenreCard
                      key={`movie-${genre.id}`}
                      id={genre.id}
                      name={genre.name}
                      type="movie"
                    />
                  ))}
                </div>
              </LazyWrapper>
            </Suspense>
          ) : (
            <div className="text-center py-16 text-[var(--text-muted)]">
              <Film className="w-14 h-14 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No movie genres available</p>
            </div>
          )}
        </section>

        {/* TV Show Genres Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Tv className="w-5 h-5 text-[var(--netflix-red)]" />
            <h2 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)]">
              TV Shows
            </h2>
          </div>

          {tvGenres && tvGenres.length > 0 ? (
            <Suspense
              fallback={<SectionSkeleton variant="grid" cardCount={12} />}
            >
              <LazyWrapper height={300}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                  {tvGenres.map((genre) => (
                    <GenreCard
                      key={`tv-${genre.id}`}
                      id={genre.id}
                      name={genre.name}
                      type="tv"
                    />
                  ))}
                </div>
              </LazyWrapper>
            </Suspense>
          ) : (
            <div className="text-center py-16 text-[var(--text-muted)]">
              <Tv className="w-14 h-14 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No TV show genres available</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
});

export default Genres;

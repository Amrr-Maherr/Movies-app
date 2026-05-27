import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useMovieGenres, useTvGenres } from "@/hooks/shared";
import { SectionSkeleton, Error } from "@/components/ui";
import { Film, Tv } from "lucide-react";
import HelmetMeta from "@/components/shared/HelmetMeta";
import { OptimizedSectionWrapper } from "@/components/optimized-section-wrapper";
import GenreCard from "@/features/discover/components/GenreCard";

const Genres = memo(function Genres() {
  const { t } = useTranslation();
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
          message={t('common:discover.errorLoading')}
          retryButtonText={t('common:discover.retry')}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)] pt-20">
      <HelmetMeta
        name={t('discover:genres')}
        description="Explore movies and TV shows organized by category. Find your favorite genres and discover new content on Netflix."
      />
      <div className="container">
        {/* Page Header */}
        <div className="mb-10 mt-4">
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-3">
            {t('discover:genres')}
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
              {t('discover:movies')}
            </h2>
          </div>

          <OptimizedSectionWrapper
            data={movieGenres && movieGenres.length > 0 ? movieGenres : null}
            isLoading={isLoading}
            fallback={<SectionSkeleton variant="grid" cardCount={12} />}
            height={300}
            title="Movie Genres"
            isEmptyFallback={
              <div className="text-center py-16 text-[var(--text-muted)]">
                <Film className="w-14 h-14 mx-auto mb-3 opacity-30" />
                <p className="text-sm">{t('common:common.noData')}</p>
              </div>
            }
          >
            {(genres) => (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                {genres.map((genre) => (
                  <GenreCard
                    key={`movie-${genre.id}`}
                    id={genre.id}
                    name={genre.name}
                    type="movie"
                  />
                ))}
              </div>
            )}
          </OptimizedSectionWrapper>
        </section>

        {/* TV Show Genres Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Tv className="w-5 h-5 text-[var(--netflix-red)]" />
            <h2 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)]">
              {t('discover:tvShows')}
            </h2>
          </div>

          <OptimizedSectionWrapper
            data={tvGenres && tvGenres.length > 0 ? tvGenres : null}
            isLoading={isLoading}
            fallback={<SectionSkeleton variant="grid" cardCount={12} />}
            height={300}
            title="TV Show Genres"
            isEmptyFallback={
              <div className="text-center py-16 text-[var(--text-muted)]">
                <Tv className="w-14 h-14 mx-auto mb-3 opacity-30" />
                <p className="text-sm">{t('common:common.noData')}</p>
              </div>
            }
          >
            {(genres) => (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                {genres.map((genre) => (
                  <GenreCard
                    key={`tv-${genre.id}`}
                    id={genre.id}
                    name={genre.name}
                    type="tv"
                  />
                ))}
              </div>
            )}
          </OptimizedSectionWrapper>
        </section>
      </div>
    </div>
  );
});

export default Genres;

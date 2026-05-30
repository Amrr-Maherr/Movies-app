import { useParams } from "react-router-dom";
import { memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMoviesByGenre, useMovieGenres } from "@/hooks/shared";
import { SectionSkeleton } from "@/components/ui";
import { ReactQueryErrorState } from "@/components/errors";
import { Film } from "lucide-react";
import Pagination from "@/components/shared/Pagination";
import type { HeroMedia } from "@/types";
import HelmetMeta from "@/components/shared/HelmetMeta";
import { OptimizedSectionWrapper } from "@/components/optimized-section-wrapper";
import Card from "@/components/shared/Card/Card";

const GenreMovies = memo(function GenreMovies() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const genreId = id ? parseInt(id, 10) : 0;
  const [page, setPage] = useState(1);

  const { data: movieGenres } = useMovieGenres();
  const {
    data: moviesData,
    isLoading,
    error,
  } = useMoviesByGenre(genreId, page);

  const genreName = useMemo(() => {
    if (!movieGenres) return "Genre";
    const genre = movieGenres.find((g) => g.id === genreId);
    return genre?.name || "Genre";
  }, [movieGenres, genreId]);

  const movies = useMemo(() => moviesData?.results || [], [moviesData]);
  const totalPages = useMemo(() => moviesData?.total_pages || 1, [moviesData]);
  const totalResults = useMemo(
    () => moviesData?.total_results || 0,
    [moviesData],
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)]">
        <SectionSkeleton variant="hero" />
      </div>
    );
  }

  if (error) {
    return (
      <ReactQueryErrorState
        error={error}
        retry={() => window.location.reload()}
        fullscreen
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)] pt-20 pb-12">
      <HelmetMeta
        name={`${genreName} ${t('discover:movies')}`}
        description={`Watch ${totalResults} movies in the ${genreName} genre. Browse and stream the best ${genreName} movies on Netflix.`}
      />
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Film className="w-8 h-8 text-[var(--netflix-red)]" />
            <h1 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)]">
              {genreName} {t('discover:movies')}
            </h1>
          </div>
          <p className="text-base text-[var(--text-secondary)]">
            {totalResults} movies available
          </p>
        </div>

        {/* Movies Grid */}
        <OptimizedSectionWrapper
          data={movies.length > 0 ? movies : null}
          isLoading={isLoading}
          fallback={<SectionSkeleton variant="grid" cardCount={12} />}
          height={500}
          title={`${genreName} Movies`}
          isEmptyFallback={
            <div className="text-center py-12 text-[var(--text-muted)]">
              <Film className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">{t('common:common.noData')}</p>
            </div>
          }
        >
          {(moviesData) => (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 mb-8">
                {moviesData.map((movie: HeroMedia) => (
                  <Card key={movie.id} movie={movie} variant="compact" />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
                isLoading={isLoading}
              />
            </>
          )}
        </OptimizedSectionWrapper>
      </div>
    </div>
  );
});

export default GenreMovies;

import { useParams } from "react-router-dom";
import { memo, useMemo, useState } from "react";
import { useMoviesByGenre, useMovieGenres } from "@/queries";
import { SectionSkeleton, Error } from "@/components/ui";
import { Film } from "lucide-react";
import Card from "@/components/shared/Card/Card";
import Pagination from "@/components/Pagination";
import type { HeroMedia } from "@/types";

const GenreMovies = memo(function GenreMovies() {
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

  if (isLoading && page === 1) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)]">
        <SectionSkeleton variant="hero" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)] flex items-center justify-center">
        <Error
          message="Failed to load movies"
          retryButtonText="Try Again"
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)] pt-20 pb-12">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Film className="w-8 h-8 text-[var(--netflix-red)]" />
            <h1 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)]">
              {genreName} Movies
            </h1>
          </div>
          <p className="text-base text-[var(--text-secondary)]">
            {totalResults} movies available
          </p>
        </div>

        {/* Movies Grid */}
        {movies.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 mb-8">
              {movies.map((movie: HeroMedia) => (
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
        ) : (
          movies.length === 0 ? :
        )}
      </div>
    </div>
  );
});

export default GenreMovies;

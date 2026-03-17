import { useParams, Link } from "react-router-dom";
import { memo, useMemo, useState } from "react";
import { useMoviesByGenre, useMovieGenres } from "@/queries";
import { SectionSkeleton, Error, OptimizedImage } from "@/components/ui";
import MediaSection from "@/components/shared/MediaSection";
import { ChevronLeft, Film } from "lucide-react";

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

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
  const totalResults = useMemo(() => moviesData?.total_results || 0, [moviesData]);

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
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        {/* Back Button */}
        <Link
          to="/genres"
          className="inline-flex items-center gap-2 text-[#b3b3b3] hover:text-white transition-colors mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Genres</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Film className="w-8 h-8 text-[var(--netflix-red)]" />
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              {genreName} Movies
            </h1>
          </div>
          <p className="text-base text-[#b3b3b3]">
            {totalResults} movies available
          </p>
        </div>

        {/* Movies Grid */}
        {movies.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 mb-8">
              {movies.map((movie: any) => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  className="group cursor-pointer block"
                >
                  <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-[#1a1a1a] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                    {movie.poster_path ? (
                      <OptimizedImage
                        src={`${POSTER_BASE_URL}${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full"
                        objectFit="cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#333]">
                        <Film className="w-12 h-12 text-[#555]" />
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-sm font-medium px-2 text-center">
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Movie Info */}
                  <div className="mt-2 md:mt-3">
                    <h3 className="text-xs md:text-sm text-white font-medium line-clamp-2 group-hover:text-[var(--netflix-red)] transition-colors">
                      {movie.title}
                    </h3>
                    <div className="flex items-center justify-between mt-1 text-[#737373] text-xs">
                      <span>
                        {movie.release_date
                          ? new Date(movie.release_date).getFullYear()
                          : "TBA"}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        {movie.vote_average?.toFixed(1) || "N/A"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-6 py-3 bg-[#333] text-white rounded-md hover:bg-[#444] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="text-white">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-6 py-3 bg-[#333] text-white rounded-md hover:bg-[#444] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 text-[#737373]">
            <Film className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No movies available in this genre</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default GenreMovies;

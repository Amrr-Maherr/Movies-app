import { Link } from "react-router-dom";
import { memo, useMemo } from "react";
import { useMovieGenres, useTvGenres } from "@/queries";
import { SectionSkeleton, Error } from "@/components/ui";
import { Film, Tv } from "lucide-react";

interface GenreCardProps {
  id: number;
  name: string;
  type: "movie" | "tv";
}

const GenreCard = memo(function GenreCard({ id, name, type }: GenreCardProps) {
  return (
    <Link
      to={`/${type}/genre/${id}`}
      className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-[#1a1a2e] to-[#16213e] hover:from-[#e50914] hover:to-[#c11119] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
    >
      <div className="aspect-[16/9] flex items-center justify-center p-6">
        <div className="text-center">
          {type === "movie" ? (
            <Film className="w-12 h-12 mx-auto mb-3 text-white/80 group-hover:text-white transition-colors" />
          ) : (
            <Tv className="w-12 h-12 mx-auto mb-3 text-white/80 group-hover:text-white transition-colors" />
          )}
          <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-white transition-colors">
            {name}
          </h3>
          <p className="text-xs text-white/60 group-hover:text-white/80 mt-1 capitalize">
            {type === "movie" ? "Movies" : "TV Shows"}
          </p>
        </div>
      </div>

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  );
});

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
    [movieGenresLoading, tvGenresLoading]
  );

  const hasError = useMemo(
    () => movieGenresError || tvGenresError,
    [movieGenresError, tvGenresError]
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
    <div className="min-h-screen bg-[var(--background-primary)] pt-20 pb-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Browse by Genre
          </h1>
          <p className="text-base md:text-lg text-[#b3b3b3] max-w-3xl">
            Explore our vast collection of movies and TV shows organized by genre. 
            Find your next favorite content by browsing through different categories.
          </p>
        </div>

        {/* Movie Genres Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Film className="w-6 h-6 text-[var(--netflix-red)]" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Movie Genres
            </h2>
          </div>

          {movieGenres && movieGenres.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {movieGenres.map((genre) => (
                <GenreCard
                  key={`movie-${genre.id}`}
                  id={genre.id}
                  name={genre.name}
                  type="movie"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-[#737373]">
              <Film className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No movie genres available</p>
            </div>
          )}
        </section>

        {/* TV Show Genres Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Tv className="w-6 h-6 text-[var(--netflix-red)]" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              TV Show Genres
            </h2>
          </div>

          {tvGenres && tvGenres.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {tvGenres.map((genre) => (
                <GenreCard
                  key={`tv-${genre.id}`}
                  id={genre.id}
                  name={genre.name}
                  type="tv"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-[#737373]">
              <Tv className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No TV show genres available</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
});

export default Genres;

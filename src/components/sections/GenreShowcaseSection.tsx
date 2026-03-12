import { memo, useMemo } from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { getTitle } from "@/utils";
import type { HeroMedia } from "@/types";

interface GenreShowcaseSectionProps {
  movies: HeroMedia[];
  genre: string;
  mediaType: "movie" | "tv";
}

// Memoized GenreShowcaseSection component - avoids re-renders when parent updates
const GenreShowcaseSection = memo(function GenreShowcaseSection({
  movies,
  genre,
  mediaType,
}: GenreShowcaseSectionProps) {
  // Memoized: Get showcase movie and side movies with pre-calculated values
  const { showcaseMovie, sideMovies } = useMemo(() => {
    if (!movies || movies.length === 0) {
      return { showcaseMovie: null, sideMovies: [] };
    }
    const showcase = movies[0];
    const side = movies.slice(1, 4);
    return {
      showcaseMovie: showcase
        ? {
            ...showcase,
            mainImageUrl: showcase.backdrop_path
              ? `https://image.tmdb.org/t/p/original${showcase.backdrop_path}`
              : showcase.poster_path
                ? `https://image.tmdb.org/t/p/original${showcase.poster_path}`
                : "/Netflix_Symbol_RGB.png",
            mainDetailsUrl:
              mediaType === "movie"
                ? `/movie/${showcase.id}`
                : `/tv/${showcase.id}`,
          }
        : null,
      sideMovies: side.map((movie) => ({
        movie,
        imageUrl: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "/Netflix_Symbol_RGB.png",
        detailsUrl:
          mediaType === "movie" ? `/movie/${movie.id}` : `/tv/${movie.id}`,
      })),
    };
  }, [movies, mediaType]);

  if (!showcaseMovie) return null;

  return (
    <div className="py-6 md:py-8">
      <div className="container">
        <SectionHeader
          title={genre}
          actionLabel="Explore All"
          actionHref={mediaType === "movie" ? "/movies" : "/tv"}
        />

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {/* Main Showcase */}
          <a
            href={showcaseMovie.mainDetailsUrl}
            className="md:col-span-2"
          >
            <div className="relative aspect-video md:aspect-[10/9] overflow-hidden rounded group cursor-pointer">
              <OptimizedImage
                src={showcaseMovie.mainImageUrl}
                alt={getTitle(showcaseMovie)}
                className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                  {getTitle(showcaseMovie)}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">
                    NEW
                  </span>
                  <span className="text-sm text-gray-300">
                    {mediaType === "movie" ? "Movie" : "Series"}
                  </span>
                </div>
              </div>
            </div>
          </a>

          {/* Side Movies */}
          <div className="grid grid-cols-3 md:grid-cols-1 gap-3 md:gap-4">
            {sideMovies.map(({ movie, imageUrl, detailsUrl }) => (
              <a href={detailsUrl} key={movie.id}>
                <div className="relative aspect-[2/3] md:aspect-video overflow-hidden rounded group cursor-pointer">
                  <OptimizedImage
                    src={imageUrl}
                    alt={getTitle(movie)}
                    className="w-full h-full transition-transform duration-300 group-hover:scale-110"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default GenreShowcaseSection;

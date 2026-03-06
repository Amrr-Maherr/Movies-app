import { memo, useMemo } from "react";
import { Popcorn, Star } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { getTitle } from "@/utils";
import type { HeroMedia } from "@/types";

interface WeekendWatchSectionProps {
  movies: HeroMedia[];
  mediaType: "movie" | "tv";
}

// Memoized WeekendWatchSection component - avoids re-renders when parent updates
const WeekendWatchSection = memo(function WeekendWatchSection({
  movies,
  mediaType,
}: WeekendWatchSectionProps) {
  // Memoized: Get featured movie and side movies with pre-calculated values
  const { featuredMovie, sideMovies } = useMemo(() => {
    if (!movies || movies.length === 0) {
      return { featuredMovie: null, sideMovies: [] };
    }
    const featured = movies[0];
    const side = movies.slice(1, 5);
    return {
      featuredMovie: featured
        ? {
            ...featured,
            mainImageUrl: featured.backdrop_path
              ? `https://image.tmdb.org/t/p/original${featured.backdrop_path}`
              : featured.poster_path
                ? `https://image.tmdb.org/t/p/original${featured.poster_path}`
                : "/Netflix_Symbol_RGB.png",
            mainDetailsUrl:
              mediaType === "movie"
                ? `/movie/${featured.id}`
                : `/tv/${featured.id}`,
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

  if (!featuredMovie) return null;

  return (
    <div className="bg-gradient-to-b from-black via-zinc-900 to-black py-6 md:py-8">
      <div className="container">
        <SectionHeader
          title="Perfect for the Weekend"
          icon={Popcorn}
          iconColor="text-yellow-400"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Featured Movie */}
          <a
            href={featuredMovie.mainDetailsUrl}
            className="lg:col-span-2"
          >
            <div className="relative aspect-video overflow-hidden rounded-lg group cursor-pointer">
              <img
                src={featuredMovie.mainImageUrl}
                alt={getTitle(featuredMovie)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded uppercase">
                    Featured Pick
                  </span>
                  {featuredMovie.vote_average &&
                    featuredMovie.vote_average > 0 && (
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-bold text-white">
                        {featuredMovie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>

                <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {getTitle(featuredMovie)}
                </h3>

                {featuredMovie.overview && (
                  <p className="text-sm md:text-base text-gray-300 line-clamp-2 max-w-2xl">
                    {featuredMovie.overview}
                  </p>
                )}
              </div>
            </div>
          </a>

          {/* Side Movies Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4">
            {sideMovies.map(({ movie, imageUrl, detailsUrl }) => (
              <a href={detailsUrl} key={movie.id}>
                <div className="group cursor-pointer bg-zinc-800 rounded-lg overflow-hidden flex gap-3 hover:bg-zinc-700 transition-colors">
                  <div className="relative w-20 md:w-24 aspect-[2/3] flex-shrink-0">
                    <img
                      src={imageUrl}
                      alt={getTitle(movie)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 py-2 pr-2 flex flex-col justify-center">
                    <h4 className="text-sm md:text-base text-white font-medium line-clamp-2 group-hover:text-yellow-400 transition-colors">
                      {getTitle(movie)}
                    </h4>
                    {movie.vote_average && movie.vote_average > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-gray-400">
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default WeekendWatchSection;

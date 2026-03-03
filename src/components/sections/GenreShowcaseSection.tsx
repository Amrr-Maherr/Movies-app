import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import type { HeroMedia } from "@/types";

interface GenreShowcaseSectionProps {
  movies: HeroMedia[];
  genre: string;
  mediaType: "movie" | "tv";
}

export default function GenreShowcaseSection({ movies, genre, mediaType }: GenreShowcaseSectionProps) {
  const showcaseMovie = movies[0];
  const sideMovies = movies.slice(1, 4);

  if (!showcaseMovie) return null;

  const mainImageUrl = showcaseMovie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${showcaseMovie.backdrop_path}`
    : showcaseMovie.poster_path
    ? `https://image.tmdb.org/t/p/original${showcaseMovie.poster_path}`
    : "/Netflix_Symbol_RGB.png";

  const mainDetailsUrl = mediaType === "movie"
    ? `/movie/${showcaseMovie.id}`
    : `/tv/${showcaseMovie.id}`;

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
          <a href={mainDetailsUrl} className="md:col-span-2">
            <div className="relative aspect-video md:aspect-[10/9] overflow-hidden rounded group cursor-pointer">
              <img
                src={mainImageUrl}
                alt={showcaseMovie.title || showcaseMovie.name || ""}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                  {showcaseMovie.title || showcaseMovie.name}
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
            {sideMovies.map((movie) => {
              const imageUrl = movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/Netflix_Symbol_RGB.png";
              const detailsUrl = mediaType === "movie"
                ? `/movie/${movie.id}`
                : `/tv/${movie.id}`;

              return (
                <a href={detailsUrl} key={movie.id}>
                  <div className="relative aspect-[2/3] md:aspect-video overflow-hidden rounded group cursor-pointer">
                    <img
                      src={imageUrl}
                      alt={movie.title || movie.name || ""}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

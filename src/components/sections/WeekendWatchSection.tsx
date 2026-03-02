"use client";
import { Popcorn, Star } from "lucide-react";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
  vote_average?: number;
  overview?: string;
}

interface WeekendWatchSectionProps {
  movies: Movie[];
  mediaType: "movie" | "tv";
}

export default function WeekendWatchSection({ movies, mediaType }: WeekendWatchSectionProps) {
  const featuredMovie = movies[0];
  const sideMovies = movies.slice(1, 5);

  if (!featuredMovie) return null;

  const mainImageUrl = featuredMovie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`
    : featuredMovie.poster_path
    ? `https://image.tmdb.org/t/p/original${featuredMovie.poster_path}`
    : "/Netflix_Symbol_RGB.png";

  const mainDetailsUrl = mediaType === "movie" 
    ? `/movie/${featuredMovie.id}` 
    : `/tv/${featuredMovie.id}`;

  return (
    <div className="bg-gradient-to-b from-black via-zinc-900 to-black py-6 md:py-8">
      <div className="container">
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <Popcorn className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Perfect for the Weekend
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Featured Movie */}
          <a href={mainDetailsUrl} className="lg:col-span-2">
            <div className="relative aspect-video overflow-hidden rounded-lg group cursor-pointer">
              <img
                src={mainImageUrl}
                alt={featuredMovie.title || featuredMovie.name || ""}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded uppercase">
                    Featured Pick
                  </span>
                  {featuredMovie.vote_average && featuredMovie.vote_average > 0 && (
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-bold text-white">
                        {featuredMovie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {featuredMovie.title || featuredMovie.name}
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
            {sideMovies.map((movie) => {
              const imageUrl = movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/Netflix_Symbol_RGB.png";
              const detailsUrl = mediaType === "movie" 
                ? `/movie/${movie.id}` 
                : `/tv/${movie.id}`;

              return (
                <a href={detailsUrl} key={movie.id}>
                  <div className="group cursor-pointer bg-zinc-800 rounded-lg overflow-hidden flex gap-3 hover:bg-zinc-700 transition-colors">
                    <div className="relative w-20 md:w-24 aspect-[2/3] flex-shrink-0">
                      <img
                        src={imageUrl}
                        alt={movie.title || movie.name || ""}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 py-2 pr-2 flex flex-col justify-center">
                      <h4 className="text-sm md:text-base text-white font-medium line-clamp-2 group-hover:text-yellow-400 transition-colors">
                        {movie.title || movie.name}
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { Flame, Clock } from "lucide-react";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  backdrop_path?: string;
  poster_path?: string;
  vote_average?: number;
}

interface BingeWorthySectionProps {
  movies: Movie[];
  mediaType: "movie" | "tv";
}

export default function BingeWorthySection({ movies, mediaType }: BingeWorthySectionProps) {
  const items = movies.slice(0, 5);

  return (
    <div className="py-6 md:py-8">
      <div className="container">
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <Flame className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Binge-Worthy {mediaType === "movie" ? "Movies" : "Series"}
          </h2>
        </div>
      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
          {items.map((movie) => {
            const imageUrl = movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
              : movie.poster_path
              ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
              : "/Netflix_Symbol_RGB.png";
            const detailsUrl = mediaType === "movie" 
              ? `/movie/${movie.id}` 
              : `/tv/${movie.id}`;
            const movieTitle = movie.title || movie.name || "";

            return (
              <a href={detailsUrl} key={movie.id}>
                <div className="group cursor-pointer relative overflow-hidden rounded-lg">
                  {/* Background Image */}
                  <div className="relative aspect-video">
                    <img
                      src={imageUrl}
                      alt={movieTitle}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    
                    {/* Hot Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      <Flame className="w-3 h-3" />
                      HOT
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
                        {movieTitle}
                      </h3>
                      
                      <div className="flex items-center gap-3 text-sm text-gray-300">
                        {movie.vote_average && movie.vote_average > 0 && (
                          <span className="font-semibold text-green-400">
                            {Math.round(movie.vote_average * 10)}% Match
                          </span>
                        )}
                        {mediaType === "tv" && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>Multiple Seasons</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

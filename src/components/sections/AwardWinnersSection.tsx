"use client";
import { Award, Star } from "lucide-react";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  vote_average?: number;
}

interface AwardWinnersSectionProps {
  movies: Movie[];
  mediaType: "movie" | "tv";
}

export default function AwardWinnersSection({ movies, mediaType }: AwardWinnersSectionProps) {
  const items = movies.slice(0, 6);

  return (
    <div className="bg-gradient-to-b from-zinc-900 to-black py-6 md:py-8">
      <div className="container">
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <Award className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Award-Winning {mediaType === "movie" ? "Movies" : "Series"}
          </h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {items.map((movie) => {
            const imageUrl = movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/Netflix_Symbol_RGB.png";
            const detailsUrl = mediaType === "movie" 
              ? `/movie/${movie.id}` 
              : `/tv/${movie.id}`;
            const movieTitle = movie.title || movie.name || "";

            return (
              <a href={detailsUrl} key={movie.id}>
                <div className="group cursor-pointer relative">
                  {/* Award Badge */}
                  <div className="absolute -top-2 -right-2 z-10 bg-yellow-500 rounded-full p-2 shadow-lg">
                    <Award className="w-4 h-4 md:w-5 md:h-5 text-black" />
                  </div>

                  {/* Poster */}
                  <div className="relative aspect-[2/3] overflow-hidden rounded-lg border-2 border-yellow-500/30 group-hover:border-yellow-500 transition-colors duration-300">
                    <img
                      src={imageUrl}
                      alt={movieTitle}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-2 left-2 right-2">
                        {movie.vote_average && movie.vote_average > 0 && (
                          <div className="flex items-center gap-1 bg-black/80 backdrop-blur-sm px-2 py-1 rounded">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs font-bold text-white">
                              {movie.vote_average.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xs md:text-sm text-white font-medium mt-2 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                    {movieTitle}
                  </h3>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

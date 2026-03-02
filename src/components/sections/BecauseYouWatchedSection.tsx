"use client";
import { Info } from "lucide-react";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  vote_average?: number;
}

interface BecauseYouWatchedSectionProps {
  movies: Movie[];
  basedOn?: string;
  mediaType: "movie" | "tv";
}

export default function BecauseYouWatchedSection({ 
  movies, 
  basedOn = "Popular Movies",
  mediaType 
}: BecauseYouWatchedSectionProps) {
  const items = movies.slice(0, 6);

  return (
    <div className="py-6 md:py-8">
      <div className="container">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
          Because You Watched <span className="text-gray-400">{basedOn}</span>
        </h2>
        <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6">
          More titles we think you'll love
        </p>
      
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
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
                <div className="group cursor-pointer">
                  {/* Poster */}
                  <div className="relative aspect-[2/3] overflow-hidden rounded mb-2">
                    <img
                      src={imageUrl}
                      alt={movieTitle}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="flex items-center justify-between">
                          {movie.vote_average && movie.vote_average > 0 && (
                            <span className="text-xs font-bold text-green-400">
                              {Math.round(movie.vote_average * 10)}% Match
                            </span>
                          )}
                          <Info className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xs md:text-sm text-gray-300 group-hover:text-white transition-colors line-clamp-2">
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

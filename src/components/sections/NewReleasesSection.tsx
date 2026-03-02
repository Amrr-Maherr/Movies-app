"use client";
import { Calendar, Star } from "lucide-react";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
}

interface NewReleasesSectionProps {
  movies: Movie[];
  title?: string;
  mediaType: "movie" | "tv";
}

export default function NewReleasesSection({ 
  movies, 
  title = "New Releases", 
  mediaType 
}: NewReleasesSectionProps) {
  const items = movies.slice(0, 8);

  return (
    <div className="py-6 md:py-8">
      <div className="container">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white">
            {title}
          </h2>
          <span className="text-xs md:text-sm text-red-500 font-semibold uppercase tracking-wider">
            Just Added
          </span>
        </div>
      
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {items.map((movie) => {
            const imageUrl = movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/Netflix_Symbol_RGB.png";
            const detailsUrl = mediaType === "movie" 
              ? `/movie/${movie.id}` 
              : `/tv/${movie.id}`;
            const movieTitle = movie.title || movie.name || "";
            const date = movie.release_date || movie.first_air_date;

            return (
              <a href={detailsUrl} key={movie.id}>
                <div className="group cursor-pointer">
                  {/* Poster with Badge */}
                  <div className="relative aspect-[2/3] overflow-hidden rounded mb-2">
                    <img
                      src={imageUrl}
                      alt={movieTitle}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {/* NEW Badge */}
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                      NEW
                    </div>

                    {/* Rating Badge */}
                    {movie.vote_average && movie.vote_average > 0 && (
                      <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        {movie.vote_average.toFixed(1)}
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center px-4">
                        <p className="text-white text-sm font-semibold line-clamp-2">
                          {movieTitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <h3 className="text-sm md:text-base text-white font-medium line-clamp-1 group-hover:text-gray-300 transition-colors">
                      {movieTitle}
                    </h3>
                    {date && (
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
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
  );
}

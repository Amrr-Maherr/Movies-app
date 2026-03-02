"use client";
import { Sparkles } from "lucide-react";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  backdrop_path?: string;
  poster_path?: string;
  overview?: string;
}

interface OnlyOnNetflixSectionProps {
  movies: Movie[];
  mediaType: "movie" | "tv";
}

export default function OnlyOnNetflixSection({ movies, mediaType }: OnlyOnNetflixSectionProps) {
  const items = movies.slice(0, 5);

  return (
    <div className="py-6 md:py-8">
      <div className="container">
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Only on Netflix
          </h2>
        </div>
      
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {items.map((movie, index) => {
            const imageUrl = movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
              : movie.poster_path
              ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
              : "/Netflix_Symbol_RGB.png";
            const detailsUrl = mediaType === "movie" 
              ? `/movie/${movie.id}` 
              : `/tv/${movie.id}`;
            const movieTitle = movie.title || movie.name || "";

            return (
              <a href={detailsUrl} key={movie.id}>
                <div className={`group cursor-pointer bg-zinc-900 rounded-lg overflow-hidden ${index === 0 ? 'md:col-span-2' : ''}`}>
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative w-full md:w-2/5 aspect-video md:aspect-auto">
                      <img
                        src={imageUrl}
                        alt={movieTitle}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-900/50 md:to-zinc-900"></div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 md:p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                          Netflix Original
                        </span>
                        <span className="text-xs text-gray-400">
                          {mediaType === "movie" ? "Film" : "Series"}
                        </span>
                      </div>
                      
                      <h3 className="text-lg md:text-2xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors">
                        {movieTitle}
                      </h3>
                      
                      {movie.overview && (
                        <p className="text-sm md:text-base text-gray-400 line-clamp-2 md:line-clamp-3">
                          {movie.overview}
                        </p>
                      )}
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

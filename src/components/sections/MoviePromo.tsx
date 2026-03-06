"use client";
import { memo, useMemo } from "react";
import { Play, Info, Star } from "lucide-react";

interface MoviePromoProps {
  movie: {
    id: number;
    title?: string;
    name?: string;
    backdrop_path?: string | null;
    poster_path?: string | null;
    overview?: string;
    vote_average?: number;
    release_date?: string;
    first_air_date?: string;
  };
  mediaType: "movie" | "tv";
  variant?: "left" | "right" | "center";
}

// Memoized MoviePromo component - avoids re-renders when parent updates
const MoviePromo = memo(function MoviePromo({
  movie,
  mediaType,
  variant = "left",
}: MoviePromoProps) {
  // Memoized: Pre-calculated values
  const { title, imageUrl, detailsUrl, year } = useMemo(() => {
    const title = movie.title || movie.name || "";
    const imageUrl = movie.backdrop_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : movie.poster_path
        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
        : "/Netflix_Symbol_RGB.png";
    const detailsUrl =
      mediaType === "movie" ? `/movie/${movie.id}` : `/tv/${movie.id}`;
    const year = movie.release_date
      ? new Date(movie.release_date).getFullYear()
      : movie.first_air_date
        ? new Date(movie.first_air_date).getFullYear()
        : "";
    return { title, imageUrl, detailsUrl, year };
  }, [movie, mediaType]);

  // Memoized: Content alignment based on variant
  const contentAlignment = useMemo(
    () =>
      variant === "left"
        ? "items-start text-left"
        : variant === "right"
          ? "items-end text-right md:ml-auto"
          : "items-center text-center md:mx-auto",
    [variant],
  );

  // Memoized: Gradient direction based on variant
  const gradientDirection = useMemo(
    () =>
      variant === "left"
        ? "bg-gradient-to-r from-black/90 via-black/70 to-transparent"
        : variant === "right"
          ? "bg-gradient-to-l from-black/90 via-black/70 to-transparent"
          : "bg-gradient-to-t from-black/90 via-black/60 to-black/20",
    [variant],
  );

  return (
    <div className="relative w-full h-[50vh] sm:h-[55vh] md:h-[65vh] lg:h-[75vh] overflow-hidden my-6 md:my-8">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
        <div className={`absolute inset-0 ${gradientDirection}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-end md:items-center">
        <div className="container pb-8 md:pb-12">
          <div
            className={`flex flex-col ${contentAlignment} max-w-full md:max-w-xl lg:max-w-2xl space-y-2 md:space-y-4`}
          >
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl leading-tight">
              {title}
            </h2>

            {/* Meta Info */}
            <div
              className={`flex flex-wrap items-center gap-2 md:gap-3 text-white ${variant === "right" ? "justify-end" : variant === "center" ? "justify-center" : ""}`}
            >
              {movie.vote_average && movie.vote_average > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm md:text-base font-semibold">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
              )}
              {year && (
                <span className="text-sm md:text-base font-medium text-gray-300">
                  {year}
                </span>
              )}
              <span className="px-2 py-0.5 md:px-2.5 md:py-1 border border-gray-400 rounded text-xs md:text-sm font-medium text-gray-300">
                {mediaType === "movie" ? "Movie" : "Series"}
              </span>
            </div>

            {/* Overview - Hidden on mobile */}
            {movie.overview && (
              <p className="hidden md:block text-sm lg:text-base text-gray-200 leading-relaxed line-clamp-2 lg:line-clamp-3 drop-shadow-lg max-w-lg">
                {movie.overview}
              </p>
            )}

            {/* Buttons */}
            <div
              className={`flex gap-2 md:gap-3 pt-1 md:pt-2 ${variant === "right" ? "justify-end" : variant === "center" ? "justify-center" : ""}`}
            >
              <a href={detailsUrl}>
                <button className="inline-flex items-center gap-1.5 md:gap-2 bg-white text-black hover:bg-white/90 px-4 md:px-6 py-1.5 md:py-2 rounded text-sm md:text-base font-semibold transition-all duration-200">
                  <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                  <span className="hidden sm:inline">Play</span>
                </button>
              </a>
              <a href={detailsUrl}>
                <button className="inline-flex items-center gap-1.5 md:gap-2 bg-gray-500/70 text-white hover:bg-gray-500/90 px-4 md:px-6 py-1.5 md:py-2 rounded text-sm md:text-base font-semibold transition-all duration-200">
                  <Info className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">More Info</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MoviePromo;

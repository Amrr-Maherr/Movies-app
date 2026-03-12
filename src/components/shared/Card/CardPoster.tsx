import { memo, useMemo } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import type { HeroMedia } from "@/types";

export interface CardPosterProps {
  movie: HeroMedia;
  title: string;
  rank?: number;
  children?: React.ReactNode;
  className?: string;
}

const CardPoster = memo(
  ({ movie, title, rank, children, className = "" }: CardPosterProps) => {
    const posterUrl = useMemo(() => {
      return movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";
    }, [movie.poster_path]);

    return (
      <div
        className={`relative aspect-[2/3] w-full overflow-hidden ${className}`}
      >
        {/* Rank Badge (for trending top 10) */}
        {rank && (
          <div className="absolute top-0 left-0 z-30 bg-gradient-to-br from-orange-500 to-red-600 text-white w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-bold text-base sm:text-lg rounded-full shadow-lg border-2 border-[var(--background-primary)]">
            #{rank}
          </div>
        )}

        {/* Poster Image */}
        <OptimizedImage
          src={posterUrl}
          alt={title}
          className="w-full h-full"
          objectFit="cover"
        />

        {/* Children (badges, overlays, etc.) */}
        {children}
      </div>
    );
  },
);

// Add displayName for better debugging in React DevTools
CardPoster.displayName = "CardPoster";

export default CardPoster;

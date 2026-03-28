import { memo } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import type { HeroMedia } from "@/types";
import logo from "@/assets/logos/vite.svg";

export interface CardPosterProps {
  movie: HeroMedia;
  title: string;
  // FIX: Accept pre-computed posterUrl from parent instead of re-deriving it.
  // Card.tsx already memoizes this value — recomputing it here is redundant work.
  posterUrl: string;
  rank?: number;
  children?: React.ReactNode;
  className?: string;
  isAdult?: boolean;
}

const CardPoster = memo(
  ({
    movie,
    title,
    posterUrl, // FIX: Use prop — eliminates duplicate useMemo
    rank,
    children,
    className = "",
    isAdult = false,
  }: CardPosterProps) => {

    return (
      <div className={`relative aspect-[2/3] w-full ${className}`}>
        {/* Rank Badge (for trending top 10) */}
        {rank && (
          <div className="absolute top-0 left-0 z-30 bg-gradient-to-br from-orange-500 to-red-600 text-white w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-bold text-base sm:text-lg rounded-full shadow-lg border-2 border-[var(--background-primary)]">
            #{rank}
          </div>
        )}

        {/* Poster Image with Blur for Adult Content */}
        <div className="relative w-full h-full">
          <OptimizedImage
            src={posterUrl}
            alt={title}
            className={`w-full h-full transition-all duration-300 ${
              isAdult ? "blur-md" : ""
            }`}
            objectFit="cover"
          />

          {/* Dark overlay for adult content */}
          {isAdult && <div className="absolute inset-0" />}
        </div>

        {/* Netflix Logo Overlay - Top Left Corner */}
        <div className="absolute top-2 left-2 z-20 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
          <OptimizedImage
            src={logo}
            alt="Netflix"
            className="w-8 h-8 sm:w-10 sm:h-10"
            objectFit="contain"
          />
        </div>

        {/* Children (badges, overlays, etc.) */}
        {children}
      </div>
    );
  },
);

// Add displayName for better debugging in React DevTools
CardPoster.displayName = "CardPoster";

export default CardPoster;

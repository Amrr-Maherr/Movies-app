import { Link } from "react-router-dom";
import { memo } from "react";
import { Film, Tv } from "lucide-react";

interface GenreCardProps {
  id: number;
  name: string;
  type: "movie" | "tv";
}

/**
 * GenreCard Component
 *
 * ACCESSIBILITY FIX:
 * - Added min-h-[48px] for proper touch target size
 * - Added touch-manipulation for better mobile behavior
 * - Play icon overlay has proper 48px touch target
 * - Added aria-label for screen readers
 */
const GenreCard = memo(function GenreCard({ id, name, type }: GenreCardProps) {
  return (
    <Link
      to={`/${type}/genre/${id}`}
      className="group relative overflow-hidden rounded-md bg-[var(--background-secondary)] hover:bg-[var(--background-tertiary)] transition-all duration-200 shadow-md hover:shadow-xl hover:scale-[1.02] aspect-[16/9] flex items-center justify-center min-h-[48px] touch-manipulation"
      aria-label={`Browse ${name} ${type === "movie" ? "movies" : "TV shows"}`}
    >
      <div className="text-center p-4">
        {type === "movie" ? (
          <Film
            className="w-10 h-10 mx-auto mb-2 text-[var(--text-primary)]"
            aria-hidden="true"
          />
        ) : (
          <Tv
            className="w-10 h-10 mx-auto mb-2 text-[var(--text-primary)]"
            aria-hidden="true"
          />
        )}
        <h3 className="text-sm md:text-base font-semibold text-[var(--text-primary)] line-clamp-2">
          {name}
        </h3>
      </div>

      {/* 
        ACCESSIBILITY FIX: Play icon overlay with proper 48px touch target
        - Increased size to 48px × 48px
        - Added touch-manipulation for better mobile behavior
      */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="min-w-[48px] min-h-[48px] rounded-full bg-[var(--hover-overlay)] flex items-center justify-center backdrop-blur-sm pointer-events-auto">
          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-[var(--text-primary)] border-b-[10px] border-b-transparent ml-1" />
        </div>
      </div>
    </Link>
  );
});

export default GenreCard;

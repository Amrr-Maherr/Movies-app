import { memo } from "react";
import { Star } from "lucide-react";

export interface CardMetadataProps {
  matchScore?: number;
  matchPercentage?: number;
  ratingValue?: string;
  year?: string;
  ageRating?: string;
  showHdBadge?: boolean;
  variant?: "standard" | "compact" | "overlay" | "inline";
  className?: string;
}

const CardMetadata = memo(({
  matchScore,
  matchPercentage,
  ratingValue,
  year,
  ageRating,
  showHdBadge = true,
  variant = "standard",
  className = ""
}: CardMetadataProps) => {
  // Compact variant - inline metadata with badges
  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-2 text-[10px] text-gray-300 ${className}`}>
        <span className="text-[var(--success)] font-bold">{matchScore}%</span>
        <span className="border border-gray-500 px-1 rounded">{ageRating}</span>
        <span className="border border-gray-500 px-1 rounded">HD</span>
      </div>
    );
  }

  // Overlay variant - for hover overlays
  if (variant === "overlay") {
    return (
      <div className={`flex items-center gap-2 text-[10px] ${className}`}>
        <span className="text-[var(--success)] font-bold">{matchScore}% Match</span>
        <span className="text-gray-300">{year}</span>
        <span className="border border-gray-500 px-1 rounded text-gray-300">{ageRating}</span>
        <span className="border border-gray-500 px-1 rounded text-gray-300">HD</span>
      </div>
    );
  }

  // Inline variant - for recommendation cards
  if (variant === "inline") {
    return (
      <div className={`flex items-center justify-between ${className}`}>
        {matchPercentage && (
          <span className="text-xs font-bold text-green-400">
            {matchPercentage}% Match
          </span>
        )}
        <Star className="w-4 h-4 text-white" />
      </div>
    );
  }

  // Standard variant - full metadata display
  return (
    <div className={`flex items-center gap-3 flex-wrap ${className}`}>
      {matchScore && (
        <span className="text-[var(--success)] text-sm font-bold">
          {matchScore}% Match
        </span>
      )}
      {ratingValue && (
        <div className="flex items-center gap-1 bg-black/80 backdrop-blur-sm px-2 py-1 rounded">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-bold text-white">{ratingValue}</span>
        </div>
      )}
      {year && (
        <span className="text-[var(--text-secondary)] text-sm">{year}</span>
      )}
      {ageRating && (
        <span className="border border-[var(--text-muted)] px-2 py-0.5 text-[var(--text-secondary)] text-xs font-medium uppercase">
          {ageRating}
        </span>
      )}
      {showHdBadge && (
        <span className="border border-[var(--text-muted)] px-2 py-0.5 text-[var(--text-secondary)] text-xs font-medium">
          HD
        </span>
      )}
    </div>
  );
});

// Add displayName for better debugging in React DevTools
CardMetadata.displayName = "CardMetadata";

export default CardMetadata;

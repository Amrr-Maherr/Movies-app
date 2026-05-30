import { memo } from "react";
import { ShieldAlert, Star } from "lucide-react";

export interface MediaBadgeProps {
  isAdult?: boolean;
  matchScore?: number;
  ratingValue?: string | null;
  showMatchScore?: boolean;
  showRating?: boolean;
}

const MediaBadge = memo(function MediaBadge({
  isAdult,
  matchScore,
  ratingValue,
  showMatchScore = true,
  showRating = false,
}: MediaBadgeProps) {
  if (isAdult) {
    return (
      <div className="absolute top-2 right-2 z-30 bg-red-700/95 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded shadow-lg border border-red-500/50 flex items-center gap-1">
        <ShieldAlert className="w-3 h-3" />
        +18
      </div>
    );
  }

  return (
    <>
      {showMatchScore && matchScore && (
        <div className="absolute top-2 right-2 z-30 bg-black/80 backdrop-blur-sm px-2 py-1 rounded">
          <span className="text-[var(--success)] text-xs font-bold">
            {matchScore}%
          </span>
        </div>
      )}
      {showRating && ratingValue && (
        <div className="absolute top-2 right-2 z-30 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          {ratingValue}
        </div>
      )}
    </>
  );
});

export default MediaBadge;

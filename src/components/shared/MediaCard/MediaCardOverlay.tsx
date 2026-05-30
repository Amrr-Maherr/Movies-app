import { memo } from "react";
import { Play, Info, Heart, HeartOff } from "lucide-react";

export interface MediaCardOverlayProps {
  title: string;
  matchScore: number;
  year: string;
  ageRating: string;
  isHovered: boolean;
  isInList: boolean;
  onPlay: (e: React.MouseEvent) => void;
  onMoreInfo: (e: React.MouseEvent) => void;
  onToggleList: (e: React.MouseEvent) => void;
}

const MediaCardOverlay = memo(function MediaCardOverlay({
  title,
  matchScore,
  year,
  ageRating,
  isHovered,
  isInList,
  onPlay,
  onMoreInfo,
  onToggleList,
}: MediaCardOverlayProps) {
  return (
    <div
      className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent transition-opacity duration-300 ease-in-out"
      style={{
        opacity: isHovered ? 1 : 0,
        pointerEvents: isHovered ? "auto" : "none",
      }}
    >
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className="text-white text-sm font-bold mb-3 line-clamp-2 drop-shadow-lg">
          {title}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <button
            className="flex-1 bg-white text-black min-h-[48px] rounded font-semibold text-xs flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors touch-manipulation"
            onClick={onPlay}
            aria-label={`Play ${title}`}
          >
            <Play className="h-4 w-4 fill-black" />
          </button>

          <button
            className="min-h-[48px] min-w-[48px] bg-white/10 backdrop-blur text-white rounded hover:bg-white/20 border border-white/20 transition-colors touch-manipulation flex items-center justify-center"
            onClick={onMoreInfo}
            aria-label={`More information about ${title}`}
          >
            <Info className="h-5 w-5" />
          </button>

          <button
            className={`min-h-[48px] min-w-[48px] backdrop-blur rounded border border-white/20 transition-colors touch-manipulation flex items-center justify-center ${
              isInList
                ? "bg-red-600/80 hover:bg-red-600"
                : "bg-white/10 hover:bg-white/20"
            }`}
            onClick={onToggleList}
            aria-label={isInList ? "Remove from My List" : "Add to My List"}
          >
            {isInList ? (
              <HeartOff className="h-5 w-5 text-white" />
            ) : (
              <Heart className="h-5 w-5 text-white" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-[var(--success)] font-bold">
            {matchScore}% Match
          </span>
          <span className="text-gray-300">{year}</span>
          <span className="border border-gray-500 px-1 rounded text-gray-300">
            {ageRating}
          </span>
          <span className="border border-gray-500 px-1 rounded text-gray-300">
            HD
          </span>
        </div>
      </div>
    </div>
  );
});

export default MediaCardOverlay;

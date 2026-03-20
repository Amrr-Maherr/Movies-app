import { memo } from "react";
import { Play, Info, Plus, Check, ChevronDown } from "lucide-react";

export interface CardHoverOverlayProps {
  title: string;
  matchScore: number;
  year: string;
  ageRating: string;
  isHovered: boolean;
  onPlay: (e: React.MouseEvent) => void;
  onMoreInfo: (e: React.MouseEvent) => void;
  onAddToList?: (e: React.MouseEvent) => void;
  isInList?: boolean;
  showDropdown?: boolean;
  className?: string;
}

const CardHoverOverlay = memo(
  ({
    title,
    matchScore,
    year,
    ageRating,
    isHovered,
    onPlay,
    onMoreInfo,
    onAddToList,
    isInList = false,
    showDropdown = true,
    className = "",
  }: CardHoverOverlayProps) => {
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent transition-opacity duration-300 ease-in-out ${className}`}
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
              className="flex-1 bg-white text-black py-2 px-3 rounded-md font-semibold text-xs flex items-center justify-center gap-1 hover:bg-gray-200 transition-colors"
              onClick={onPlay}
            >
              <Play className="h-3 w-3 fill-black" />
              Play
            </button>
            <button
              className="bg-[var(--background-secondary)]/90 backdrop-blur-sm text-white py-2 px-3 rounded-md font-semibold text-xs flex items-center justify-center gap-1 hover:bg-[var(--background-tertiary)] transition-colors border border-white/20"
              onClick={onMoreInfo}
            >
              <Info className="h-3 w-3" />
              Info
            </button>
            {onAddToList && (
              <button
                className={`backdrop-blur-sm text-white py-2 px-3 rounded-md font-semibold text-xs flex items-center justify-center gap-1 transition-colors border border-white/20 ${
                  isInList
                    ? "bg-[var(--success)]/90 hover:bg-[var(--success)]"
                    : "bg-[var(--background-secondary)]/90 hover:bg-[var(--background-tertiary)]"
                }`}
                onClick={onAddToList}
                title={isInList ? "Remove from My List" : "Add to My List"}
              >
                {isInList ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Plus className="h-3 w-3" />
                )}
              </button>
            )}
            {/* {showDropdown && (
              <button className="bg-[var(--background-secondary)]/90 backdrop-blur-sm text-white p-2 rounded-md hover:bg-[var(--background-tertiary)] transition-colors border border-white/20">
                <ChevronDown className="h-3 w-3" />
              </button>
            )} */}
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
  },
);

// Add displayName for better debugging in React DevTools
CardHoverOverlay.displayName = "CardHoverOverlay";

export default CardHoverOverlay;

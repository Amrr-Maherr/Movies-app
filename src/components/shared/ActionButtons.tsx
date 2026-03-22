import { memo } from "react";
import { Play, Plus, Info } from "lucide-react";

interface ActionButtonsProps {
  title: string;
  isAddedToList: boolean;
  showTrailer: boolean;
  onPlay: () => void;
  onAddToList: () => void;
  onMoreInfo: () => void;
}

/**
 * ActionButtons Component
 *
 * Main action buttons for media content:
 * - Play button
 * - Add to List button
 * - More Info button
 *
 * ACCESSIBILITY FIX:
 * - All buttons now have min-h-[48px] for proper touch target size
 * - Added touch-manipulation for better mobile behavior
 * - Added proper aria-labels for screen readers
 * - Increased gap between buttons to gap-3
 */
const ActionButtons = memo(function ActionButtons({
  title,
  isAddedToList,
  showTrailer,
  onPlay,
  onAddToList,
  onMoreInfo,
}: ActionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3 pt-4 hero-buttons">
      {/* Play Button - White bg, black text */}
      <button
        onClick={onPlay}
        className="flex items-center gap-2 bg-white text-[var(--text-inverse)] px-3 sm:px-6 md:px-8 min-h-[48px] rounded font-bold text-xs sm:text-base md:text-lg transition-all duration-200 hover:bg-white/90 active:scale-95 justify-center touch-manipulation"
        aria-label={`Play ${title}`}
      >
        <Play
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 fill-current"
          aria-hidden="true"
        />
        <span className="hidden xs:inline">Play</span>
      </button>

      {/* Add to List Button */}
      <button
        onClick={onAddToList}
        className={`flex items-center gap-2 px-3 sm:px-6 md:px-8 min-h-[48px] rounded font-bold text-xs sm:text-base md:text-lg transition-all duration-200 active:scale-95 backdrop-blur-sm justify-center touch-manipulation border border-white/20 ${
          isAddedToList
            ? "bg-[var(--success)]/80 hover:bg-[var(--success)] text-white"
            : "bg-[var(--background-secondary)]/80 hover:bg-[var(--background-tertiary)] text-white"
        }`}
        aria-pressed={isAddedToList}
        aria-label={isAddedToList ? "Remove from My List" : "Add to My List"}
      >
        <Plus
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6"
          aria-hidden="true"
        />
        <span className="hidden xs:inline">
          {isAddedToList ? "In List" : "My List"}
        </span>
      </button>

      {/* More Info Button */}
      <button
        onClick={onMoreInfo}
        className="flex items-center gap-2 bg-white/20 text-white px-3 sm:px-6 md:px-8 min-h-[48px] rounded font-bold text-xs sm:text-base md:text-lg transition-all duration-200 hover:bg-white/30 active:scale-95 backdrop-blur-sm justify-center touch-manipulation"
        aria-label="More information"
      >
        <Info
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6"
          aria-hidden="true"
        />
        <span className="hidden xs:inline">More Info</span>
      </button>
    </div>
  );
});

export default ActionButtons;

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
    <div className="flex flex-wrap gap-2 sm:gap-3 pt-4 hero-buttons">
      {/* Play Button - White bg, black text */}
      <button
        onClick={onPlay}
        className="flex items-center gap-1.5 sm:gap-2 bg-white text-[var(--text-inverse)] px-3 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded font-bold text-xs sm:text-base md:text-lg transition-all duration-200 hover:bg-white/90 active:scale-95 min-w-[100px] sm:min-w-[120px] justify-center touch-manipulation button-hover hover-scale tap-scale"
        aria-label={`Play ${title}`}
      >
        <Play className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-current" />
        <span className="hidden xs:inline">Play</span>
      </button>

      {/* Add to List Button */}
      <button
        onClick={onAddToList}
        className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded font-bold text-xs sm:text-base md:text-lg transition-all duration-200 active:scale-95 backdrop-blur-sm min-w-[100px] sm:min-w-[120px] justify-center touch-manipulation button-hover hover-scale tap-scale border border-white/20 ${
          isAddedToList
            ? "bg-[var(--success)]/80 hover:bg-[var(--success)] text-white"
            : "bg-[var(--background-secondary)]/80 hover:bg-[var(--background-tertiary)] text-white"
        }`}
        aria-pressed={isAddedToList}
        aria-label={isAddedToList ? "Remove from My List" : "Add to My List"}
      >
        <Plus className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        <span className="hidden xs:inline">
          {isAddedToList ? "In List" : "My List"}
        </span>
      </button>

      {/* More Info Button */}
      <button
        onClick={onMoreInfo}
        className="flex items-center gap-1.5 sm:gap-2 bg-white/20 text-white px-3 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded font-bold text-xs sm:text-base md:text-lg transition-all duration-200 hover:bg-white/30 active:scale-95 backdrop-blur-sm min-w-[100px] sm:min-w-[120px] justify-center touch-manipulation button-hover hover-scale tap-scale"
        aria-label="More information"
      >
        <Info className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        <span className="hidden xs:inline">More Info</span>
      </button>
    </div>
  );
});

export default ActionButtons;

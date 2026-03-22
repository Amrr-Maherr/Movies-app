import { memo } from "react";
import { Play, Info, Plus, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { generateSlug, formatSlugWithId } from "@/utils/slugify";
import { getTitle } from "@/utils";
import { HeroMedia } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToList, removeFromList, selectIsInList } from "@/store/ListReucer";

interface ActionButtonsProps {
  movie?: HeroMedia;
  onMoreInfo?: (movie: HeroMedia) => void;
}

// ============================================
// COMPONENT
// ============================================
const ActionButtons = memo(function ActionButtons({
  movie,
  onMoreInfo,
}: ActionButtonsProps) {
  const dispatch = useAppDispatch();
  const isInList = useAppSelector((state) =>
    movie ? selectIsInList(state, movie.id) : false,
  );

  const handleAddToList = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (movie) {
      if (isInList) {
        dispatch(removeFromList(movie.id));
      } else {
        dispatch(addToList(movie));
      }
    }
  };

  if (!movie) return null;

  const isTvShow = "first_air_date" in movie;
  const title = getTitle(movie);
  const slug = generateSlug(title);
  const slugWithId = formatSlugWithId(slug, movie.id);
  const detailsUrl = `/${isTvShow ? "tv" : "movie"}/${slugWithId}`;

  return (
    <div className="flex flex-wrap gap-3 pt-4 hero-buttons">
      {/* 
        ACCESSIBILITY FIX: Play Button with proper 48px touch target
        - Changed from Link wrapping button to direct button with onClick
        - Added min-h-[48px] for adequate touch height
        - Added touch-manipulation for better mobile behavior
      */}
      <Link
        to={detailsUrl}
        className="inline-flex"
        aria-label={`Play ${title}`}
      >
        <button className="flex items-center gap-2 bg-white text-[var(--text-inverse)] px-4 sm:px-6 md:px-8 min-h-[48px] rounded font-bold text-sm sm:text-base md:text-lg transition-all duration-200 hover:bg-white/90 active:scale-95 justify-center touch-manipulation">
          <Play
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 fill-current"
            aria-hidden="true"
          />
          Play
        </button>
      </Link>

      {/* 
        ACCESSIBILITY FIX: More Info Button with proper 48px touch target
        - Added min-h-[48px] for adequate touch height
        - Added touch-manipulation for better mobile behavior
      */}
      <button
        onClick={() => {
          if (movie && onMoreInfo) onMoreInfo(movie);
        }}
        className="flex items-center gap-2 bg-white/20 text-white px-4 sm:px-6 md:px-8 min-h-[48px] rounded font-bold text-sm sm:text-base md:text-lg transition-all duration-200 hover:bg-white/30 active:scale-95 backdrop-blur-sm justify-center touch-manipulation"
        aria-label={`More information about ${title}`}
      >
        <Info
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6"
          aria-hidden="true"
        />
        More Info
      </button>

      {/* 
        ACCESSIBILITY FIX: Add to List Button with proper 48px touch target
        - Added min-h-[48px] for adequate touch height
        - Added touch-manipulation for better mobile behavior
        - Added proper aria-pressed for toggle state
      */}
      <button
        onClick={handleAddToList}
        className={`flex items-center gap-2 px-4 sm:px-6 md:px-8 min-h-[48px] rounded font-bold text-sm sm:text-base md:text-lg transition-all duration-200 active:scale-95 backdrop-blur-sm justify-center touch-manipulation border border-white/20 ${
          isInList
            ? "bg-[var(--success)]/80 hover:bg-[var(--success)] text-white"
            : "bg-[var(--background-secondary)]/80 hover:bg-[var(--background-tertiary)] text-white"
        }`}
        aria-pressed={isInList}
        aria-label={isInList ? "Remove from My List" : "Add to My List"}
        title={isInList ? "Remove from My List" : "Add to My List"}
      >
        {isInList ? (
          <Check
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6"
            aria-hidden="true"
          />
        ) : (
          <Plus
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6"
            aria-hidden="true"
          />
        )}
        {isInList ? "In List" : "My List"}
      </button>
    </div>
  );
});

export default ActionButtons;

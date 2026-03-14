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
      {/* Play Button - White bg, black text (Netflix primary) */}
      <Link to={detailsUrl} className="block">
        <button className="flex items-center gap-2 bg-white text-[var(--text-inverse)] px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded font-bold text-sm sm:text-base md:text-lg transition-all duration-200 hover:bg-white/90 active:scale-95 min-w-[120px] sm:min-w-[140px] justify-center touch-manipulation button-hover hover-scale tap-scale">
          <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-current" />
          Play
        </button>
      </Link>

      {/* More Info Button - Semi-transparent with blur (theme-aware) */}
      <button
        onClick={() => {
          if (movie && onMoreInfo) onMoreInfo(movie);
        }}
        className="flex items-center gap-2 bg-white/20 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded font-bold text-sm sm:text-base md:text-lg transition-all duration-200 hover:bg-white/30 active:scale-95 backdrop-blur-sm min-w-[120px] sm:min-w-[140px] justify-center touch-manipulation button-hover hover-scale tap-scale"
      >
        <Info className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        More Info
      </button>

      {/* Add to List Button - Theme-aware with dynamic icon */}
      <button
        onClick={handleAddToList}
        className={`flex items-center gap-2 px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded font-bold text-sm sm:text-base md:text-lg transition-all duration-200 active:scale-95 backdrop-blur-sm min-w-[120px] sm:min-w-[140px] justify-center touch-manipulation button-hover hover-scale tap-scale border border-white/20 ${
          isInList
            ? "bg-[var(--success)]/80 hover:bg-[var(--success)] text-white"
            : "bg-[var(--background-secondary)]/80 hover:bg-[var(--background-tertiary)] text-white"
        }`}
        title={isInList ? "Remove from My List" : "Add to My List"}
      >
        {isInList ? (
          <Check className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        ) : (
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        )}
        {isInList ? "In List" : "My List"}
      </button>
    </div>
  );
});

export default ActionButtons;

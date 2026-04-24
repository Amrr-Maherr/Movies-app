import { useState, useEffect, useCallback, memo } from "react";
import {
  Swords,
  Smile,
  Drama,
  Ghost,
  Rocket,
  Heart,
  Flame,
  BookOpen,
  Sparkles,
  Search as SearchIcon,
  Sword,
  Bomb,
  Globe,
  Music,
  Users,
  Zap,
  Palette,
  Clapperboard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useSearch,
  type MovieSearchResult,
  type TvShowSearchResult,
  type PersonSearchResultItem,
} from "@/hooks/shared/FetchSearch";
import { useDebounce } from "@/utils";
import type { SearchPopupProps } from "./types";
import SearchHeader from "./SearchHeader";
import SearchLoading from "./SearchLoading";
import SearchNoResults from "./SearchNoResults";
import SearchEmptyState, { type QuickSuggestion } from "./SearchEmptyState";
import SearchSection from "./SearchSection";

// ── Genre suggestions — add more here easily ────────────────────

const QUICK_SUGGESTIONS: QuickSuggestion[] = [
  { icon: <Swords className="w-3.5 h-3.5" />, text: "Action", query: "action" },
  { icon: <Smile className="w-3.5 h-3.5" />, text: "Comedy", query: "comedy" },
  { icon: <Drama className="w-3.5 h-3.5" />, text: "Drama", query: "drama" },
  { icon: <Ghost className="w-3.5 h-3.5" />, text: "Horror", query: "horror" },
  {
    icon: <Rocket className="w-3.5 h-3.5" />,
    text: "Sci-Fi",
    query: "science fiction",
  },
  {
    icon: <Heart className="w-3.5 h-3.5" />,
    text: "Romance",
    query: "romance",
  },
  {
    icon: <Flame className="w-3.5 h-3.5" />,
    text: "Thriller",
    query: "thriller",
  },
  {
    icon: <BookOpen className="w-3.5 h-3.5" />,
    text: "Documentary",
    query: "documentary",
  },
  {
    icon: <Sparkles className="w-3.5 h-3.5" />,
    text: "Animation",
    query: "animation",
  },
  {
    icon: <SearchIcon className="w-3.5 h-3.5" />,
    text: "Mystery",
    query: "mystery",
  },
  {
    icon: <Sword className="w-3.5 h-3.5" />,
    text: "Fantasy",
    query: "fantasy",
  },
  { icon: <Bomb className="w-3.5 h-3.5" />, text: "Crime", query: "crime" },
  {
    icon: <Globe className="w-3.5 h-3.5" />,
    text: "Adventure",
    query: "adventure",
  },
  { icon: <Music className="w-3.5 h-3.5" />, text: "Musical", query: "music" },
  { icon: <Users className="w-3.5 h-3.5" />, text: "Family", query: "family" },
  {
    icon: <Zap className="w-3.5 h-3.5" />,
    text: "Superhero",
    query: "superhero",
  },
  { icon: <Palette className="w-3.5 h-3.5" />, text: "Anime", query: "anime" },
  {
    icon: <Clapperboard className="w-3.5 h-3.5" />,
    text: "Korean Drama",
    query: "korean drama",
  },
];

// ── Main Popup ──────────────────────────────────────────────────

/**
 * Netflix-style Search Popup Component
 */
export const SearchPopup = memo(function SearchPopup({
  isOpen,
  onClose,
}: SearchPopupProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const { results, isLoading } = useSearch(debouncedQuery);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset query when popup closes
  const handleClose = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  // Group results by type
  const movies = results.filter(
    (r): r is MovieSearchResult => r.type === "movie",
  );
  const tvShows = results.filter(
    (r): r is TvShowSearchResult => r.type === "tv",
  );
  const people = results.filter(
    (r): r is PersonSearchResultItem => r.type === "person",
  );

  const hasResults =
    movies.length > 0 || tvShows.length > 0 || people.length > 0;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 backdrop-blur-md z-[100]"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl max-h-[85vh] bg-zinc-900/95 rounded-3xl shadow-2xl overflow-hidden border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <SearchHeader
            query={query}
            onChange={setQuery}
            onClose={handleClose}
          />

          {/* Results */}
          <div className="overflow-y-auto max-h-[calc(85vh-100px)] p-6">
            {/* Loading */}
            {isLoading && query.length >= 2 && <SearchLoading />}

            {/* Empty state with suggestions */}
            {!isLoading && query.length < 2 && (
              <SearchEmptyState
                suggestions={QUICK_SUGGESTIONS}
                onSelect={setQuery}
              />
            )}

            {/* No results */}
            {!isLoading && query.length >= 2 && !hasResults && (
              <SearchNoResults query={query} />
            )}

            {/* Results sections */}
            {hasResults && (
              <div className="space-y-10">
                {movies.length > 0 && (
                  <SearchSection
                    type="movie"
                    results={movies}
                    query={query}
                    onClose={handleClose}
                  />
                )}
                {tvShows.length > 0 && (
                  <SearchSection
                    type="tv"
                    results={tvShows}
                    query={query}
                    onClose={handleClose}
                  />
                )}
                {people.length > 0 && (
                  <SearchSection
                    type="person"
                    results={people}
                    query={query}
                    onClose={handleClose}
                  />
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

export default SearchPopup;

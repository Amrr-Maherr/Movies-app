import { useState, useEffect, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Search,
  Film,
  Tv,
  User,
  ArrowRight,
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
import Card from "@/components/shared/Card/Card";
import type { HeroMedia } from "@/types";

export interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// Quick search genre suggestions — add more genres easily here
const QUICK_SUGGESTIONS: {
  icon: React.ReactNode;
  text: string;
  query: string;
}[] = [
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

/**
 * Netflix-style Search Popup Component
 */
export const SearchPopup = memo(function SearchPopup({
  isOpen,
  onClose,
}: SearchPopupProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const navigate = useNavigate();

  const { results, isLoading } = useSearch(debouncedQuery);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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
          <div className="flex items-center gap-4 p-6 border-b border-white/10 bg-gradient-to-r from-zinc-900 to-zinc-800">
            <div className="p-2 rounded-xl bg-netflix-red/20">
              <Search className="w-6 h-6 text-netflix-red" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies, TV shows, and people..."
              className="flex-1 bg-transparent text-white text-xl placeholder:text-white/30 outline-none"
              autoFocus
            />
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors group"
              aria-label="Close search"
            >
              <X className="w-6 h-6 text-white/50 group-hover:text-white" />
            </button>
          </div>

          {/* Results */}
          <div className="overflow-y-auto max-h-[calc(85vh-100px)] p-6">
            {isLoading && query.length >= 2 && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-netflix-red/30 border-t-netflix-red rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Search className="w-5 h-5 text-netflix-red animate-pulse" />
                  </div>
                </div>
                <p className="text-white/40 mt-6 text-sm">Searching...</p>
              </div>
            )}

            {!isLoading && query.length < 2 && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Search className="w-12 h-12 text-white/20" />
                </div>
                <p className="text-white/40 text-center">
                  Start typing to search for movies, TV shows, and people
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-8">
                  {QUICK_SUGGESTIONS.map((suggestion) => (
                    <QuickSearchChip
                      key={suggestion.query}
                      icon={suggestion.icon}
                      text={suggestion.text}
                      onClick={() => setQuery(suggestion.query)}
                    />
                  ))}
                </div>
              </div>
            )}

            {!isLoading && query.length >= 2 && !hasResults && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Film className="w-12 h-12 text-white/20" />
                </div>
                <p className="text-white/60 text-center text-lg font-medium">
                  No results found
                </p>
                <p className="text-white/30 text-sm mt-2">
                  No results for "<span className="text-white">{query}</span>"
                </p>
              </div>
            )}

            {hasResults && (
              <div className="space-y-10">
                {/* Movies Section */}
                {movies.length > 0 && (
                  <section>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                        <Film className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        Movies
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium">
                        {movies.length}
                      </span>
                      <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                      <motion.button
                        onClick={() => {
                          navigate(
                            `/search?q=${encodeURIComponent(query)}&type=movie`,
                          );
                          handleClose();
                        }}
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        View all
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {movies.slice(0, 10).map(({ item }) => (
                        <Card
                          key={item.id}
                          movie={item as unknown as HeroMedia}
                          variant="standard"
                        />
                      ))}
                    </div>
                    {movies.length > 10 && (
                      <p className="text-white/30 text-xs mt-3 text-center">
                        Showing 10 of {movies.length} results
                      </p>
                    )}
                  </section>
                )}

                {/* TV Shows Section */}
                {tvShows.length > 0 && (
                  <section>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                        <Tv className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        TV Shows
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium">
                        {tvShows.length}
                      </span>
                      <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                      <motion.button
                        onClick={() => {
                          navigate(
                            `/search?q=${encodeURIComponent(query)}&type=tv`,
                          );
                          handleClose();
                        }}
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-1.5 text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        View all
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {tvShows.slice(0, 10).map(({ item }) => (
                        <Card
                          key={item.id}
                          movie={item as unknown as HeroMedia}
                          variant="standard"
                        />
                      ))}
                    </div>
                    {tvShows.length > 10 && (
                      <p className="text-white/30 text-xs mt-3 text-center">
                        Showing 10 of {tvShows.length} results
                      </p>
                    )}
                  </section>
                )}

                {/* People Section */}
                {people.length > 0 && (
                  <section>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        People
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-medium">
                        {people.length}
                      </span>
                      <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                      <motion.button
                        onClick={() => {
                          navigate(
                            `/search?q=${encodeURIComponent(query)}&type=person`,
                          );
                          handleClose();
                        }}
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-1.5 text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors"
                      >
                        View all
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                      {people.slice(0, 8).map(({ item }) => (
                        <Card
                          key={item.id}
                          person={{
                            id: item.id,
                            name: item.name,
                            profileImage: item.profile_path || "",
                            role: "Actor",
                          }}
                          variant="person"
                        />
                      ))}
                    </div>
                    {people.length > 8 && (
                      <p className="text-white/30 text-xs mt-3 text-center">
                        Showing 8 of {people.length} results
                      </p>
                    )}
                  </section>
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

// Quick Search Chip Component
interface QuickSearchChipProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}

function QuickSearchChip({ icon, text, onClick }: QuickSearchChipProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white hover:border-netflix-red/50 transition-all duration-200 text-sm font-medium flex items-center gap-2"
    >
      {icon}
      {text}
    </motion.button>
  );
}

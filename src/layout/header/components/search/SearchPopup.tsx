import { useState, useEffect, useCallback, memo } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/utils";
import SearchResultCard from "./SearchResultCard";
import { useSearch } from "@/queries/FetchSearch";
import { Loader } from "@/components/ui";
import { useNavigate } from "react-router-dom";
import { generateSlug, formatSlugWithId } from "@/utils/slugify";
import { Movie, TvShow } from "@/types/movies";

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// Memoized SearchPopup component - avoids re-renders when parent updates
const SearchPopup = memo(function SearchPopup({
  isOpen,
  onClose,
}: SearchPopupProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const { results, isLoading } = useSearch(debouncedQuery);
  const navigate = useNavigate();

  // Clear query when popup closes (using callback instead of effect)
  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setQuery("");
    }
    if (!open && onClose) {
      onClose();
    }
  }, [onClose]);

  // Memoized: Handle ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // Memoized: Handlers
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    [],
  );

  const handleSelect = useCallback(
    ({ item, type }: { item: Movie | TvShow; type: "movie" | "tv" }) => {
      const title = type === "movie" ? (item as Movie).title : (item as TvShow).name;
      const slug = generateSlug(title);
      const slugWithId = formatSlugWithId(slug, item.id);
      const route = `/${type}/${slugWithId}`;
      
      navigate(route);
      onClose();
    },
    [navigate, onClose],
  );

  const handleClear = useCallback(() => {
    setQuery("");
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "bg-black/95 backdrop-blur-md border border-white/10",
          "max-w-2xl w-full mx-4",
          "rounded-lg shadow-2xl",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        )}
      >
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for movies, TV shows..."
            className={cn(
              "w-full h-12 pl-12 pr-12",
              "bg-zinc-900 border border-white/10 rounded-md",
              "text-white placeholder:text-gray-500",
              "focus-visible:ring-2 focus-visible:ring-[var(--netflix-red)] focus-visible:border-transparent",
              "text-lg",
            )}
            value={query}
            onChange={handleInputChange}
            autoFocus
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Search Results */}
        <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-1 custom-scrollbar">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader />
            </div>
          )}

          {!isLoading && query.length > 0 && results.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">No results found for "{query}"</p>
              <p className="text-sm mt-2">Try searching for something else</p>
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                {results.length}{" "}
                {results.length === 1 ? "result" : "results"}
              </div>
              {results.map(({ item, type }) => (
                <SearchResultCard
                  key={`${type}-${item.id}`}
                  item={item}
                  type={type}
                  onClick={() => handleSelect({ item, type })}
                />
              ))}
            </>
          )}

          {!isLoading && query.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Search for movies and TV shows</p>
              <p className="text-sm mt-2">Start typing to see results</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default SearchPopup;

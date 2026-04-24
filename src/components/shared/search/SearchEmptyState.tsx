import { memo } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

// Quick search genre suggestions — add more genres easily here
export interface QuickSuggestion {
  icon: React.ReactNode;
  text: string;
  query: string;
}

interface SearchEmptyStateProps {
  suggestions: QuickSuggestion[];
  onSelect: (query: string) => void;
}

const SearchEmptyState = memo(function SearchEmptyState({
  suggestions,
  onSelect,
}: SearchEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
        <Search className="w-12 h-12 text-white/20" />
      </div>
      <p className="text-white/40 text-center">
        Start typing to search for movies, TV shows, and people
      </p>
      <div className="flex flex-wrap justify-center gap-2 mt-8">
        {suggestions.map((suggestion) => (
          <QuickSearchChip
            key={suggestion.query}
            icon={suggestion.icon}
            text={suggestion.text}
            onClick={() => onSelect(suggestion.query)}
          />
        ))}
      </div>
    </div>
  );
});

export default SearchEmptyState;

// ── Quick Search Chip ──────────────────────────────────────────

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

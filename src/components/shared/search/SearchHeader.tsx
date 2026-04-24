import { memo } from "react";
import { X, Search } from "lucide-react";

interface SearchHeaderProps {
  query: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

const SearchHeader = memo(function SearchHeader({
  query,
  onChange,
  onClose,
}: SearchHeaderProps) {
  return (
    <div className="flex items-center gap-4 p-6 border-b border-white/10 bg-gradient-to-r from-zinc-900 to-zinc-800">
      <div className="p-2 rounded-xl bg-netflix-red/20">
        <Search className="w-6 h-6 text-netflix-red" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search movies, TV shows, and people..."
        className="flex-1 bg-transparent text-white text-xl placeholder:text-white/30 outline-none"
        autoFocus
      />
      <button
        onClick={onClose}
        className="p-2 hover:bg-white/10 rounded-full transition-colors group"
        aria-label="Close search"
      >
        <X className="w-6 h-6 text-white/50 group-hover:text-white" />
      </button>
    </div>
  );
});

export default SearchHeader;

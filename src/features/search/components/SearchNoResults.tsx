import { memo } from "react";
import { Film } from "lucide-react";

interface SearchNoResultsProps {
  query: string;
}

const SearchNoResults = memo(function SearchNoResults({
  query,
}: SearchNoResultsProps) {
  return (
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
  );
});

export default SearchNoResults;

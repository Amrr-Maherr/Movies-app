import { memo } from "react";
import { Search } from "lucide-react";

const SearchLoading = memo(function SearchLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-netflix-red/30 border-t-netflix-red rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Search className="w-5 h-5 text-netflix-red animate-pulse" />
        </div>
      </div>
      <p className="text-white/40 mt-6 text-sm">Searching...</p>
    </div>
  );
});

export default SearchLoading;

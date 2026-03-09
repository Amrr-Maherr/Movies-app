import { motion } from "framer-motion";

export type NewPopularFilterOption =
  | "trendingMovies"
  | "trendingTv"
  | "nowPlaying"
  | "popularMovies";

interface NewPopularFiltersProps {
  activeFilter: NewPopularFilterOption;
  onFilterChange: (filter: NewPopularFilterOption) => void;
}

const filters: { id: NewPopularFilterOption; label: string }[] = [
  { id: "trendingMovies", label: "Trending Movies" },
  { id: "trendingTv", label: "Trending TV Shows" },
  { id: "nowPlaying", label: "Now Playing in Theaters" },
  { id: "popularMovies", label: "Popular Movies" },
];

export default function NewPopularFilters({
  activeFilter,
  onFilterChange,
}: NewPopularFiltersProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-2 no-scrollbar px-4 sm:px-8">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        return (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`relative px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors duration-300 ${
              isActive
                ? "text-black"
                : "text-[var(--text-secondary)] hover:text-white bg-[var(--background-secondary)]/50 hover:bg-[var(--background-tertiary)]"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeNewPopularFilterBg"
                className="absolute inset-0 bg-white rounded-full z-0"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{filter.label}</span>
          </button>
        );
      })}
    </div>
  );
}

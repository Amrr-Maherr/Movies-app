import { motion } from "framer-motion";

export type TVShowFilterOption =
  | "popular"
  | "topRated"
  | "airingToday"
  | "onTheAir";

interface TVShowFiltersProps {
  activeFilter: TVShowFilterOption;
  onFilterChange: (filter: TVShowFilterOption) => void;
}

const filters: { id: TVShowFilterOption; label: string }[] = [
  { id: "popular", label: "Popular" },
  { id: "topRated", label: "Top Rated" },
  { id: "airingToday", label: "Airing Today" },
  { id: "onTheAir", label: "On The Air" },
];

export default function TVShowFilters({
  activeFilter,
  onFilterChange,
}: TVShowFiltersProps) {
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
                layoutId="activeFilterBg"
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

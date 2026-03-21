import { memo, useCallback } from "react";

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

/**
 * Memoized TVShowFilters Component
 *
 * Displays filter buttons for TV show listing pages.
 * Memoized to prevent unnecessary re-renders when parent components update.
 */
const TVShowFilters = memo(function TVShowFilters({
  activeFilter,
  onFilterChange,
}: TVShowFiltersProps) {
  // Memoize click handler to prevent recreation on every render
  const handleFilterClick = useCallback(
    (filter: TVShowFilterOption) => {
      onFilterChange(filter);
    },
    [onFilterChange],
  );

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-2 no-scrollbar px-4 sm:px-8">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        return (
          <button
            key={filter.id}
            onClick={() => handleFilterClick(filter.id)}
            className={`relative px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 ${
              isActive
                ? "text-black"
                : "text-[var(--text-secondary)] hover:text-white bg-[var(--background-secondary)]/50 hover:bg-[var(--background-tertiary)]"
            }`}
          >
            {isActive && (
              <div
                className="absolute inset-0 bg-white rounded-full z-0 filter-badge"
                style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
              />
            )}
            <span className="relative z-10">{filter.label}</span>
          </button>
        );
      })}
    </div>
  );
});

export default TVShowFilters;

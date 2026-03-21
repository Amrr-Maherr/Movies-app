import { memo, useCallback } from "react";

export type MovieFilterOption =
  | "popular"
  | "topRated"
  | "upcoming"
  | "nowPlaying";

interface MovieFiltersProps {
  activeFilter: MovieFilterOption;
  onFilterChange: (filter: MovieFilterOption) => void;
}

const filters: { id: MovieFilterOption; label: string }[] = [
  { id: "popular", label: "Popular" },
  { id: "topRated", label: "Top Rated" },
  { id: "upcoming", label: "Upcoming" },
  { id: "nowPlaying", label: "Now Playing" },
];

/**
 * Memoized MovieFilters Component
 *
 * Displays filter buttons for movie listing pages.
 * Memoized to prevent unnecessary re-renders when parent components update.
 */
const MovieFilters = memo(function MovieFilters({
  activeFilter,
  onFilterChange,
}: MovieFiltersProps) {
  // Memoize click handler to prevent recreation on every render
  const handleFilterClick = useCallback(
    (filter: MovieFilterOption) => {
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

export default MovieFilters;

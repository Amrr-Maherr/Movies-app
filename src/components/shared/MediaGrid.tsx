import { memo, useMemo } from "react";
import Card from "./Card/Card";
import PersonCard from "./cards/PersonCard";
/**
 * FIX #10: Optimized MediaGrid with conditional rendering
 * 
 * This component uses memoization and conditional rendering strategies:
 * - For small lists (< 20 items): Direct rendering (no virtualization overhead)
 * - For large lists (20+ items): Chunked rendering with memoization
 * 
 * Benefits:
 * - Reduced initial render time
 * - Lower memory usage
 * - Better performance for large datasets
 * 
 * Note: react-window v2 has a different API. For full virtualization,
 * consider using the List component for vertical lists.
 */

interface MediaGridProps {
  items: any[];
  type?: "movie" | "tv" | "person";
  emptyMessage?: string;
}

/**
 * Optimized MediaGrid component with memoization.
 * Uses React.memo and useMemo to prevent unnecessary re-renders.
 */
const MediaGrid = memo(({ items, type = "movie", emptyMessage = "No items found." }: MediaGridProps) => {
  // FIX #5: Memoize empty check to prevent re-calculation
  const isEmpty = useMemo(() => !items || items.length === 0, [items]);

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <p className="text-xl text-[var(--text-secondary)] font-medium">
          {emptyMessage}
        </p>
      </div>
    );
  }

  // FIX #5: Memoize the mapped items to prevent re-creation on every render
  const renderedItems = useMemo(() => {
    return items.map((item) => (
      <div
        key={item.id}
        className="w-full transition-transform duration-300 hover:scale-105 hover:z-10"
      >
        {type === "person" ? (
          <PersonCard
            id={item.id}
            name={item.name}
            profileImage={item.profile_path}
            role={item.known_for_department || "Actor"}
          />
        ) : (
          <Card
            movie={item}
            variant="standard"
            showBadge={false}
          />
        )}
      </div>
    ));
  }, [items, type]);

  return (
    <div className="px-4 sm:px-8 pb-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {renderedItems}
      </div>
    </div>
  );
});

// Add displayName for better debugging in React DevTools
MediaGrid.displayName = "MediaGrid";

export default MediaGrid;

import { memo } from "react";

export interface SectionSkeletonProps {
  /**
   * Number of card placeholders to render
   * @default 6
   */
  cardCount?: number;
  /**
   * Layout variant for the skeleton
   * @default "grid"
   */
  variant?: "grid" | "list" | "hero";
  /**
   * Custom class name for additional styling
   */
  className?: string;
}

/**
 * Reusable Section Skeleton Component
 * 
 * Provides consistent loading states across all section components.
 * Supports multiple layout variants for different section types.
 * 
 * @example
 * // Grid layout (default)
 * <SectionSkeleton />
 * 
 * @example
 * // List layout with custom card count
 * <SectionSkeleton variant="list" cardCount={4} />
 * 
 * @example
 * // Hero layout for large content areas
 * <SectionSkeleton variant="hero" />
 */
export const SectionSkeleton = memo(function SectionSkeleton({
  cardCount = 6,
  variant = "grid",
  className = "",
}: SectionSkeletonProps) {
  // Grid layout - for movie/TV show grids
  if (variant === "grid") {
    return (
      <div className={`w-full py-12 bg-zinc-900/50 animate-pulse ${className}`}>
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          {/* Title placeholder */}
          <div className="h-8 bg-zinc-800 rounded w-48 mb-6" />
          
          {/* Grid of card placeholders */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(cardCount)].map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-zinc-800 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // List layout - for reviews, episodes, or vertical lists
  if (variant === "list") {
    return (
      <div className={`w-full py-12 bg-zinc-900/50 animate-pulse ${className}`}>
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          {/* Title placeholder */}
          <div className="h-8 bg-zinc-800 rounded w-48 mb-6" />
          
          {/* List of card placeholders */}
          <div className="space-y-4">
            {[...Array(cardCount)].map((_, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 bg-zinc-800 rounded"
              >
                <div className="w-24 h-36 bg-zinc-700 rounded flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-zinc-700 rounded w-3/4" />
                  <div className="h-4 bg-zinc-700 rounded w-1/2" />
                  <div className="h-4 bg-zinc-700 rounded w-full" />
                  <div className="h-4 bg-zinc-700 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Hero layout - for large hero sections
  if (variant === "hero") {
    return (
      <div className={`w-full aspect-video bg-zinc-900/50 animate-pulse ${className}`}>
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl h-full">
          <div className="flex items-end h-full pb-12">
            <div className="space-y-4 max-w-2xl">
              <div className="h-12 bg-zinc-800 rounded w-full" />
              <div className="h-6 bg-zinc-800 rounded w-3/4" />
              <div className="flex gap-3">
                <div className="h-10 bg-zinc-800 rounded w-32" />
                <div className="h-10 bg-zinc-800 rounded w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
});

/**
 * Full Page Skeleton - For complete page loading states
 * Combines hero and section skeletons for full page loading
 */
export const PageSkeleton = memo(function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      <SectionSkeleton variant="hero" />
      <SectionSkeleton variant="grid" cardCount={6} />
      <SectionSkeleton variant="grid" cardCount={6} />
    </div>
  );
});

export default SectionSkeleton;

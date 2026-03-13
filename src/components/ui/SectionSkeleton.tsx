import { memo, ReactNode } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
 * Internal shared wrapper for skeleton sections (Grid and List)
 */
const SkeletonWrapper = ({ 
  children, 
  className = "", 
  titleWidth = 192 
}: { 
  children: ReactNode; 
  className?: string; 
  titleWidth?: number | string 
}) => (
  <div className={`w-full py-12 bg-[var(--background-primary)]/50 ${className}`}>
    <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
      <div className="mb-6">
        <Skeleton width={titleWidth} height={32} />
      </div>
      {children}
    </div>
  </div>
);

/**
 * Grid layout - for movie/TV show grids
 */
const GridSkeleton = memo(({ cardCount, className }: { cardCount: number; className?: string }) => (
  <SkeletonWrapper className={className}>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {Array.from({ length: cardCount }).map((_, i) => (
        <Skeleton key={`grid-card-${i}`} className="aspect-[2/3]" borderRadius={8} />
      ))}
    </div>
  </SkeletonWrapper>
));

/**
 * List layout - for reviews, episodes, or vertical lists
 */
const ListSkeleton = memo(({ cardCount, className }: { cardCount: number; className?: string }) => (
  <SkeletonWrapper className={className}>
    <div className="space-y-4">
      {Array.from({ length: cardCount }).map((_, i) => (
        <div key={`list-item-${i}`} className="flex gap-4 p-4 bg-zinc-800/30 rounded-lg border border-zinc-800/50">
          <Skeleton width={96} height={144} borderRadius={8} className="flex-shrink-0" />
          <div className="flex-1 space-y-3 pt-1">
            <Skeleton height={24} width="75%" />
            <Skeleton height={16} width="40%" />
            <div className="space-y-2 mt-4">
              <Skeleton height={14} width="100%" />
              <Skeleton height={14} width="100%" />
              <Skeleton height={14} width="65%" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </SkeletonWrapper>
));

/**
 * Hero layout - for large hero sections
 */
const HeroSkeleton = memo(({ className }: { className?: string }) => (
  <div className={`w-full aspect-video relative overflow-hidden ${className}`}>
    <div className="absolute inset-0">
      <Skeleton height="100%" borderRadius={0} />
    </div>
    <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl h-full relative z-10 flex items-end">
      <div className="pb-16 space-y-6 max-w-2xl w-full">
        <div className="space-y-3">
          <Skeleton height={60} width="90%" />
          <Skeleton height={28} width="60%" />
        </div>
        <div className="flex gap-4">
          <Skeleton height={48} width={140} borderRadius={4} />
          <Skeleton height={48} width={140} borderRadius={4} />
        </div>
      </div>
    </div>
  </div>
));

/**
 * Reusable Section Skeleton Component
 * 
 * Provides consistent loading states across all section components.
 * Supports multiple layout variants for different section types.
 */
export const SectionSkeleton = memo(function SectionSkeleton({
  cardCount = 6,
  variant = "grid",
  className = "",
}: SectionSkeletonProps) {
  const content = (() => {
    switch (variant) {
      case "grid":
        return <GridSkeleton cardCount={cardCount} className={className} />;
      case "list":
        return <ListSkeleton cardCount={cardCount} className={className} />;
      case "hero":
        return <HeroSkeleton className={className} />;
      default:
        return null;
    }
  })();

  return (
    <SkeletonTheme baseColor="#1a1a1a" highlightColor="#2a2a2a">
      {content}
    </SkeletonTheme>
  );
});

/**
 * Full Page Skeleton - For complete page loading states
 * Combines hero and section skeletons for full page loading
 */
export const PageSkeleton = memo(function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      <SectionSkeleton variant="hero" />
      <div className="space-y-8">
        <SectionSkeleton variant="grid" cardCount={6} />
        <SectionSkeleton variant="grid" cardCount={12} />
      </div>
    </div>
  );
});

export default SectionSkeleton;

import { memo } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export interface PlatformSkeletonProps {
  cardCount?: number;
  className?: string;
}

/**
 * PlatformSkeleton Component
 * 
 * Displays skeleton placeholders for platform cards while data is loading.
 * Matches the size and layout of the final platform cards.
 */
const PlatformSkeleton = memo(function PlatformSkeleton({
  cardCount = 6,
  className = "",
}: PlatformSkeletonProps) {
  return (
    <SkeletonTheme baseColor="#1a1a1a" highlightColor="#2a2a2a">
      <div className={`w-full py-12 bg-[var(--background-primary)]/50 ${className}`}>
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          <div className="mb-6">
            <Skeleton width={200} height={32} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {Array.from({ length: cardCount }).map((_, i) => (
              <div 
                key={`platform-skeleton-${i}`} 
                className="h-[200px] md:h-[240px] lg:h-[280px]"
              >
                <div className="relative h-full w-full rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                  <Skeleton 
                    height="100%" 
                    width="100%" 
                    borderRadius={12}
                    className="w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
});

export default PlatformSkeleton;

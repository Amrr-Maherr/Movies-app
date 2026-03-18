import { memo } from "react";
import { Star } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import type { HeroMedia } from "@/types";

export interface RecommendationLayoutProps {
  movie: HeroMedia;
  title: string;
  posterUrl: string;
  matchPercentage?: number;
  isHovered: boolean;
}

/**
 * Recommendation Layout Component
 * Displays a card with match percentage for recommendations
 */
const RecommendationLayout = memo(
  ({
    title,
    posterUrl,
    matchPercentage,
    isHovered,
  }: RecommendationLayoutProps) => {
    return (
      <>
        <div className="relative aspect-[2/3] overflow-hidden rounded mb-2">
          <OptimizedImage
            src={posterUrl}
            alt={title}
            className="w-full h-full"
            objectFit="cover"
          />
          {/* Hover Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ease-in-out"
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            <div className="absolute bottom-2 left-2 right-2">
              <div className="flex items-center justify-between">
                {matchPercentage && (
                  <span className="text-xs font-bold text-green-400">
                    {matchPercentage}% Match
                  </span>
                )}
                <Star className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-xs md:text-sm text-gray-300 group-hover:text-white transition-colors line-clamp-2">
          {title}
        </h3>
      </>
    );
  },
);

RecommendationLayout.displayName = "RecommendationLayout";

export default RecommendationLayout;

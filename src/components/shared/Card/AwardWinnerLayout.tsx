import { memo } from "react";
import { Award, Star } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import type { HeroMedia } from "@/types";

export interface AwardWinnerLayoutProps {
  movie: HeroMedia;
  title: string;
  posterUrl: string;
  ratingValue?: string;
  isHovered: boolean;
}

/**
 * Award Winner Layout Component
 * Displays a card with gold award badge and border
 */
const AwardWinnerLayout = memo(
  ({ title, posterUrl, ratingValue, isHovered }: AwardWinnerLayoutProps) => {
    return (
      <>
        {/* Award Badge */}
        <div className="absolute -top-2 -right-2 z-10 bg-yellow-500 rounded-full p-2 shadow-lg">
          <Award className="w-4 h-4 md:w-5 md:h-5 text-black" />
        </div>
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg border-2 border-yellow-500/30 group-hover:border-yellow-500 transition-colors duration-300">
          <OptimizedImage
            src={posterUrl}
            alt={title}
            className="w-full h-full"
            objectFit="cover"
          />
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent transition-opacity duration-300 ease-in-out"
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            <div className="absolute bottom-2 left-2 right-2">
              {ratingValue && (
                <div className="flex items-center gap-1 bg-black/80 backdrop-blur-sm px-2 py-1 rounded">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-bold text-white">
                    {ratingValue}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <h3 className="text-xs md:text-sm text-white font-medium mt-2 line-clamp-2 group-hover:text-yellow-400 transition-colors">
          {title}
        </h3>
      </>
    );
  },
);

AwardWinnerLayout.displayName = "AwardWinnerLayout";

export default AwardWinnerLayout;

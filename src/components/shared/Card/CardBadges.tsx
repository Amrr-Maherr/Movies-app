import { memo } from "react";
import { Flame, Award, Calendar, Radio, Star } from "lucide-react";

export type BadgeType = "trending" | "award" | "live" | "onair" | "calendar";

export interface CardBadgesProps {
  showBadge?: boolean;
  badgeType?: BadgeType;
  showMatchScore?: boolean;
  matchScore?: number;
  showNewBadge?: boolean;
  showRatingBadge?: boolean;
  ratingValue?: string;
  isAdult?: boolean;
}

const CardBadges = memo(
  ({
    showBadge = false,
    badgeType,
    showMatchScore = false,
    matchScore,
    showNewBadge = false,
    showRatingBadge = false,
    ratingValue,
    isAdult = false,
  }: CardBadgesProps) => {
    return (
      <>
        {/* Adult Content Badge (+18) */}
        {isAdult && (
          <div className="absolute top-2 right-2 z-30 bg-red-700/95 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded shadow-lg border border-red-500/50">
            +18
          </div>
        )}

        {/* Custom Badges - Top Left */}
        {showBadge && badgeType === "trending" && (
          <div className="absolute top-2 left-2 z-20 bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-lg">
            <Flame className="h-2.5 w-2.5 fill-white" />
            TRENDING
          </div>
        )}
        {showBadge && badgeType === "award" && (
          <div className="absolute top-2 left-2 z-20 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg text-xs font-bold">
            <Award className="h-3 w-3" />
            Award
          </div>
        )}
        {showBadge && badgeType === "live" && (
          <div className="absolute top-2 left-2 z-20 bg-green-600 text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-lg">
            <Radio className="h-2.5 w-2.5" />
            LIVE
          </div>
        )}
        {showBadge && badgeType === "onair" && (
          <div className="absolute top-2 left-2 z-20 bg-pink-600 text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-lg animate-pulse">
            <Radio className="h-2.5 w-2.5" />
            ON AIR
          </div>
        )}
        {showBadge && badgeType === "calendar" && (
          <div className="absolute top-2 left-2 z-20 bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-lg">
            <Calendar className="h-2.5 w-2.5" />
            SOON
          </div>
        )}

        {/* NEW Badge */}
        {showNewBadge && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
            NEW
          </div>
        )}

        {/* Match Score Badge - Top Right */}
        {!isAdult && showMatchScore && matchScore && (
          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1 z-10">
            <span className="text-[var(--success)] text-xs font-bold">
              {matchScore}%
            </span>
          </div>
        )}

        {/* Rating Badge - Top Right */}
        {!isAdult && showRatingBadge && ratingValue && (
          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 z-10">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            {ratingValue}
          </div>
        )}
      </>
    );
  },
);

// Add displayName for better debugging in React DevTools
CardBadges.displayName = "CardBadges";

export default CardBadges;

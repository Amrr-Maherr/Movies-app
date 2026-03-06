import { memo } from "react";
import { Award, Calendar, Star } from "lucide-react";
import type { HeroMedia } from "@/types";

export interface Top10BadgeProps {
  rank: number;
}

export interface NewReleaseLayoutProps {
  movie: HeroMedia;
  title: string;
  posterUrl: string;
  ratingValue?: string;
  formattedReleaseDate?: string;
  isHovered: boolean;
  children?: React.ReactNode;
}

export interface AwardWinnerLayoutProps {
  movie: HeroMedia;
  title: string;
  posterUrl: string;
  ratingValue?: string;
  isHovered: boolean;
}

export interface RecommendationLayoutProps {
  movie: HeroMedia;
  title: string;
  posterUrl: string;
  matchPercentage?: number;
  isHovered: boolean;
}

// Top 10 Badge Component
const Top10Badge = memo(({ rank }: Top10BadgeProps) => {
  return (
    <div className="absolute -left-2 md:-left-4 -bottom-2 md:-bottom-3 z-10">
      <div className="relative">
        <span
          className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-black"
          style={{ WebkitTextStroke: "2px #ddd" }}
        >
          {rank}
        </span>
      </div>
    </div>
  );
});

// New Release Layout Component
const NewReleaseLayout = memo(({
  title,
  posterUrl,
  ratingValue,
  formattedReleaseDate,
  children
}: NewReleaseLayoutProps) => {
  return (
    <>
      <div className="relative aspect-[2/3] overflow-hidden rounded mb-2">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* NEW Badge */}
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
          NEW
        </div>
        {/* Rating Badge */}
        {ratingValue && (
          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 z-10">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            {ratingValue}
          </div>
        )}
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center px-4">
            <p className="text-white text-sm font-semibold line-clamp-2">{title}</p>
          </div>
        </div>
        {/* Children (additional overlays) */}
        {children}
      </div>
      <h3 className="text-sm md:text-base text-white font-medium line-clamp-1 group-hover:text-gray-300 transition-colors">
        {title}
      </h3>
      {formattedReleaseDate && (
        <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
          <Calendar className="w-3 h-3" />
          {formattedReleaseDate}
        </div>
      )}
    </>
  );
});

// Award Winner Layout Component
const AwardWinnerLayout = memo(({
  title,
  posterUrl,
  ratingValue,
  isHovered
}: AwardWinnerLayoutProps) => {
  return (
    <>
      {/* Award Badge */}
      <div className="absolute -top-2 -right-2 z-10 bg-yellow-500 rounded-full p-2 shadow-lg">
        <Award className="w-4 h-4 md:w-5 md:h-5 text-black" />
      </div>
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg border-2 border-yellow-500/30 group-hover:border-yellow-500 transition-colors duration-300">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="eager"
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
});

// Recommendation Layout Component
const RecommendationLayout = memo(({
  title,
  posterUrl,
  matchPercentage,
  isHovered
}: RecommendationLayoutProps) => {
  return (
    <>
      <div className="relative aspect-[2/3] overflow-hidden rounded mb-2">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="eager"
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
});

export { Top10Badge, NewReleaseLayout, AwardWinnerLayout, RecommendationLayout };

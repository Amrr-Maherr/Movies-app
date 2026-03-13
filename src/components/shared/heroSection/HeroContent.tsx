import { memo } from "react";
import { getMatchScore, getAgeRating } from "@/utils/movieHelpers";
import { getTitle, getReleaseYear } from "@/utils";
import ActionButtons from "./ActionButtons";
import type { HeroContentProps, HeroMedia } from "@/types";

interface ExtraHeroContentProps extends HeroContentProps {
  onMoreInfo?: (movie: HeroMedia) => void;
}

// ============================================
// COMPONENT
// ============================================
const HeroContent = memo(function HeroContent({ movie, onMoreInfo }: ExtraHeroContentProps) {
  const matchScore = getMatchScore(movie.vote_average);
  const year = getReleaseYear(movie);
  const ageRating = getAgeRating(movie.vote_average);
  const title = getTitle(movie);

  return (
    <div className="absolute inset-0 z-10 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="max-w-2xl">
          {/* Title - Big, dramatic, tight spacing (Netflix style) */}
          {/* Responsive: smaller on mobile, larger on desktop */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-3 sm:mb-4 tracking-tight leading-none hero-title"
            style={{ textShadow: "2px 2px 12px rgba(0,0,0,0.9)" }}
          >
            {title}
          </h1>

          {/* Metadata Row - Responsive spacing and font sizes */}
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap fade-in">
            {/* Match Score - Netflix green (theme-aware) */}
            <span className="text-[var(--success)] text-xs sm:text-sm font-bold tracking-tight">
              {matchScore}% Match
            </span>

            {/* Year - Theme-aware text color */}
            {year && (
              <span className="text-[var(--text-secondary)] text-xs sm:text-sm font-medium">
                {year}
              </span>
            )}

            {/* Age Rating Badge - Theme-aware colors */}
            <span className="border border-[var(--text-muted)] px-1.5 sm:px-2 py-0.5 text-[var(--text-secondary)] text-[10px] sm:text-xs font-medium uppercase tracking-wider">
              {ageRating}
            </span>

            {/* Quality Badge - Theme-aware colors */}
            <span className="border border-[var(--text-muted)] px-1.5 sm:px-2 py-0.5 text-[var(--text-secondary)] text-[10px] sm:text-xs font-medium">
              HD
            </span>
          </div>

          {/* Overview - Clean, readable, Netflix-style with width limit */}
          {/* Line clamped to 2 on mobile, 3 on desktop */}
          <p
            className="text-[var(--text-primary)] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 max-w-[90vw] sm:max-w-xl font-medium drop-shadow-lg hero-description"
            style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}
          >
            {movie.overview || "No description available."}
          </p>

          {/* Action Buttons */}
          <ActionButtons movie={movie} onMoreInfo={onMoreInfo} />
        </div>
      </div>
    </div>
  );
});

export default HeroContent;

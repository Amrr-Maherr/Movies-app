import { motion } from "framer-motion";
import { getMatchScore, getYear, getAgeRating } from "@/utils/movieHelpers";
import ActionButtons from "./ActionButtons";
import type { HeroContentProps } from "@/types";

// ============================================
// HELPER FUNCTIONS
// ============================================
const getTitle = (media: HeroContentProps["movie"]) => {
  return "title" in media ? media.title : media.name;
};

const getReleaseYear = (media: HeroContentProps["movie"]) => {
  if ("release_date" in media) {
    return getYear(media.release_date);
  }
  return "first_air_date" in media ? getYear(media.first_air_date) : undefined;
};

// ============================================
// COMPONENT
// ============================================
export default function HeroContent({ movie }: HeroContentProps) {
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
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-3 sm:mb-4 tracking-tight leading-none"
            style={{ textShadow: "2px 2px 12px rgba(0,0,0,0.9)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {title}
          </motion.h1>

          {/* Metadata Row - Responsive spacing and font sizes */}
          <motion.div
            className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
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
          </motion.div>

          {/* Overview - Clean, readable, Netflix-style with width limit */}
          {/* Line clamped to 2 on mobile, 3 on desktop */}
          <motion.p
            className="text-[var(--text-primary)] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 max-w-[90vw] sm:max-w-xl font-medium drop-shadow-lg"
            style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {movie.overview || "No description available."}
          </motion.p>

          {/* Action Buttons */}
          <ActionButtons />
        </div>
      </div>
    </div>
  );
}

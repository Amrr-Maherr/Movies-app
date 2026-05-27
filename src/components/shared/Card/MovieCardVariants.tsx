/**
 * Movie Card Variants
 * Handles standard movie card layouts
 */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import type { HeroMedia } from "@/types";
import { useCardLogic } from "./useCardLogic";
import {
  Top10Badge,
  NewReleaseLayout,
  AwardWinnerLayout,
  RecommendationLayout,
} from "./CardVariantLayouts";
import CardPoster from "./CardPoster";
import CardBadges from "./CardBadges";
import CardHoverOverlay from "./CardHoverOverlay";
import { getLocalizedLink } from "@/lib/utils/i18n";

interface MovieCardVariantsProps {
  movie: HeroMedia;
  variant:
    | "standard"
    | "compact"
    | "top10"
    | "newRelease"
    | "awardWinner"
    | "recommendation";
  rank?: number;
  showBadge?: boolean;
  badgeType?: "trending" | "award" | "live" | "onair" | "calendar";
  matchPercentageProp?: number;
}

export function MovieCardVariants({
  movie,
  variant,
  rank,
  showBadge,
  badgeType,
  matchPercentageProp,
}: MovieCardVariantsProps) {
  const cardLogic = useCardLogic({ movie });

  const {
    isHovered,
    title,
    posterUrl,
    detailsUrl,
    matchScore,
    year,
    ageRating,
    ratingValue,
    formattedReleaseDate,
    calculatedMatchPercentage,
    handleNavigate,
    handleMoreInfoClick,
    handlePlayClick,
    handleAddToList,
    handleCardMouseEnter,
    handleCardMouseLeave,
    isInList,
  } = cardLogic;

  const finalMatchPercentage = matchPercentageProp ?? calculatedMatchPercentage;
  const isAdult = movie.adult === true;
  const localizedDetailsUrl = getLocalizedLink(detailsUrl);

  // Compact variant
  if (variant === "compact") {
    return (
      <LazyWrapper height={350}>
        <motion.div
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full w-full"
        >
          <Link
            to={localizedDetailsUrl}
            className="relative group cursor-pointer block"
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
          >
            <div className="relative aspect-[2/3] rounded-md shadow-lg bg-[var(--background-secondary)]">
              <img
                src={posterUrl}
                alt={title}
                className={`w-full h-full transition-all duration-300 object-cover ${
                  isAdult ? "blur-md" : "transition-transform duration-500"
                }`}
              />

              {isAdult && <div className="absolute inset-0 bg-black/60" />}

              {isAdult && (
                <div className="absolute top-2 right-2 z-30 bg-red-700/95 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded shadow-lg border border-red-500/50">
                  +18
                </div>
              )}

              {!isAdult && (
                <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded">
                  <span className="text-[var(--success)] text-xs font-bold">
                    {matchScore}%
                  </span>
                </div>
              )}

              <div
                className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-3 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                style={{ pointerEvents: isHovered ? "auto" : "none" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <button
                    className="flex-1 bg-white text-black min-h-[48px] rounded font-semibold text-xs flex items-center justify-center gap-2 hover:bg-gray-200 touch-manipulation"
                    onClick={handlePlayClick}
                    aria-label={`Play ${title}`}
                  >
                    <span className="sr-only">Play</span>
                    <svg className="h-4 w-4 fill-black" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <button
                    className="min-w-[48px] min-h-[48px] bg-[var(--background-secondary)]/90 backdrop-blur text-white rounded hover:bg-[var(--background-tertiary)] border border-white/20 touch-manipulation flex items-center justify-center"
                    onClick={handleMoreInfoClick}
                    aria-label={`More information about ${title}`}
                  >
                    <span className="sr-only">More info</span>
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  </button>
                </div>
                <div className="text-white text-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[var(--success)] font-bold">
                      {matchScore}% Match
                    </span>
                    <span>{year}</span>
                    <span className="border border-white/40 px-1 rounded text-xs">
                      {ageRating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-[var(--text-primary)] font-medium text-center line-clamp-1 group-hover:text-white transition-colors">
              {title}
            </p>
          </Link>
        </motion.div>
      </LazyWrapper>
    );
  }

  // Top 10 variant
  if (variant === "top10" && rank) {
    return (
      <LazyWrapper height={350}>
        <motion.div
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full w-full"
        >
          <Link
            to={localizedDetailsUrl}
            className="relative group cursor-pointer block"
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
          >
            <Top10Badge rank={rank} />
            <div className="relative aspect-[2/3] rounded">
              <img
                src={posterUrl}
                alt={title}
                className="w-full h-full transition-transform duration-500 object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>
            </div>
          </Link>
        </motion.div>
      </LazyWrapper>
    );
  }

  // New Release variant
  if (variant === "newRelease") {
    return (
      <LazyWrapper height={350}>
        <motion.div
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full w-full"
        >
          <Link
            to={detailsUrl}
            className="group cursor-pointer block"
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
          >
            <NewReleaseLayout
              movie={movie}
              title={title}
              posterUrl={posterUrl}
              ratingValue={ratingValue ?? undefined}
              formattedReleaseDate={formattedReleaseDate ?? undefined}
              isHovered={isHovered}
            />
          </Link>
        </motion.div>
      </LazyWrapper>
    );
  }

  // Award Winner variant
  if (variant === "awardWinner") {
    return (
      <LazyWrapper height={350}>
        <motion.div
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full w-full"
        >
          <Link
            to={detailsUrl}
            className="group cursor-pointer relative block"
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
          >
            <AwardWinnerLayout
              movie={movie}
              title={title}
              posterUrl={posterUrl}
              ratingValue={ratingValue ?? undefined}
              isHovered={isHovered}
            />
          </Link>
        </motion.div>
      </LazyWrapper>
    );
  }

  // Recommendation variant
  if (variant === "recommendation") {
    return (
      <LazyWrapper height={350}>
        <motion.div
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full w-full"
        >
          <Link
            to={detailsUrl}
            className="group cursor-pointer block"
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
          >
            <RecommendationLayout
              movie={movie}
              title={title}
              posterUrl={posterUrl}
              matchPercentage={finalMatchPercentage ?? undefined}
              isHovered={isHovered}
            />
          </Link>
        </motion.div>
      </LazyWrapper>
    );
  }

  // Standard variant (default)
  return (
    <LazyWrapper height={350}>
      <motion.div
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="h-full w-full"
      >
        <div
          className="relative group cursor-pointer rounded-md shadow-lg bg-[var(--background-secondary)]"
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
          onClick={handleNavigate}
        >
          <CardPoster
            movie={movie}
            title={title}
            posterUrl={posterUrl}
            rank={rank}
            isAdult={isAdult}
          >
            <CardBadges
              showBadge={showBadge}
              badgeType={badgeType}
              showMatchScore={!isAdult}
              matchScore={matchScore}
              isAdult={isAdult}
            />
            <CardHoverOverlay
              title={title}
              matchScore={matchScore}
              year={year}
              ageRating={ageRating}
              isHovered={isHovered}
              onPlay={handlePlayClick}
              onMoreInfo={handleMoreInfoClick}
              onAddToList={handleAddToList}
              isInList={isInList}
            />
          </CardPoster>
        </div>
      </motion.div>
    </LazyWrapper>
  );
}

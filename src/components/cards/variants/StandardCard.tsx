import { memo, useCallback, useState } from "react";
import { motion } from "framer-motion";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import CardPoster from "@/components/shared/Card/CardPoster";
import CardBadges from "@/components/shared/Card/CardBadges";
import CardHoverOverlay from "@/components/shared/Card/CardHoverOverlay";
import { useMovieDerivedValues } from "../hooks/useCardDerivedValues";
import { useCardActions } from "../hooks/useCardActions";
import { useWatchlist } from "../hooks/useWatchlist";
import type { CardProps } from "../types";

type StandardCardProps = Pick<
  CardProps,
  "movie" | "rank" | "onClick" | "showBadge" | "badgeType" | "matchPercentageProp"
>;

const StandardCard = memo(({ movie, rank, onClick, showBadge = false, badgeType, matchPercentageProp }: StandardCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { title, posterUrl, matchScore, year, ageRating, detailsUrl } =
    useMovieDerivedValues(movie, matchPercentageProp);
  const { handleNavigate, handlePlayClick, handleMoreInfoClick } =
    useCardActions(detailsUrl, movie, onClick);
  const { isInList, toggleWatchlist } = useWatchlist(movie);

  // FIX: useCallback prevents new function references on every render,
  // which would cause CardHoverOverlay (memo'd) to re-render unnecessarily.
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  if (!movie) return null;
  const isAdult = movie.adult === true;

  return (
    <LazyWrapper height={350}>
      <motion.div transition={{ duration: 0.3, ease: "easeOut" }} className="h-full w-full">
        <div
          className="relative group cursor-pointer rounded-md shadow-lg bg-[var(--background-secondary)]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleNavigate}
        >
          {/* FIX: Pass posterUrl as prop — CardPoster no longer re-derives it */}
          <CardPoster movie={movie} title={title} posterUrl={posterUrl} rank={rank} isAdult={isAdult}>
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
              onAddToList={toggleWatchlist}
              isInList={isInList}
            />
          </CardPoster>
        </div>
      </motion.div>
    </LazyWrapper>
  );
});

StandardCard.displayName = "StandardCard";
export default StandardCard;

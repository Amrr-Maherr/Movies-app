import { memo } from "react";
import { motion } from "framer-motion";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { LandscapeLayout } from "@/components/shared/Card/CardVariantLayouts";
import { useMovieDerivedValues } from "../hooks/useCardDerivedValues";
import type { CardProps } from "../types";

type LandscapeCardProps = Pick<CardProps, "movie" | "mediaType" | "isHot" | "matchPercentageProp">;

const LandscapeCard = memo(({ movie, mediaType, isHot, matchPercentageProp }: LandscapeCardProps) => {
  const { title, backdropUrl, detailsUrl, tvShow, finalMatchPercentage } =
    useMovieDerivedValues(movie, matchPercentageProp);

  const isAdult = movie?.adult === true;

  return (
    <LazyWrapper height={250}>
      <motion.div transition={{ duration: 0.3, ease: "easeOut" }} className="h-full w-full">
        <LandscapeLayout
          title={title}
          imageUrl={backdropUrl}
          isHot={isHot}
          matchPercentage={finalMatchPercentage || 0}
          mediaType={mediaType || (tvShow ? "tv" : "movie")}
          detailsUrl={detailsUrl}
          isAdult={isAdult}
        />
      </motion.div>
    </LazyWrapper>
  );
});

LandscapeCard.displayName = "LandscapeCard";
export default LandscapeCard;

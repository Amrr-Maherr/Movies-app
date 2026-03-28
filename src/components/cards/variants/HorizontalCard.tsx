import { memo } from "react";
import { motion } from "framer-motion";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { HorizontalLayout } from "@/components/shared/Card/CardVariantLayouts";
import { useMovieDerivedValues } from "../hooks/useCardDerivedValues";
import type { CardProps } from "../types";

type HorizontalCardProps = Pick<CardProps, "movie" | "mediaType" | "isOriginal" | "plainLayout" | "matchPercentageProp">;

const HorizontalCard = memo(({ movie, mediaType, isOriginal, plainLayout, matchPercentageProp }: HorizontalCardProps) => {
  const { title, posterUrl, backdropUrl, detailsUrl, tvShow } =
    useMovieDerivedValues(movie, matchPercentageProp);

  return (
    <LazyWrapper height={plainLayout ? 100 : 250}>
      <motion.div transition={{ duration: 0.3, ease: "easeOut" }} className="h-full w-full">
        <HorizontalLayout
          title={title}
          imageUrl={plainLayout ? posterUrl : backdropUrl}
          overview={movie?.overview}
          mediaType={mediaType || (tvShow ? "tv" : "movie")}
          isOriginal={isOriginal}
          rating={movie?.vote_average}
          detailsUrl={detailsUrl}
          plainLayout={plainLayout}
        />
      </motion.div>
    </LazyWrapper>
  );
});

HorizontalCard.displayName = "HorizontalCard";
export default HorizontalCard;

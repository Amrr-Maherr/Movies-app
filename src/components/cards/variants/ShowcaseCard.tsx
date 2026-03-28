import { memo } from "react";
import { motion } from "framer-motion";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { ShowcaseLayout } from "@/components/shared/Card/CardVariantLayouts";
import { useMovieDerivedValues } from "../hooks/useCardDerivedValues";
import type { CardProps } from "../types";

type ShowcaseCardProps = Pick<CardProps, "movie" | "mediaType" | "isNew" | "isFeatured" | "aspectRatio" | "matchPercentageProp">;

const ShowcaseCard = memo(({ movie, mediaType, isNew, isFeatured, aspectRatio, matchPercentageProp }: ShowcaseCardProps) => {
  const { title, promoImageUrl, detailsUrl, tvShow } =
    useMovieDerivedValues(movie, matchPercentageProp);

  return (
    <LazyWrapper height={400}>
      <motion.div transition={{ duration: 0.3, ease: "easeOut" }} className="h-full w-full">
        <ShowcaseLayout
          title={title}
          imageUrl={promoImageUrl}
          detailsUrl={detailsUrl}
          mediaType={mediaType || (tvShow ? "tv" : "movie")}
          isNew={isNew}
          isFeatured={isFeatured}
          rating={movie?.vote_average}
          overview={movie?.overview}
          aspectRatio={aspectRatio}
        />
      </motion.div>
    </LazyWrapper>
  );
});

ShowcaseCard.displayName = "ShowcaseCard";
export default ShowcaseCard;

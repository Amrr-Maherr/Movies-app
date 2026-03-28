import { memo } from "react";
import { motion } from "framer-motion";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { PromoLayout } from "@/components/shared/Card/CardVariantLayouts";
import { useMovieDerivedValues } from "../hooks/useCardDerivedValues";
import type { CardProps } from "../types";

type PromoCardProps = Pick<CardProps, "movie" | "promoVariant" | "mediaType" | "matchPercentageProp">;

const PromoCard = memo(({ movie, promoVariant, mediaType, matchPercentageProp }: PromoCardProps) => {
  const { title, promoImageUrl, detailsUrl, year, tvShow } =
    useMovieDerivedValues(movie, matchPercentageProp);

  if (!movie) return null;

  return (
    <LazyWrapper height={500}>
      <motion.div transition={{ duration: 0.3, ease: "easeOut" }} className="h-full w-full">
        <PromoLayout
          movie={movie}
          title={title}
          imageUrl={promoImageUrl}
          detailsUrl={detailsUrl}
          year={year}
          mediaType={mediaType || (tvShow ? "tv" : "movie")}
          promoVariant={promoVariant}
        />
      </motion.div>
    </LazyWrapper>
  );
});

PromoCard.displayName = "PromoCard";
export default PromoCard;

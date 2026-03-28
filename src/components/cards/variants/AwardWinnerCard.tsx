import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { AwardWinnerLayout } from "@/components/shared/Card/CardVariantLayouts";
import { useMovieDerivedValues } from "../hooks/useCardDerivedValues";
import type { CardProps } from "../types";

type AwardWinnerCardProps = Pick<CardProps, "movie" | "matchPercentageProp">;

const AwardWinnerCard = memo(({ movie, matchPercentageProp }: AwardWinnerCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { title, posterUrl, ratingValue, detailsUrl } =
    useMovieDerivedValues(movie, matchPercentageProp);

  if (!movie) return null;

  return (
    <LazyWrapper height={350}>
      <motion.div transition={{ duration: 0.3, ease: "easeOut" }} className="h-full w-full">
        <Link
          to={detailsUrl}
          className="group cursor-pointer relative block"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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
});

AwardWinnerCard.displayName = "AwardWinnerCard";
export default AwardWinnerCard;

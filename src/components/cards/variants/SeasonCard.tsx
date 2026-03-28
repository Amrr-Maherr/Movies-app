import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { SeasonLayout } from "@/components/shared/Card/CardVariantLayouts";
import { useSeasonDerivedValues } from "../hooks/useCardDerivedValues";
import type { CardProps } from "../types";

type SeasonCardProps = Pick<CardProps, "season" | "tvShowId">;

const SeasonCard = memo(({ season, tvShowId }: SeasonCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { imageUrl, detailsUrl, airDate } = useSeasonDerivedValues(season, tvShowId);

  if (!season) return null;

  return (
    <LazyWrapper height={400}>
      <motion.div transition={{ duration: 0.3, ease: "easeOut" }} className="h-full w-full">
        <Link
          to={detailsUrl}
          className="block group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <SeasonLayout
            season={season}
            title={season.name}
            imageUrl={imageUrl}
            formattedAirDate={airDate}
            isHovered={isHovered}
          />
        </Link>
      </motion.div>
    </LazyWrapper>
  );
});

SeasonCard.displayName = "SeasonCard";
export default SeasonCard;

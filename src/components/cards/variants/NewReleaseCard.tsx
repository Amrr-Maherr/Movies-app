import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { NewReleaseLayout } from "@/components/shared/Card/CardVariantLayouts";
import { useMovieDerivedValues } from "../hooks/useCardDerivedValues";
import type { CardProps } from "../types";

type NewReleaseCardProps = Pick<CardProps, "movie" | "matchPercentageProp">;

const NewReleaseCard = memo(({ movie, matchPercentageProp }: NewReleaseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { title, posterUrl, ratingValue, formattedReleaseDate, detailsUrl } =
    useMovieDerivedValues(movie, matchPercentageProp);

  if (!movie) return null;

  return (
    <LazyWrapper height={350}>
      <motion.div transition={{ duration: 0.3, ease: "easeOut" }} className="h-full w-full">
        <Link
          to={detailsUrl}
          className="group cursor-pointer block"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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
});

NewReleaseCard.displayName = "NewReleaseCard";
export default NewReleaseCard;

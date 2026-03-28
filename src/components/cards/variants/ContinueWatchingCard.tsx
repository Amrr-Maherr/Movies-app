import { memo } from "react";
import { motion } from "framer-motion";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { ContinueWatchingLayout } from "@/components/shared/Card/CardVariantLayouts";
import { useMovieDerivedValues } from "../hooks/useCardDerivedValues";
import type { CardProps } from "../types";

type ContinueWatchingCardProps = Pick<CardProps, "movie" | "progress">;

const ContinueWatchingCard = memo(({ movie, progress = 0 }: ContinueWatchingCardProps) => {
  const { title, backdropUrl } = useMovieDerivedValues(movie);

  return (
    <LazyWrapper height={200}>
      <motion.div transition={{ duration: 0.3, ease: "easeOut" }} className="h-full w-full">
        <ContinueWatchingLayout title={title} imageUrl={backdropUrl} progress={progress} />
      </motion.div>
    </LazyWrapper>
  );
});

ContinueWatchingCard.displayName = "ContinueWatchingCard";
export default ContinueWatchingCard;

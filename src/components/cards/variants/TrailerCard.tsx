import { memo, useState, useMemo } from "react";
import { motion } from "framer-motion";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { TrailerLayout } from "@/components/shared/Card/CardVariantLayouts";
import type { CardProps } from "../types";

type TrailerCardProps = Pick<CardProps, "trailer" | "onClick">;

const TrailerCard = memo(({ trailer, onClick }: TrailerCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const thumbnailUrl = useMemo(
    () =>
      trailer?.videoKey
        ? `https://img.youtube.com/vi/${trailer.videoKey}/hqdefault.jpg`
        : "",
    [trailer],
  );

  if (!trailer) return null;

  return (
    <LazyWrapper height={250}>
      <motion.div transition={{ duration: 0.3, ease: "easeOut" }} className="h-full w-full">
        <div
          className="group relative cursor-pointer"
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <TrailerLayout
            title={trailer.name}
            thumbnailUrl={thumbnailUrl}
            type={trailer.type}
            imageLoaded={imageLoaded}
            onImageLoad={() => setImageLoaded(true)}
          />
        </div>
      </motion.div>
    </LazyWrapper>
  );
});

TrailerCard.displayName = "TrailerCard";
export default TrailerCard;

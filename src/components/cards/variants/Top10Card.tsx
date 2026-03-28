import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import OptimizedImage from "@/components/ui/OptimizedImage";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { Top10Badge } from "@/components/shared/Card/CardVariantLayouts";
import { useMovieDerivedValues } from "../hooks/useCardDerivedValues";
import type { CardProps } from "../types";

type Top10CardProps = Pick<CardProps, "movie" | "rank">;

const Top10Card = memo(({ movie, rank }: Top10CardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { title, posterUrl, detailsUrl } = useMovieDerivedValues(movie);

  if (!movie || !rank) return null;

  return (
    <LazyWrapper height={350}>
      <motion.div transition={{ duration: 0.3, ease: "easeOut" }} className="h-full w-full">
        <Link
          to={detailsUrl}
          className="relative group cursor-pointer block"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Top10Badge rank={rank} />
          <div className="relative aspect-[2/3] rounded">
            <OptimizedImage
              src={posterUrl}
              alt={title}
              className="w-full h-full transition-transform duration-500"
              objectFit="cover"
            />
            <div className={`absolute inset-0 transition-colors duration-300 ${isHovered ? "bg-black/40" : "bg-black/0"}`} />
          </div>
        </Link>
      </motion.div>
    </LazyWrapper>
  );
});

Top10Card.displayName = "Top10Card";
export default Top10Card;

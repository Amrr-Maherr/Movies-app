/**
 * Special Card Variants
 * Handles special movie card layouts like showcase, horizontal, etc.
 */

import { motion } from "framer-motion";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import type { HeroMedia } from "@/types";
import { useCardLogic } from "./useCardLogic";
import {
  ContinueWatchingLayout,
  ShowcaseLayout,
  HorizontalLayout,
  LandscapeLayout,
  PromoLayout,
} from "./CardVariantLayouts";

interface SpecialCardVariantsProps {
  movie: HeroMedia;
  variant:
    | "continueWatching"
    | "showcase"
    | "horizontal"
    | "landscape"
    | "promo";
  progress?: number;
  mediaType?: "movie" | "tv";
  isNew?: boolean;
  isFeatured?: boolean;
  isOriginal?: boolean;
  isHot?: boolean;
  matchPercentageProp?: number;
  plainLayout?: boolean;
  aspectRatio?: string;
  promoVariant?: "left" | "right" | "center";
}

export function SpecialCardVariants({
  movie,
  variant,
  progress,
  mediaType,
  isNew,
  isFeatured,
  isOriginal,
  isHot,
  matchPercentageProp,
  plainLayout,
  aspectRatio,
  promoVariant,
}: SpecialCardVariantsProps) {
  const cardLogic = useCardLogic({ movie });

  const {
    title,
    tvShow,
    backdropUrl,
    promoImageUrl,
    detailsUrl,
    year,
    calculatedMatchPercentage,
  } = cardLogic;

  const finalMatchPercentage = matchPercentageProp ?? calculatedMatchPercentage;

  // Continue Watching
  if (variant === "continueWatching") {
    return (
      <LazyWrapper height={200}>
        <motion.div
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full w-full"
        >
          <ContinueWatchingLayout
            title={title}
            imageUrl={backdropUrl}
            progress={progress || 0}
          />
        </motion.div>
      </LazyWrapper>
    );
  }

  // Showcase
  if (variant === "showcase") {
    return (
      <LazyWrapper height={400}>
        <motion.div
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full w-full"
        >
          <ShowcaseLayout
            title={title}
            imageUrl={promoImageUrl}
            detailsUrl={detailsUrl}
            mediaType={mediaType || (tvShow ? "tv" : "movie")}
            isNew={isNew}
            isFeatured={isFeatured}
            rating={movie.vote_average}
            overview={movie.overview}
            aspectRatio={aspectRatio}
          />
        </motion.div>
      </LazyWrapper>
    );
  }

  // Horizontal
  if (variant === "horizontal") {
    return (
      <LazyWrapper height={plainLayout ? 100 : 250}>
        <motion.div
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full w-full"
        >
          <HorizontalLayout
            title={title}
            imageUrl={plainLayout ? cardLogic.posterUrl : backdropUrl}
            overview={movie.overview}
            mediaType={mediaType || (tvShow ? "tv" : "movie")}
            isOriginal={isOriginal}
            rating={movie.vote_average}
            detailsUrl={detailsUrl}
            plainLayout={plainLayout}
          />
        </motion.div>
      </LazyWrapper>
    );
  }

  // Landscape
  if (variant === "landscape") {
    const isAdult = movie.adult === true;

    return (
      <LazyWrapper height={250}>
        <motion.div
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full w-full"
        >
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
  }

  // Promo
  if (variant === "promo") {
    return (
      <LazyWrapper height={500}>
        <motion.div
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full w-full"
        >
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
  }

  return null;
}

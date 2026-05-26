/**
 * Content Card Variants
 * Handles non-movie content like episodes, seasons, people, reviews, trailers
 */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import type { Episode, Season } from "@/types";
import { useCardLogic } from "./useCardLogic";
import {
  EpisodeLayout,
  SeasonLayout,
  PersonLayout,
  ReviewLayout,
  TrailerLayout,
} from "./CardVariantLayouts";
import { getLocalizedLink } from "@/lib/utils/i18n";

interface ContentCardVariantsProps {
  variant: "episode" | "season" | "person" | "review" | "trailer";
  episode?: Episode;
  season?: Season;
  person?: {
    id: number;
    name: string;
    profileImage: string | null;
    role: string;
  };
  review?: {
    author: string;
    rating?: number | null;
    content: string;
    date: string;
  };
  trailer?: { videoKey: string; name: string; type?: string };
  onClick?: () => void;
  tvShowId?: number;
  seasonNumber?: number;
}

export function ContentCardVariants({
  variant,
  episode,
  season,
  person,
  review,
  trailer,
  onClick,
  tvShowId,
  seasonNumber,
}: ContentCardVariantsProps) {
  const cardLogic = useCardLogic({
    episode,
    season,
    person,
    review,
    trailer,
    onClick,
    tvShowId,
    seasonNumber,
  });

  const {
    isHovered,
    trailerImageLoaded,
    title,
    episodeImageUrl,
    episodeLink,
    episodeAirDate,
    episodeRuntime,
    personImageUrl,
    personDetailsUrl,
    reviewDate,
    reviewRating,
    truncatedReview,
    seasonImageUrl,
    seasonDetailsUrl,
    seasonAirDate,
    trailerThumbUrl,
    handleNavigate,
    handleCardMouseEnter,
    handleCardMouseLeave,
    setTrailerImageLoaded,
  } = cardLogic;

  const localizedEpisodeLink = getLocalizedLink(episodeLink);
  const localizedSeasonDetailsUrl = getLocalizedLink(seasonDetailsUrl);
  const localizedPersonDetailsUrl = getLocalizedLink(personDetailsUrl);

  // Episode variant
  if (variant === "episode" && episode) {
    return (
      <LazyWrapper height={250}>
        <motion.div
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full w-full"
        >
          <Link
            to={localizedEpisodeLink}
            className="block group"
            onClick={onClick ? handleNavigate : undefined}
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
          >
            <EpisodeLayout
              episode={episode}
              title={episode.name}
              imageUrl={episodeImageUrl}
              formattedRuntime={episodeRuntime}
              formattedAirDate={episodeAirDate}
              isHovered={isHovered}
            />
          </Link>
        </motion.div>
      </LazyWrapper>
    );
  }

  // Season variant
  if (variant === "season" && season) {
    return (
      <LazyWrapper height={400}>
        <motion.div
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full w-full"
        >
          <Link
            to={seasonDetailsUrl}
            className="block group"
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
          >
            <SeasonLayout
              season={season}
              title={season.name}
              imageUrl={seasonImageUrl}
              formattedAirDate={seasonAirDate}
              isHovered={isHovered}
            />
          </Link>
        </motion.div>
      </LazyWrapper>
    );
  }

  // Person variant
  if (variant === "person" && person) {
    return (
      <LazyWrapper height={350}>
        <motion.div
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full w-full"
        >
          <Link
            to={localizedPersonDetailsUrl}
            className="group relative cursor-pointer block"
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
          >
            <PersonLayout
              name={person.name}
              imageUrl={personImageUrl}
              role={person.role}
              isHovered={isHovered}
            />
          </Link>
        </motion.div>
      </LazyWrapper>
    );
  }

  // Review variant
  if (variant === "review" && review) {
    return (
      <LazyWrapper height={150}>
        <motion.div
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full w-full"
        >
          <div className="h-full">
            <ReviewLayout
              author={review.author}
              formattedDate={reviewDate}
              ratingStars={reviewRating}
              truncatedContent={truncatedReview}
              content={review.content}
            />
          </div>
        </motion.div>
      </LazyWrapper>
    );
  }

  // Trailer variant
  if (variant === "trailer" && trailer) {
    return (
      <LazyWrapper height={250}>
        <motion.div
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full w-full"
        >
          <div
            className="group relative cursor-pointer"
            onClick={onClick}
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
          >
            <TrailerLayout
              title={trailer.name}
              thumbnailUrl={trailerThumbUrl}
              type={trailer.type}
              imageLoaded={trailerImageLoaded}
              onImageLoad={() => setTrailerImageLoaded(true)}
            />
          </div>
        </motion.div>
      </LazyWrapper>
    );
  }

  return null;
}

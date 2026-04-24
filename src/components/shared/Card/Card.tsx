/**
 * Card Component
 *
 * A unified card component that handles different content types and variants.
 * Routes to appropriate sub-components based on variant and content type.
 */

import { memo } from "react";
import type { HeroMedia, Episode, Season } from "@/types";
import { MovieCardVariants } from "./MovieCardVariants";
import { SpecialCardVariants } from "./SpecialCardVariants";
import { ContentCardVariants } from "./ContentCardVariants";

export interface CardProps {
  movie?: HeroMedia;
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
  variant?:
    | "standard"
    | "compact"
    | "top10"
    | "newRelease"
    | "awardWinner"
    | "recommendation"
    | "episode"
    | "person"
    | "review"
    | "season"
    | "trailer"
    | "promo"
    | "continueWatching"
    | "showcase"
    | "horizontal"
    | "landscape";
  rank?: number;
  promoVariant?: "left" | "right" | "center";
  mediaType?: "movie" | "tv";
  progress?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isOriginal?: boolean;
  isHot?: boolean;
  matchPercentageProp?: number;
  plainLayout?: boolean;
  aspectRatio?: string;
  onClick?: () => void;
  showBadge?: boolean;
  badgeType?: "trending" | "award" | "live" | "onair" | "calendar";
  tvShowId?: number;
  seasonNumber?: number;
}

const Card = memo(
  ({
    movie,
    episode,
    season,
    person,
    review,
    trailer,
    variant = "standard",
    rank,
    onClick,
    showBadge = false,
    badgeType,
    tvShowId,
    seasonNumber,
    promoVariant,
    mediaType,
    progress,
    isNew,
    isFeatured,
    isOriginal,
    isHot,
    matchPercentageProp,
    plainLayout,
    aspectRatio,
  }: CardProps) => {
    // Movie-based variants
    if (
      movie &&
      [
        "standard",
        "compact",
        "top10",
        "newRelease",
        "awardWinner",
        "recommendation",
      ].includes(variant)
    ) {
      return (
        <MovieCardVariants
          movie={movie}
          variant={
            variant as
              | "standard"
              | "compact"
              | "top10"
              | "newRelease"
              | "awardWinner"
              | "recommendation"
          }
          rank={rank}
          showBadge={showBadge}
          badgeType={badgeType}
          matchPercentageProp={matchPercentageProp}
        />
      );
    }

    // Special movie variants
    if (
      movie &&
      [
        "continueWatching",
        "showcase",
        "horizontal",
        "landscape",
        "promo",
      ].includes(variant)
    ) {
      return (
        <SpecialCardVariants
          movie={movie}
          variant={
            variant as
              | "continueWatching"
              | "showcase"
              | "horizontal"
              | "landscape"
              | "promo"
          }
          progress={progress}
          mediaType={mediaType}
          isNew={isNew}
          isFeatured={isFeatured}
          isOriginal={isOriginal}
          isHot={isHot}
          matchPercentageProp={matchPercentageProp}
          plainLayout={plainLayout}
          aspectRatio={aspectRatio}
          promoVariant={promoVariant}
        />
      );
    }

    // Content variants (episodes, seasons, people, reviews, trailers)
    if (
      ["episode", "season", "person", "review", "trailer"].includes(variant)
    ) {
      return (
        <ContentCardVariants
          variant={
            variant as "episode" | "season" | "person" | "review" | "trailer"
          }
          episode={episode}
          season={season}
          person={person}
          review={review}
          trailer={trailer}
          onClick={onClick}
          tvShowId={tvShowId}
          seasonNumber={seasonNumber}
        />
      );
    }

    // Fallback for invalid combinations
    return null;
  },
);

export default Card;

import type { HeroMedia, Episode, Season } from "@/types";

export type CardVariant =
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

export type BadgeType = "trending" | "award" | "live" | "onair" | "calendar";

export interface PersonData {
  id: number;
  name: string;
  profileImage: string | null;
  role: string;
}

export interface ReviewData {
  author: string;
  rating?: number | null;
  content: string;
  date: string;
}

export interface TrailerData {
  videoKey: string;
  name: string;
  type?: string;
}

export interface CardProps {
  movie?: HeroMedia;
  episode?: Episode;
  season?: Season;
  person?: PersonData;
  review?: ReviewData;
  trailer?: TrailerData;
  variant?: CardVariant;
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
  badgeType?: BadgeType;
  tvShowId?: number;
  seasonNumber?: number;
}

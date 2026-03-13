/**
 * Card Component Exports
 * 
 * Central export file for Card and its sub-components.
 * Import from this file for cleaner imports throughout the project.
 */

// Main Card component
export { default as Card } from "./Card";
export type { CardProps } from "./Card";

// Sub-components
export { default as CardPoster } from "./CardPoster";
export type { CardPosterProps } from "./CardPoster";

export { default as CardHoverOverlay } from "./CardHoverOverlay";
export type { CardHoverOverlayProps } from "./CardHoverOverlay";

export { default as CardBadges } from "./CardBadges";
export type { CardBadgesProps, BadgeType } from "./CardBadges";

export { default as CardMetadata } from "./CardMetadata";
export type { CardMetadataProps } from "./CardMetadata";

// Variant layouts
export {
  Top10Badge,
  NewReleaseLayout,
  AwardWinnerLayout,
  RecommendationLayout,
  EpisodeLayout,
  PersonLayout,
  ReviewLayout,
  SeasonLayout,
  TrailerLayout,
  PromoLayout,
  ContinueWatchingLayout,
  ShowcaseLayout,
  HorizontalLayout,
  LandscapeLayout,
} from "./CardVariantLayouts";

export type {
  Top10BadgeProps,
  NewReleaseLayoutProps,
  AwardWinnerLayoutProps,
  RecommendationLayoutProps,
  EpisodeLayoutProps,
  PersonLayoutProps,
  ReviewLayoutProps,
  SeasonLayoutProps,
  TrailerLayoutProps,
  PromoLayoutProps,
  ContinueWatchingLayoutProps,
  ShowcaseLayoutProps,
  HorizontalLayoutProps,
  LandscapeLayoutProps,
} from "./CardVariantLayouts";

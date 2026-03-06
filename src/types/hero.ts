/**
 * Hero Section TypeScript types and interfaces
 * Used for Hero component props and configuration
 */

import type { Movie, TvShow } from "./movies";

/**
 * Movie with media_type for person credits
 */
export interface MovieWithMediaType extends Movie {
  media_type?: "movie" | "tv";
}

/**
 * TV Show with media_type for person credits
 */
export interface TvShowWithMediaType extends TvShow {
  media_type?: "movie" | "tv";
}

/**
 * Union type for media that can be displayed in hero
 * Extended to support media_type for person credits
 */
export type HeroMedia = Movie | TvShow | MovieWithMediaType | TvShowWithMediaType;

/**
 * Props for HeroBackground component
 */
export interface HeroBackgroundProps {
  movie: HeroMedia;
}

/**
 * Props for HeroContent component
 */
export interface HeroContentProps {
  movie: HeroMedia;
}

/**
 * Props for HeroSlide component
 */
export interface HeroSlideProps {
  movie: HeroMedia;
}

/**
 * Props for HeroSection main component
 */
export interface HeroSectionProps {
  data?: HeroMedia[];
  isLoading: boolean;
  error: unknown;
  onRetry: () => void;
}

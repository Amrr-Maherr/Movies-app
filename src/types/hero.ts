/**
 * Hero Section TypeScript types and interfaces
 * Used for Hero component props and configuration
 */

import type { Movie, TvShow } from "./movies";

/**
 * Union type for media that can be displayed in hero
 */
export type HeroMedia = Movie | TvShow;

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

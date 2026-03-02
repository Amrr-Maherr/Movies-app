/**
 * Hero Section TypeScript types and interfaces
 * Used for Hero component props and configuration
 */

import type { Movie } from "./movies";

/**
 * Props for HeroBackground component
 */
export interface HeroBackgroundProps {
  movie: Movie;
}

/**
 * Props for HeroContent component
 */
export interface HeroContentProps {
  movie: Movie;
}

/**
 * Props for HeroSlide component
 */
export interface HeroSlideProps {
  movie: Movie;
}

/**
 * Props for HeroSection main component
 */
export interface HeroSectionProps {
  // Currently no props needed, but reserved for future customization
  // Example: autoPlayInterval?: number;
  // Example: showMuteButton?: boolean;
}

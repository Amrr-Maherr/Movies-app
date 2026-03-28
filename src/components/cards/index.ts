// Main dispatcher — use this for all card rendering
export { default as Card } from "./Card";
export type { CardProps, CardVariant, BadgeType, PersonData, ReviewData, TrailerData } from "./types";

// Individual variant components (for direct use when variant is known at compile time)
export * from "./variants";

// Hooks (for custom card implementations)
export { useWatchlist } from "./hooks/useWatchlist";
export { useCardActions } from "./hooks/useCardActions";
export {
  useMovieDerivedValues,
  useEpisodeDerivedValues,
  useSeasonDerivedValues,
  usePersonDerivedValues,
} from "./hooks/useCardDerivedValues";

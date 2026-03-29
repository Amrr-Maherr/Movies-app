// Main dispatcher — use this for all card rendering
export { default as Card } from "./Card";
export type { CardProps, CardVariant, BadgeType, PersonData, ReviewData, TrailerData } from "./types";

// Hooks (for custom card implementations)
export { useWatchlist } from "./hooks/useWatchlist";
export { useCardActions } from "./hooks/useCardActions";
export {
  useMovieDerivedValues,
  useEpisodeDerivedValues,
  useSeasonDerivedValues,
  usePersonDerivedValues,
} from "./hooks/useCardDerivedValues";

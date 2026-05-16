import { DriveStep } from "driver.js";

export type TourId = 
  | "home" 
  | "movie-details" 
  | "tv-details" 
  | "search" 
  | "my-list" 
  | "player" 
  | "subscription-warning" 
  | "movies" 
  | "tv-shows";

export interface TourConfig {
    id: TourId;
    steps: DriveStep[];
}

export interface OnboardingState {
    completedTours: TourId[];
    isDismissed: boolean;
    lastRun: Record<TourId, number>;
}

export interface OnboardingContextValue {
    startTour: (tourId: TourId, force?: boolean) => void;
    completeTour: (tourId: TourId) => void;
    resetOnboarding: () => void;
    isTourCompleted: (tourId: TourId) => boolean;
}

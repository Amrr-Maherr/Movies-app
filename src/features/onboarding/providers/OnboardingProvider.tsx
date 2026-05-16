import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { driver, Driver } from "driver.js";
import "driver.js/dist/driver.css";
import { OnboardingContextValue, OnboardingState, TourId } from "../types";
import { DRIVER_CONFIG, ONBOARDING_STORAGE_KEY } from "../constants";
import { TOURS } from "../config/tours";
import "../styles/onboarding.css";

const OnboardingContext = createContext<OnboardingContextValue | undefined>(undefined);

const initialState: OnboardingState = {
  completedTours: [],
  isDismissed: false,
  lastRun: {} as Record<TourId, number>,
};

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<OnboardingState>(() => {
    const saved = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialState;
  });

  const driverRef = useRef<Driver | null>(null);

  useEffect(() => {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const startTour = useCallback((tourId: TourId, force = false) => {
    if (!force && state.completedTours.includes(tourId)) return;
    
    const tourConfig = TOURS[tourId];
    if (!tourConfig) return;

    // Enhanced element detection with multiple retries for lazy-loaded content
    let retries = 0;
    const maxRetries = 5;
    const firstElement = tourConfig.steps[0]?.element;

    const attemptStart = () => {
        if (typeof firstElement === 'string' && document.querySelector(firstElement)) {
            runDriver(tourId, tourConfig);
        } else if (retries < maxRetries) {
            retries++;
            setTimeout(attemptStart, 1000);
        }
    };

    attemptStart();
  }, [state.completedTours]);

  const runDriver = (tourId: TourId, tourConfig: any) => {
    if (driverRef.current) {
        driverRef.current.destroy();
    }

    const driverObj = driver({
      ...DRIVER_CONFIG,
      onDestroyed: () => {
        driverRef.current = null;
      },
    });

    driverObj.setSteps(tourConfig.steps);
    driverObj.drive();
    driverRef.current = driverObj;

    // Remove aria-hidden from driver container to ensure screen readers can access it
    setTimeout(() => {
        const driverContainer = document.querySelector('.driver-popover');
        if (driverContainer) {
            driverContainer.removeAttribute('aria-hidden');
            // Focus the title for screen readers
            const title = driverContainer.querySelector('.driver-popover-title') as HTMLElement;
            if (title) title.focus();
        }
    }, 100);

    // Mark as completed if it's the first time
    if (!state.completedTours.includes(tourId)) {
        completeTour(tourId);
    }
  };

  const completeTour = useCallback((tourId: TourId) => {
    setState(prev => ({
      ...prev,
      completedTours: [...new Set([...prev.completedTours, tourId])],
      lastRun: { ...prev.lastRun, [tourId]: Date.now() },
    }));
  }, []);

  const resetOnboarding = useCallback(() => {
    setState(initialState);
  }, []);

  const isTourCompleted = useCallback((tourId: TourId) => {
    return state.completedTours.includes(tourId);
  }, [state.completedTours]);

  return (
    <OnboardingContext.Provider value={{ startTour, completeTour, resetOnboarding, isTourCompleted }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};

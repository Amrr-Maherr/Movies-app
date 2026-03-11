import { useEffect, useRef, useState, useCallback } from "react";

interface UseLazyLoadOptions {
  /**
   * Percentage of element visibility (0.0 to 1.0) before triggering
   * @default 0.01 (1% - triggers when even 1 pixel is visible)
   */
  threshold?: number;
  /**
   * Margin around the viewport to expand detection area
   * Use positive values to trigger earlier (e.g., "200px" triggers 200px before element enters)
   * @default "300px" (triggers 300px before element is visible)
   */
  rootMargin?: string;
  /**
   * If true, only triggers once when element first becomes visible
   * If false, toggles visibility as element enters/exits viewport
   * @default true
   */
  triggerOnce?: boolean;
  /**
   * Fallback timeout in milliseconds to force visibility if IntersectionObserver fails
   * Set to 0, false, or null to disable fallback
   * @default 2000 (2 seconds - gives enough time for layout to settle)
   */
  fallbackTimeout?: number | false | null;
  /**
   * Unique key to persist visibility state across navigation
   * Useful for sections that should stay loaded once viewed
   * @default undefined (no persistence)
   */
  persistenceKey?: string;
}

interface UseLazyLoadReturn<T extends HTMLElement = HTMLDivElement> {
  ref: React.RefObject<T | null>;
  isVisible: boolean;
  hasLoaded: boolean;
}

// Global map to track loaded sections across navigation
const loadedSections = new Set<string>();

/**
 * useLazyLoad Hook - Enhanced Version
 *
 * Lazily loads content when it enters the viewport using Intersection Observer API.
 * Includes multiple fallback mechanisms to ensure content always loads.
 *
 * Key improvements in this version:
 * - Delayed initial check with RAF to wait for layout
 * - Multiple fallback attempts
 * - Persistence across navigation
 * - Better handling of cached pages
 *
 * @param options - Configuration options for lazy loading
 * @returns Object containing ref, isVisible, and hasLoaded
 */
export function useLazyLoad<T extends HTMLElement = HTMLDivElement>(
  options: UseLazyLoadOptions = {},
): UseLazyLoadReturn<T> {
  const {
    threshold = 0.01,
    rootMargin = "300px",
    triggerOnce = true,
    fallbackTimeout = 2000,
    persistenceKey,
  } = options;

  const ref = useRef<T>(null);
  
  // Check persistence first
  const wasPersisted = persistenceKey ? loadedSections.has(persistenceKey) : false;
  
  const [isVisible, setIsVisible] = useState(wasPersisted);
  const [hasLoaded, setHasLoaded] = useState(wasPersisted);
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 3;

  // Cleanup function
  const cleanup = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  }, []);

  // Check if element is visible in viewport
  const checkVisibility = useCallback((element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const margin = Number(rootMargin) || 0;

    // Element is visible if any part is within viewport (with margin)
    const isInViewport =
      rect.bottom >= -margin &&
      rect.top <= viewportHeight + margin &&
      rect.right >= -margin &&
      rect.left <= viewportWidth + margin;

    // Also check if element has actual dimensions
    const hasDimensions = rect.width > 0 && rect.height > 0;

    return isInViewport && hasDimensions;
  }, [rootMargin]);

  useEffect(() => {
    // Skip if already loaded
    if (hasLoaded && triggerOnce) return;

    const element = ref.current;
    
    // Skip if no element
    if (!element) return;

    // Use RAF to wait for layout to settle
    rafIdRef.current = requestAnimationFrame(() => {
      // Double-check with another RAF for complex layouts
      rafIdRef.current = requestAnimationFrame(() => {
        const isInitiallyVisible = checkVisibility(element);

        if (isInitiallyVisible) {
          setIsVisible(true);
          setHasLoaded(true);
          if (persistenceKey) {
            loadedSections.add(persistenceKey);
          }
          cleanup();
          return;
        }

        // Set up fallback timeout with retry mechanism
        const useFallback = fallbackTimeout !== false && fallbackTimeout !== null && fallbackTimeout > 0;
        if (useFallback && !fallbackTimerRef.current && !hasLoaded) {
          fallbackTimerRef.current = setTimeout(() => {
            // Retry check before forcing
            retryCountRef.current += 1;
            const retryVisible = checkVisibility(element);
            
            if (retryVisible || retryCountRef.current >= MAX_RETRIES) {
              setIsVisible(true);
              setHasLoaded(true);
              if (persistenceKey) {
                loadedSections.add(persistenceKey);
              }
              cleanup();
            } else {
              // Schedule another fallback
              fallbackTimerRef.current = setTimeout(() => {
                setIsVisible(true);
                setHasLoaded(true);
                if (persistenceKey) {
                  loadedSections.add(persistenceKey);
                }
                cleanup();
              }, fallbackTimeout);
            }
          }, fallbackTimeout);
        }

        // Set up Intersection Observer
        observerRef.current = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              setHasLoaded(true);
              if (persistenceKey) {
                loadedSections.add(persistenceKey);
              }

              // Stop observing if triggerOnce
              if (triggerOnce && observerRef.current) {
                observerRef.current.unobserve(element);
                observerRef.current.disconnect();
                observerRef.current = null;
              }

              // Clear fallback timer
              if (fallbackTimerRef.current) {
                clearTimeout(fallbackTimerRef.current);
                fallbackTimerRef.current = null;
              }
            } else if (!triggerOnce) {
              setIsVisible(false);
            }
          },
          {
            threshold,
            rootMargin,
            root: null,
          },
        );

        // Start observing
        observerRef.current.observe(element);
      });
    });

    // Cleanup on unmount
    return () => {
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, rootMargin, triggerOnce, fallbackTimeout, hasLoaded, checkVisibility, cleanup, persistenceKey]);

  // Persist when visibility changes
  useEffect(() => {
    if (isVisible && persistenceKey) {
      loadedSections.add(persistenceKey);
    }
  }, [isVisible, persistenceKey]);

  return { ref, isVisible, hasLoaded };
}

export default useLazyLoad;

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
   * @default "200px" (triggers 200px before element is visible)
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
   * Useful for elements that might not be detected (e.g., height: 0, display: none initially)
   * Set to 0, false, or null to disable fallback
   * @default 1000 (1 second)
   */
  fallbackTimeout?: number | false | null;
}

interface UseLazyLoadReturn<T extends HTMLElement = HTMLDivElement> {
  ref: React.RefObject<T | null>;
  isVisible: boolean;
  hasLoaded: boolean;
}

/**
 * useLazyLoad Hook
 * 
 * Lazily loads content when it enters the viewport using Intersection Observer API.
 * Includes a fallback timeout to ensure content loads even if the observer fails.
 * 
 * Key improvements:
 * - Checks initial visibility on mount
 * - Fallback timeout ensures content always loads
 * - Handles elements with 0 dimensions
 * - Proper cleanup on unmount
 * 
 * @param options - Configuration options for lazy loading
 * @returns Object containing ref, isVisible, and hasLoaded
 * 
 * @example
 * // Basic usage
 * const { ref, isVisible, hasLoaded } = useLazyLoad();
 * 
 * return (
 *   <div ref={ref}>
 *     {isVisible && <HeavyComponent />}
 *   </div>
 * );
 * 
 * @example
 * // With custom options
 * const { ref, isVisible } = useLazyLoad<HTMLDivElement>({
 *   threshold: 0.1,
 *   rootMargin: "100px",
 *   triggerOnce: true,
 *   fallbackTimeout: 2000
 * });
 */
export function useLazyLoad<T extends HTMLElement = HTMLDivElement>(
  options: UseLazyLoadOptions = {},
): UseLazyLoadReturn<T> {
  const {
    threshold = 0.01,
    rootMargin = "200px",
    triggerOnce = true,
    fallbackTimeout = 1000,
  } = options;

  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasCheckedInitialRef = useRef(false);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const element = ref.current;
    
    // Skip if no element
    if (!element) return;

    // Skip if already loaded and triggerOnce is true
    if (hasLoaded && triggerOnce) return;

    // Check if element is already visible on mount
    // This handles the case where element is already in viewport
    if (!hasCheckedInitialRef.current) {
      hasCheckedInitialRef.current = true;
      
      const rect = element.getBoundingClientRect();
      const isInitiallyVisible =
        rect.top >= -Number(rootMargin) &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + Number(rootMargin) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth);

      if (isInitiallyVisible) {
        setIsVisible(true);
        setHasLoaded(true);
        return;
      }
    }

    // Set up fallback timeout - ensures content loads even if observer fails
    const useFallback = fallbackTimeout !== false && fallbackTimeout !== null && fallbackTimeout > 0;
    if (useFallback && !fallbackTimerRef.current && !hasLoaded) {
      fallbackTimerRef.current = setTimeout(() => {
        setIsVisible(true);
        setHasLoaded(true);
        cleanup();
      }, fallbackTimeout);
    }

    // Set up Intersection Observer
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasLoaded(true);
          
          // Stop observing if triggerOnce
          if (triggerOnce && observerRef.current) {
            observerRef.current.unobserve(element);
            observerRef.current.disconnect();
            observerRef.current = null;
          }
          
          // Clear fallback timer since we've detected visibility
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
        root: null, // Use viewport as root
      },
    );

    // Start observing
    observerRef.current.observe(element);

    // Cleanup on unmount or dependency change
    return () => {
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, rootMargin, triggerOnce, fallbackTimeout, hasLoaded]);

  // Reset hasLoaded when isVisible becomes true
  useEffect(() => {
    if (isVisible) {
      setHasLoaded(true);
    }
  }, [isVisible]);

  return { ref, isVisible, hasLoaded };
}

export default useLazyLoad;

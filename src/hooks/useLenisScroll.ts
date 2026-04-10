import { useLenis } from "../providers/LenisProvider";

/**
 * Hook to scroll to a specific position using Lenis smooth scroll
 * @returns scrollTo function - Scroll to a target position or element
 *
 * Usage:
 * const scrollTo = useScrollTo();
 * scrollTo(500); // Scroll to 500px from top
 * scrollTo('#section-id'); // Scroll to element with ID
 * scrollTo(elementRef.current, { offset: -100 }); // Scroll to element with offset
 */
export function useScrollTo() {
  const lenis = useLenis();

  const scrollTo = (
    target: number | string | HTMLElement,
    options?: {
      /** Additional offset in pixels (can be negative for upward offset) */
      offset?: number;
      /** Scroll immediately without animation */
      immediate?: boolean;
      /** Duration of scroll animation in seconds (overrides provider default) */
      duration?: number;
    }
  ) => {
    if (!lenis) {
      console.warn("Lenis instance not found. Make sure component is wrapped with LenisProvider.");
      return;
    }

    // Convert target to the format Lenis expects
    // Lenis accepts: number (pixels), string (CSS selector), or HTMLElement
    lenis.scrollTo(target, {
      offset: options?.offset ?? 0,
      immediate: options?.immediate ?? false,
      lock: false, // Don't lock scroll during animation
    });
  };

  return scrollTo;
}

/**
 * Hook to get current scroll position and progress
 * @returns Object with scroll position utilities
 *
 * Usage:
 * const { getScrollPosition, getScrollProgress } = useScrollPosition();
 * const position = getScrollPosition(); // Current scroll position in pixels
 * const progress = getScrollProgress(); // Scroll progress from 0 to 1
 */
export function useScrollPosition() {
  const lenis = useLenis();

  const getScrollPosition = () => {
    if (!lenis) {
      console.warn("Lenis instance not found");
      return 0;
    }
    return lenis.scroll; // Current scroll position in pixels
  };

  const getScrollProgress = () => {
    if (!lenis) {
      console.warn("Lenis instance not found");
      return 0;
    }
    return lenis.progress; // Scroll progress from 0 to 1
  };

  return { getScrollPosition, getScrollProgress };
}

/**
 * Hook to control Lenis scroll (stop/start)
 * Useful for modals, drawers, or preventing scroll during animations
 *
 * Usage:
 * const { stopScroll, startScroll, isStopped } = useScrollControl();
 * stopScroll(); // Disable scrolling
 * startScroll(); // Re-enable scrolling
 */
export function useScrollControl() {
  const lenis = useLenis();

  const stopScroll = () => {
    lenis?.stop();
  };

  const startScroll = () => {
    lenis?.start();
  };

  const toggleScroll = () => {
    if (!lenis) return;
    if (lenis.isStopped) {
      lenis.start();
    } else {
      lenis.stop();
    }
  };

  return {
    stopScroll,
    startScroll,
    toggleScroll,
    isStopped: lenis?.isStopped ?? false,
  };
}

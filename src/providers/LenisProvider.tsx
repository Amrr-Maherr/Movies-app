import { useEffect, useRef, ReactNode, createContext, useContext } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Context to share the Lenis instance across the application.
 * This allows components to access the scroll instance for advanced control
 * like stopping/starting scroll, getting scroll position, etc.
 */
const LenisContext = createContext<Lenis | null>(null);

/**
 * Props for the LenisProvider component
 * @property children - React children to be wrapped by the provider
 * @property options - Configuration options for Lenis smooth scrolling
 */
interface LenisProviderProps {
  children: ReactNode;
  options?: {
    /** Duration of the scroll animation in seconds (default: 1.2) */
    duration?: number;
    /** Easing function for scroll animation (default: exponential ease-out) */
    easing?: (t: number) => number;
    /** Enable smooth scrolling on wheel events (default: true) */
    smoothWheel?: boolean;
    /** Multiplier for wheel scroll speed (default: 1) */
    wheelMultiplier?: number;
    /** Multiplier for touch scroll speed on mobile (default: 2) */
    touchMultiplier?: number;
    /** Enable infinite scrolling loop (default: false) */
    infinite?: boolean;
  };
}

/**
 * LenisProvider - A React context provider for Lenis smooth scrolling
 *
 * This component initializes and manages a Lenis smooth scroll instance.
 * It uses requestAnimationFrame to continuously update the scroll position,
 * creating buttery-smooth scrolling throughout the application.
 *
 * Usage:
 * <LenisProvider options={{ duration: 1.2 }}>
 *   {children}
 * </LenisProvider>
 */
export function LenisProvider({ children, options }: LenisProviderProps) {
  // Ref to store the Lenis instance across re-renders
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with configuration options
    // Lenis intercepts native scroll events and applies smooth interpolation
    const lenis = new Lenis({
      // How long the scroll animation takes (higher = smoother but slower)
      duration: options?.duration ?? 3,

      // Easing function: controls the acceleration curve of the scroll
      // This creates a deceleration effect (fast start, slow end)
      easing:
        options?.easing ??
        ((t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),

      // Enable smooth scrolling on mouse wheel events
      smoothWheel: options?.smoothWheel ?? true,

      // How much to multiply wheel delta (higher = faster scroll)
      wheelMultiplier: options?.wheelMultiplier ?? 4.5,

      // Touch scroll is naturally smoother, so we multiply it more
      touchMultiplier: options?.touchMultiplier ?? 2,

      // Infinite scroll creates a looping effect (useful for carousels)
      infinite: options?.infinite ?? false,
    });

    // Store instance in ref for later access
    lenisRef.current = lenis;

    /**
     * Request Animation Frame loop
     * This is the heart of Lenis - it continuously updates the scroll position
     * on every frame, creating smooth interpolation between scroll events.
     * Without this, scroll would jump instantly without any animation.
     */
    function raf(time: number) {
      lenis.raf(time); // Update Lenis scroll position
      requestAnimationFrame(raf); // Schedule next frame
    }

    // Start the animation loop
    requestAnimationFrame(raf);

    // Cleanup: destroy Lenis instance on component unmount
    // This prevents memory leaks and stops the animation loop
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [options]); // Re-run effect if options change

  // Provide the Lenis instance to all child components via context
  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}

/**
 * Hook to access the Lenis scroll instance from any component
 *
 * This allows components to:
 * - Programmatically scroll to positions (lenis.scrollTo())
 * - Get current scroll position (lenis.scroll)
 * - Stop/start scrolling (lenis.stop() / lenis.start())
 * - Subscribe to scroll events (lenis.on('scroll', callback))
 *
 * Usage:
 * const lenis = useLenis();
 * lenis?.scrollTo(500); // Scroll to 500px
 *
 * @returns The Lenis instance or null if not available
 */
export function useLenis() {
  return useContext(LenisContext);
}

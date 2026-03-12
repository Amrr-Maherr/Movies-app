import React, { useEffect, useRef, useState, memo, useCallback } from "react";

interface LazyWrapperProps {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
  height?: string | number;
}

/**
 * FIX #9: Optimized LazyWrapper component
 * 
 * Improvements:
 * - Removed unnecessary temp element creation
 * - Added memo to prevent re-renders
 * - Uses unobserve() instead of disconnect() for better performance
 * - Added proper cleanup
 */
const LazyWrapper = memo(({ children, placeholder = null, height }: LazyWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // FIX: Memoized callback for intersection observer
  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    // Check if already visible on mount (in case user scrolled)
    const rect = element.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (alreadyVisible) {
      setIsVisible(true);
      return;
    }

    // FIX: Use unobserve instead of disconnect for better performance
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0,
      rootMargin: "500px"
    });

    observer.observe(element);

    return () => {
      // FIX: Proper cleanup - unobserve specific element
      observer.unobserve(element);
    };
  }, [handleIntersection]);

  return (
    <div ref={wrapperRef}>
      {isVisible ? children : placeholder || (
        <div 
          style={{ 
            height: typeof height === "number" ? `${height}px` : height || "200px",
            background: "#000" 
          }} 
          aria-hidden="true"
        />
      )}
    </div>
  );
});

// Add displayName for better debugging in React DevTools
LazyWrapper.displayName = "LazyWrapper";

export default LazyWrapper;

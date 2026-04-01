import React, { memo, Suspense, useMemo, useEffect, useState } from "react";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { OptimizedSectionWrapperProps } from "./OptimizedSectionWrapper.types";

/**
 * OptimizedSectionWrapper
 *
 * A reusable, high-performance wrapper that combines Suspense, Lazy Loading,
 * and intelligent conditional rendering for data-driven UI sections.
 *
 * Designed to minimize layout shifts and redundant re-renders.
 */
function OptimizedSectionWrapper<T>({
  data,
  isLoading,
  fallback,
  children,
  height = 300,
  isEmptyFallback = null,
  delayRender = 0,
  title,
}: OptimizedSectionWrapperProps<T>) {
  const [shouldRender, setShouldRender] = useState(delayRender === 0);

  // Handle optional render delay
  useEffect(() => {
    if (delayRender > 0) {
      const timer = setTimeout(() => setShouldRender(true), delayRender);
      return () => clearTimeout(timer);
    }
  }, [delayRender]);

  // Memoize the content to render
  const content = useMemo(() => {
    // 1. Show loading skeleton if currently loading and no data is available yet
    if (isLoading && !data) {
      return fallback;
    }

    // 2. If we have data, render the children
    if (data) {
      if (typeof children === "function") {
        return (children as (data: T) => React.ReactNode)(data);
      }
      return children;
    }

    // 3. If no data and not loading, show empty fallback
    return isEmptyFallback;
  }, [data, isLoading, fallback, children, isEmptyFallback]);

  return (
    <Suspense fallback={fallback}>
      <LazyWrapper height={height} placeholder={fallback}>
        <section 
          aria-busy={isLoading} 
          aria-label={title}
          className="w-full transition-opacity duration-300"
        >
          {shouldRender ? content : fallback}
        </section>
      </LazyWrapper>
    </Suspense>
  );
}

// Wrap with memo to prevent re-renders when parent re-renders unless props change
export default memo(OptimizedSectionWrapper) as typeof OptimizedSectionWrapper;

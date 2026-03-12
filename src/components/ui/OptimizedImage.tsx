import { memo, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  priority?: boolean;
}

/**
 * OptimizedImage Component - Simple & Performant
 * Features: lazy loading, async decoding, skeleton loader, fallback support
 */
const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  fallbackSrc,
  onLoad,
  onError,
  objectFit = "cover",
  priority = false,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  const displaySrc = hasError && fallbackSrc ? fallbackSrc : src;

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ width, height }}
    >
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
      )}

      {/* Image */}
      <img
        src={displaySrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn(
          "w-full h-full",
          `object-${objectFit}`,
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={handleLoad}
        onError={handleError}
      />

      {/* Error Fallback */}
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
          <svg
            className="w-8 h-8 text-zinc-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
    </div>
  );
});

export default OptimizedImage;

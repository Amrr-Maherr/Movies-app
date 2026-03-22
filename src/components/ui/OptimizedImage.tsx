import { memo, useState, useCallback } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
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
 * OptimizedImage Component - Using react-lazy-load-image-component
 * Features: lazy loading with blur placeholder, responsive images, fallback support
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
  const [hasError, setHasError] = useState(false);

  const objectFitClass = {
    cover: "object-cover",
    contain: "object-contain",
    fill: "object-fill",
    none: "object-none",
    "scale-down": "object-scale-down",
  }[objectFit];

  const displaySrc = hasError && fallbackSrc ? fallbackSrc : src;

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  const handleLoad = useCallback(() => {
    onLoad?.();
  }, [onLoad]);

  return (
    <div
      className={cn("relative overflow-hidden w-full h-full", className)}
      style={{ width, height }}
    >
      <LazyLoadImage
        key={displaySrc}
        src={displaySrc}
        alt={alt}
        effect="blur"
        loading={priority ? "eager" : "lazy"}
        className={cn("w-full h-full", objectFitClass)}
        onLoad={handleLoad}
        onError={handleError}
        wrapperProps={{
          style: { width: "100%", height: "100%" },
        }}
      />
    </div>
  );
});

export default OptimizedImage;

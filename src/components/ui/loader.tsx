import { memo } from "react";
import { cn } from "@/lib/utils";

export interface LoaderProps {
  /**
   * Optional custom class name for additional styling
   */
  className?: string;
  /**
   * Size variant of the loader
   * @default "default"
   */
  size?: "sm" | "default" | "lg";
  /**
   * If true, loader takes full screen; if false, fits within container
   * @default false
   */
  fullscreen?: boolean;
  /**
   * Optional label for screen readers
   * @default "Loading..."
   */
  label?: string;
}

/**
 * Netflix-style Loader Component
 *
 * A reusable loading spinner with animated pulse effect.
 * Supports both fullscreen and container-based modes.
 *
 * Memoized to prevent unnecessary re-renders when parent components update.
 *
 * @example
 * // Fullscreen loader
 * <Loader fullscreen />
 *
 * @example
 * // Container loader with custom size
 * <Loader size="lg" />
 *
 * @example
 * // With custom label for accessibility
 * <Loader label="Loading content..." />
 */
export const Loader = memo(function Loader({
  className,
  size = "default",
  fullscreen = false,
  label = "Loading...",
}: LoaderProps) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    default: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        fullscreen
          ? "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          : "w-full h-full min-h-[100px]",
        className,
      )}
      role="status"
      aria-label={label}
      aria-live="polite"
    >
      <div
        className={cn(
          "relative animate-spin rounded-full border-red-500",
          "border-t-transparent",
          sizeClasses[size],
        )}
      />
      {/* Secondary ring for depth */}
      <div
        className={cn(
          "absolute animate-ping rounded-full border-red-500",
          "border-2",
          size === "sm" ? "w-8 h-8" : size === "lg" ? "w-20 h-20" : "w-14 h-14",
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
});

export default Loader;

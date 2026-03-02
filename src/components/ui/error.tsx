import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface ErrorProps {
  /**
   * Optional custom class name for additional styling
   */
  className?: string
  /**
   * Error title to display
   * @default "Something went wrong"
   */
  title?: string
  /**
   * Detailed error message to display
   * @default "We're sorry, but we couldn't load this content. Please try again."
   */
  message?: string
  /**
   * Optional error code or technical details
   */
  errorCode?: string
  /**
   * Callback function to retry the failed operation
   */
  onRetry?: () => void
  /**
   * Custom text for the retry button
   * @default "Retry"
   */
  retryButtonText?: string
  /**
   * If true, error takes full screen; if false, fits within container
   * @default false
   */
  fullscreen?: boolean
}

/**
 * Netflix-style Error Component
 * 
 * Displays an error message with a retry button when something fails to load.
 * Uses Netflix color scheme and provides accessible error feedback.
 * 
 * @example
 * // Basic usage with retry callback
 * <Error onRetry={() => refetch()} />
 * 
 * @example
 * // Fullscreen error with custom message
 * <Error 
 *   fullscreen
 *   title="Failed to load"
 *   message="The content you're looking for is unavailable."
 *   errorCode="Error 404"
 *   onRetry={() => window.location.reload()}
 * />
 * 
 * @example
 * // Container error with custom button text
 * <Error 
 *   retryButtonText="Try Again"
 *   onRetry={handleRetry}
 * />
 */
export function Error({
  className,
  title = "Something went wrong",
  message = "We're sorry, but we couldn't load this content. Please try again.",
  errorCode,
  onRetry,
  retryButtonText = "Retry",
  fullscreen = false,
}: ErrorProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        fullscreen
          ? "fixed inset-0 z-50 bg-background"
          : "w-full h-full min-h-[200px] p-6",
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      {/* Error Icon */}
      <div
        className={cn(
          "flex items-center justify-center rounded-full",
          "bg-destructive/10 dark:bg-destructive/20",
          "mb-6",
          "w-20 h-20"
        )}
      >
        <svg
          className="w-10 h-10 text-destructive"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Error Title */}
      <h2
        className={cn(
          "text-2xl font-semibold text-foreground",
          "mb-2"
        )}
      >
        {title}
      </h2>

      {/* Error Message */}
      <p
        className={cn(
          "text-muted-foreground max-w-md",
          "mb-2"
        )}
      >
        {message}
      </p>

      {/* Error Code (if provided) */}
      {errorCode && (
        <p
          className={cn(
            "text-sm text-muted-foreground font-mono",
            "mt-2 mb-4"
          )}
        >
          {errorCode}
        </p>
      )}

      {/* Retry Button */}
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="default"
          size="lg"
          className={cn(
            "mt-4 min-w-[120px]",
            "bg-netflix-red hover:bg-netflix-red-hover",
            "transition-colors duration-200"
          )}
          aria-label={`Retry loading content: ${title}`}
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          {retryButtonText}
        </Button>
      )}
    </div>
  )
}

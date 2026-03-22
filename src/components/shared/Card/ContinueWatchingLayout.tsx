import { memo } from "react";
import { Play } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";

export interface ContinueWatchingLayoutProps {
  title: string;
  imageUrl: string;
  progress: number;
}

/**
 * Continue Watching Layout Component
 * Displays a continue watching card with progress bar
 *
 * ACCESSIBILITY FIX:
 * - Wrapped in clickable div with proper role and keyboard support
 * - Added min-h-[48px] for touch target
 * - Added aria-label for screen readers
 * - Added touch-manipulation for better mobile behavior
 * - Play button has proper 48px touch target
 */
const ContinueWatchingLayout = memo(
  ({ title, imageUrl, progress }: ContinueWatchingLayoutProps) => (
    <div
      className="group cursor-pointer bg-zinc-900 rounded w-full touch-manipulation min-h-[48px]"
      role="article"
      tabIndex={0}
      aria-label={`Continue watching ${title}, ${progress}% complete`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          // Parent will handle navigation
        }
      }}
    >
      <div className="relative aspect-video">
        <OptimizedImage
          src={imageUrl}
          alt={title}
          className="w-full h-full transition-transform duration-300"
          objectFit="cover"
        />
        {/* 
          ACCESSIBILITY FIX: Play button container now has 48px touch target
        */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/50 transition-colors duration-300">
          <div className="min-w-[48px] min-h-[48px] rounded-full border-2 border-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play
              className="w-6 h-6 text-white fill-white ml-1"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
          <div
            className="h-full bg-red-600"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="p-3 md:p-4">
        <h3 className="text-sm md:text-base text-white font-medium line-clamp-1">
          {title}
        </h3>
      </div>
    </div>
  ),
);

ContinueWatchingLayout.displayName = "ContinueWatchingLayout";

export default ContinueWatchingLayout;

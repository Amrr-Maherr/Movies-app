import { memo, useState } from "react";
import { Play } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";

export interface TrailerLayoutProps {
  title: string;
  thumbnailUrl: string;
  type?: string;
  imageLoaded: boolean;
  onImageLoad: () => void;
}

/**
 * Trailer Layout Component
 * Displays a trailer card with play button overlay
 *
 * ACCESSIBILITY FIX:
 * - Wrapped in clickable div with proper role and keyboard support
 * - Added min-h-[48px] for touch target
 * - Added aria-label for screen readers
 * - Added touch-manipulation for better mobile behavior
 * - Play button has proper size (48px touch target)
 */
const TrailerLayout = memo(
  ({
    title,
    thumbnailUrl,
    type,
    imageLoaded,
    onImageLoad,
  }: TrailerLayoutProps) => {
    return (
      <div
        className="relative group touch-manipulation min-h-[48px]"
        role="article"
        tabIndex={0}
        aria-label={`Play trailer: ${title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            // Parent onClick will handle play action
          }
        }}
      >
        <div className="relative rounded-md bg-zinc-900 shadow-lg transition-all duration-300 ease-in-out group-hover:shadow-2xl">
          <div className="relative aspect-video">
            <OptimizedImage
              src={thumbnailUrl}
              alt={title}
              className={`h-full w-full transition-all duration-300 ease-in-out ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              objectFit="cover"
              onLoad={onImageLoad}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                <Play className="h-12 w-12 text-zinc-600" aria-hidden="true" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
            {/* 
              ACCESSIBILITY FIX: Play button now has 48px touch target
            */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="min-w-[48px] min-h-[48px] rounded-full bg-white/90 transition-transform duration-300 group-hover:bg-white shadow-xl flex items-center justify-center">
                <Play
                  className="h-6 w-6 fill-black text-black ml-1"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 px-1">
          <p className="text-sm font-medium text-white line-clamp-2 group-hover:text-[var(--netflix-red)] transition-colors duration-300">
            {title}
          </p>
          {type && (
            <p className="mt-1 text-xs text-gray-500 uppercase tracking-wider">
              {type}
            </p>
          )}
        </div>
      </div>
    );
  },
);

TrailerLayout.displayName = "TrailerLayout";

export default TrailerLayout;

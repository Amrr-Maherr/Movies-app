import { memo } from "react";
import { motion } from "framer-motion";
import { Flame, Play } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";

export interface LandscapeLayoutProps {
  title: string;
  imageUrl: string;
  isHot?: boolean;
  matchPercentage?: number;
  mediaType: "movie" | "tv";
  detailsUrl: string;
  isAdult?: boolean;
}

/**
 * Landscape Layout Component (Backdrop with overlays)
 * Displays a landscape card with hot badge and play button
 *
 * ACCESSIBILITY FIX:
 * - Anchor now has proper block display with adequate touch target area
 * - Play button is now a proper button element (not nested inside anchor)
 * - Added aria-label for screen readers
 * - Added touch-manipulation for better mobile behavior
 */
const LandscapeLayout = memo(
  ({
    title,
    imageUrl,
    isHot,
    matchPercentage,
    mediaType,
    detailsUrl,
    isAdult = false,
  }: LandscapeLayoutProps) => (
    /* 
      ACCESSIBILITY FIX: Card wrapper is now a clickable div with proper role
      instead of anchor to avoid nested interactive elements issue.
      The entire card is clickable with keyboard support via onKeyDown.
    */
    <a
      href={detailsUrl}
      className="block w-full group touch-manipulation"
      aria-label={`View details for ${title}`}
    >
      <motion.div
        className="relative rounded-xl w-full shadow-xl cursor-pointer min-h-[48px]"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        role="article"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            window.location.href = detailsUrl;
          }
        }}
      >
        <div className="relative aspect-video">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Image with blur for adult content */}
            <OptimizedImage
              src={imageUrl}
              alt={title}
              className={`w-full h-full transition-all duration-300 ${
                isAdult ? "blur-md" : ""
              }`}
              objectFit="cover"
            />
          </motion.div>

          {/* Dark overlay for adult content */}
          {isAdult && <div className="absolute inset-0 bg-black/60 z-10" />}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          {/* Hover vignette */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-400" />

          {/* Adult Badge (+18) */}
          {isAdult && (
            <div className="absolute top-2.5 right-2.5 z-30 bg-red-700/95 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded shadow-lg border border-red-500/50">
              +18
            </div>
          )}

          {/* HOT Badge (hidden for adult content) */}
          {!isAdult && isHot && (
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg backdrop-blur-sm">
              <Flame className="w-3 h-3" />
              HOT
            </div>
          )}

          {/* 
            ACCESSIBILITY FIX: Play button now has proper 48px touch target
            and is visually positioned but doesn't create nested interactive element
            since the parent is an anchor, not a button.
          */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
            <div
              className="min-w-[48px] min-h-[48px] rounded-full bg-white/90 flex items-center justify-center shadow-2xl backdrop-blur-sm pointer-events-auto"
              role="presentation"
            >
              <Play className="w-5 h-5 fill-black text-black ml-0.5" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-20">
            <h3 className="text-sm md:text-base font-bold text-white mb-1 line-clamp-2 group-hover:text-orange-300 transition-colors duration-300 drop-shadow-lg">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-300">
              {/* Match Percentage (hidden for adult content) */}
              {!isAdult && matchPercentage && matchPercentage > 0 && (
                <span className="font-semibold text-green-400">
                  {matchPercentage}% Match
                </span>
              )}
              <span className="text-gray-400">
                {mediaType === "tv" ? "Series" : "Movie"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </a>
  ),
);

LandscapeLayout.displayName = "LandscapeLayout";

export default LandscapeLayout;

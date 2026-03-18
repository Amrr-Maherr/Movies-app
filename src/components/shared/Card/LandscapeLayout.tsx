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
}

/**
 * Landscape Layout Component (Backdrop with overlays)
 * Displays a landscape card with hot badge and play button
 */
const LandscapeLayout = memo(
  ({
    title,
    imageUrl,
    isHot,
    matchPercentage,
    mediaType,
    detailsUrl,
  }: LandscapeLayoutProps) => (
    <a href={detailsUrl} className="block w-full group">
      <motion.div
        className="relative rounded-xl w-full shadow-xl cursor-pointer"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="relative aspect-video">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <OptimizedImage
              src={imageUrl}
              alt={title}
              className="w-full h-full"
              objectFit="cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          {/* Hover vignette */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-400" />
          {isHot && (
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg backdrop-blur-sm">
              <Flame className="w-3 h-3" />
              HOT
            </div>
          )}
          {/* Play button on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-2xl backdrop-blur-sm">
              <Play className="w-4 h-4 fill-black text-black ml-0.5" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
            <h3 className="text-sm md:text-base font-bold text-white mb-1 line-clamp-2 group-hover:text-orange-300 transition-colors duration-300 drop-shadow-lg">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-300">
              {matchPercentage && matchPercentage > 0 && (
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

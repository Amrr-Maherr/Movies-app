import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";

export interface HorizontalLayoutProps {
  title: string;
  imageUrl: string;
  overview?: string;
  mediaType: "movie" | "tv";
  isOriginal?: boolean;
  rating?: number;
  detailsUrl: string;
  plainLayout?: boolean;
}

/**
 * Horizontal Layout Component (Image on left, text on right)
 * Displays a horizontal card with image and text side by side
 *
 * ACCESSIBILITY FIX:
 * - Link now has proper touch target with min-h-[48px]
 * - Added aria-label for screen readers
 * - Added touch-manipulation for better mobile behavior
 * - Added keyboard navigation support
 */
const HorizontalLayout = memo(
  ({
    title,
    imageUrl,
    overview,
    mediaType,
    isOriginal,
    rating,
    detailsUrl,
    plainLayout,
  }: HorizontalLayoutProps) => (
    <Link
      to={detailsUrl}
      className="block w-full group touch-manipulation"
      aria-label={`View details for ${title}`}
    >
      <motion.div
        className={`cursor-pointer bg-zinc-900/80 rounded-xl flex gap-3 border border-white/5 shadow-lg min-h-[48px] ${
          !plainLayout ? "flex-col md:flex-row" : "hover:bg-zinc-700/80"
        }`}
        whileHover={{ y: -2, boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        role="article"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            window.location.href = detailsUrl;
          }
        }}
      >
        <div
          className={`relative flex-shrink-0 ${
            plainLayout
              ? "w-20 md:w-24 aspect-[2/3]"
              : "w-full md:w-2/5 aspect-video md:aspect-auto"
          }`}
        >
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <OptimizedImage
              src={imageUrl}
              alt={title}
              className="w-full h-full"
              objectFit="cover"
            />
          </motion.div>
          {!plainLayout && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-900/60 md:to-zinc-900" />
          )}
        </div>
        <div className="flex-1 p-3 md:p-4 flex flex-col justify-center">
          {!plainLayout && (
            <div className="flex items-center gap-2 mb-2">
              {isOriginal && (
                <span className="bg-red-600 text-white text-[10px] md:text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                  Netflix Original
                </span>
              )}
              <span className="text-[10px] md:text-xs text-gray-500">
                {mediaType === "movie" ? "Film" : "Series"}
              </span>
            </div>
          )}
          <h3
            className={`font-bold text-white mb-1 group-hover:text-red-400 transition-colors duration-200 ${
              plainLayout
                ? "text-sm md:text-base line-clamp-2"
                : "text-lg md:text-2xl"
            }`}
          >
            {title}
          </h3>
          {rating && rating > 0 && (
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-xs text-gray-400 font-medium">
                {rating.toFixed(1)}
              </span>
            </div>
          )}
          {overview && !plainLayout && (
            <p className="text-xs md:text-sm text-gray-400 line-clamp-2 md:line-clamp-3 leading-relaxed mt-1">
              {overview}
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  ),
);

HorizontalLayout.displayName = "HorizontalLayout";

export default HorizontalLayout;

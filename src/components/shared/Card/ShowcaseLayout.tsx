import { memo } from "react";
import { motion } from "framer-motion";
import { Star, Play } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";

export interface ShowcaseLayoutProps {
  title: string;
  imageUrl: string;
  mediaType: "movie" | "tv";
  isNew?: boolean;
  isFeatured?: boolean;
  rating?: number;
  overview?: string;
  detailsUrl: string;
  aspectRatio?: string;
}

/**
 * Showcase Layout Component (Large featured cards)
 * Displays a large featured card with badges and overview
 */
const ShowcaseLayout = memo(
  ({
    title,
    imageUrl,
    mediaType,
    isNew,
    isFeatured,
    rating,
    overview,
    detailsUrl,
    aspectRatio = "aspect-video md:aspect-[10/9]",
  }: ShowcaseLayoutProps) => (
    <a href={detailsUrl} className="block w-full group">
      <motion.div
        className={`relative ${aspectRatio} rounded-xl cursor-pointer shadow-2xl`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <OptimizedImage
            src={imageUrl}
            alt={title}
            className="w-full h-full"
            objectFit="cover"
          />
        </motion.div>
        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        {/* Hover shine effect */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
          <div className="flex items-center gap-2 mb-3">
            {isFeatured && (
              <span className="bg-yellow-400 text-black text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow-lg">
                ⭐ Featured Pick
              </span>
            )}
            {isNew && (
              <span className="px-2.5 py-1 bg-red-600 text-white text-[10px] md:text-xs font-bold rounded-full shadow-lg">
                NEW
              </span>
            )}
            {rating && rating > 0 && (
              <div className="flex items-center gap-1 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-[10px] md:text-xs font-bold text-white">
                  {rating.toFixed(1)}
                </span>
              </div>
            )}
            <span className="text-xs md:text-sm text-gray-400 font-medium">
              {mediaType === "movie" ? "🎬 Movie" : "📺 Series"}
            </span>
          </div>
          <h3 className="text-xl md:text-3xl lg:text-4xl font-black text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300 drop-shadow-2xl leading-tight">
            {title}
          </h3>
          {overview && (
            <p className="hidden md:block text-sm text-gray-300/90 line-clamp-2 max-w-2xl leading-relaxed">
              {overview}
            </p>
          )}
          {/* CTA hint */}
          <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-1.5 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              <Play className="w-3 h-3 fill-current" />
              Watch Now
            </div>
          </div>
        </div>
      </motion.div>
    </a>
  ),
);

ShowcaseLayout.displayName = "ShowcaseLayout";

export default ShowcaseLayout;

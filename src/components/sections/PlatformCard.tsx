import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import type { StreamingPlatform } from "@/types";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { Link } from "react-router-dom";

export interface PlatformCardProps {
  platform: StreamingPlatform;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

/**
 * PlatformCard Component
 * 
 * Displays a streaming platform as a large, visually prominent card
 * with smooth hover animations using Framer Motion.
 */
const PlatformCard = memo(function PlatformCard({ platform }: PlatformCardProps) {
  const logoUrl = useMemo(() => {
    return platform.logo_path
      ? `${IMAGE_BASE_URL}${platform.logo_path}`
      : null;
  }, [platform]);

  return (
    <Link
      // to={`/network/${platform?.parent_organization.id}`}
      className="relative w-full h-full"
    >
      <div className="relative h-full w-full rounded-xl overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700/50 shadow-lg hover:shadow-2xl hover:shadow-red-500/10 hover:border-red-500/30 transition-all duration-300">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />

        {/* Platform Logo Container */}
        <div className="relative h-full w-full flex items-center justify-center p-6 md:p-8">
          {logoUrl ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <OptimizedImage
                src={logoUrl}
                alt={platform.name}
                className="max-w-full max-h-full object-contain drop-shadow-2xl filter brightness-110 hover:brightness-125 transition-all duration-300"
                objectFit="contain"
                width={200}
                height={200}
              />
            </div>
          ) : (
            /* Fallback when no logo is available */
            <div className="text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg">
                <span className="text-3xl md:text-4xl font-bold text-white">
                  {platform.name.charAt(0)}
                </span>
              </div>
              <p className="text-white font-semibold text-sm md:text-base">
                {platform.name}
              </p>
            </div>
          )}
        </div>

        {/* Platform Name Overlay (shown on hover) */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 md:p-5 bg-gradient-to-t from-black via-black/80 to-transparent"
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-white font-bold text-center text-sm md:text-base lg:text-lg truncate drop-shadow-lg">
            {platform.name}
          </h3>
        </motion.div>

        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-500/5" />
        </div>
      </div>
    </Link>
  );
});

export default PlatformCard;

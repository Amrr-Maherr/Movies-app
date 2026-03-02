import { motion } from "framer-motion";
import { getBackdropUrl } from "@/utils/tmdb";
import type { HeroBackgroundProps } from "@/types";

// ============================================
// CONSTANTS
// ============================================
const SLIDE_INTERVAL = 8000;
const ZOOM_SCALE = 1.05;

// ============================================
// COMPONENT
// ============================================
export default function HeroBackground({ movie }: HeroBackgroundProps) {
  const imageUrl = getBackdropUrl(movie.backdrop_path);

  if (!imageUrl) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--background-secondary)] to-[var(--background-tertiary)]" />
    );
  }

  return (
    <>
      {/* Base Image with slow cinematic zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: ZOOM_SCALE }}
          transition={{ duration: SLIDE_INTERVAL / 1000, ease: "easeOut" }}
          loading="eager"
        />
      </div>

      {/* Vignette - Strong left gradient like Netflix (adjusted for mobile) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent sm:via-black/50" />

      {/* Bottom fade to background (adjusted for mobile) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-primary)] via-[var(--background-primary)]/20 to-transparent sm:via-transparent" />

      {/* Top fade for smooth blend */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
    </>
  );
}

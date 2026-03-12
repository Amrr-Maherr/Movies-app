import { getBackdropUrl } from "@/utils/tmdb";
import { getTitle } from "@/utils";
import type { HeroBackgroundProps } from "@/types";
import { useMemo } from "react";

// ============================================
// CONSTANTS
// ============================================
const SLIDE_INTERVAL = 8000;

// ============================================
// COMPONENT
// ============================================
export default function HeroBackground({ movie }: HeroBackgroundProps) {
  const imageUrl = useMemo(
    () => getBackdropUrl(movie.backdrop_path),
    [movie.backdrop_path],
  );

  const title = useMemo(() => getTitle(movie), [movie]);

  if (!imageUrl) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--background-secondary)] to-[var(--background-tertiary)]" />
    );
  }

  return (
    <>
      {/* Base Image with slow cinematic zoom using CSS */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover image-zoom-hover"
          style={{ animation: `imageZoom ${SLIDE_INTERVAL / 1000}s ease-out forwards` }}
          loading="lazy"
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

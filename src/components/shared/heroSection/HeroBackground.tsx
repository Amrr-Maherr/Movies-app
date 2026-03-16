import { getBackdropUrl } from "@/utils/tmdb";
import { getTitle } from "@/utils";
import type { HeroBackgroundProps, HeroMedia } from "@/types";
import { useMemo, useRef, useEffect, useState } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";

// ============================================
// CONSTANTS
// ============================================
// const SLIDE_INTERVAL = 8000;

/**
 * Get YouTube trailer key from movie data
 */
function getYouTubeTrailerKey(movie: HeroMedia): string | null {
  if ("videos" in movie && movie.videos?.results) {
    const trailer = movie.videos.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    );
    return trailer?.key || null;
  }
  return null;
}

/**
 * Get YouTube trailer URL for background video
 */
function getTrailerUrl(movie: HeroMedia): string | null {
  const trailerKey = getYouTubeTrailerKey(movie);
  if (!trailerKey) return null;
  // YouTube embed URL with autoplay, loop, and muted parameters
  return `https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&playlist=${trailerKey}&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1&playsinline=1`;
}

// ============================================
// COMPONENT
// ============================================
export default function HeroBackground({ movie }: HeroBackgroundProps) {
  const imageUrl = useMemo(
    () => getBackdropUrl(movie.backdrop_path),
    [movie.backdrop_path],
  );

  const trailerUrl = useMemo(() => getTrailerUrl(movie), [movie]);
  const title = useMemo(() => getTitle(movie), [movie]);

  const videoRef = useRef<HTMLIFrameElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    // Reset states when movie changes
    setVideoLoaded(false);
    setVideoError(false);
  }, [movie.id]);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setVideoLoaded(false);
  };

  // Fallback gradient when no image or video
  if (!imageUrl) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--background-secondary)] to-[var(--background-tertiary)]" />
    );
  }

  return (
    <>
      {/* Background Video - YouTube Trailer (Autoplay, Loop, Muted) */}
      {trailerUrl && !videoError && (
        <div
          className={`absolute inset-0 overflow-hidden ${videoLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
        >
          <iframe
            ref={videoRef}
            src={trailerUrl}
            title="Hero Background Video"
            className="w-full h-full scale-125"
            onLoad={handleVideoLoad}
            onError={handleVideoError}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            aria-hidden="true"
          />
        </div>
      )}

      {/* Base Image with slow cinematic zoom using CSS (fallback or underlay) */}
      <div
        className={`absolute inset-0 overflow-hidden ${videoLoaded ? "opacity-50" : "opacity-100"} transition-opacity duration-1000`}
      >
        <OptimizedImage
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover image-zoom-hover"
          objectFit="cover"
          priority
        />
      </div>

      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Vignette - Strong left gradient like Netflix (adjusted for mobile) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent sm:via-black/50" />

      {/* Bottom fade to background (adjusted for mobile) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-primary)] via-[var(--background-primary)]/20 to-transparent sm:via-transparent" />

      {/* Top fade for smooth blend */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
    </>
  );
}

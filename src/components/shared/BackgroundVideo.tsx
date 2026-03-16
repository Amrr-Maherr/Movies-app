import { memo, useRef, useCallback, useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { getTrailerEmbedUrl } from "@/utils";
import type { Video } from "@/types";

interface BackgroundVideoProps {
  videos?: { results: Video[] } | null;
  mediaId: number;
  className?: string;
}

/**
 * BackgroundVideo Component with Audio Controls
 *
 * Displays an autoplaying, looping YouTube trailer as a background video.
 * Features:
 * - Smooth fade-in transition when video loads
 * - Fallback handling when video fails to load
 * - Netflix-style background video with scale for full coverage
 * - Mute/Unmute toggle button with visual feedback
 * - Accessibility support with aria-hidden
 */
const BackgroundVideo = memo(function BackgroundVideo({
  videos,
  mediaId,
  className = "",
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Get background video URL from utility function
  const backgroundVideoUrl = getTrailerEmbedUrl(videos);

  // Reset video states when media changes
  useEffect(() => {
    setVideoError(false);
    setIsMuted(true); // Reset to muted on media change
    setShowControls(false);
  }, [mediaId]);

  // Show controls when video loads
  useEffect(() => {
    if (backgroundVideoUrl && !videoError) {
      const timer = setTimeout(() => {
        setShowControls(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [backgroundVideoUrl, videoError]);

  const handleVideoError = useCallback(() => {
    setVideoError(true);
  }, []);

  /**
   * Toggle mute/unmute - updates state which changes iframe URL
   * Similar to Next.js HeroSection approach
   */
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // Don't render if no video URL or video failed to load
  if (!backgroundVideoUrl || videoError) {
    return null;
  }

  return (
    <div
      className={`relative  inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    >
      <iframe
        ref={videoRef}
        src={`${backgroundVideoUrl}&enablejsapi=1&mute=${isMuted ? 1 : 0}&origin=${typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : "*"}`}
        title="Background Video"
        className="w-full h-full object-cover scale-125"
        onError={handleVideoError}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        loading="eager"
        sandbox="allow-same-origin allow-scripts allow-presentation allow-popups"
      />

      {/* ========================================
          AUDIO CONTROL BUTTON - Fixed position on top layer
          ======================================== */}
      {showControls && (
        <div className="fixed bottom-4 right-4 z-[99999]">
          <button
            onClick={toggleMute}
            className={`flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl ${
              isMuted
                ? "bg-red-600/80 hover:bg-red-600 text-white"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            aria-pressed={!isMuted}
            title={isMuted ? "Click to unmute" : "Click to mute"}
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6" />
            ) : (
              <Volume2 className="w-6 h-6" />
            )}
          </button>
        </div>
      )}
    </div>
  );
});

export default BackgroundVideo;

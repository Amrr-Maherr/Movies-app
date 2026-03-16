import { memo, useRef, useCallback, useEffect, useState } from "react";
import { getTrailerEmbedUrl } from "@/utils";
import type { Video } from "@/types";

interface BackgroundVideoProps {
  videos?: { results: Video[] } | null;
  mediaId: number;
  className?: string;
}

/**
 * BackgroundVideo Component
 *
 * Displays an autoplaying, looping, muted YouTube trailer as a background video.
 * Features:
 * - Smooth fade-in transition when video loads
 * - Fallback handling when video fails to load
 * - Netflix-style background video with scale for full coverage
 * - Accessibility support with aria-hidden
 */
const BackgroundVideo = memo(function BackgroundVideo({
  videos,
  mediaId,
  className = "",
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [videoError, setVideoError] = useState(false);

  // Get background video URL from utility function
  const backgroundVideoUrl = getTrailerEmbedUrl(videos);

  // Reset video states when media changes
  useEffect(() => {
    setVideoError(false);
  }, [mediaId]);

  const handleVideoError = useCallback(() => {
    setVideoError(true);
  }, []);

  // Don't render if no video URL or video failed to load
  if (!backgroundVideoUrl || videoError) {
    return null;
  }

  return (
    <div
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    >
      <iframe
        ref={videoRef}
        src={backgroundVideoUrl}
        title="Background Video"
        className="w-full h-full object-cover scale-125"
        onError={handleVideoError}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        loading="eager"
      />
    </div>
  );
});

export default BackgroundVideo;

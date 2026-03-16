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
 * - Mute/Unmute toggle button with visual feedback using YouTube Player API
 * - Accessibility support with aria-hidden
 */
const BackgroundVideo = memo(function BackgroundVideo({
  videos,
  mediaId,
  className = "",
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  // Get background video URL from utility function
  const backgroundVideoUrl = getTrailerEmbedUrl(videos);

  // Reset video states when media changes
  useEffect(() => {
    setVideoError(false);
    setIsMuted(true); // Reset to muted on media change
    setShowControls(false);
    setIsPlayerReady(false);
  }, [mediaId]);

  // Show controls when video loads
  useEffect(() => {
    if (backgroundVideoUrl && !videoError) {
      const timer = setTimeout(() => {
        setShowControls(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [backgroundVideoUrl, videoError]);

  const handleVideoError = useCallback(() => {
    setVideoError(true);
  }, []);

  /**
   * Send command to YouTube iframe using postMessage API
   */
  const sendYouTubeCommand = useCallback((func: string, args: any[] = []) => {
    if (videoRef.current && videoRef.current.contentWindow) {
      videoRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: func,
          args: args,
        }),
        "*",
      );
    }
  }, []);

  /**
   * Toggle mute/unmute using YouTube Player API
   */
  const toggleMute = useCallback(() => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);

    // Wait for player to be ready before sending commands
    if (isPlayerReady) {
      if (newMutedState) {
        // Mute the video
        sendYouTubeCommand("mute");
      } else {
        // Unmute and set volume to 100
        sendYouTubeCommand("unMute");
        setTimeout(() => {
          sendYouTubeCommand("setVolume", [100]);
        }, 100);
      }
    }
  }, [isMuted, isPlayerReady, sendYouTubeCommand]);

  // Listen for YouTube Player API events
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only handle messages from YouTube iframe
      if (
        !videoRef.current ||
        event.source !== videoRef.current.contentWindow
      ) {
        return;
      }

      try {
        const data = JSON.parse(event.data);

        // Player is ready
        if (data.event === "onReady") {
          setIsPlayerReady(true);
        }

        // Player state changed (playing, paused, etc.)
        if (data.event === "onStateChange") {
          // Player is ready when state changes
          setIsPlayerReady(true);
        }
      } catch (e) {
        // Ignore non-JSON messages
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
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
        src={`${backgroundVideoUrl}&enablejsapi=1&origin=${typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : "*"}`}
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
        <div className="fixed bottom-2 right-4 !z-[99999]">
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

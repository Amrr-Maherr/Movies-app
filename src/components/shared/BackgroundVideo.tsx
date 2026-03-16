import { memo, useCallback, useEffect, useState } from "react";
import YouTube from "react-youtube";
import { getTrailerEmbedUrl } from "@/utils";
import type { Video } from "@/types";

interface BackgroundVideoProps {
  videos?: { results: Video[] } | null;
  mediaId: number;
  className?: string;
  playerRef?: React.MutableRefObject<any>;
  isMuted?: boolean;
  isPlaying?: boolean;
  onToggleMute?: () => void;
  onTogglePlay?: () => void;
}

/**
 * BackgroundVideo Component - YouTube trailer background
 */
const BackgroundVideo = memo(function BackgroundVideo({
  videos,
  mediaId,
  className = "",
  playerRef,
  isMuted = true,
  isPlaying = true,
  onToggleMute,
  onTogglePlay,
}: BackgroundVideoProps) {
  const [videoError, setVideoError] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Get YouTube video ID
  const videoId = getTrailerEmbedUrl(videos)
    ?.split("/embed/")[1]
    ?.split("?")[0];

  // Reset when media changes
  useEffect(() => {
    setVideoError(false);
    setShowControls(false);
  }, [mediaId]);

  // Show controls after delay
  useEffect(() => {
    if (videoId && !videoError) {
      const timer = setTimeout(() => setShowControls(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [videoId, videoError]);

  const handleVideoError = useCallback(() => setVideoError(true), []);

  /**
   * Handle YouTube player ready
   */
  const onPlayerReady = useCallback(
    (event: any) => {
      const p = event.target;
      if (playerRef) {
        playerRef.current = p;
      }
      p.mute();
      p.playVideo();
    },
    [playerRef],
  );

  /**
   * Handle player state change
   */
  const onPlayerStateChange = useCallback(
    (event: any) => {
      // YouTube.PlayerState.PLAYING = 1
      // YouTube.PlayerState.PAUSED = 2
      if (onTogglePlay) {
        // State change handled by parent
      }
    },
    [onTogglePlay],
  );

  // Don't render if no video
  if (!videoId || videoError) {
    return null;
  }

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      loop: 1,
      mute: 1,
      playlist: videoId,
      modestbranding: 1,
    },
  };

  return (
    <div
      className={`relative inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    >
      {/* YouTube Player */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
          onError={handleVideoError}
          className="w-full h-full scale-125"
          iframeClassName="w-full h-full object-cover"
          title="Background Video"
        />
      </div>
    </div>
  );
});

export default BackgroundVideo;

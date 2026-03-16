import { memo, useCallback, useEffect, useState } from "react";
import YouTube from "react-youtube";
import VideoControls from "./VideoControls";
import { getTrailerEmbedUrl } from "@/utils";
import type { Video } from "@/types";

interface BackgroundVideoProps {
  videos?: { results: Video[] } | null;
  mediaId: number;
  className?: string;
}

/**
 * BackgroundVideo Component with Play/Pause and Mute Controls
 */
const BackgroundVideo = memo(function BackgroundVideo({
  videos,
  mediaId,
  className = "",
}: BackgroundVideoProps) {
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [player, setPlayer] = useState<any>(null);

  // Get YouTube video ID
  const videoId = getTrailerEmbedUrl(videos)
    ?.split("/embed/")[1]
    ?.split("?")[0];

  // Reset when media changes
  useEffect(() => {
    setVideoError(false);
    setIsMuted(true);
    setIsPlaying(true);
    setShowControls(false);
    setPlayer(null);
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
  const onPlayerReady = useCallback((event: any) => {
    const p = event.target;
    setPlayer(p);
    p.mute();
    p.playVideo();
  }, []);

  /**
   * Handle player state change (play/pause)
   */
  const onPlayerStateChange = useCallback((event: any) => {
    // YouTube.PlayerState.PLAYING = 1
    // YouTube.PlayerState.PAUSED = 2
    setIsPlaying(event.data === 1);
  }, []);

  /**
   * Toggle mute/unmute
   */
  const toggleMute = useCallback(() => {
    if (!player) return;

    const newMuted = !isMuted;
    setIsMuted(newMuted);

    if (newMuted) {
      player.mute();
    } else {
      player.unMute();
    }
  }, [isMuted, player]);

  /**
   * Toggle play/pause
   */
  const togglePlay = useCallback(() => {
    if (!player) return;

    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }, [isPlaying, player]);

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

      {/* Control Buttons */}
      <VideoControls
        isMuted={isMuted}
        isPlaying={isPlaying}
        showControls={showControls}
        onToggleMute={toggleMute}
        onTogglePlay={togglePlay}
      />
    </div>
  );
});

export default BackgroundVideo;

import { memo, useCallback, useEffect, useState } from "react";
import YouTube from "react-youtube";
import { Volume2, VolumeX } from "lucide-react";
import { getTrailerEmbedUrl } from "@/utils";
import type { Video } from "@/types";

interface BackgroundVideoProps {
  videos?: { results: Video[] } | null;
  mediaId: number;
  className?: string;
}

/**
 * BackgroundVideo Component with Audio Controls using react-youtube
 */
const BackgroundVideo = memo(function BackgroundVideo({
  videos,
  mediaId,
  className = "",
}: BackgroundVideoProps) {
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
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
          onError={handleVideoError}
          className="w-full h-full scale-125"
          iframeClassName="w-full h-full object-cover"
          title="Background Video"
        />
      </div>

      {/* Mute/Unmute Button */}
      {showControls && (
        <div className="fixed bottom-4 right-4 z-[99999]">
          <button
            onClick={toggleMute}
            className={`flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl ${
              isMuted
                ? "bg-red-600/80 hover:bg-red-600 text-white"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
            aria-label={isMuted ? "Unmute" : "Mute"}
            title={isMuted ? "Unmute" : "Mute"}
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

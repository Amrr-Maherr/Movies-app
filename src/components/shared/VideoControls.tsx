import { memo, useCallback } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Maximize,
  Minimize,
} from "lucide-react";

interface VideoControlsProps {
  isMuted: boolean;
  isPlaying: boolean;
  isFullscreen?: boolean;
  onToggleMute: () => void;
  onTogglePlay: () => void;
  onToggleFullscreen?: () => void;
}

/**
 * VideoControls Component
 *
 * Compact control buttons for background video:
 * - Play/Pause toggle
 * - Mute/Unmute toggle
 * - Fullscreen toggle (optional)
 */
const VideoControls = memo(function VideoControls({
  isMuted,
  isPlaying,
  isFullscreen = false,
  onToggleMute,
  onTogglePlay,
  onToggleFullscreen,
}: VideoControlsProps) {
  const handleFullscreen = useCallback(() => {
    if (onToggleFullscreen) {
      onToggleFullscreen();
    }
  }, [onToggleFullscreen]);

  return (
    <div className="flex gap-2">
      {/* Play/Pause Button */}
      <button
        onClick={onTogglePlay}
        type="button"
        className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg ${
          isPlaying
            ? "bg-white/20 hover:bg-white/30 text-white"
            : "bg-white/20 hover:bg-white/30 text-white"
        }`}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <Play className="w-5 h-5 sm:w-6 sm:h-6" />
        )}
      </button>

      {/* Mute/Unmute Button */}
      <button
        onClick={onToggleMute}
        type="button"
        className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg ${
          isMuted
            ? "bg-white/20 hover:bg-white/30 text-white"
            : "bg-white/20 hover:bg-white/30 text-white"
        }`}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
        )}
      </button>

      {/* Fullscreen Button */}
      {onToggleFullscreen && (
        <button
          onClick={handleFullscreen}
          type="button"
          className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg ${
            isFullscreen
              ? "bg-white/20 hover:bg-white/30 text-white"
              : "bg-white/20 hover:bg-white/30 text-white"
          }`}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? (
            <Minimize className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <Maximize className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </button>
      )}
    </div>
  );
});

export default VideoControls;

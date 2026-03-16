import { memo, useCallback } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

interface VideoControlsProps {
  isMuted: boolean;
  isPlaying: boolean;
  showControls: boolean;
  onToggleMute: () => void;
  onTogglePlay: () => void;
}

/**
 * VideoControls Component
 * 
 * Reusable control buttons for background video:
 * - Mute/Unmute toggle
 * - Play/Pause toggle
 */
const VideoControls = memo(function VideoControls({
  isMuted,
  isPlaying,
  showControls,
  onToggleMute,
  onTogglePlay,
}: VideoControlsProps) {
  if (!showControls) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[99999] flex gap-2">
      {/* Play/Pause Button */}
      <button
        onClick={onTogglePlay}
        className={`flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl ${
          isPlaying
            ? "bg-white/20 hover:bg-white/30 text-white"
            : "bg-blue-600/80 hover:bg-blue-600 text-white"
        }`}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6" />
        ) : (
          <Play className="w-6 h-6" />
        )}
      </button>

      {/* Mute/Unmute Button */}
      <button
        onClick={onToggleMute}
        className={`flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl ${
          isMuted
            ? "bg-red-600/80 hover:bg-red-600 text-white"
            : "bg-white/20 hover:bg-white/30 text-white"
        }`}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6" />
        ) : (
          <Volume2 className="w-6 h-6" />
        )}
      </button>
    </div>
  );
});

export default VideoControls;

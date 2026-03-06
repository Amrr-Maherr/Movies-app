import { useState, useCallback } from "react";
import { Play } from "lucide-react";

export interface TrailerCardProps {
  videoKey: string;
  name: string;
  type?: string;
  onClick?: () => void;
}

const YOUTUBE_THUMBNAIL_BASE = "https://img.youtube.com/vi";

const TrailerCard = ({ videoKey, name, type, onClick }: TrailerCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  return (
    <>
      <div
        className="group relative cursor-pointer"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`Play trailer: ${name}`}
      >
        {/* Card Container */}
        <div className="relative overflow-hidden rounded-md bg-zinc-900 shadow-lg transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl">
          {/* Thumbnail Container - 16:9 aspect ratio for video */}
          <div className="relative aspect-video overflow-hidden">
            {/* YouTube Thumbnail */}
            <img
              src={`${YOUTUBE_THUMBNAIL_BASE}/${videoKey}/hqdefault.jpg`}
              alt={name}
              className={`h-full w-full object-cover transition-all duration-300 ease-in-out group-hover:scale-110 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />

            {/* Loading Placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                <Play className="h-12 w-12 text-zinc-600" />
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 transition-transform duration-300 group-hover:scale-110 group-hover:bg-white">
                <Play className="h-6 w-6 fill-black text-black ml-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Trailer Title */}
        <div className="mt-3 px-1">
          <p className="text-sm font-medium text-white line-clamp-2 group-hover:text-gray-200 transition-colors duration-300">
            {name}
          </p>
          {type && (
            <p className="mt-1 text-xs text-gray-500 uppercase tracking-wider">
              {type}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default TrailerCard;

import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import type { Episode } from "@/types";

export interface EpisodeCardProps {
  episode: Episode;
  tvShowId: number;
  seasonNumber: number;
  onClick?: (episode: Episode) => void;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

const EpisodeCard = ({ 
  episode, 
  tvShowId, 
  seasonNumber, 
  onClick 
}: EpisodeCardProps) => {
  // Format the air date
  const formattedAirDate = useMemo(() => {
    if (!episode.air_date) return "TBA";
    try {
      return new Date(episode.air_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return episode.air_date;
    }
  }, [episode.air_date]);

  // Format runtime
  const formattedRuntime = useMemo(() => {
    if (!episode.runtime) return "N/A";
    const hours = Math.floor(episode.runtime / 60);
    const minutes = episode.runtime % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }, [episode.runtime]);

  const handleClick = () => {
    onClick?.(episode);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const imageUrl = episode.still_path
    ? `${IMAGE_BASE_URL}${episode.still_path}`
    : null;

  const episodeLink = `/tv/${tvShowId}/season/${seasonNumber}/episode/${episode.episode_number}`;

  return (
    <Link to={episodeLink} className="block group">
      <div
        className="relative cursor-pointer"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`View episode ${episode.episode_number}: ${episode.name}`}
      >
        {/* Card Container */}
        <div className="relative overflow-hidden rounded-md bg-zinc-900 shadow-lg transition-all duration-300 ease-in-out group-hover:scale-[1.02] group-hover:shadow-2xl">
          {/* Image Container - 16:9 aspect ratio */}
          <div className="relative aspect-video overflow-hidden">
            {imageUrl ? (
              <>
                <OptimizedImage
                  src={imageUrl}
                  alt={episode.name}
                  className="h-full w-full transition-transform duration-300 ease-in-out group-hover:scale-110"
                  objectFit="cover"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-zinc-800">
                <Play className="h-12 w-12 text-zinc-600" />
              </div>
            )}

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
                <Play className="h-5 w-5 fill-black text-black ml-0.5" />
              </div>
            </div>

            {/* Episode Number Badge */}
            <div className="absolute top-2 left-2 rounded bg-black/80 px-2 py-1 text-xs font-semibold text-white">
              E{episode.episode_number}
            </div>
          </div>
        </div>

        {/* Episode Info */}
        <div className="mt-3 space-y-1 px-1">
          {/* Episode Title */}
          <h4 className="text-sm font-medium text-white line-clamp-1 group-hover:text-gray-200 transition-colors duration-300">
            {episode.name}
          </h4>

          {/* Metadata Row */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{formattedRuntime}</span>
            <span>•</span>
            <span>{formattedAirDate}</span>
          </div>

          {/* Overview - Truncated */}
          {episode.overview && (
            <p className="text-xs text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
              {episode.overview}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default EpisodeCard;

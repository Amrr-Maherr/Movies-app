import { memo } from "react";
import { Play } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import type { Episode } from "@/types";

export interface EpisodeLayoutProps {
  episode: Episode;
  title: string;
  imageUrl: string | null;
  formattedRuntime: string;
  formattedAirDate: string;
  isHovered: boolean;
}

/**
 * Episode Layout Component
 * Displays an episode card with play button and episode info
 */
const EpisodeLayout = memo(
  ({
    episode,
    title,
    imageUrl,
    formattedRuntime,
    formattedAirDate,
  }: EpisodeLayoutProps) => {
    return (
      <div className="relative">
        <div className="relative rounded-md bg-zinc-900 shadow-lg transition-all duration-300 ease-in-out group-hover:scale-[1.02] group-hover:shadow-2xl">
          <div className="relative aspect-video">
            {imageUrl ? (
              <>
                <OptimizedImage
                  src={imageUrl}
                  alt={title}
                  className="h-full w-full transition-transform duration-300 ease-in-out "
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-zinc-800">
                <Play className="h-12 w-12 text-zinc-600" />
              </div>
            )}

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 opacity-0 transition-all duration-300 group-hover:opacity-100  shadow-xl">
                <Play className="h-5 w-5 fill-black text-black ml-0.5" />
              </div>
            </div>

            <div className="absolute top-2 left-2 rounded bg-black/80 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              E{episode.episode_number}
            </div>
          </div>
        </div>

        <div className="mt-3 space-y-1 px-1">
          <h4 className="text-sm font-medium text-white line-clamp-1 group-hover:text-[var(--netflix-red)] transition-colors duration-300">
            {title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{formattedRuntime}</span>
            <span>•</span>
            <span>{formattedAirDate}</span>
          </div>
          {episode.overview && (
            <p className="text-xs text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
              {episode.overview}
            </p>
          )}
        </div>
      </div>
    );
  },
);

EpisodeLayout.displayName = "EpisodeLayout";

export default EpisodeLayout;

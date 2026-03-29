/**
 * EpisodeCard Component
 *
 * TV Episode card with still image and episode info.
 * Features:
 * - Episode still image
 * - Episode number and title
 * - Air date and runtime
 * - Link to episode detail page
 */

import { memo } from "react";
import { Link } from "react-router-dom";
import OptimizedImage from "@/components/ui/OptimizedImage";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { useEpisodeDerivedValues } from "../hooks";
import type { EpisodeCardProps } from "../types";

const EpisodeCard = memo(
  ({ episode, tvShowId, seasonNumber, onClick }: EpisodeCardProps) => {
    const {
      imageUrl: episodeImageUrl,
      link: episodeLink,
      airDate: episodeAirDate,
      runtime: episodeRuntime,
    } = useEpisodeDerivedValues(episode, tvShowId, seasonNumber);

    const title = episode?.name || "Episode";

    return (
      <LazyWrapper height={250}>
        <Link
          to={episodeLink}
          className="block group"
          onClick={onClick ? () => onClick() : undefined}
        >
          <div className="relative aspect-video overflow-hidden rounded mb-2">
            {episodeImageUrl ? (
              <OptimizedImage
                src={episodeImageUrl}
                alt={title}
                className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                objectFit="cover"
              />
            ) : (
              <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                <span className="text-zinc-600 text-sm">No Image</span>
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                Watch Episode
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-medium text-white line-clamp-2 group-hover:text-gray-300 transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>{episodeAirDate}</span>
              <span>•</span>
              <span>{episodeRuntime}</span>
            </div>
          </div>
        </Link>
      </LazyWrapper>
    );
  },
);

EpisodeCard.displayName = "EpisodeCard";

export default EpisodeCard;

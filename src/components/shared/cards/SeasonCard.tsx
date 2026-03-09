import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, Film } from "lucide-react";
import type { Season } from "@/types";

export interface SeasonCardProps {
  season: Season;
  tvShowId: number;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const SeasonCard = ({ season, tvShowId }: SeasonCardProps) => {
  // Format the air date
  const formattedAirDate = useMemo(() => {
    if (!season.air_date) return "TBA";
    try {
      return new Date(season.air_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
    } catch {
      return season.air_date;
    }
  }, [season.air_date]);

  const imageUrl = season.poster_path
    ? `${IMAGE_BASE_URL}${season.poster_path}`
    : null;

  const detailsUrl = `/tv/${tvShowId}/season/${season.season_number}`;

  return (
    <Link to={detailsUrl} className="block group">
      <div
        className="relative overflow-hidden rounded-lg bg-zinc-900 shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl"
        role="button"
        tabIndex={0}
        aria-label={`View ${season.name}`}
      >
        {/* Image Container */}
        <div className="relative aspect-[2/3] overflow-hidden">
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt={season.name}
                className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                loading="lazy"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-800">
              <Film className="h-16 w-16 text-zinc-600" />
            </div>
          )}

          {/* Season Number Badge */}
          <div className="absolute top-2 left-2 rounded bg-black/80 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
            Season {season.season_number}
          </div>

          {/* View Details Button - Shows on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-black shadow-lg">
              View Details
            </div>
          </div>
        </div>

        {/* Season Info */}
        <div className="p-3">
          {/* Season Name */}
          <h4 className="text-sm font-semibold text-white line-clamp-1 group-hover:text-gray-200 transition-colors duration-300">
            {season.name}
          </h4>

          {/* Metadata Row */}
          <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
            {/* Episode Count */}
            <div className="flex items-center gap-1.5">
              <Film className="h-3.5 w-3.5" />
              <span>{season.episode_count} Episodes</span>
            </div>

            {/* Air Date */}
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formattedAirDate}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SeasonCard;

import { memo } from "react";
import { Film, Calendar } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import type { Season } from "@/types";

export interface SeasonLayoutProps {
  season: Season;
  title: string;
  imageUrl: string | null;
  formattedAirDate: string;
  isHovered: boolean;
}

/**
 * Season Layout Component
 * Displays a TV season card with episode count and air date
 */
const SeasonLayout = memo(
  ({ season, title, imageUrl, formattedAirDate }: SeasonLayoutProps) => {
    return (
      <div className="relative">
        <div className="relative rounded-lg bg-zinc-900 shadow-lg transition-all duration-300 ease-in-out group-hover:scale-[1.02] group-hover:shadow-2xl">
          <div className="relative aspect-[2/3]">
            {imageUrl ? (
              <>
                <OptimizedImage
                  src={imageUrl}
                  alt={title}
                  className="h-full w-full transition-transform duration-300 ease-in-out "
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-zinc-800">
                <Film className="h-16 w-16 text-zinc-600" />
              </div>
            )}
            <div className="absolute top-2 left-2 rounded bg-black/80 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
              Season {season.season_number}
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-black shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                View Details
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 p-1">
          <h4 className="text-sm font-semibold text-white line-clamp-1 group-hover:text-[var(--netflix-red)] transition-colors duration-300">
            {title}
          </h4>
          <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <Film className="h-3.5 w-3.5" />
              <span>{season.episode_count} Episodes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formattedAirDate}</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

SeasonLayout.displayName = "SeasonLayout";

export default SeasonLayout;

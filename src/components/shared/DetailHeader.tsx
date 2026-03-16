import { memo } from "react";
import { Tv, DollarSign } from "lucide-react";
import type { MovieDetailsResponse, TVDetailsResponse } from "@/services";

interface WatchProviderStats {
  flatrate?: { length: number };
  rent?: { length: number };
  buy?: { length: number };
  free?: { length: number };
}

interface DetailHeaderProps {
  media: MovieDetailsResponse | TVDetailsResponse;
  providerCount?: number;
  providers?: WatchProviderStats;
  type?: "movie" | "tv";
}

/**
 * Get title from media (movie title or TV show name)
 */
function getTitle(
  media: MovieDetailsResponse | TVDetailsResponse,
  type: "movie" | "tv",
): string {
  return type === "movie"
    ? (media as MovieDetailsResponse).title
    : (media as TVDetailsResponse).name;
}

/**
 * Get release date from media
 */
function getReleaseDate(
  media: MovieDetailsResponse | TVDetailsResponse,
  type: "movie" | "tv",
): string {
  return type === "movie"
    ? (media as MovieDetailsResponse).release_date
    : (media as TVDetailsResponse).first_air_date;
}

/**
 * Get runtime/seasons info from media
 */
function getRuntimeInfo(
  media: MovieDetailsResponse | TVDetailsResponse,
  type: "movie" | "tv",
): { value: number; label: string } {
  if (type === "movie") {
    return { value: (media as MovieDetailsResponse).runtime, label: "min" };
  } else {
    const seasons = (media as TVDetailsResponse).number_of_seasons;
    return { value: seasons, label: seasons === 1 ? "Season" : "Seasons" };
  }
}

/**
 * DetailHeader Component
 *
 * Reusable header component for detail pages showing:
 * - Media poster
 * - Title and metadata
 * - Provider statistics (optional)
 */
const DetailHeader = memo(function DetailHeader({
  media,
  providerCount,
  providers,
  type = "movie",
}: DetailHeaderProps) {
  const title = getTitle(media, type);
  const releaseDate = getReleaseDate(media, type);
  const { value: runtime, label: runtimeLabel } = getRuntimeInfo(media, type);
  const genres = media.genres
    ?.slice(0, 3)
    .map((g) => g.name)
    .join(", ");

  return (
    <section className="relative bg-gradient-to-b from-black via-neutral-900/95 to-neutral-900 py-12 md:py-16 border-b border-white/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent opacity-50" />

      <div className="relative container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 lg:gap-10">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w342${media.poster_path}`}
              alt={title}
              className="w-40 md:w-48 lg:w-90 h-[24rem] md:h-[28rem] lg:h-[32rem] object-cover rounded-xl shadow-2xl shadow-black/50 border border-white/10"
              loading="lazy"
            />
          </div>

          {/* Info */}
          <div className="flex-1 pt-4 md:pt-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight drop-shadow-lg">
              {title}
            </h1>
            <p className="text-white/70 text-sm md:text-base mb-6 flex items-center gap-2 flex-wrap">
              <span className="text-white/90 font-medium">
                {releaseDate?.substring(0, 4)}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-white/90 font-medium">
                {runtime} {runtimeLabel}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-white/90 font-medium">{genres}</span>
            </p>

            {/* Stats */}
            {providerCount !== undefined && providers && (
              <div className="flex flex-wrap gap-3 md:gap-4">
                {/* Total Providers */}
                <div className="group flex items-center gap-2.5 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20 hover:border-red-500/50 transition-all duration-300 hover:scale-105">
                  <div className="p-2 bg-red-600/20 rounded-lg group-hover:bg-red-600/30 transition-colors">
                    <Tv className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">{providerCount}</p>
                    <p className="text-white/60 text-xs uppercase tracking-wide">Providers</p>
                  </div>
                </div>

                {/* Subscription */}
                {providers.flatrate && (
                  <div className="group flex items-center gap-2.5 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20 hover:border-green-500/50 transition-all duration-300 hover:scale-105">
                    <div className="p-2 bg-green-600/20 rounded-lg group-hover:bg-green-600/30 transition-colors">
                      <Tv className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">{providers.flatrate.length}</p>
                      <p className="text-white/60 text-xs uppercase tracking-wide">Subscription</p>
                    </div>
                  </div>
                )}

                {/* Rent */}
                {providers.rent && (
                  <div className="group flex items-center gap-2.5 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
                    <div className="p-2 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/30 transition-colors">
                      <DollarSign className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">{providers.rent.length}</p>
                      <p className="text-white/60 text-xs uppercase tracking-wide">Rent</p>
                    </div>
                  </div>
                )}

                {/* Buy */}
                {providers.buy && (
                  <div className="group flex items-center gap-2.5 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105">
                    <div className="p-2 bg-yellow-600/20 rounded-lg group-hover:bg-yellow-600/30 transition-colors">
                      <DollarSign className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">{providers.buy.length}</p>
                      <p className="text-white/60 text-xs uppercase tracking-wide">Buy</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default DetailHeader;

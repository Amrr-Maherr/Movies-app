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
    <section className="bg-gradient-to-b from-black to-neutral-900 py-8 border-b border-white/10">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w342${media.poster_path}`}
            alt={title}
            className="w-32 h-48 object-cover rounded-lg shadow-2xl"
            loading="lazy"
          />

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {title}
            </h1>
            <p className="text-white/60 text-sm mb-4">
              {releaseDate?.substring(0, 4)} • {runtime} {runtimeLabel} •{" "}
              {genres}
            </p>

            {/* Stats */}
            {providerCount !== undefined && providers && (
              <div className="flex flex-wrap gap-4">
                {/* Total Providers */}
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                  <Tv className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-white font-bold">{providerCount}</p>
                    <p className="text-white/60 text-xs">Providers</p>
                  </div>
                </div>

                {/* Subscription */}
                {providers.flatrate && (
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                    <Tv className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-white font-bold">
                        {providers.flatrate.length}
                      </p>
                      <p className="text-white/60 text-xs">Subscription</p>
                    </div>
                  </div>
                )}

                {/* Rent */}
                {providers.rent && (
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                    <DollarSign className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-white font-bold">
                        {providers.rent.length}
                      </p>
                      <p className="text-white/60 text-xs">Rent</p>
                    </div>
                  </div>
                )}

                {/* Buy */}
                {providers.buy && (
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                    <DollarSign className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="text-white font-bold">
                        {providers.buy.length}
                      </p>
                      <p className="text-white/60 text-xs">Buy</p>
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

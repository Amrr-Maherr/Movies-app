import { memo } from "react";
import { Heart, TrendingUp, Star } from "lucide-react";
import type { MovieDetailsResponse, TVDetailsResponse } from "@/services";

interface RecommendationHeaderProps {
  media: MovieDetailsResponse | TVDetailsResponse;
  recommendationsCount: number;
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
 * RecommendationHeader Component
 *
 * Reusable header component for recommendations pages showing:
 * - Media poster
 * - Title and metadata
 * - Recommendation statistics
 */
const RecommendationHeader = memo(function RecommendationHeader({
  media,
  recommendationsCount,
  type = "movie",
}: RecommendationHeaderProps) {
  const title = getTitle(media, type);
  const releaseDate = getReleaseDate(media, type);
  const { value: runtime, label: runtimeLabel } = getRuntimeInfo(media, type);
  const genres = media.genres
    ?.slice(0, 3)
    .map((g) => g.name)
    .join(", ");
  const voteAverage = media.vote_average?.toFixed(1) || "N/A";
  const popularity = Math.round(media.popularity || 0);

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
            <div className="flex flex-wrap gap-4">
              {/* Recommendations Count */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-red-600/20 to-red-600/10 px-4 py-2 rounded-lg border border-red-600/30">
                <Heart className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-white font-bold">{recommendationsCount}</p>
                  <p className="text-white/60 text-xs">Recommendations</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Star className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-white font-bold">{voteAverage}</p>
                  <p className="text-white/60 text-xs">Rating</p>
                </div>
              </div>

              {/* Popularity */}
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-white font-bold">{popularity}</p>
                  <p className="text-white/60 text-xs">Popularity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default RecommendationHeader;

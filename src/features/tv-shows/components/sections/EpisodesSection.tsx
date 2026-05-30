import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { Film, Calendar } from "lucide-react";
import type { Season } from "@/types";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { getLocalizedLink } from "@/lib/utils/i18n";
import { useTranslation } from "react-i18next";

interface EpisodesSectionProps {
  seasons: Season[];
  tvShowId: number;
  tvShowName?: string;
}

function SeasonCard({ season, tvShowId, tvShowName }: { season: Season; tvShowId: number; tvShowName?: string }) {
  const { t } = useTranslation();
  const slug = tvShowName
    ?.toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .trim() || "series";

  const imageUrl = season.poster_path
    ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
    : null;
  const airDate = season.air_date
    ? new Date(season.air_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "TBA";

  return (
    <Link
      to={getLocalizedLink(`/series/${slug}/${tvShowId}/season/${season.season_number}`)}
      className="block group"
    >
      <div className="relative">
        <div className="relative rounded-lg bg-zinc-900 shadow-lg transition-all duration-300 ease-in-out group-hover:shadow-2xl">
          <div className="relative aspect-[2/3]">
            {imageUrl ? (
              <>
                <OptimizedImage
                  src={imageUrl}
                  alt={season.name}
                  className="h-full w-full transition-transform duration-300 ease-in-out"
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
              {t("media.season")} {season.season_number}
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
            {season.name}
          </h4>
          <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <Film className="h-3.5 w-3.5" />
              <span>{season.episode_count} {t("media.episodes")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{airDate}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

const EpisodesSection = memo(function EpisodesSection({
  seasons,
  tvShowId,
  tvShowName,
}: EpisodesSectionProps) {
  const sortedSeasons = useMemo(() => {
    return seasons
      .filter((season) => season.season_number > 0)
      .sort((a, b) => a.season_number - b.season_number);
  }, [seasons]);

  if (!sortedSeasons || sortedSeasons.length === 0) {
    return null;
  }

  return (
    <section className="bg-black py-4 md:py-12">
      <div className="container pt-8">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
          Seasons
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {sortedSeasons.map((season) => (
            <SeasonCard key={season.id} season={season} tvShowId={tvShowId} tvShowName={tvShowName} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default EpisodesSection;

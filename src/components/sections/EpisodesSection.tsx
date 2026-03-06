import { useState, useCallback, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Slider from "@/components/shared/Slider/slider";
import EpisodeCard from "@/components/shared/cards/EpisodeCard";
import { GetSeasonEpisodes } from "@/api/GetSeasonEpisodes";
import type { Season, Episode } from "@/types";

interface EpisodesSectionProps {
  seasons: Season[];
  tvShowId: number;
}

const EpisodesSection = ({ seasons, tvShowId }: EpisodesSectionProps) => {
  // Track which seasons are expanded
  const [expandedSeasons, setExpandedSeasons] = useState<Set<number>>(
    new Set([1]) // Default to first season expanded
  );

  // Store episodes for each season
  const [seasonEpisodes, setSeasonEpisodes] = useState<
    Record<number, Episode[]>
  >({});

  // Track loading states for each season
  const [loadingSeasons, setLoadingSeasones] = useState<Set<number>>(
    new Set()
  );

  // Fetch episodes when a season is expanded
  useEffect(() => {
    const fetchEpisodes = async () => {
      const seasonsToFetch = [...expandedSeasons].filter(
        (seasonNum) =>
          !seasonEpisodes[seasonNum] && !loadingSeasons.has(seasonNum)
      );

      for (const seasonNum of seasonsToFetch) {
        setLoadingSeasones((prev) => new Set(prev).add(seasonNum));

        try {
          const episodes = await GetSeasonEpisodes(tvShowId, seasonNum);
          if (episodes) {
            setSeasonEpisodes((prev) => ({ ...prev, [seasonNum]: episodes }));
          }
        } catch (error) {
          console.error(`Failed to fetch episodes for season ${seasonNum}:`, error);
        } finally {
          setLoadingSeasones((prev) => {
            const next = new Set(prev);
            next.delete(seasonNum);
            return next;
          });
        }
      }
    };

    if (tvShowId) {
      fetchEpisodes();
    }
  }, [expandedSeasons, tvShowId]);

  // Toggle season expansion
  const toggleSeason = useCallback((seasonNumber: number) => {
    setExpandedSeasons((prev) => {
      const next = new Set(prev);
      if (next.has(seasonNumber)) {
        next.delete(seasonNumber);
      } else {
        next.add(seasonNumber);
      }
      return next;
    });
  }, []);

  // Filter out special seasons (season 0) and sort by season number
  const sortedSeasons = seasons
    .filter((season) => season.season_number > 0)
    .sort((a, b) => a.season_number - b.season_number);

  if (!sortedSeasons || sortedSeasons.length === 0) {
    return null;
  }

  return (
    <section className="bg-black py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
          Episodes
        </h3>

        <div className="space-y-6">
          {sortedSeasons.map((season) => {
            const isExpanded = expandedSeasons.has(season.season_number);
            const episodes = seasonEpisodes[season.season_number] || [];
            const isLoading = loadingSeasons.has(season.season_number);
            const hasEpisodes = episodes.length > 0;

            return (
              <div
                key={season.id}
                className="overflow-hidden rounded-lg bg-zinc-900/50"
              >
                {/* Season Header */}
                <button
                  onClick={() => toggleSeason(season.season_number)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleSeason(season.season_number);
                    }
                  }}
                  className="flex w-full items-center justify-between px-4 py-4 text-left transition-colors duration-200 hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                  aria-expanded={isExpanded}
                  aria-controls={`season-${season.season_number}-content`}
                >
                  <div className="flex items-center gap-4">
                    {/* Season Poster (small thumbnail) */}
                    {season.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${season.poster_path}`}
                        alt={season.name}
                        className="h-20 w-14 rounded object-cover shadow-md"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-20 w-14 items-center justify-center rounded bg-zinc-800">
                        <span className="text-xs text-gray-500">
                          S{season.season_number}
                        </span>
                      </div>
                    )}

                    {/* Season Info */}
                    <div>
                      <h4 className="text-lg font-semibold text-white">
                        {season.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {season.episode_count} Episodes •{" "}
                        {season.air_date
                          ? new Date(season.air_date).getFullYear()
                          : "TBA"}
                      </p>
                    </div>
                  </div>

                  {/* Expand/Collapse Icon */}
                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="hidden text-sm md:inline">
                      {isExpanded ? "Hide" : "Show"} Episodes
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-6 w-6" />
                    ) : (
                      <ChevronDown className="h-6 w-6" />
                    )}
                  </div>
                </button>

                {/* Episodes Content */}
                {isExpanded && (
                  <div
                    id={`season-${season.season_number}-content`}
                    className="border-t border-zinc-800 px-4 py-4"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      </div>
                    ) : hasEpisodes ? (
                      <Slider
                        slidesPerView={4}
                        slidesPerViewMobile={1}
                        spaceBetween={16}
                        hideNavigation={false}
                      >
                        {episodes.map((episode) => (
                          <EpisodeCard
                            key={episode.id}
                            episode={episode}
                            tvShowId={tvShowId}
                            seasonNumber={season.season_number}
                          />
                        ))}
                      </Slider>
                    ) : (
                      <div className="flex items-center justify-center py-8 text-gray-400">
                        <p>Episode details coming soon...</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EpisodesSection;

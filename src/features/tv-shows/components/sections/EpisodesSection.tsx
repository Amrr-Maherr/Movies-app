import { memo, useMemo } from "react";
import { Card } from "@/components/shared/Card";
import type { Season } from "@/types";

interface EpisodesSectionProps {
  seasons: Season[];
  tvShowId: number;
}

const EpisodesSection = memo(function EpisodesSection({
  seasons,
  tvShowId,
}: EpisodesSectionProps) {
  // Memoized: Filter and sort seasons to avoid re-computation on every render
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
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl pt-8">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
          Seasons
        </h3>

        {/* Responsive Grid: 1 column mobile, 2 tablet, 3-4 desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {sortedSeasons.map((season) => (
            <Card
              key={season.id}
              variant="season"
              season={season}
              tvShowId={tvShowId}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default EpisodesSection;

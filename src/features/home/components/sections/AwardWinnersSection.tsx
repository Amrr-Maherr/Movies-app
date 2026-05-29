import { memo, useMemo } from "react";
import { Award } from "lucide-react";
import Card from "@/components/shared/Card/Card";
import SectionHeader from "@/components/shared/SectionHeader";
import type { HeroMedia } from "@/types";

interface AwardWinnersSectionProps {
  movies: HeroMedia[];
  mediaType: "movie" | "tv";
}

const AwardWinnersSection = memo(function AwardWinnersSection({
  movies,
  mediaType,
}: AwardWinnersSectionProps) {
  const items = useMemo(() => movies, [movies]);

  return (
    <div className="bg-gradient-to-b from-zinc-900 to-black py-4 md:py-6">
      <div className="container">
        <SectionHeader
          title={`Award-Winning ${mediaType === "movie" ? "Movies" : "Series"}`}
          icon={Award}
          iconColor="text-yellow-500"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {items.map((movie) => (
            <Card key={movie.id} movie={movie} variant="awardWinner" />
          ))}
        </div>
      </div>
    </div>
  );
});

export default AwardWinnersSection;

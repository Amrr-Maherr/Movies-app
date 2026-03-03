import { Award } from "lucide-react";
import Card from "@/components/shared/Card/Card";
import type { HeroMedia } from "@/types";

interface AwardWinnersSectionProps {
  movies: HeroMedia[];
  mediaType: "movie" | "tv";
}

export default function AwardWinnersSection({ movies, mediaType }: AwardWinnersSectionProps) {
  const items = movies.slice(0, 6);

  return (
    <div className="bg-gradient-to-b from-zinc-900 to-black py-6 md:py-8">
      <div className="container">
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <Award className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Award-Winning {mediaType === "movie" ? "Movies" : "Series"}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {items.map((movie) => (
            <Card
              key={movie.id}
              movie={movie}
              variant="awardWinner"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

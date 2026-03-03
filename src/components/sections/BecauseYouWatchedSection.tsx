import Card from "@/components/shared/Card/Card";
import type { HeroMedia } from "@/types";

interface BecauseYouWatchedSectionProps {
  movies: HeroMedia[];
  basedOn?: string;
  mediaType: "movie" | "tv";
}

export default function BecauseYouWatchedSection({
  movies,
  basedOn = "Popular Movies",
  mediaType
}: BecauseYouWatchedSectionProps) {
  const items = movies.slice(0, 6);

  return (
    <div className="py-6 md:py-8">
      <div className="container">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
          Because You Watched <span className="text-gray-400">{basedOn}</span>
        </h2>
        <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6">
          More titles we think you'll love
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
          {items.map((movie) => (
            <Card
              key={movie.id}
              movie={movie}
              variant="recommendation"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

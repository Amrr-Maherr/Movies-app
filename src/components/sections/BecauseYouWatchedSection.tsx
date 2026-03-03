import Card from "@/components/shared/Card/Card";
import SectionHeader from "@/components/shared/SectionHeader";
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
        <SectionHeader
          title="Because You Watched"
          subtitle="More titles we think you'll love"
        />
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

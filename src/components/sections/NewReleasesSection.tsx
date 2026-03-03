import Card from "@/components/shared/Card/Card";
import type { HeroMedia } from "@/types";

interface NewReleasesSectionProps {
  movies: HeroMedia[];
  title?: string;
  mediaType: "movie" | "tv";
}

export default function NewReleasesSection({
  movies,
  title = "New Releases",
  mediaType
}: NewReleasesSectionProps) {
  const items = movies.slice(0, 8);

  return (
    <div className="py-6 md:py-8">
      <div className="container">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white">
            {title}
          </h2>
          <span className="text-xs md:text-sm text-red-500 font-semibold uppercase tracking-wider">
            Just Added
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {items.map((movie) => (
            <Card
              key={movie.id}
              movie={movie}
              variant="newRelease"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

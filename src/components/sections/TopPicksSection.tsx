import Card from "@/components/shared/Card/Card";
import type { HeroMedia } from "@/types";

interface TopPicksSectionProps {
  movies: HeroMedia[];
  title?: string;
  mediaType: "movie" | "tv";
}

export default function TopPicksSection({ movies, title = "Top 10 in Egypt Today", mediaType }: TopPicksSectionProps) {
  const topMovies = movies.slice(0, 10);

  return (
    <div className="py-6 md:py-8">
      <div className="container">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
          {title}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
          {topMovies.map((movie, index) => (
            <Card
              key={movie.id}
              movie={movie}
              variant="top10"
              rank={index + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

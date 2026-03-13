import { memo, useMemo } from "react";
import { Popcorn } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { Card } from "@/components/shared/Card";
import type { HeroMedia } from "@/types";

interface WeekendWatchSectionProps {
  movies: HeroMedia[];
  mediaType: "movie" | "tv";
}

// Memoized WeekendWatchSection component - avoids re-renders when parent updates
const WeekendWatchSection = memo(function WeekendWatchSection({
  movies,
  mediaType,
}: WeekendWatchSectionProps) {
  // Memoized: Get featured movie and side movies
  const { featuredMovie, sideMovies } = useMemo(() => {
    if (!movies || movies.length === 0) {
      return { featuredMovie: null, sideMovies: [] };
    }
    return {
      featuredMovie: movies[0],
      sideMovies: movies.slice(1, 5),
    };
  }, [movies]);

  if (!featuredMovie) return null;

  return (
    <div className="bg-gradient-to-b from-black via-zinc-900 to-black py-6 md:py-8">
      <div className="container">
        <SectionHeader
          title="Perfect for the Weekend"
          icon={Popcorn}
          iconColor="text-yellow-400"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Featured Movie */}
          <div className="lg:col-span-2">
            <Card
              variant="showcase"
              movie={featuredMovie}
              mediaType={mediaType}
              isFeatured
            />
          </div>

          {/* Side Movies Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4">
            {sideMovies.map((movie) => (
              <Card
                key={movie.id}
                variant="horizontal"
                movie={movie}
                mediaType={mediaType}
                plainLayout
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default WeekendWatchSection;

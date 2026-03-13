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
    <div className="relative py-8 md:py-12 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Decorative top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container">
        <SectionHeader
          title="Perfect for the Weekend"
          icon={Popcorn}
          iconColor="text-yellow-400"
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
          {/* Featured — spans 2 columns */}
          <div className="lg:col-span-2 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/5">
            <Card
              variant="showcase"
              movie={featuredMovie}
              mediaType={mediaType}
              isFeatured
            />
          </div>

          {/* Side stack */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
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
      {/* Decorative bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
});

export default WeekendWatchSection;

import { memo, useMemo } from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import { Card } from "@/components/shared/Card";
import type { HeroMedia } from "@/types";

interface GenreShowcaseSectionProps {
  movies: HeroMedia[];
  genre: string;
  mediaType: "movie" | "tv";
}

// Memoized GenreShowcaseSection component - avoids re-renders when parent updates
const GenreShowcaseSection = memo(function GenreShowcaseSection({
  movies,
  genre,
  mediaType,
}: GenreShowcaseSectionProps) {
  // Memoized: Get showcase movie and side movies
  const { showcaseMovie, sideMovies } = useMemo(() => {
    if (!movies || movies.length === 0) {
      return { showcaseMovie: null, sideMovies: [] };
    }
    return {
      showcaseMovie: movies[0],
      sideMovies: movies.slice(1, 4),
    };
  }, [movies]);

  if (!showcaseMovie) return null;

  return (
    <div className="relative py-8 md:py-12">
      <div className="container">
        <SectionHeader
          title={genre}
          actionLabel="Explore All"
          actionHref={mediaType === "movie" ? "/movies" : "/tv"}
        />

        {/* Bento Grid — 2/3 + 1/3 split */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {/* Main Showcase — tall card */}
          <div className="md:col-span-2 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/5">
            <Card
              variant="showcase"
              movie={showcaseMovie}
              mediaType={mediaType}
              isNew
              aspectRatio="aspect-video md:aspect-[16/10]"
            />
          </div>

          {/* Side stack — 3 landscape cards */}
          <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
            {sideMovies.map((movie: HeroMedia) => (
              <div key={movie.id} className="rounded-xl overflow-hidden shadow-lg ring-1 ring-white/5">
                <Card
                  variant="landscape"
                  movie={movie}
                  mediaType={mediaType}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default GenreShowcaseSection;

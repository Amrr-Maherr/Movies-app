import { memo, useMemo } from "react";
import Card from "@/components/shared/Card/Card";
import SectionHeader from "@/components/shared/SectionHeader";
import type { HeroMedia } from "@/types";

interface BecauseYouWatchedSectionProps {
  movies: HeroMedia[];
  basedOn?: string;
  mediaType: "movie" | "tv";
}

// Memoized BecauseYouWatchedSection component - avoids re-renders when parent updates
const BecauseYouWatchedSection = memo(
  function BecauseYouWatchedSection({
    movies,
    basedOn = "Popular Movies",
  }: BecauseYouWatchedSectionProps) {
    // Memoized: Get first 6 items - avoids array slicing on every render
    const items = useMemo(() => movies.slice(0, 6), [movies]);

    return (
      <div className="py-6 md:py-8">
        <div className="container">
          <SectionHeader
            title="Because You Watched"
            subtitle={`Based on ${basedOn}`}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
            {items.map((movie) => (
              <Card key={movie.id} movie={movie} variant="recommendation" />
            ))}
          </div>
        </div>
      </div>
    );
  },
);

export default BecauseYouWatchedSection;

import { memo, useMemo, useState } from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import { Card } from "@/components/shared/Card";
import type { HeroMedia } from "@/types";

interface ContinueWatchingSectionProps {
  movies: HeroMedia[];
  title?: string;
  mediaType: "movie" | "tv";
}

// Memoized ContinueWatchingSection component - avoids re-renders when parent updates
const ContinueWatchingSection = memo(function ContinueWatchingSection({
  movies,
  title = "Continue Watching",
  mediaType,
}: ContinueWatchingSectionProps) {
  // State for progress bars (random values generated once)
  const [progressValues] = useState(() =>
    Array.from({ length: 6 }, () => Math.random() * 60 + 20),
  );

  // Memoized: Get first 6 items
  const items = useMemo(() => {
    return movies.slice(0, 6).map((movie: HeroMedia, index: number) => ({
      movie,
      progress: progressValues[index] || 50,
    }));
  }, [movies, progressValues]);

  return (
    <div className="py-6 md:py-8">
      <div className="container">
        <SectionHeader title={title} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {items.map(({ movie, progress }: { movie: HeroMedia; progress: number }) => (
            <Card
              key={movie.id}
              variant="continueWatching"
              movie={movie}
              mediaType={mediaType}
              progress={progress}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default ContinueWatchingSection;

import { memo, useMemo } from "react";
import { Sparkles } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { Card } from "@/components/shared/Card";
import type { HeroMedia } from "@/types";

interface OnlyOnNetflixSectionProps {
  movies: HeroMedia[];
  mediaType: "movie" | "tv";
}

// Memoized OnlyOnNetflixSection component - avoids re-renders when parent updates
const OnlyOnNetflixSection = memo(function OnlyOnNetflixSection({
  movies,
  mediaType,
}: OnlyOnNetflixSectionProps) {
  // Memoized: Get first 5 items
  const items = useMemo(() => {
    return movies.slice(0, 5);
  }, [movies]);

  return (
    <div className="py-6 md:py-8">
      <div className="container">
        <SectionHeader
          title="Only on Netflix"
          icon={Sparkles}
          iconColor="text-red-600"
        />

        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {items.map((movie) => (
            <Card
              key={movie.id}
              variant="horizontal"
              movie={movie}
              mediaType={mediaType}
              isOriginal
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default OnlyOnNetflixSection;

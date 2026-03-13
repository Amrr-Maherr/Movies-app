import { memo, useMemo } from "react";
import { Flame } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { Card } from "@/components/shared/Card";
import type { HeroMedia } from "@/types";

interface BingeWorthySectionProps {
  movies: HeroMedia[];
  mediaType: "movie" | "tv";
}

// Memoized BingeWorthySection component - avoids re-renders when parent updates
const BingeWorthySection = memo(function BingeWorthySection({
  movies,
  mediaType,
}: BingeWorthySectionProps) {
  // Memoized: Get first 5 items
  const items = useMemo(() => {
    return movies.slice(0, 5);
  }, [movies]);

  return (
    <div className="py-6 md:py-8">
      <div className="container">
        <SectionHeader
          title={`Binge-Worthy ${mediaType === "movie" ? "Movies" : "Series"}`}
          icon={Flame}
          iconColor="text-orange-500"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
          {items.map((movie) => (
            <Card
              key={movie.id}
              variant="landscape"
              movie={movie}
              mediaType={mediaType}
              isHot
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default BingeWorthySection;

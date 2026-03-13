import { memo, useMemo } from "react";
import Card from "@/components/shared/Card/Card";
import SectionHeader from "@/components/shared/SectionHeader";
import type { HeroMedia } from "@/types";

interface NewReleasesSectionProps {
  movies: HeroMedia[];
  title?: string;
}

// Memoized NewReleasesSection component - avoids re-renders when parent updates
const NewReleasesSection = memo(function NewReleasesSection({
  movies,
  title = "New Releases",
}: NewReleasesSectionProps) {
  // Memoized: Get first 4 items - reduced for better performance
  const items = useMemo(() => movies.slice(0, 4), [movies]);

  return (
    <div className="py-6 md:py-8">
      <div className="container">
        <SectionHeader title={title} badgeText="Just Added" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {items.map((movie) => (
            <Card key={movie.id} movie={movie} variant="newRelease" />
          ))}
        </div>
      </div>
    </div>
  );
});

export default NewReleasesSection;

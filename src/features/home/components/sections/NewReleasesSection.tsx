import { memo, useMemo, lazy, Suspense } from "react";
import { SectionSkeleton } from "@/components/ui";
import { OptimizedSectionWrapper } from "@/components/optimized-section-wrapper";
import Card from "@/components/shared/Card/Card";
import SectionHeader from "@/components/shared/SectionHeader";
import type { HeroMedia } from "@/types";

// Lazy-loaded component
const Slider = lazy(() => import("@/components/shared/Slider/slider"));

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
  const items = useMemo(() => movies, [movies]);

  return (
    <div className="py-6 md:py-8">
      <div className="container">
        <SectionHeader title={title} badgeText="Just Added" />
        <OptimizedSectionWrapper
          data={items}
          isLoading={false}
          fallback={<SectionSkeleton variant="grid" cardCount={6} />}
          height={350}
          title={title}
        >
          {(moviesData) => (
            <Slider
              slidesPerView={4}
              hideNavigation={false}
              slidesPerViewMobile={1.5}
            >
              {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4"> */}
              {moviesData.map((movie) => (
                <Card key={movie.id} movie={movie} variant="newRelease" />
              ))}
            </Slider>
          )}
        </OptimizedSectionWrapper>
        {/* </div> */}
      </div>
    </div>
  );
});

export default NewReleasesSection;

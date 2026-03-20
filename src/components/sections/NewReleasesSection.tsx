import { memo, useMemo, lazy, Suspense } from "react";
import { SectionSkeleton } from "@/components/ui";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import Card from "@/components/shared/Card/Card";
import SectionHeader from "@/components/shared/SectionHeader";
import type { HeroMedia } from "@/types";

// Lazy-loaded component
const Slider = lazy(() => import("../shared/Slider/slider"));

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
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
          <LazyWrapper height={350}>
            <Slider
              slidesPerView={6}
              hideNavigation={false}
              slidesPerViewMobile={1.5}
            >
              {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4"> */}
              {items.map((movie) => (
                <Card key={movie.id} movie={movie} variant="newRelease" />
              ))}
            </Slider>
          </LazyWrapper>
        </Suspense>
        {/* </div> */}
      </div>
    </div>
  );
});

export default NewReleasesSection;

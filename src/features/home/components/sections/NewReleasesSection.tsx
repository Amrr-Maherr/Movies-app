import { memo, useMemo, lazy } from "react";
import Card from "@/components/shared/Card/Card";
import SectionHeader from "@/components/shared/SectionHeader";
import type { HeroMedia } from "@/types";

const Slider = lazy(() => import("@/components/shared/Slider/slider"));

interface NewReleasesSectionProps {
  movies: HeroMedia[];
  title?: string;
}

const NewReleasesSection = memo(function NewReleasesSection({
  movies,
  title = "New Releases",
}: NewReleasesSectionProps) {
  const items = useMemo(() => movies, [movies]);

  return (
    <div className="py-4 md:py-6">
      <div className="container">
        <SectionHeader title={title} badgeText="Just Added" />
        <Slider
          slidesPerView={4}
          hideNavigation={false}
          slidesPerViewMobile={1.5}
        >
          {items.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </Slider>
      </div>
    </div>
  );
});

export default NewReleasesSection;

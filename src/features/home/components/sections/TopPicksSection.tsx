import { memo, useMemo, lazy } from "react";
import Card from "@/components/shared/Card/Card";
import SectionHeader from "@/components/shared/SectionHeader";
import type { HeroMedia } from "@/types";

// Lazy-loaded component
const Slider = lazy(() => import("@/components/shared/Slider/slider"));

interface TopPicksSectionProps {
  movies: HeroMedia[];
  title?: string;
}

const TopPicksSection = memo(function TopPicksSection({
  movies,
  title = "Top 10 in Egypt Today",
}: TopPicksSectionProps) {
  const topMovies = useMemo(() => movies, [movies]);

  return (
    <div className="py-4 md:py-6">
      <div className="container">
        <SectionHeader title={title} />
        <Slider
          slidesPerView={4}
          hideNavigation={false}
          slidesPerViewMobile={1.5}
        >
          {topMovies.map((movie, index) => (
            <Card
              key={movie.id}
              movie={movie}
              rank={index + 1}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
});

export default TopPicksSection;

import { memo, useMemo } from "react";
import Card from "@/components/shared/Card/Card";
import Slider from "@/components/shared/Slider/slider";
import type { HeroMedia } from "@/types";

interface MoreLikeThisSectionProps {
  similar: HeroMedia[];
}

// Memoized MoreLikeThisSection component - avoids re-renders when parent updates
const MoreLikeThisSection = memo(function MoreLikeThisSection({
  similar,
}: MoreLikeThisSectionProps) {
  // Memoized: Filter and limit similar titles - avoids array operations on every render
  const filteredSimilar = useMemo(() => {
    return similar.filter((item) => item.poster_path !== null).slice(0, 15);
  }, [similar]);

  // Don't render if no similar content
  if (filteredSimilar.length === 0) {
    return null;
  }

  return (
    <section className="bg-black py-4 md:py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
          More Like This
        </h2>
        <Slider
          slidesPerView={6}
          slidesPerViewMobile={3}
          spaceBetween={16}
          hideNavigation={false}
        >
          {filteredSimilar.map((item) => (
            <Card key={item.id} movie={item} variant="recommendation" />
          ))}
        </Slider>
      </div>
    </section>
  );
});

export default MoreLikeThisSection;

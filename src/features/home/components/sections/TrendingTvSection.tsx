import { memo, useMemo, lazy } from "react";
import Slider from "@/components/shared/Slider/slider";
import Card from "@/components/shared/Card/Card";
import SectionHeader from "@/components/shared/SectionHeader";
import type { HeroMedia } from "@/types";

interface TrendingTvSectionProps {
  data: HeroMedia[];
  title?: string;
}

const TrendingTvSection = memo(function TrendingTvSection({
  data,
  title = "Trending TV Shows",
}: TrendingTvSectionProps) {
  const items = useMemo(() => data || [], [data]);

  if (items.length === 0) return null;

  return (
    <div className="py-4 md:py-6">
      <div className="container">
        <SectionHeader title={title} />
        <Slider
          slidesPerView={4}
          slidesPerViewMobile={1.5}
          spaceBetween={16}
          hideNavigation={false}
        >
          {items.map((item) => (
            <Card key={item.id} movie={item} variant="compact" mediaType="tv" />
          ))}
        </Slider>
      </div>
    </div>
  );
});

export default TrendingTvSection;

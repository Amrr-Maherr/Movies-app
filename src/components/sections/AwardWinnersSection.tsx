import { memo, useMemo } from "react";
import { Award } from "lucide-react";
import Card from "@/components/shared/Card/Card";
import SectionHeader from "@/components/shared/SectionHeader";
import type { HeroMedia } from "@/types";
import Slider from "../shared/Slider/slider";

interface AwardWinnersSectionProps {
  movies: HeroMedia[];
  mediaType: "movie" | "tv";
}

// Memoized AwardWinnersSection component - avoids re-renders when parent updates
const AwardWinnersSection = memo(function AwardWinnersSection({
  movies,
  mediaType,
}: AwardWinnersSectionProps) {
  // Memoized: Get first 6 items - avoids array slicing on every render
  const items = useMemo(() => movies, [movies]);

  return (
    <div className="bg-gradient-to-b from-zinc-900 to-black py-6 md:py-8">
      <div className="container">
        <SectionHeader
          title={`Award-Winning ${mediaType === "movie" ? "Movies" : "Series"}`}
          icon={Award}
          iconColor="text-yellow-500"
        />
        <Slider
          slidesPerView={6}
          hideNavigation={false}
          slidesPerViewMobile={1.5}
        >
          {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4"> */}
          {items.map((movie) => (
            <Card key={movie.id} movie={movie} variant="awardWinner" />
          ))}
        </Slider>
        {/* </div> */}
      </div>
    </div>
  );
});

export default AwardWinnersSection;

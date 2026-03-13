import { memo } from "react";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import type { HeroSlideProps, HeroMedia } from "@/types";

interface ExtraHeroSlideProps extends HeroSlideProps {
  onMoreInfo?: (movie: HeroMedia) => void;
}

// ============================================
// COMPONENT
// ============================================
const HeroSlide = memo(function HeroSlide({ movie, onMoreInfo }: ExtraHeroSlideProps) {
  // FIX: Use aspect ratio instead of h-screen to prevent layout thrashing
  // and reduce viewport calculation overhead. Using 16:9 aspect ratio
  // which is standard for hero banners and provides consistent sizing.
  return (
    <div className="relative w-full aspect-video max-h-[85vh] min-h-[500px] overflow-hidden">
      {/* Background */}
      <HeroBackground movie={movie} />

      {/* Content */}
      <HeroContent movie={movie} onMoreInfo={onMoreInfo} />
    </div>
  );
});

export default HeroSlide;

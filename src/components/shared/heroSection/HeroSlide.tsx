import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import type { HeroSlideProps, HeroMedia } from "@/types";

interface ExtraHeroSlideProps extends HeroSlideProps {
  onMoreInfo?: (movie: HeroMedia) => void;
}

// ============================================
// COMPONENT
// ============================================
export default function HeroSlide({ movie, onMoreInfo }: ExtraHeroSlideProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <HeroBackground movie={movie} />

      {/* Content */}
      <HeroContent movie={movie} onMoreInfo={onMoreInfo} />
    </div>
  );
}

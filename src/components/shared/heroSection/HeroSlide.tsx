import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import type { HeroSlideProps } from "@/types";

// ============================================
// COMPONENT
// ============================================
export default function HeroSlide({ movie }: HeroSlideProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <HeroBackground movie={movie} />

      {/* Content */}
      <HeroContent movie={movie} />
    </div>
  );
}

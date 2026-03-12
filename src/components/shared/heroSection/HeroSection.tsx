import { memo, useMemo, useCallback, useState, lazy, Suspense } from "react";
import Slider from "@/components/shared/Slider/slider";
import HeroSlide from "./HeroSlide";
import { Autoplay } from "swiper/modules";
import type { HeroMedia } from "@/types";
import { Error, Loader, LoadingFallback } from "@/components/ui";

// FIX #7: Lazy load MovieModal since it's only shown on user interaction
// This reduces initial bundle size by ~5-10KB
const MovieModal = lazy(() => import("@/components/shared/MovieModal"));

// ============================================
// CONSTANTS
// ============================================
// const HERO_MOVIES_COUNT = 5;
const SLIDE_INTERVAL = 8000;
const TRANSITION_SPEED = 1500;

// ============================================
// INTERFACE
// ============================================
export interface HeroSectionProps {
  data?: HeroMedia[];
  isLoading: boolean;
  error: unknown;
  onRetry: () => void;
}

// ============================================
// MAIN COMPONENT
// ============================================
const HeroSection = memo(function HeroSection({ data, isLoading, error, onRetry }: HeroSectionProps) {
  const [selectedMovie, setSelectedMovie] = useState<HeroMedia | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback((movie: HeroMedia) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  }, []);
  // Get featured media with memoization
  const featuredMedia = useMemo(
    () => data || [],
    [data]
  );

  // Memoized retry handler
  const handleRetry = useCallback(() => {
    onRetry();
  }, [onRetry]);

  // Loading state - Theme-aware background
  if (isLoading || featuredMedia.length === 0) {
    return (
      <Loader/>
    );
  }
  if (error || featuredMedia.length == 0) {
    return <Error retryButtonText="Try Again" onRetry={handleRetry} />;
  }

  return (
    <section className="relative w-full overflow-hidden">
      <Slider
        slidesPerView={1}
        slidesPerViewMobile={1}
        spaceBetween={0}
        useFadeEffect={true}
        hideNavigation={true}
        swiperOptions={{
          autoplay: {
            delay: SLIDE_INTERVAL,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          },
          loop: true,
          speed: TRANSITION_SPEED,
          effect: "fade",
          fadeEffect: {
            crossFade: true,
          },
        }}
        modules={[Autoplay]}
        className="hero-swiper"
      >
        {featuredMedia.map((media: HeroMedia) => (
          <HeroSlide key={media.id} movie={media} onMoreInfo={handleOpenModal} />
        ))}
      </Slider>

      {/* FIX #7: MovieModal is now lazy loaded with Suspense */}
      <Suspense fallback={<LoadingFallback />}>
        <MovieModal
          movie={selectedMovie}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </Suspense>

      {/* Bottom gradient overlay for smooth content blend - Theme-aware */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[var(--background-primary)] to-transparent z-20 pointer-events-none" />
    </section>
  );
});

export default HeroSection;

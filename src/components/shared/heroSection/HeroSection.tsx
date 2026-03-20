import { memo, useMemo, useCallback, lazy, Suspense } from "react";
import HeroSlide from "./HeroSlide";
import { Autoplay } from "swiper/modules";
import type { HeroMedia } from "@/types";
import { Error, SectionSkeleton } from "@/components/ui";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { useMovieModal } from "@/contexts/MovieModalContext";

// Lazy-loaded component
const Slider = lazy(() => import("@/components/shared/Slider/slider"));

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
const HeroSection = memo(function HeroSection({
  data,
  isLoading,
  error,
  onRetry,
}: HeroSectionProps) {
  const { openModal } = useMovieModal();

  const handleOpenModal = useCallback(
    (movie: HeroMedia) => {
      openModal(movie);
    },
    [openModal],
  );
  // Get featured media with memoization
  const featuredMedia = useMemo(() => data || [], [data]);

  // Memoized retry handler
  const handleRetry = useCallback(() => {
    onRetry();
  }, [onRetry]);

  // Loading state - Theme-aware background
  if (isLoading || featuredMedia.length === 0) {
    return <SectionSkeleton variant="hero" />;
  }
  if (error || featuredMedia.length == 0) {
    return <Error retryButtonText="Try Again" onRetry={handleRetry} />;
  }

  return (
    <section className="relative w-full overflow-hidden">
      <Suspense fallback={<SectionSkeleton variant="hero" />}>
        <LazyWrapper height={600}>
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
              <HeroSlide
                key={media.id}
                movie={media}
                onMoreInfo={handleOpenModal}
              />
            ))}
          </Slider>
        </LazyWrapper>
      </Suspense>

      {/* Bottom gradient overlay for smooth content blend - Theme-aware */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[var(--background-primary)] to-transparent z-20 pointer-events-none" />
    </section>
  );
});

export default HeroSection;

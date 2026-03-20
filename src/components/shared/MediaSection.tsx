import { memo, useMemo, useCallback, lazy, Suspense } from "react";
import { SectionSkeleton } from "@/components/ui";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import Card from "@/components/shared/Card/Card";
import { Error } from "@/components/ui";
import type { HeroMedia } from "@/types";

// Lazy-loaded component
const Slider = lazy(() => import("@/components/shared/Slider/slider"));

interface MediaSectionProps {
  title: string;
  data?: HeroMedia[];
  isLoading: boolean;
  error: unknown;
  onRetry: () => void;
  slidesPerView?: number;
}

// Memoized MediaSection component - avoids re-renders when parent updates
const MediaSection = memo(function MediaSection({
  title,
  data,
  error,
  onRetry,
  slidesPerView = 6,
}: MediaSectionProps) {
  // Memoize media array to prevent unnecessary re-renders
  const media = useMemo(() => data || [], [data]);

  // Memoized retry handler
  const handleRetry = useCallback(() => {
    onRetry();
  }, [onRetry]);

  if (error || media.length === 0) {
    return (
      <section className="py-8">
        <div className="container">
          <Error retryButtonText="Try Again" onRetry={handleRetry} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="container">
        {/* Section Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
          {title}
        </h2>

        {/* Horizontal Carousel */}
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
          <LazyWrapper height={300}>
            <Slider
              slidesPerView={slidesPerView}
              slidesPerViewMobile={1.5}
              spaceBetween={16}
              hideNavigation={false}
              swiperOptions={{
                loop: true,
                autoplay: true,
              }}
            >
              {media.map((item: HeroMedia) => (
                <Card key={item.id} movie={item} variant="compact" />
              ))}
            </Slider>
          </LazyWrapper>
        </Suspense>
      </div>
    </section>
  );
});

export default MediaSection;

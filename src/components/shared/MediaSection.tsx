import { memo, useMemo, useCallback, lazy, Suspense } from "react";
import { SectionSkeleton } from "@/components/ui";
import { OptimizedSectionWrapper } from "@/components/optimized-section-wrapper";
import Card from "@/components/shared/Card/Card";
import { ReactQueryErrorState } from "@/components/errors";
import type { HeroMedia } from "@/types";
import { useTranslation } from "react-i18next";

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
  isLoading,
  error,
  onRetry,
  slidesPerView = 4,
}: MediaSectionProps) {
  const { t } = useTranslation();
  // Memoize media array to prevent unnecessary re-renders
  const media = useMemo(() => data || [], [data]);

  // Memoized retry handler
  const handleRetry = useCallback(() => {
    onRetry();
  }, [onRetry]);

  if (error) {
    return (
      <section className="py-8">
        <div className="container">
          <ReactQueryErrorState error={error} retry={handleRetry} />
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
        <OptimizedSectionWrapper
          data={media}
          isLoading={isLoading}
          fallback={<SectionSkeleton variant="grid" cardCount={6} />}
          height={300}
          title={title}
        >
          {(mediaData) => (
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
              {mediaData.map((item: HeroMedia) => (
                <Card key={item.id} movie={item} variant="compact" />
              ))}
            </Slider>
          )}
        </OptimizedSectionWrapper>
      </div>
    </section>
  );
});

export default MediaSection;

import { memo, useMemo, useCallback } from "react";
import Slider from "@/components/shared/Slider/slider";
import Card from "@/components/shared/Card/Card";
import { Error, Loader } from "@/components/ui";
import type { HeroMedia } from "@/types";

interface MovieCardsSectionProps {
  title?: string;
  data?: HeroMedia[];
  isLoading: boolean;
  error: unknown;
  onRetry: () => void;
}

// Memoized MovieCardsSection component - avoids re-renders when parent updates
const MovieCardsSection = memo(function MovieCardsSection({
  title = "Popular Movies",
  data,
  isLoading,
  error,
  onRetry,
}: MovieCardsSectionProps) {
  // Memoize movies array to prevent unnecessary re-renders
  const movies = useMemo(() => data || [], [data]);

  // Memoized retry handler
  const handleRetry = useCallback(() => {
    onRetry();
  }, [onRetry]);

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="container">
          <Loader />
        </div>
      </section>
    );
  }

  if (error || movies.length === 0) {
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
        {title && (
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
            {title}
          </h2>
        )}

        {/* Horizontal Carousel */}
        <Slider
          slidesPerView={5}
          slidesPerViewMobile={1.5}
          spaceBetween={16}
          hideNavigation={false}
          swiperOptions={{
            loop: true,
            autoplay: true,
          }}
        >
          {movies.map((movie: HeroMedia) => (
            <Card key={movie.id} movie={movie} variant="compact" />
          ))}
        </Slider>
      </div>
    </section>
  );
});

export default MovieCardsSection;

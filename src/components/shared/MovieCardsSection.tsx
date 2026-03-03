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

export default function MovieCardsSection({
  title = "Popular Movies",
  data,
  isLoading,
  error,
  onRetry,
}: MovieCardsSectionProps) {
  const movies = data || [];

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <Loader />
        </div>
      </section>
    );
  }

  if (error || movies.length === 0) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <Error retryButtonText="Try Again" onRetry={onRetry} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
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
}

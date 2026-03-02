import Slider from "@/components/shared/Slider/slider";
import MovieCard from "@/components/shared/MovieCard";
import { Error, Loader } from "@/components/ui";
import type { HeroMedia } from "@/types";

interface MediaSectionProps {
  title: string;
  data?: HeroMedia[];
  isLoading: boolean;
  error: unknown;
  onRetry: () => void;
  slidesPerView?: number;
}

export default function MediaSection({
  title,
  data,
  isLoading,
  error,
  onRetry,
  slidesPerView = 5,
}: MediaSectionProps) {
  const media = data || [];

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <Loader />
        </div>
      </section>
    );
  }

  if (error || media.length === 0) {
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
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
          {title}
        </h2>

        {/* Horizontal Carousel */}
        <Slider
          slidesPerView={slidesPerView}
          slidesPerViewMobile={1.5}
          spaceBetween={16}
          hideNavigation={false}
          swiperOptions={{
            loop: true,
            autoplay: false,
          }}
        >
          {media.map((item: HeroMedia) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </Slider>
      </div>
    </section>
  );
}

import usePopularMovies from "@/queries/FetchPopularMovies";
import Slider from "@/components/shared/Slider/slider";
import HeroSlide from "./HeroSlide";
import { Autoplay } from "swiper/modules";
import type { Movie } from "@/types";

// ============================================
// CONSTANTS
// ============================================
// const HERO_MOVIES_COUNT = 5;
const SLIDE_INTERVAL = 8000;
const TRANSITION_SPEED = 1500;

// ============================================
// MAIN COMPONENT
// ============================================
export default function HeroSection() {
  const { data: movies, isLoading } = usePopularMovies();

  // Get featured movies
  const featuredMovies = movies || [];

  // Loading state - Theme-aware background
  if (isLoading || featuredMovies.length === 0) {
    return (
      <div className="relative w-full h-[70vh] sm:h-[80vh] bg-[var(--background-secondary)] animate-pulse" />
    );
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
        {featuredMovies.map((movie: Movie) => (
          <HeroSlide key={movie.id} movie={movie} />
        ))}
      </Slider>

      {/* Bottom gradient overlay for smooth content blend - Theme-aware */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[var(--background-primary)] to-transparent z-20 pointer-events-none" />
    </section>
  );
}

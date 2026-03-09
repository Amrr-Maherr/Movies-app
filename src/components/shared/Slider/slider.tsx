import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useRef, useMemo, memo, useCallback } from "react";
import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperOptions } from "swiper/types";
import { Pagination, Autoplay, Navigation, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css/bundle";

interface SliderProps {
  children: ReactNode;
  slidesPerView?: number;
  slidesPerViewMobile?: number;
  spaceBetween?: number;
  className?: string;
  swiperOptions?: SwiperOptions;
  modules?: (typeof Pagination | typeof Autoplay | typeof Navigation | typeof EffectFade)[];
  useFadeEffect?: boolean;
  hideNavigation?: boolean;
}

// Memoized navigation button component to prevent re-renders
const NavigationButton = memo(function NavigationButton({
  direction,
  onClick,
  ariaLabel,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      className={cn(
        "absolute top-1/2 z-10 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full opacity-100 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 flex items-center justify-center",
        direction === "prev" ? "left-4" : "right-4"
      )}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {direction === "prev" ? (
        <ChevronLeft className="h-6 w-6" />
      ) : (
        <ChevronRight className="h-6 w-6" />
      )}
    </button>
  );
});

const Slider = memo(function Slider({
  children,
  slidesPerView = 4,
  slidesPerViewMobile = 1,
  spaceBetween = 20,
  className,
  swiperOptions = {},
  modules = [Pagination, Autoplay],
  useFadeEffect = false,
  hideNavigation = true,
}: SliderProps) {
  const swiperRef = useRef(null);
  const effect = useMemo(() => (useFadeEffect ? "fade" : "slide"), [useFadeEffect]);
  const activeModules = useMemo(
    () =>
      useFadeEffect
        ? [...modules, EffectFade, Navigation]
        : [...modules, Navigation],
    [modules, useFadeEffect]
  );

  // Memoized autoplay configuration to prevent re-renders
  const autoplayConfig = useMemo(
    () => ({
      delay: 4000,
      disableOnInteraction: false,
    }),
    [],
  );

  // Memoized breakpoints configuration
  const breakpointsConfig = useMemo(
    () => ({
      640: { slidesPerView: Math.min(slidesPerView, 2), spaceBetween },
      768: { slidesPerView: Math.min(slidesPerView, 3), spaceBetween },
      1024: { slidesPerView, spaceBetween },
      ...swiperOptions.breakpoints,
    }),
    [slidesPerView, spaceBetween, swiperOptions.breakpoints]
  );

  // Memoized slide navigation handlers
  const handlePrev = useCallback(() => {
    const swiper = swiperRef.current as any;
    if (swiper?.swiper) {
      swiper.swiper.slidePrev();
    }
  }, []);

  const handleNext = useCallback(() => {
    const swiper = swiperRef.current as any;
    if (swiper?.swiper) {
      swiper.swiper.slideNext();
    }
  }, []);

  return (
    <div className="relative">
      <Swiper
        ref={swiperRef}
        slidesPerView={slidesPerViewMobile}
        spaceBetween={spaceBetween}
        autoplay={autoplayConfig}
        loop={swiperOptions.loop ?? false}
        pagination={swiperOptions.pagination ?? false}
        speed={swiperOptions.speed ?? 800}
        effect={effect}
        fadeEffect={useFadeEffect ? { crossFade: true } : undefined}
        modules={activeModules}
        breakpoints={breakpointsConfig}
        grabCursor={true}
        allowSlideNext={true}
        allowSlidePrev={true}
        className={`mySwiper ${className || ""}`}
        {...swiperOptions}
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>

      {!hideNavigation && (
        <>
          {/* Memoized Navigation Buttons */}
          <NavigationButton
            direction="prev"
            onClick={handlePrev}
            ariaLabel="Previous slide"
          />
          <NavigationButton
            direction="next"
            onClick={handleNext}
            ariaLabel="Next slide"
          />
        </>
      )}
    </div>
  );
});

export default Slider;

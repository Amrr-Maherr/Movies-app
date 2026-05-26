import { memo, lazy, Suspense } from "react";
import { Tv } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { OptimizedSectionWrapper } from "@/components/optimized-section-wrapper";
import PlatformCard from "@/components/sections/PlatformCard";
import type { StreamingPlatform } from "@/types";
import { SectionSkeleton } from "@/components/ui";
import { Link } from "react-router-dom";

// Lazy-loaded component
const Slider = lazy(() => import("@/components/shared/Slider/slider"));

export interface PlatformsSectionProps {
  platforms: StreamingPlatform[];
  isLoading?: boolean;
  error?: Error | null;
}

/**
 * PlatformsSection Component
 *
 * Displays a horizontal slider of streaming platform cards.
 * Each platform appears as a large, visually prominent card with smooth hover animations.
 * Includes skeleton loading state while data is being fetched.
 */
const PlatformsSection = memo(function PlatformsSection({
  platforms,
  isLoading,
  error,
}: PlatformsSectionProps) {
  // Show skeleton while loading
  if (isLoading) {
    return (
      <div className="py-6 md:py-8">
        <div className="container">
          <SectionHeader
            title="Streaming Platforms"
            icon={Tv}
            iconColor="text-red-600"
          />
          <SectionSkeleton variant="grid" cardCount={6} className="mt-6" />
        </div>
      </div>
    );
  }

  // Show nothing if error or no data
  if (error || !platforms || platforms.length === 0) {
    return null;
  }

  return (
    <div className="py-6 md:py-8">
      <div className="container">
        <SectionHeader
          title="Streaming Platforms"
          icon={Tv}
          iconColor="text-red-600"
          badgeText="Browse by Platform"
        />
        <Link
          to="/platforms"
          className="ml-4 text-sm md:text-base text-gray-300 hover:text-white transition-colors flex-shrink-0"
        >
          View All →
        </Link>
        {/* Horizontal Slider with Platform Cards */}
        <div className="mt-6">
          <OptimizedSectionWrapper
            data={platforms}
            isLoading={isLoading || false}
            fallback={<SectionSkeleton variant="grid" cardCount={6} />}
            height={400}
            title="Streaming Platforms"
          >
            {(platformsData) => (
              <Slider
                slidesPerView={4}
                slidesPerViewMobile={2}
                spaceBetween={16}
                hideNavigation={false}
                swiperOptions={{
                  loop: false,
                  speed: 600,
                  breakpoints: {
                    320: { slidesPerView: 2, spaceBetween: 12 },
                    640: { slidesPerView: 3, spaceBetween: 14 },
                    768: { slidesPerView: 4, spaceBetween: 16 },
                    1024: { slidesPerView: 5, spaceBetween: 16 },
                    1280: { slidesPerView: 6, spaceBetween: 16 },
                  },
                }}
              >
                {platformsData.map((platform) => (
                  <div
                    key={platform.id}
                    className="h-[200px] md:h-[240px] lg:h-[280px]"
                  >
                    <PlatformCard platform={platform} />
                  </div>
                ))}
              </Slider>
            )}
          </OptimizedSectionWrapper>
        </div>
      </div>
    </div>
  );
});

export default PlatformsSection;

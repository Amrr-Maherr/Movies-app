import { memo } from "react";
import { Tv } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import Slider from "@/components/shared/Slider/slider";
import PlatformCard from "./PlatformCard";
import type { StreamingPlatform } from "@/types";
import { SectionSkeleton } from "@/components/ui";

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

        {/* Horizontal Slider with Platform Cards */}
        <div className="mt-6">
          <Slider
            slidesPerView={6}
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
            {platforms.map((platform) => (
              <div
                key={platform.id}
                className="h-[200px] md:h-[240px] lg:h-[280px]"
              >
                <PlatformCard platform={platform} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
});

export default PlatformsSection;

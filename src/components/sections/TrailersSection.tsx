import { memo, useState, useMemo, useCallback, lazy, Suspense } from "react";
import type { Video } from "@/types";
import { SectionSkeleton } from "@/components/ui";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { Card } from "@/components/shared/Card";

// Lazy-loaded components
const Slider = lazy(() => import("@/components/shared/Slider/slider"));
const TrailerModal = lazy(() => import("@/components/shared/TrailerModal"));

interface TrailersSectionProps {
  videos: Video[];
}

const TrailersSection = memo(function TrailersSection({
  videos,
}: TrailersSectionProps) {
  const [selectedTrailer, setSelectedTrailer] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoized: Filter and get YouTube trailers only
  const youtubeTrailers = useMemo(() => {
    return videos
      .filter(
        (video) =>
          video.site === "YouTube" &&
          (video.type === "Trailer" ||
            video.type === "Teaser" ||
            video.type === "Clip"),
      )
      .slice(0, 10); // Limit to 10 trailers
  }, [videos]);

  const handleTrailerClick = useCallback((video: Video) => {
    setSelectedTrailer(video);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTrailer(null);
  }, []);

  // Don't render if no trailers
  if (youtubeTrailers.length === 0) {
    return null;
  }

  return (
    <>
      <section className="bg-black py-4 md:py-12">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
            Trailers
          </h2>
          <Suspense fallback={<SectionSkeleton variant="grid" cardCount={4} />}>
            <LazyWrapper height={300}>
              <Slider
                slidesPerView={4}
                slidesPerViewMobile={2}
                spaceBetween={16}
                hideNavigation={false}
              >
                {youtubeTrailers.map((video) => (
                  <Card
                    key={video.id}
                    variant="trailer"
                    trailer={{
                      videoKey: video.key,
                      name: video.name,
                      type: video.type,
                    }}
                    onClick={() => handleTrailerClick(video)}
                  />
                ))}
              </Slider>
            </LazyWrapper>
          </Suspense>
        </div>
      </section>

      {/* Trailer Modal */}
      {selectedTrailer && (
        <TrailerModal
          videoKey={selectedTrailer.key}
          title={selectedTrailer.name}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
});

export default TrailersSection;

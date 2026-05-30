import { memo, useState, useMemo, useCallback, lazy, Suspense } from "react";
import { Play } from "lucide-react";
import type { Video } from "@/types";
import { SectionSkeleton } from "@/components/ui";
import { OptimizedSectionWrapper } from "@/components/optimized-section-wrapper";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { useTranslation } from "react-i18next";

const Slider = lazy(() => import("@/components/shared/Slider/slider"));
const TrailerModal = lazy(() => import("@/components/shared/TrailerModal"));

interface TrailersSectionProps {
  videos: Video[];
}

function TrailerCard({ video, onClick }: { video: Video; onClick: () => void }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${video.key}/hqdefault.jpg`;

  return (
    <div
      className="group relative cursor-pointer touch-manipulation"
      onClick={onClick}
      role="article"
      tabIndex={0}
      aria-label={`Trailer: ${video.name}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="relative rounded-md bg-zinc-900 shadow-lg transition-all duration-300 ease-in-out group-hover:shadow-2xl">
        <div className="relative aspect-video">
          <OptimizedImage
            src={thumbnailUrl}
            alt={video.name}
            className={`h-full w-full transition-all duration-300 ease-in-out ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            objectFit="cover"
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
              <Play className="h-12 w-12 text-zinc-600" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="min-w-[48px] min-h-[48px] rounded-full bg-white/90 transition-transform duration-300 group-hover:bg-white shadow-xl flex items-center justify-center">
              <Play className="h-6 w-6 fill-black text-black ml-1" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 px-1">
        <p className="text-sm font-medium text-white line-clamp-2 group-hover:text-[var(--netflix-red)] transition-colors duration-300">
          {video.name}
        </p>
        {video.type && (
          <p className="mt-1 text-xs text-gray-500 uppercase tracking-wider">
            {video.type}
          </p>
        )}
      </div>
    </div>
  );
}

const TrailersSection = memo(function TrailersSection({
  videos,
}: TrailersSectionProps) {
  const { t } = useTranslation();
  const [selectedTrailer, setSelectedTrailer] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const youtubeTrailers = useMemo(() => {
    return videos
      .filter(
        (video) =>
          video.site === "YouTube" &&
          (video.type === "Trailer" ||
            video.type === "Teaser" ||
            video.type === "Clip"),
      )
      .slice(0, 10);
  }, [videos]);

  const handleTrailerClick = useCallback((video: Video) => {
    setSelectedTrailer(video);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTrailer(null);
  }, []);

  if (youtubeTrailers.length === 0) {
    return null;
  }

  return (
    <>
      <section className="bg-black py-4 md:py-12">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
            {t("media.trailersVideos")}
          </h2>
          <OptimizedSectionWrapper
            data={youtubeTrailers}
            isLoading={false}
            fallback={<SectionSkeleton variant="grid" cardCount={4} />}
            height={300}
            title={t("media.trailersVideos")}
          >
            {(trailersData) => (
              <Slider
                slidesPerView={4}
                slidesPerViewMobile={2}
                spaceBetween={16}
                hideNavigation={false}
              >
                {trailersData.map((video) => (
                  <TrailerCard
                    key={video.id}
                    video={video}
                    onClick={() => handleTrailerClick(video)}
                  />
                ))}
              </Slider>
            )}
          </OptimizedSectionWrapper>
        </div>
      </section>

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

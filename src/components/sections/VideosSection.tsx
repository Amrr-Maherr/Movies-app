import { memo, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Slider from "@/components/shared/Slider/slider";
import OptimizedImage from "@/components/ui/OptimizedImage";
import TrailerModal from "@/components/shared/TrailerModal";
import type { Video } from "@/types";

interface VideosSectionProps {
  videos: Video[];
  title?: string;
}

// Memoized VideoCard component
const VideoCard = memo(function VideoCard({
  video,
  onPlay,
}: {
  video: Video;
  onPlay: (video: Video) => void;
}) {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.key}/hqdefault.jpg`;
  const isTrailer = video.type === "Trailer";
  const isTeaser = video.type === "Teaser";
  const isClip = video.type === "Clip";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      className="relative cursor-pointer group"
      onClick={() => onPlay(video)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPlay(video);
        }
      }}
      aria-label={`Play ${video.type}: ${video.name}`}
    >
      <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-800">
        <OptimizedImage
          src={thumbnailUrl}
          alt={video.name || `${video.type} thumbnail`}
          className="w-full h-full"
          objectFit="cover"
          priority={false}
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="w-14 h-14 rounded-full bg-red-600/90 flex items-center justify-center backdrop-blur-sm border-2 border-white/30"
          >
            <Play className="w-6 h-6 text-white ml-1" fill="white" />
          </motion.div>
        </div>

        {/* Video Type Badge */}
        <div className="absolute top-2 left-2 flex gap-1">
          {isTrailer && (
            <span className="px-2 py-1 text-xs font-semibold bg-red-600 text-white rounded">
              TRAILER
            </span>
          )}
          {isTeaser && (
            <span className="px-2 py-1 text-xs font-semibold bg-blue-600 text-white rounded">
              TEASER
            </span>
          )}
          {isClip && (
            <span className="px-2 py-1 text-xs font-semibold bg-green-600 text-white rounded">
              CLIP
            </span>
          )}
        </div>
      </div>

      {/* Video Title */}
      <p className="mt-2 text-sm font-medium text-white line-clamp-2 group-hover:text-red-400 transition-colors">
        {video.name || `${video.type}`}
      </p>
    </motion.div>
  );
});

/**
 * VideosSection Component
 * Displays a horizontal slider of video thumbnails (trailers, teasers, clips)
 * with Framer Motion animations and modal playback
 */
const VideosSection = memo(function VideosSection({
  videos,
  title = "Videos & Trailers",
}: VideosSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Memoized: Filter valid YouTube videos
  const validVideos = useMemo(
    () =>
      videos.filter(
        (video) =>
          video.site === "YouTube" &&
          video.key &&
          (video.type === "Trailer" ||
            video.type === "Teaser" ||
            video.type === "Clip" ||
            video.type === "Featurette"),
      ),
    [videos],
  );

  // Memoized: Handle video play
  const handlePlay = useCallback((video: Video) => {
    setSelectedVideo(video);
  }, []);

  // Memoized: Handle modal close
  const handleCloseModal = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  if (validVideos.length === 0) {
    return null;
  }

  return (
    <>
      <section className="bg-black py-4 md:py-12">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          {/* Section Title */}
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
            {title}
          </h2>

          {/* Horizontal Slider of Videos */}
          <Slider
            slidesPerView={4}
            slidesPerViewMobile={2}
            spaceBetween={16}
            hideNavigation={false}
            swiperOptions={{
              loop: false,
              grabCursor: true,
            }}
          >
            {validVideos.map((video) => (
              <VideoCard
                key={video.id || video.key}
                video={video}
                onPlay={handlePlay}
              />
            ))}
          </Slider>

          {/* Video count info */}
          <p className="text-white/50 text-sm mt-4 text-center md:text-left">
            {validVideos.length} {validVideos.length === 1 ? "video" : "videos"}{" "}
            available
          </p>
        </div>
      </section>

      {/* Trailer Modal */}
      {selectedVideo && (
        <TrailerModal
          videoKey={selectedVideo.key}
          isOpen={!!selectedVideo}
          onClose={handleCloseModal}
          title={selectedVideo.name}
        />
      )}
    </>
  );
});

export default VideosSection;

import { memo, useState, useCallback, useMemo, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import type { MediaImage } from "@/types/movieDetails";
import { SectionSkeleton } from "@/components/ui";
import LazyWrapper from "@/components/ui/lazy-wrapper";

// Lazy-loaded component
const Slider = lazy(() => import("@/components/shared/Slider/slider"));

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const THUMB_SIZE = "w780";
const FULL_SIZE = "original";

// ─────────────────────────────────────────────
// Lightbox Modal
// ─────────────────────────────────────────────
interface LightboxProps {
  images: MediaImage[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox = memo(function Lightbox({
  images,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const current = images[activeIndex];
  if (!current) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close */}
        <button
          className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors bg-black/40 rounded-full"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Counter */}
        <span className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
          {activeIndex + 1} / {images.length}
        </span>

        {/* Prev */}
        {activeIndex > 0 && (
          <button
            className="absolute left-3 sm:left-6 z-10 p-3 text-white bg-black/40 hover:bg-white/20 rounded-full transition-all"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Image */}
        <motion.img
          key={activeIndex}
          src={`${IMAGE_BASE_URL}${FULL_SIZE}${current.file_path}`}
          alt={`Behind the scenes ${activeIndex + 1}`}
          className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          loading="lazy"
        />

        {/* Next */}
        {activeIndex < images.length - 1 && (
          <button
            className="absolute right-3 sm:right-6 z-10 p-3 text-white bg-black/40 hover:bg-white/20 rounded-full transition-all"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
});

// ─────────────────────────────────────────────
// Single Image Card
// ─────────────────────────────────────────────
const ImageCard = memo(function ImageCard({
  image,
  index,
  onClick,
}: {
  image: MediaImage;
  index: number;
  onClick: (index: number) => void;
}) {
  const handleClick = useCallback(() => onClick(index), [index, onClick]);

  return (
    <div
      onClick={handleClick}
      className="relative group cursor-pointer overflow-hidden rounded-lg bg-zinc-900 flex-shrink-0 w-[260px] sm:w-[300px] md:w-[340px]"
      style={{ aspectRatio: image.aspect_ratio || "16/9" }}
    >
      <OptimizedImage
        src={`${IMAGE_BASE_URL}${THUMB_SIZE}${image.file_path}`}
        alt={`Behind the scenes ${index + 1}`}
        className="w-full h-full transition-transform duration-500 group-hover:scale-110"
        objectFit="cover"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
        <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
      </div>
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
});

// ─────────────────────────────────────────────
// Main Section
// ─────────────────────────────────────────────
interface BehindTheSectionProps {
  images: MediaImage[];
  title?: string;
}

const BehindTheScenesSection = memo(function BehindTheScenesSection({
  images,
  title = "Behind the Scenes",
}: BehindTheSectionProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Only show backdrops with proper aspect ratios (cinematic shots)
  const displayImages = useMemo(
    () => images.filter((img) => img.aspect_ratio > 1).slice(0, 24),
    [images],
  );

  const openLightbox = useCallback(
    (index: number) => setLightboxIndex(index),
    [],
  );
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(
    () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)),
    [],
  );
  const goNext = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null && i < displayImages.length - 1 ? i + 1 : i,
      ),
    [displayImages.length],
  );

  if (displayImages.length === 0) return null;

  return (
    <>
      <section className="bg-black py-4 md:py-12">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          {/* Section header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              {title}
            </h2>
            <span className="text-sm text-gray-500">
              {displayImages.length} photos
            </span>
          </div>

          {/* Horizontal scroll strip */}
          <div className="">
            <Suspense
              fallback={<SectionSkeleton variant="grid" cardCount={4} />}
            >
              <LazyWrapper height={250}>
                <Slider
                  slidesPerView={4}
                  slidesPerViewMobile={1}
                  spaceBetween={12}
                  hideNavigation={true}
                  className="pb-2"
                  swiperOptions={{
                    loop: false,
                    grabCursor: true,
                  }}
                >
                  {displayImages.map((image, index) => (
                    <ImageCard
                      key={image.file_path}
                      image={image}
                      index={index}
                      onClick={openLightbox}
                    />
                  ))}
                </Slider>
              </LazyWrapper>
            </Suspense>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={displayImages}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  );
});

export default BehindTheScenesSection;

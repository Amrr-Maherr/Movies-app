import { memo, useMemo, useState, useCallback, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import type { ImageFile } from "@/services/moviesService";

const LazyImage = lazy(() => import("@/components/ui/OptimizedImage"));

interface ImagesGalleryProps {
  images: ImageFile[];
  title?: string;
  type?: "backdrops" | "posters" | "logos" | "all";
}

const BASE = "https://image.tmdb.org/t/p";

const getType = (img: ImageFile): "backdrop" | "poster" | "logo" => {
  if (img.iso_639_1 !== null && img.aspect_ratio > 2) return "logo";
  if (img.aspect_ratio >= 1.5) return "backdrop";
  return "poster";
};

// ── Image card ──────────────────────────────────────────────────────────────
const ImageCard = memo(function ImageCard({
  image,
  onClick,
}: {
  image: ImageFile;
  onClick: () => void;
}) {
  const type = getType(image);
  return (
    <div
      className={`relative overflow-hidden rounded cursor-pointer group bg-zinc-900 ${type === "backdrop" ? "aspect-video" : "aspect-[2/3]"}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
      aria-label="View image"
    >
      <OptimizedImage
        src={`${BASE}/w500${image.file_path}`}
        alt="gallery image"
        className="w-full h-full transition-transform duration-300 group-hover:scale-105"
        objectFit={type === "logo" ? "contain" : "cover"}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200" />
    </div>
  );
});

// ── Lightbox ─────────────────────────────────────────────────────────────────
const Lightbox = memo(function Lightbox({
  image,
  onClose,
  onPrev,
  onNext,
}: {
  image: ImageFile;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--lightbox-bg)]"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        {/* close */}
        <button
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* prev */}
        <button
          className="absolute left-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* next */}
        <button
          className="absolute right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-5xl max-h-[90vh] p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <Suspense fallback={<div className="w-[800px] h-[450px] bg-zinc-800 animate-pulse rounded" />}>
            <LazyImage
              src={`${BASE}/w1280${image.file_path}`}
              alt="full size"
              className="max-w-full max-h-[85vh] object-contain rounded"
              objectFit="contain"
            />
          </Suspense>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

// ── Main ─────────────────────────────────────────────────────────────────────
const ImagesGallery = memo(function ImagesGallery({
  images,
  title = "Gallery",
  type = "all",
}: ImagesGalleryProps) {
  const [selected, setSelected] = useState<ImageFile | null>(null);

  const filtered = useMemo(() => {
    if (type === "backdrops") return images.filter((i) => i.aspect_ratio >= 1.5);
    if (type === "posters")   return images.filter((i) => i.aspect_ratio < 1.5);
    if (type === "logos")     return images.filter((i) => i.iso_639_1 !== null && i.aspect_ratio > 2);
    return images;
  }, [images, type]);

  const handlePrev = useCallback(() => {
    if (!selected) return;
    const idx = filtered.findIndex((i) => i.file_path === selected.file_path);
    setSelected(filtered[idx > 0 ? idx - 1 : filtered.length - 1]);
  }, [selected, filtered]);

  const handleNext = useCallback(() => {
    if (!selected) return;
    const idx = filtered.findIndex((i) => i.file_path === selected.file_path);
    setSelected(filtered[idx < filtered.length - 1 ? idx + 1 : 0]);
  }, [selected, filtered]);

  if (!filtered.length) return null;

  const shown = filtered.slice(0, 20);

  return (
    <>
      <section className="bg-[var(--section-bg)] py-10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          <h2 className="text-xl font-semibold text-[var(--section-title-color)] mb-6">{title}</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {shown.map((img) => (
              <ImageCard key={img.file_path} image={img} onClick={() => setSelected(img)} />
            ))}
          </div>

          <p className="text-[var(--section-meta-color)] text-xs mt-4">
            Showing {shown.length} of {filtered.length} images
          </p>
        </div>
      </section>

      {selected && (
        <Lightbox
          image={selected}
          onClose={() => setSelected(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </>
  );
});

export default ImagesGallery;

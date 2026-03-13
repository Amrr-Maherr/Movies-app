import { memo, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import type { ImageFile } from "@/services/moviesService";

interface ImagesGalleryProps {
  images: ImageFile[];
  title?: string;
  type?: "backdrops" | "posters" | "logos" | "all";
}

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// Memoized ImageCard component
const ImageCard = memo(function ImageCard({
  image,
  onClick,
  type,
}: {
  image: ImageFile;
  onClick: () => void;
  type: "backdrop" | "poster" | "logo";
}) {
  const imageUrl = `${TMDB_IMAGE_BASE_URL}/w500${image.file_path}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      className="relative cursor-pointer group overflow-hidden rounded-lg"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View ${type} image`}
    >
      <div
        className={`relative ${
          type === "backdrop" ? "aspect-video" : "aspect-[2/3]"
        } bg-zinc-800`}
      >
        <OptimizedImage
          src={imageUrl}
          alt={`${type} image`}
          className="w-full h-full"
          objectFit={type === "logo" ? "contain" : "cover"}
          priority={false}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="text-white text-sm font-medium"
          >
            View
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

// Memoized ImageModal component for full-screen viewing
const ImageModal = memo(function ImageModal({
  image,
  onClose,
  onPrevious,
  onNext,
  type,
}: {
  image: ImageFile;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  type: "backdrop" | "poster" | "logo";
}) {
  const imageUrl = `${TMDB_IMAGE_BASE_URL}/original${image.file_path}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
      >
        {/* Close Button */}
        <motion.button
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close image viewer"
        >
          <X className="w-6 h-6" />
        </motion.button>

        {/* Previous Button */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          className="absolute left-4 z-10 p-3 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        {/* Next Button */}
        <motion.button
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          className="absolute right-4 z-10 p-3 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>

        {/* Image */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl max-h-[90vh] p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={imageUrl}
            alt={`${type} image full size`}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

/**
 * ImagesGallery Component
 * Displays a responsive grid of images (backdrops, posters, or logos)
 * with Framer Motion animations and full-screen modal viewing
 */
const ImagesGallery = memo(function ImagesGallery({
  images,
  title = "Gallery",
  type = "all",
}: ImagesGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);

  // Memoized: Filter and categorize images
  const filteredImages = useMemo(() => {
    let result;
    if (type === "backdrops") {
      result = images.filter((img) => img.aspect_ratio >= 1.5);
    } else if (type === "posters") {
      result = images.filter((img) => img.aspect_ratio < 1.5);
    } else if (type === "logos") {
      result = images.filter(
        (img) => img.iso_639_1 !== null && img.aspect_ratio > 2,
      );
    } else {
      result = images;
    }

    return result;
  }, [images, type]);

  // Memoized: Get image type
  const getImageType = useCallback(
    (image: ImageFile): "backdrop" | "poster" | "logo" => {
      if (image.iso_639_1 !== null && image.aspect_ratio > 2) return "logo";
      if (image.aspect_ratio >= 1.5) return "backdrop";
      return "poster";
    },
    [],
  );

  // Memoized: Handle image click
  const handleImageClick = useCallback((image: ImageFile) => {
    setSelectedImage(image);
  }, []);

  // Memoized: Handle close
  const handleClose = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // Memoized: Handle navigation
  const handlePrevious = useCallback(() => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(
      (img) => img.file_path === selectedImage.file_path,
    );
    const prevIndex =
      currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    setSelectedImage(filteredImages[prevIndex]);
  }, [selectedImage, filteredImages]);

  const handleNext = useCallback(() => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(
      (img) => img.file_path === selectedImage.file_path,
    );
    const nextIndex =
      currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(filteredImages[nextIndex]);
  }, [selectedImage, filteredImages]);

  if (filteredImages.length === 0) {
    return null;
  }

  return (
    <>
      <section className="bg-black py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          {/* Section Title */}
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
            {title}
          </h2>

          {/* Images Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredImages.slice(0, 20).map((image) => (
              <ImageCard
                key={image.file_path}
                image={image}
                type={getImageType(image)}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>

          {/* Image count info */}
          <p className="text-white/50 text-sm mt-4 text-center md:text-left">
            Showing {Math.min(20, filteredImages.length)} of{" "}
            {filteredImages.length}{" "}
            {filteredImages.length === 1 ? "image" : "images"}
          </p>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={handleClose}
          onPrevious={handlePrevious}
          onNext={handleNext}
          type={getImageType(selectedImage)}
        />
      )}
    </>
  );
});

export default ImagesGallery;

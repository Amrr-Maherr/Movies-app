import { useEffect, useCallback } from "react";
import { X } from "lucide-react";

interface TrailerModalProps {
  videoKey: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function TrailerModal({
  videoKey,
  title,
  isOpen,
  onClose,
}: TrailerModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-5xl mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors duration-200"
          aria-label="Close trailer"
        >
          <X className="h-10 w-10" />
        </button>

        {/* Video Container */}
        <div className="relative aspect-video rounded-lg overflow-hidden bg-black shadow-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
            title={title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Title */}
        <h2
          id="modal-title"
          className="mt-4 text-xl font-bold text-white text-center"
        >
          {title}
        </h2>
      </div>
    </div>
  );
}

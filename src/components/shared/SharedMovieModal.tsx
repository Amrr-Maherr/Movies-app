import { Suspense, lazy } from "react";
import { useMovieModal } from "@/contexts/MovieModalContext";
import { LoadingFallback } from "@/components/ui";

// FIX: Lazy load MovieModal once at app level instead of per-card instance
// This reduces bundle size by ~50KB and eliminates 50+ lazy boundaries
const MovieModal = lazy(() => import("@/components/shared/MovieModal"));

export default function SharedMovieModal() {
  const { selectedMovie, isOpen, closeModal } = useMovieModal();

  return (
    <Suspense fallback={<LoadingFallback />}>
      <MovieModal
        movie={selectedMovie}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </Suspense>
  );
}

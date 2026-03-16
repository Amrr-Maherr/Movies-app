import { useState, useMemo, useCallback, memo, Suspense, lazy } from "react";
import { Play, Plus, Info } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import {
  getTrailerWatchUrl,
  getMatchScore,
  getAgeRating,
  getYear,
} from "@/utils";
import type { MediaDetails } from "@/types";

// Lazy load BackgroundVideo component for better performance
const BackgroundVideo = lazy(
  () => import("@/components/shared/BackgroundVideo"),
);

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
// const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface MediaHeroProps {
  media: MediaDetails;
  onPlayTrailer?: () => void;
  onAddToList?: () => void;
}

// Memoized MediaHero component
const MediaHero = memo(function MediaHero({
  media,
  onPlayTrailer,
  onAddToList,
}: MediaHeroProps) {
  const [isAddedToList, setIsAddedToList] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  // Memoized: Get trailer URLs using utility functions
  const trailerUrl = useMemo(
    () => getTrailerWatchUrl(media.videos),
    [media.videos],
  );

  // Memoized: Get release year using utility function
  const releaseYear = useMemo(() => {
    const date =
      "release_date" in media ? media.release_date : media.first_air_date;
    return getYear(date || "");
  }, [media]);

  // Memoized: Get match score and age rating using utility functions
  const matchScore = useMemo(
    () => getMatchScore(media.vote_average || 0),
    [media.vote_average],
  );

  const ageRating = useMemo(
    () => getAgeRating(media.vote_average || 0),
    [media.vote_average],
  );

  const handlePlayTrailer = useCallback(() => {
    if (onPlayTrailer) {
      onPlayTrailer();
    } else if (trailerUrl) {
      window.open(trailerUrl, "_blank");
    }
  }, [onPlayTrailer, trailerUrl]);

  const handleAddToList = useCallback(() => {
    if (onAddToList) {
      onAddToList();
    } else {
      setIsAddedToList((prev) => !prev);
    }
  }, [onAddToList]);

  // Memoized: Image URLs
  const backdropUrl = useMemo(
    () =>
      media.backdrop_path
        ? `${IMAGE_BASE_URL}${media.backdrop_path}`
        : "https://via.placeholder.com/1920x1080?text=No+Image",
    [media.backdrop_path],
  );

  // const posterUrl = useMemo(
  //   () => (media.poster_path ? `${POSTER_BASE_URL}${media.poster_path}` : null),
  //   [media.poster_path],
  // );

  // Get title (supports both movie.title and tv.name)
  const title = "title" in media ? media.title : media.name;

  return (
    <div className="relative w-full aspect-video max-h-[85vh] min-h-[500px] overflow-hidden">
      {/* ========================================
          BACKGROUND IMAGE - Fallback
          ======================================== */}
      <div className="absolute inset-0 w-full h-full">
        <OptimizedImage
          src={backdropUrl}
          alt={title}
          className="w-full h-full"
          objectFit="cover"
          priority
        />
      </div>

      {/* ========================================
          BACKGROUND VIDEO - Autoplay, Loop, Muted (above image)
          ======================================== */}
      <Suspense fallback={null}>
        <BackgroundVideo
          videos={media.videos}
          mediaId={media.id}
          className="z-10"
        />
      </Suspense>

      {/* ========================================
          GRADIENT OVERLAYS - Netflix style (above video)
          ======================================== */}
      {/* Vignette - Strong left gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent sm:via-black/50"
        aria-hidden="true"
      />

      {/* Bottom fade to background */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[var(--background-primary)] via-[var(--background-primary)]/20 to-transparent sm:via-transparent"
        aria-hidden="true"
      />

      {/* Top fade for smooth blend */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* ========================================
          CONTENT - Netflix style layout
          ======================================== */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="max-w-2xl">
            {/* Title - Big, dramatic, Netflix style */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-3 sm:mb-4 tracking-tight leading-none hero-title"
              style={{ textShadow: "2px 2px 12px rgba(0,0,0,0.9)" }}
            >
              {title}
            </h1>

            {/* Metadata Row */}
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap fade-in">
              {/* Match Score - Netflix green */}
              <span className="text-[var(--success)] text-xs sm:text-sm font-bold tracking-tight">
                {matchScore}% Match
              </span>

              {/* Year */}
              {releaseYear && (
                <span className="text-[var(--text-secondary)] text-xs sm:text-sm font-medium">
                  {releaseYear}
                </span>
              )}

              {/* Age Rating Badge */}
              <span className="border border-[var(--text-muted)] px-1.5 sm:px-2 py-0.5 text-[var(--text-secondary)] text-[10px] sm:text-xs font-medium uppercase tracking-wider">
                {ageRating}
              </span>

              {/* Quality Badge */}
              <span className="border border-[var(--text-muted)] px-1.5 sm:px-2 py-0.5 text-[var(--text-secondary)] text-[10px] sm:text-xs font-medium">
                HD
              </span>
            </div>

            {/* Overview - Line clamped, Netflix style */}
            <p
              className="text-[var(--text-primary)] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 max-w-[90vw] sm:max-w-xl font-medium drop-shadow-lg hero-description"
              style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}
            >
              {media.overview || "No description available."}
            </p>

            {/* Action Buttons - Netflix style */}
            <div className="flex flex-wrap gap-3 pt-4 hero-buttons">
              {/* Play Button - White bg, black text */}
              <button
                onClick={handlePlayTrailer}
                className="flex items-center gap-2 bg-white text-[var(--text-inverse)] px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded font-bold text-sm sm:text-base md:text-lg transition-all duration-200 hover:bg-white/90 active:scale-95 min-w-[120px] sm:min-w-[140px] justify-center touch-manipulation button-hover hover-scale tap-scale"
                aria-label={`Play trailer for ${title}`}
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-current" />
                Play
              </button>

              {/* Add to List Button */}
              <button
                onClick={handleAddToList}
                className={`flex items-center gap-2 px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded font-bold text-sm sm:text-base md:text-lg transition-all duration-200 active:scale-95 backdrop-blur-sm min-w-[120px] sm:min-w-[140px] justify-center touch-manipulation button-hover hover-scale tap-scale border border-white/20 ${
                  isAddedToList
                    ? "bg-[var(--success)]/80 hover:bg-[var(--success)] text-white"
                    : "bg-[var(--background-secondary)]/80 hover:bg-[var(--background-tertiary)] text-white"
                }`}
                aria-pressed={isAddedToList}
                aria-label={
                  isAddedToList ? "Remove from My List" : "Add to My List"
                }
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                {isAddedToList ? "In List" : "My List"}
              </button>

              {/* More Info Button */}
              <button
                onClick={() => setShowTrailer(true)}
                className="flex items-center gap-2 bg-white/20 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded font-bold text-sm sm:text-base md:text-lg transition-all duration-200 hover:bg-white/30 active:scale-95 backdrop-blur-sm min-w-[120px] sm:min-w-[140px] justify-center touch-manipulation button-hover hover-scale tap-scale"
                aria-label="More information"
              >
                <Info className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================
          TRAILER MODAL
          ======================================== */}
      {showTrailer && trailerUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setShowTrailer(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Trailer player"
        >
          <div className="relative w-full max-w-5xl aspect-video mx-4">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white hover:text-[var(--netflix-red)] transition-colors"
              aria-label="Close trailer"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <iframe
              src={trailerUrl.replace("watch?v=", "embed/")}
              title="Media Trailer"
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
});

export default MediaHero;

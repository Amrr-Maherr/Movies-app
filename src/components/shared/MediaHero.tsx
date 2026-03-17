import {
  useState,
  useMemo,
  useCallback,
  memo,
  Suspense,
  lazy,
  useRef,
  useEffect,
} from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import VideoControls from "@/components/shared/VideoControls";
// import ActionButtons from "@/components/shared/ActionButtons";
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
  // const [isAddedToList, setIsAddedToList] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  // Video controls state
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  // const handlePlayTrailer = useCallback(() => {
  //   if (onPlayTrailer) {
  //     onPlayTrailer();
  //   } else if (trailerUrl) {
  //     window.open(trailerUrl, "_blank");
  //   }
  // }, [onPlayTrailer, trailerUrl]);

  // const handleAddToList = useCallback(() => {
  //   if (onAddToList) {
  //     onAddToList();
  //   } else {
  //     setIsAddedToList((prev) => !prev);
  //   }
  // }, [onAddToList]);

  // Video control handlers
  const toggleMute = useCallback(() => {
    if (!playerRef.current) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (newMuted) {
      playerRef.current.mute();
    } else {
      playerRef.current.unMute();
    }
  }, [isMuted]);

  const togglePlay = useCallback(() => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error("Error attempting to enable fullscreen:", err);
        });
    } else {
      document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
        })
        .catch((err) => {
          console.error("Error attempting to exit fullscreen:", err);
        });
    }
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isFullscreen);
      setIsVisible(isFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

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
    <div
      ref={containerRef}
      className="relative w-full aspect-video max-h-[85vh] min-h-[500px] overflow-hidden"
    >
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
          playerRef={playerRef}
          isMuted={isMuted}
          isPlaying={isPlaying}
          onToggleMute={toggleMute}
          onTogglePlay={togglePlay}
        />
      </Suspense>

      {/* ========================================
          GRADIENT OVERLAYS - Netflix style (above video)
          ======================================== */}
      {/* Vignette - Strong left gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent sm:via-black/50 pointer-events-none"
        aria-hidden="true"
      />

      {/* Bottom fade to background */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[var(--background-primary)] via-[var(--background-primary)]/20 to-transparent sm:via-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Top fade for smooth blend */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none"
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
              className={`${isVisible ? "hidden" : "block"} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-3 sm:mb-4 tracking-tight leading-none hero-title`}
              style={{ textShadow: "2px 2px 12px rgba(0,0,0,0.9)" }}
            >
              {title}
            </h1>

            {/* Metadata Row */}
            <div
              className={`${isVisible ? "hidden" : "flex"} items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap fade-in`}
            >
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
              className={`${isVisible ? "hidden" : "block"} text-[var(--text-primary)] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 max-w-[90vw] sm:max-w-xl font-medium drop-shadow-lg hero-description`}
              style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}
            >
              {media.overview || "No description available."}
            </p>

            {/* Action Buttons - Netflix style */}
            <div className="flex md:flex-nowrap flex-wrap items-center gap-3 pt-4 hero-buttons">
              {/* Action Buttons Component */}
              {/* <ActionButtons
                title={title}
                isAddedToList={isAddedToList}
                showTrailer={showTrailer}
                onPlay={handlePlayTrailer}
                onAddToList={handleAddToList}
                onMoreInfo={() => setShowTrailer(true)}
              /> */}

              {/* Divider */}
              {/* <div className="w-px h-8 bg-white/30 mx-2 hidden sm:block"></div> */}

              {/* Video Controls Component */}
              <VideoControls
                isMuted={isMuted}
                isPlaying={isPlaying}
                isFullscreen={isFullscreen}
                onToggleMute={toggleMute}
                onTogglePlay={togglePlay}
                onToggleFullscreen={toggleFullscreen}
              />
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

import { memo, useMemo, useState, useCallback, lazy, Suspense } from "react";
import { Play } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { SectionSkeleton } from "@/components/ui";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import type { Video } from "@/types";

const Slider = lazy(() => import("@/components/shared/Slider/slider"));
const TrailerModal = lazy(() => import("@/components/shared/TrailerModal"));

interface VideosSectionProps {
  videos: Video[];
  title?: string;
}

const TYPE_LABEL: Record<string, string> = {
  Trailer: "TRAILER",
  Teaser: "TEASER",
  Clip: "CLIP",
  Featurette: "FEATURETTE",
};

const TYPE_COLOR: Record<string, string> = {
  Trailer:    "bg-[var(--badge-trailer)]",
  Teaser:     "bg-[var(--badge-teaser)]",
  Clip:       "bg-[var(--badge-clip)]",
  Featurette: "bg-[var(--badge-featurette)]",
};

const VideoCard = memo(function VideoCard({
  video,
  onPlay,
}: {
  video: Video;
  onPlay: (v: Video) => void;
}) {
  return (
    <div
      className="cursor-pointer group"
      onClick={() => onPlay(video)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onPlay(video)}
      aria-label={`Play ${video.name}`}
    >
      <div className="relative aspect-video rounded overflow-hidden bg-zinc-900">
        <OptimizedImage
          src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
          alt={video.name}
          className="w-full h-full transition-transform duration-300 group-hover:scale-105"
          objectFit="cover"
        />
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-200" />

        {/* play icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </div>
        </div>

        {/* type badge */}
        {TYPE_LABEL[video.type] && (
          <span className={`absolute top-2 left-2 text-[10px] font-bold text-white px-1.5 py-0.5 rounded ${TYPE_COLOR[video.type] ?? "bg-zinc-700"}`}>
            {TYPE_LABEL[video.type]}
          </span>
        )}
      </div>

      <p className="mt-2 text-sm text-white/80 line-clamp-1 group-hover:text-white transition-colors">
        {video.name}
      </p>
    </div>
  );
});

const VideosSection = memo(function VideosSection({
  videos,
  title = "Videos & Trailers",
}: VideosSectionProps) {
  const [selected, setSelected] = useState<Video | null>(null);

  const validVideos = useMemo(
    () => videos.filter((v) => v.site === "YouTube" && v.key &&
      ["Trailer", "Teaser", "Clip", "Featurette"].includes(v.type)),
    [videos],
  );

  const handlePlay = useCallback((v: Video) => setSelected(v), []);
  const handleClose = useCallback(() => setSelected(null), []);

  if (!validVideos.length) return null;

  return (
    <>
      <section className="bg-[var(--section-bg)] py-10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          <h2 className="text-xl font-semibold text-[var(--section-title-color)] mb-6">{title}</h2>
          <Suspense fallback={<SectionSkeleton variant="grid" cardCount={4} />}>
            <LazyWrapper height={280}>
              <Slider slidesPerView={4} slidesPerViewMobile={2} spaceBetween={12} hideNavigation={false}>
                {validVideos.map((v) => (
                  <VideoCard key={v.id || v.key} video={v} onPlay={handlePlay} />
                ))}
              </Slider>
            </LazyWrapper>
          </Suspense>
          <p className="text-[var(--section-meta-color)] text-xs mt-4">{validVideos.length} videos</p>
        </div>
      </section>

      {selected && (
        <TrailerModal videoKey={selected.key} isOpen title={selected.name} onClose={handleClose} />
      )}
    </>
  );
});

export default VideosSection;

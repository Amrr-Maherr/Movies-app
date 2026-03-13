import { memo, useMemo, useCallback, Suspense } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { PageSkeleton, SectionSkeleton, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import FetchTvShowDetails from "@/queries/FetchTvShowDetails";
import { useTVVideos } from "@/queries";
import DetailPageNav from "@/components/shared/DetailPageNav";
import VideosSection from "@/components/sections/VideosSection";

/**
 * TVVideosPage Component
 * Dedicated page for displaying all TV show videos
 * Route: /tv/:id/videos
 */
const TVVideosPage = memo(function TVVideosPage() {
  const { slugWithId } = useParams<{ slugWithId: string }>();
  const tvId = extractIdFromSlug(slugWithId);
  const numericId = Number(tvId);

  // Fetch TV show details for metadata
  const {
    data: tvData,
    isLoading: tvLoading,
    error: tvError,
    refetch: refetchTv,
  } = FetchTvShowDetails(numericId);

  // Fetch TV videos
  const {
    data: videosData,
    isLoading: videosLoading,
    error: videosError,
    refetch: refetchVideos,
  } = useTVVideos(numericId, 1);

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetchTv();
    refetchVideos();
  }, [refetchTv, refetchVideos]);

  // Memoized: Extract videos
  const videos = useMemo(() => {
    return videosData?.results || [];
  }, [videosData]);

  const isLoading = tvLoading || videosLoading;
  const error = tvError || videosError;

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error || !tvData) {
    return (
      <Error
        fullscreen
        title="Failed to load videos"
        message="We couldn't load the video information. Please try again."
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      {/* SEO Meta Tags */}
      <HelmetMeta
        name={`${tvData.name} - Videos & Trailers`}
        description={`Watch trailers, teasers, and clips for ${tvData.name} on Netflix`}
        image={
          tvData.poster_path
            ? `https://image.tmdb.org/t/p/original${tvData.poster_path}`
            : undefined
        }
        url={window.location.href}
        type="video.tv_series"
      />

      {/* Header Section */}
      <section className="bg-black py-8 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          {/* Page Title */}
          <div className="flex items-center gap-4">
            <img
              src={`https://image.tmdb.org/t/p/w92${tvData.poster_path}`}
              alt={tvData.name}
              className="w-20 h-28 object-cover rounded-lg shadow-lg"
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {tvData.name}
              </h1>
              <p className="text-white/60 text-sm mb-2">
                {tvData.first_air_date?.substring(0, 4)} •{" "}
                {tvData.number_of_seasons} Seasons
              </p>
              <div className="flex items-center gap-2">
                <span className="text-blue-500 font-bold">{videos.length}</span>
                <span className="text-white/60 text-sm">
                  {videos.length === 1 ? "Video" : "Videos"} Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <DetailPageNav type="tv" slugWithId={slugWithId || ""} />

      {/* Videos Section */}
      <LazyWrapper height={600}>
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
          {videos.length > 0 ? (
            <VideosSection videos={videos} title="All Videos & Trailers" />
          ) : (
            <section className="bg-black py-12">
              <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl text-center">
                <p className="text-white/60 text-lg">
                  No videos available for this TV show yet.
                </p>
              </div>
            </section>
          )}
        </Suspense>
      </LazyWrapper>
    </div>
  );
});

export default TVVideosPage;

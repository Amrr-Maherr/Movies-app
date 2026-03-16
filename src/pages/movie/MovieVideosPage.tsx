import { memo, useMemo, useCallback, Suspense } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { PageSkeleton, SectionSkeleton, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import DetailHeader from "@/components/shared/DetailHeader";
import FetchMovieDetails from "@/queries/FetchMovieDetails";
import { useMovieVideos } from "@/queries";
import DetailPageNav from "@/components/shared/DetailPageNav";
import VideosSection from "@/components/sections/VideosSection";

/**
 * MovieVideosPage Component
 * Dedicated page for displaying all movie videos (trailers, teasers, clips)
 * Route: /movie/:id/videos
 */
const MovieVideosPage = memo(function MovieVideosPage() {
  const { slugWithId } = useParams<{ slugWithId: string }>();
  const movieId = extractIdFromSlug(slugWithId);
  const numericId = Number(movieId);

  // Fetch movie details for metadata
  const {
    data: movieData,
    isLoading: movieLoading,
    error: movieError,
    refetch: refetchMovie,
  } = FetchMovieDetails(numericId);

  // Fetch movie videos
  const {
    data: videosData,
    isLoading: videosLoading,
    error: videosError,
    refetch: refetchVideos,
  } = useMovieVideos(numericId, 1);

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetchMovie();
    refetchVideos();
  }, [refetchMovie, refetchVideos]);

  // Memoized: Extract videos
  const videos = useMemo(() => {
    return videosData?.results || [];
  }, [videosData]);

  const isLoading = movieLoading || videosLoading;
  const error = movieError || videosError;

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error || !movieData) {
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
        name={`${movieData.title} - Videos & Trailers`}
        description={`Watch trailers, teasers, and clips for ${movieData.title} on Netflix`}
        image={
          movieData.poster_path
            ? `https://image.tmdb.org/t/p/original${movieData.poster_path}`
            : undefined
        }
        url={window.location.href}
        type="video.movie"
      />

      {/* Header Section */}
      <DetailHeader media={movieData} type="movie" />

      {/* Navigation Tabs */}
      <DetailPageNav type="movie" slugWithId={slugWithId || ""} />

      {/* Videos Section */}
      <LazyWrapper height={600}>
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
          {videos.length > 0 ? (
            <VideosSection videos={videos} title="All Videos & Trailers" />
          ) : (
            <section className="bg-black py-12">
              <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl text-center">
                <p className="text-white/60 text-lg">
                  No videos available for this movie yet.
                </p>
              </div>
            </section>
          )}
        </Suspense>
      </LazyWrapper>
    </div>
  );
});

export default MovieVideosPage;

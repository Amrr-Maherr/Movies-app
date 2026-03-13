import { memo, useMemo, lazy, Suspense, useCallback } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { PageSkeleton, Error, SectionSkeleton } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import FetchMovieDetails from "@/queries/FetchMovieDetails";

const MediaHero = lazy(() => import("@/components/shared/MediaHero"));
const MediaInfoSection = lazy(() => import("@/components/sections/MediaInfoSection"));
const TrailersSection = lazy(() => import("@/components/sections/TrailersSection"));
const BehindTheScenesSection = lazy(() => import("@/components/sections/BehindTheScenesSection"));
const MoreLikeThisSection = lazy(() => import("@/components/sections/MoreLikeThisSection"));
const FullCreditsSection = lazy(() => import("@/components/sections/FullCreditsSection"));

const MovieDetailsPage = memo(function MovieDetailsPage() {
  const { slugWithId } = useParams<{ slugWithId: string }>();
  const id = extractIdFromSlug(slugWithId);
  const { isLoading, data, error, refetch } = FetchMovieDetails(Number(id));

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  const { videos, images, similar, credits } = useMemo(() => {
    if (!data) {
      return { videos: [], images: [], similar: [], credits: { cast: [], crew: [] } };
    }
    return {
      videos: data.videos?.results || [],
      images: data.images?.backdrops || [],
      similar: data.similar?.results || [],
      credits: data.credits || { cast: [], crew: [] },
    };
  }, [data]);

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error || !data) {
    return (
      <Error
        fullscreen
        title="Failed to load movie details"
        message="We couldn&apos;t load the movie information. Please try again."
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      {/* SEO Meta Tags */}
      <HelmetMeta
        name={data.title || "Movie Details"}
        description={data.overview || "Watch this movie on Netflix"}
        image={data.poster_path ? `https://image.tmdb.org/t/p/original${data.poster_path}` : undefined}
        url={window.location.href}
        type="video.movie"
      />

      {/* Hero Section */}
      <LazyWrapper height={500}>
        <Suspense fallback={<SectionSkeleton variant="hero" />}>
          <MediaHero media={data} />
        </Suspense>
      </LazyWrapper>

      {/* Media Info Section */}
      <LazyWrapper height={300}>
        <Suspense fallback={<SectionSkeleton variant="grid" />}>
          <MediaInfoSection media={data} />
        </Suspense>
      </LazyWrapper>

      {/* Trailers Section */}
      {videos.length > 0 && (
        <LazyWrapper height={400}>
          <Suspense fallback={<SectionSkeleton variant="grid" cardCount={3} />}>
            <TrailersSection videos={videos} />
          </Suspense>
        </LazyWrapper>
      )}

      {/* Behind the Scenes Section */}
      <LazyWrapper height={400}>
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
          <BehindTheScenesSection images={images} />
        </Suspense>
      </LazyWrapper>

      {/* More Like This Section */}
      {similar.length > 0 && (
        <LazyWrapper height={500}>
          <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
            <MoreLikeThisSection similar={similar} />
          </Suspense>
        </LazyWrapper>
      )}

      {/* Full Credits Section */}
      {(credits.cast.length > 0 || credits.crew.length > 0) && (
        <LazyWrapper height={500}>
          <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
            <FullCreditsSection cast={credits.cast || []} crew={credits.crew || []} />
          </Suspense>
        </LazyWrapper>
      )}
    </div>
  );
});

export default MovieDetailsPage;

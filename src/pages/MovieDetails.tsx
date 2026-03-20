import { memo, useMemo, lazy, Suspense, useCallback } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { PageSkeleton, Error, SectionSkeleton } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import FetchMovieDetails from "@/hooks/shared/FetchMovieDetails";
import DetailPageNav from "@/components/shared/DetailPageNav";

const MediaHero = lazy(() => import("@/components/shared/MediaHero"));
const MediaInfoSection = lazy(
  () => import("@/components/sections/MediaInfoSection"),
);
const TrailersSection = lazy(
  () => import("@/components/sections/TrailersSection"),
);
const BehindTheScenesSection = lazy(
  () => import("@/components/sections/BehindTheScenesSection"),
);
const MoreLikeThisSection = lazy(
  () => import("@/components/sections/MoreLikeThisSection"),
);
const FullCreditsSection = lazy(
  () => import("@/components/sections/FullCreditsSection"),
);

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
      return {
        videos: [],
        images: [],
        similar: [],
        credits: { cast: [], crew: [] },
      };
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
        message="We couldn't load the movie information. Please try again."
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
        image={
          data.poster_path
            ? `https://image.tmdb.org/t/p/original${data.poster_path}`
            : undefined
        }
        url={window.location.href}
        type="video.movie"
      />

      {/* Hero Section */}
      <Suspense fallback={<SectionSkeleton variant="hero" />}>
        <LazyWrapper height={500}>
          <MediaHero media={data as any} />
        </LazyWrapper>
      </Suspense>

      {/* Navigation Tabs */}
      <DetailPageNav type="movie" slugWithId={slugWithId || ""} />

      {/* Media Info Section */}
      <Suspense fallback={<SectionSkeleton variant="grid" />}>
        <LazyWrapper height={300}>
          <MediaInfoSection media={data as any} />
        </LazyWrapper>
      </Suspense>

      {/* Trailers Section */}
      {videos.length > 0 && (
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={3} />}>
          <LazyWrapper height={400}>
            <TrailersSection videos={videos} />
          </LazyWrapper>
        </Suspense>
      )}

      {/* Behind the Scenes Section */}
      <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
        <LazyWrapper height={400}>
          <BehindTheScenesSection images={images} />
        </LazyWrapper>
      </Suspense>

      {/* More Like This Section */}
      {similar.length > 0 && (
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
          <LazyWrapper height={500}>
            <MoreLikeThisSection similar={similar} />
          </LazyWrapper>
        </Suspense>
      )}

      {/* Full Credits Section */}
      {(credits.cast.length > 0 || credits.crew.length > 0) && (
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
          <LazyWrapper height={500}>
            <FullCreditsSection
              cast={credits.cast || []}
              crew={credits.crew || []}
            />
          </LazyWrapper>
        </Suspense>
      )}
    </div>
  );
});

export default MovieDetailsPage;

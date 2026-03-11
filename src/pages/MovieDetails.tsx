import { memo, useMemo, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import FetchMovieDetails from "@/queries/FetchMovieDetails";
import { Loader } from "@/components/ui/loader";
import { Error } from "@/components/ui/error";

const MediaHero = lazy(() => import("@/components/shared/MediaHero"));
const MediaInfoSection = lazy(() => import("@/components/sections/MediaInfoSection"));
const TrailersSection = lazy(() => import("@/components/sections/TrailersSection"));
const BehindTheScenesSection = lazy(() => import("@/components/sections/BehindTheScenesSection"));
const MoreLikeThisSection = lazy(() => import("@/components/sections/MoreLikeThisSection"));
const FullCreditsSection = lazy(() => import("@/components/sections/FullCreditsSection"));

const SectionSkeleton = () => (
  <div className="w-full py-12 bg-zinc-900/50 animate-pulse">
    <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
      <div className="h-8 bg-zinc-800 rounded w-48 mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-[2/3] bg-zinc-800 rounded" />
        ))}
      </div>
    </div>
  </div>
);

const MovieDetailsPage = memo(function MovieDetailsPage() {
  const { slugWithId } = useParams<{ slugWithId: string }>();
  const id = extractIdFromSlug(slugWithId);
  const { isLoading, data, error, refetch } = FetchMovieDetails(Number(id));

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
    return <Loader fullscreen size="lg" />;
  }

  if (error || !data) {
    return (
      <Error
        fullscreen
        title="Failed to load movie details"
        message="We couldn&apos;t load the movie information. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-[var(--background-primary)]"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <LazyWrapper threshold={0.01} rootMargin="100px" height={500}>
        <Suspense fallback={<SectionSkeleton />}>
          <MediaHero media={data} />
        </Suspense>
      </LazyWrapper>

      {/* Media Info Section */}
      <LazyWrapper threshold={0.01} rootMargin="100px">
        <Suspense fallback={<SectionSkeleton />}>
          <MediaInfoSection media={data} />
        </Suspense>
      </LazyWrapper>

      {/* Trailers Section */}
      {videos.length > 0 && (
        <LazyWrapper threshold={0.01} rootMargin="100px">
          <Suspense fallback={<SectionSkeleton />}>
            <TrailersSection videos={videos} />
          </Suspense>
        </LazyWrapper>
      )}

      {/* Behind the Scenes Section */}
      <LazyWrapper threshold={0.01} rootMargin="100px">
        <Suspense fallback={<SectionSkeleton />}>
          <BehindTheScenesSection images={images} />
        </Suspense>
      </LazyWrapper>

      {/* More Like This Section */}
      {similar.length > 0 && (
        <LazyWrapper threshold={0.01} rootMargin="100px">
          <Suspense fallback={<SectionSkeleton />}>
            <MoreLikeThisSection similar={similar} />
          </Suspense>
        </LazyWrapper>
      )}

      {/* Full Credits Section */}
      {(credits.cast.length > 0 || credits.crew.length > 0) && (
        <LazyWrapper threshold={0.01} rootMargin="200px">
          <Suspense fallback={<SectionSkeleton />}>
            <FullCreditsSection cast={credits.cast || []} crew={credits.crew || []} />
          </Suspense>
        </LazyWrapper>
      )}
    </motion.div>
  );
});

export default MovieDetailsPage;

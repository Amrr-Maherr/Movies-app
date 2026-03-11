import { memo, lazy, Suspense, useMemo } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import { useLazyLoad } from "@/hooks/useLazyLoad";
import FetchMovieDetails from "@/queries/FetchMovieDetails";
import { Loader } from "@/components/ui/loader";
import { Error } from "@/components/ui/error";

// ============================================
// CODE SPLITTING WITH REACT.LAZY
// Lazy-load heavy components to improve initial bundle size
// Each component will be loaded on-demand when rendered
// ============================================

// Hero section - loaded first as it's above the fold
const MediaHero = lazy(() => import("@/components/shared/MediaHero"));

// Info section - loaded immediately after hero
const MediaInfoSection = lazy(() => import("@/components/sections/MediaInfoSection"));

// Trailers section - heavy video content, lazy load
const TrailersSection = lazy(() => import("@/components/sections/TrailersSection"));

// Behind the scenes - image gallery, lazy load
const BehindTheScenesSection = lazy(() => import("@/components/sections/BehindTheScenesSection"));

// More like this - recommendation carousel, lazy load
const MoreLikeThisSection = lazy(() => import("@/components/sections/MoreLikeThisSection"));

// Full credits - large cast/crew list, lazy load
const FullCreditsSection = lazy(() => import("@/components/sections/FullCreditsSection"));

// ============================================
// SUSPENSE FALLBACK COMPONENT
// Shown while lazy components are loading
// ============================================
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

// Memoized MovieDetailsPage component - avoids re-renders when parent updates
const MovieDetailsPage = memo(function MovieDetailsPage() {
  const { slugWithId } = useParams<{ slugWithId: string }>();
  const id = extractIdFromSlug(slugWithId);
  const { isLoading, data, error, refetch } = FetchMovieDetails(Number(id));

  // Memoized: Extract data for child components
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

  // ============================================
  // LAZY LOAD HOOKS FOR SECTION-LEVEL RENDERING
  // Combined with React.lazy for optimal performance
  // Sections only render when visible in viewport
  // ============================================
  const { ref: heroRef, isVisible: heroVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: infoRef, isVisible: infoVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: trailersRef, isVisible: trailersVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: behindScenesRef, isVisible: behindScenesVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: moreLikeThisRef, isVisible: moreLikeThisVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: creditsRef, isVisible: creditsVisible } = useLazyLoad<HTMLDivElement>();

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
      {/* 
        ============================================
        HERO SECTION
        - Lazy-loaded component with Suspense
        - useLazyLoad for viewport-based rendering
        ============================================
      */}
      <div ref={heroRef}>
        {heroVisible && (
          <Suspense fallback={<SectionSkeleton />}>
            <MediaHero media={data} />
          </Suspense>
        )}
      </div>

      {/* 
        ============================================
        MEDIA INFO SECTION
        - Contains overview, tagline, cast, metadata
        - Lazy-loaded with viewport detection
        ============================================
      */}
      <div ref={infoRef}>
        {infoVisible && (
          <Suspense fallback={<SectionSkeleton />}>
            <MediaInfoSection media={data} />
          </Suspense>
        )}
      </div>

      {/* 
        ============================================
        TRAILERS SECTION
        - Heavy video content
        - Only loads when scrolled into view
        ============================================
      */}
      <div ref={trailersRef}>
        {trailersVisible && videos.length > 0 && (
          <Suspense fallback={<SectionSkeleton />}>
            <TrailersSection videos={videos} />
          </Suspense>
        )}
      </div>

      {/* 
        ============================================
        BEHIND THE SCENES SECTION
        - Image gallery with backdrops
        - Lazy load to defer image loading
        ============================================
      */}
      <div ref={behindScenesRef}>
        {behindScenesVisible && (
          <Suspense fallback={<SectionSkeleton />}>
            <BehindTheScenesSection images={images} />
          </Suspense>
        )}
      </div>

      {/* 
        ============================================
        MORE LIKE THIS SECTION
        - Recommendation carousel
        - Loaded only when user scrolls down
        ============================================
      */}
      <div ref={moreLikeThisRef}>
        {moreLikeThisVisible && similar.length > 0 && (
          <Suspense fallback={<SectionSkeleton />}>
            <MoreLikeThisSection similar={similar} />
          </Suspense>
        )}
      </div>

      {/* 
        ============================================
        FULL CREDITS SECTION
        - Large cast and crew list
        - Heavy component, lazy loaded
        ============================================
      */}
      <div ref={creditsRef}>
        {creditsVisible && (credits.cast.length > 0 || credits.crew.length > 0) && (
          <Suspense fallback={<SectionSkeleton />}>
            <FullCreditsSection cast={credits.cast || []} crew={credits.crew || []} />
          </Suspense>
        )}
      </div>
    </motion.div>
  );
});

export default MovieDetailsPage;

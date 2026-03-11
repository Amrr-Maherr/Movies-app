import { memo, useMemo, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import { useLazyLoad } from "@/hooks/useLazyLoad";
import { Loader } from "@/components/ui/loader";
import { Error } from "@/components/ui/error";
import FetchTvShowDetails from "@/queries/FetchTvShowDetails";
import { extractKeywords, extractWatchProviders } from "@/utils";
import type { Video } from "@/types";

// ============================================
// CODE SPLITTING WITH REACT.LAZY
// Lazy-load heavy components to improve initial bundle size
// Each component will be loaded on-demand when rendered
// ============================================

// Hero section - loaded first as it's above the fold
const MediaHero = lazy(() => import("@/components/shared/MediaHero"));

// Info section - loaded immediately after hero
const MediaInfoSection = lazy(() => import("@/components/sections/MediaInfoSection"));

// Episodes section - TV show specific, heavy component
const EpisodesSection = lazy(() => import("@/components/sections/EpisodesSection"));

// Trailers section - heavy video content, lazy load
const TrailersSection = lazy(() => import("@/components/sections/TrailersSection"));

// Behind the scenes - image gallery, lazy load
const BehindTheScenesSection = lazy(() => import("@/components/sections/BehindTheScenesSection"));

// Reviews section - user-generated content, lazy load
const ReviewsSection = lazy(() => import("@/components/sections/ReviewsSection"));

// Keywords section - tags/topics, lightweight but lazy loaded
const KeywordsSection = lazy(() => import("@/components/sections/KeywordsSection"));

// Watch providers - streaming platforms, lazy load
const WatchProvidersSection = lazy(() => import("@/components/sections/WatchProvidersSection"));

// More like this - recommendation carousel, lazy load
const MoreLikeThisSection = lazy(() => import("@/components/sections/MoreLikeThisSection"));

// ============================================
// SUSPENSE FALLBACK COMPONENT
// Shown while lazy components are loading
// ============================================
const SectionSkeleton = () => (
  <div className="w-full py-12 bg-zinc-900/50 animate-pulse">
    <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
      <div className="h-8 bg-zinc-800 rounded w-48 mb-6" />
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-zinc-800 rounded" />
        ))}
      </div>
    </div>
  </div>
);

// Memoized TVShowDetailsPage component - avoids re-renders when parent updates
const TVShowDetailsPage = memo(function TVShowDetailsPage() {
  const { slugWithId } = useParams<{ slugWithId: string }>();
  const id = extractIdFromSlug(slugWithId);
  const { isLoading, data, error, refetch } = FetchTvShowDetails(Number(id));

  // Memoized: Extract and prepare data for child components
  const { trailers, reviews, keywords, watchProviders, similar, seasons, backdrops } =
    useMemo(() => {
      if (!data) {
        return {
          trailers: [],
          reviews: [],
          keywords: [],
          watchProviders: [],
          similar: [],
          seasons: [],
          backdrops: [],
        };
      }

      const trailers: Video[] =
        data.videos?.results?.filter(
          (video: Video) =>
            video.site === "YouTube" &&
            (video.type === "Trailer" ||
              video.type === "Teaser" ||
              video.type === "Clip"),
        ) || [];

      const reviews =
        data.reviews?.results?.filter(
          (review: { author: string; content: string }) =>
            review.author && review.content?.trim(),
        ) || [];

      const keywords = extractKeywords(data.keywords);
      const watchProviders = extractWatchProviders(data);
      const similar = data.similar?.results || [];
      const seasons = data.seasons || [];
      const backdrops = data.images?.backdrops || [];

      return { trailers, reviews, keywords, watchProviders, similar, seasons, backdrops };
    }, [data]);

  // ============================================
  // LAZY LOAD HOOKS FOR SECTION-LEVEL RENDERING
  // Combined with React.lazy for optimal performance
  // Sections only render when visible in viewport
  // ============================================
  const { ref: heroRef, isVisible: heroVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: infoRef, isVisible: infoVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: episodesRef, isVisible: episodesVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: trailersRef, isVisible: trailersVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: behindScenesRef, isVisible: behindScenesVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: reviewsRef, isVisible: reviewsVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: keywordsRef, isVisible: keywordsVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: watchProvidersRef, isVisible: watchProvidersVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: moreLikeThisRef, isVisible: moreLikeThisVisible } = useLazyLoad<HTMLDivElement>();

  if (isLoading) {
    return <Loader fullscreen size="lg" />;
  }

  if (error || !data) {
    return (
      <Error
        fullscreen
        title="Failed to load TV show details"
        message="We couldn&apos;t load the TV show information. Please try again."
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
        - Backdrop, Poster, Title, Meta info
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
        - Overview, Tagline, Cast, Metadata
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
        EPISODES/SEASONS SECTION
        - TV Show specific component
        - Heavy component with season/episode data
        - Only loads when scrolled into view
        ============================================
      */}
      <div ref={episodesRef}>
        {episodesVisible && seasons.length > 0 && (
          <Suspense fallback={<SectionSkeleton />}>
            <EpisodesSection seasons={seasons} tvShowId={data.id} />
          </Suspense>
        )}
      </div>

      {/* 
        ============================================
        TRAILERS SECTION
        - YouTube trailers
        - Heavy video content, deferred loading
        ============================================
      */}
      <div ref={trailersRef}>
        {trailersVisible && trailers.length > 0 && (
          <Suspense fallback={<SectionSkeleton />}>
            <TrailersSection videos={trailers} />
          </Suspense>
        )}
      </div>

      {/* 
        ============================================
        BEHIND THE SCENES SECTION
        - Backdrop photos gallery
        - Lazy load to defer image loading
        ============================================
      */}
      <div ref={behindScenesRef}>
        {behindScenesVisible && (
          <Suspense fallback={<SectionSkeleton />}>
            <BehindTheScenesSection images={backdrops} />
          </Suspense>
        )}
      </div>

      {/* 
        ============================================
        REVIEWS SECTION
        - User reviews
        - Only shown when reviews exist
        - Lazy loaded for performance
        ============================================
      */}
      <div ref={reviewsRef}>
        {reviewsVisible && reviews.length > 0 && (
          <Suspense fallback={<SectionSkeleton />}>
            <ReviewsSection reviews={reviews} />
          </Suspense>
        )}
      </div>

      {/* 
        ============================================
        KEYWORDS SECTION
        - Tags/Topics
        - Wrapped in section for consistent styling
        ============================================
      */}
      <div ref={keywordsRef}>
        {keywordsVisible && keywords.length > 0 && (
          <Suspense fallback={<SectionSkeleton />}>
            <section className="bg-black py-8 md:py-12">
              <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                  Tags
                </h3>
                <KeywordsSection keywords={keywords} />
              </div>
            </section>
          </Suspense>
        )}
      </div>

      {/* 
        ============================================
        WATCH PROVIDERS SECTION
        - Streaming platforms
        - Lazy loaded component
        ============================================
      */}
      <div ref={watchProvidersRef}>
        {watchProvidersVisible && watchProviders.length > 0 && (
          <Suspense fallback={<SectionSkeleton />}>
            <WatchProvidersSection providers={watchProviders} />
          </Suspense>
        )}
      </div>

      {/* 
        ============================================
        MORE LIKE THIS SECTION
        - Similar TV shows
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
    </motion.div>
  );
});

export default TVShowDetailsPage;

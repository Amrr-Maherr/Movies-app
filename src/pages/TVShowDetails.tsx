import { memo, useMemo, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import HelmetMeta from "@/components/shared/HelmetMeta";
import { Loader } from "@/components/ui/loader";
import { Error } from "@/components/ui/error";
import FetchTvShowDetails from "@/queries/FetchTvShowDetails";
import { extractKeywords, extractWatchProviders } from "@/utils";
import type { Video } from "@/types";

const MediaHero = lazy(() => import("@/components/shared/MediaHero"));
const MediaInfoSection = lazy(() => import("@/components/sections/MediaInfoSection"));
const EpisodesSection = lazy(() => import("@/components/sections/EpisodesSection"));
const TrailersSection = lazy(() => import("@/components/sections/TrailersSection"));
const BehindTheScenesSection = lazy(() => import("@/components/sections/BehindTheScenesSection"));
const ReviewsSection = lazy(() => import("@/components/sections/ReviewsSection"));
const KeywordsSection = lazy(() => import("@/components/sections/KeywordsSection"));
const WatchProvidersSection = lazy(() => import("@/components/sections/WatchProvidersSection"));
const MoreLikeThisSection = lazy(() => import("@/components/sections/MoreLikeThisSection"));

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

const TVShowDetailsPage = memo(function TVShowDetailsPage() {
  const { slugWithId } = useParams<{ slugWithId: string }>();
  const id = extractIdFromSlug(slugWithId);
  const { isLoading, data, error, refetch } = FetchTvShowDetails(Number(id));

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
      {/* SEO Meta Tags */}
      <HelmetMeta
        name={data.name || "TV Show Details"}
        description={data.overview || "Watch this TV show on Netflix"}
        image={data.poster_path ? `https://image.tmdb.org/t/p/original${data.poster_path}` : undefined}
        url={window.location.href}
        type="video.tv_series"
      />

      {/* Hero Section */}
      <LazyWrapper height={500}>
        <Suspense fallback={<SectionSkeleton />}>
          <MediaHero media={data} />
        </Suspense>
      </LazyWrapper>

      {/* Media Info Section */}
      <LazyWrapper>
        <Suspense fallback={<SectionSkeleton />}>
          <MediaInfoSection media={data} />
        </Suspense>
      </LazyWrapper>

      {/* Episodes/Seasons Section */}
      {seasons.length > 0 && (
        <LazyWrapper>
          <Suspense fallback={<SectionSkeleton />}>
            <EpisodesSection seasons={seasons} tvShowId={data.id} />
          </Suspense>
        </LazyWrapper>
      )}

      {/* Trailers Section */}
      {trailers.length > 0 && (
        <LazyWrapper>
          <Suspense fallback={<SectionSkeleton />}>
            <TrailersSection videos={trailers} />
          </Suspense>
        </LazyWrapper>
      )}

      {/* Behind the Scenes Section */}
      <LazyWrapper>
        <Suspense fallback={<SectionSkeleton />}>
          <BehindTheScenesSection images={backdrops} />
        </Suspense>
      </LazyWrapper>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <LazyWrapper>
          <Suspense fallback={<SectionSkeleton />}>
            <ReviewsSection reviews={reviews} />
          </Suspense>
        </LazyWrapper>
      )}

      {/* Keywords Section */}
      {keywords.length > 0 && (
        <LazyWrapper>
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
        </LazyWrapper>
      )}

      {/* Watch Providers Section */}
      {watchProviders.length > 0 && (
        <LazyWrapper>
          <Suspense fallback={<SectionSkeleton />}>
            <WatchProvidersSection providers={watchProviders} />
          </Suspense>
        </LazyWrapper>
      )}

      {/* More Like This Section */}
      {similar.length > 0 && (
        <LazyWrapper>
          <Suspense fallback={<SectionSkeleton />}>
            <MoreLikeThisSection similar={similar} />
          </Suspense>
        </LazyWrapper>
      )}
    </motion.div>
  );
});

export default TVShowDetailsPage;

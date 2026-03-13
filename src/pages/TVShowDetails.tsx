import { memo, useMemo, lazy, Suspense, useCallback } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { SectionSkeleton, PageSkeleton, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import FetchTvShowDetails from "@/queries/FetchTvShowDetails";
import DetailPageNav from "@/components/shared/DetailPageNav";
import { extractKeywords, extractWatchProviders } from "@/utils";
import type { Video } from "@/types";

const MediaHero = lazy(() => import("@/components/shared/MediaHero"));
const MediaInfoSection = lazy(
  () => import("@/components/sections/MediaInfoSection"),
);
const EpisodesSection = lazy(
  () => import("@/components/sections/EpisodesSection"),
);
const TrailersSection = lazy(
  () => import("@/components/sections/TrailersSection"),
);
const BehindTheScenesSection = lazy(
  () => import("@/components/sections/BehindTheScenesSection"),
);
const ReviewsSection = lazy(
  () => import("@/components/sections/ReviewsSection"),
);
const KeywordsSection = lazy(
  () => import("@/components/sections/KeywordsSection"),
);
const WatchProvidersSection = lazy(
  () => import("@/components/sections/WatchProvidersSection"),
);
const MoreLikeThisSection = lazy(
  () => import("@/components/sections/MoreLikeThisSection"),
);

const TVShowDetailsPage = memo(function TVShowDetailsPage() {
  const { slugWithId } = useParams<{ slugWithId: string }>();
  const id = extractIdFromSlug(slugWithId);
  const { isLoading, data, error, refetch } = FetchTvShowDetails(Number(id));

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  const {
    trailers,
    reviews,
    keywords,
    watchProviders,
    similar,
    seasons,
    backdrops,
  } = useMemo(() => {
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

    const keywords = extractKeywords(data.keywords as any);
    const watchProviders = extractWatchProviders(data as any);
    const similar = data.similar?.results || [];
    const seasons = data.seasons || [];
    const backdrops = data.images?.backdrops || [];

    return {
      trailers,
      reviews,
      keywords,
      watchProviders,
      similar,
      seasons,
      backdrops,
    };
  }, [data]);

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error || !data) {
    return (
      <Error
        fullscreen
        title="Failed to load TV show details"
        message="We couldn't load the TV show information. Please try again."
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      {/* SEO Meta Tags */}
      <HelmetMeta
        name={data.name || "TV Show Details"}
        description={data.overview || "Watch this TV show on Netflix"}
        image={
          data.poster_path
            ? `https://image.tmdb.org/t/p/original${data.poster_path}`
            : undefined
        }
        url={window.location.href}
        type="video.tv_series"
      />

      {/* Hero Section */}
      <LazyWrapper height={500}>
        <Suspense fallback={<SectionSkeleton variant="hero" />}>
          <MediaHero media={data as any} />
        </Suspense>
      </LazyWrapper>

      {/* Navigation Tabs */}
      <DetailPageNav type="tv" slugWithId={slugWithId || ""} />

      {/* Media Info Section */}
      <LazyWrapper height={300}>
        <Suspense fallback={<SectionSkeleton variant="grid" />}>
          <MediaInfoSection media={data as any} />
        </Suspense>
      </LazyWrapper>

      {/* Episodes/Seasons Section */}
      {seasons.length > 0 && (
        <LazyWrapper height={500}>
          <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
            <EpisodesSection seasons={seasons} tvShowId={data.id} />
          </Suspense>
        </LazyWrapper>
      )}

      {/* Trailers Section */}
      {trailers.length > 0 && (
        <LazyWrapper height={400}>
          <Suspense fallback={<SectionSkeleton variant="grid" cardCount={3} />}>
            <TrailersSection videos={trailers} />
          </Suspense>
        </LazyWrapper>
      )}

      {/* Behind the Scenes Section */}
      <LazyWrapper height={400}>
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
          <BehindTheScenesSection images={backdrops} />
        </Suspense>
      </LazyWrapper>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <LazyWrapper height={400}>
          <Suspense fallback={<SectionSkeleton variant="list" cardCount={3} />}>
            <ReviewsSection reviews={reviews} />
          </Suspense>
        </LazyWrapper>
      )}

      {/* Keywords Section */}
      {keywords.length > 0 && (
        <LazyWrapper height={200}>
          <Suspense fallback={<SectionSkeleton variant="grid" cardCount={1} />}>
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
        <LazyWrapper height={300}>
          <Suspense fallback={<SectionSkeleton variant="grid" cardCount={1} />}>
            <WatchProvidersSection providers={watchProviders} />
          </Suspense>
        </LazyWrapper>
      )}

      {/* More Like This Section */}
      {similar.length > 0 && (
        <LazyWrapper height={500}>
          <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
            <MoreLikeThisSection similar={similar} />
          </Suspense>
        </LazyWrapper>
      )}
    </div>
  );
});

export default TVShowDetailsPage;

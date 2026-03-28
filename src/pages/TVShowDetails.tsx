import { memo, useMemo, lazy, Suspense, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { SectionSkeleton, PageSkeleton, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import FetchTvShowDetails from "@/hooks/shared/FetchTvShowDetails";
import DetailPageNav, { type MovieTab } from "@/components/shared/DetailPageNav";
import { extractKeywords, extractWatchProviders } from "@/utils";
import {
  useTVReviews,
  useTVVideos,
  useTVImages,
  useTVWatchProviders,
  useTVCredits,
  useTVRecommendations,
} from "@/hooks/shared";
import { Heart } from "lucide-react";
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
const VideosSection = lazy(() => import("@/components/sections/VideosSection"));
const ImagesGallery = lazy(() => import("@/components/sections/ImagesGallery"));
const WatchProvidersDetail = lazy(() => import("@/components/sections/WatchProvidersDetail"));
const FullCreditsDetail = lazy(() => import("@/components/sections/FullCreditsDetail"));
const RecommendationsSection = lazy(() => import("@/components/sections/RecommendationsSection"));

const TVShowDetailsPage = memo(function TVShowDetailsPage() {
  const { slugWithId } = useParams<{ slugWithId: string }>();
  const id = extractIdFromSlug(slugWithId);
  const numericId = Number(id);

  const [activeTab, setActiveTab] = useState<MovieTab>("overview");

  const { isLoading, data, error, refetch } = FetchTvShowDetails(numericId);

  // Tab-specific hooks — only fetch when tab is active
  const { data: reviewsData } = useTVReviews(activeTab === "reviews" ? numericId : 0, 1);
  const { data: videosData } = useTVVideos(activeTab === "videos" ? numericId : 0, 1);
  const { data: imagesData } = useTVImages(activeTab === "images" ? numericId : 0);
  const { data: providersData } = useTVWatchProviders(activeTab === "watch" ? numericId : 0, "US");
  const { data: creditsData } = useTVCredits(activeTab === "credits" ? numericId : 0);
  const { data: recommendationsData } = useTVRecommendations(activeTab === "recommendations" ? numericId : 0);

  const handleRetry = useCallback(() => refetch(), [refetch]);
  const handleTabChange = useCallback((tab: MovieTab) => setActiveTab(tab), []);

  const { trailers, keywords, watchProviders, similar, seasons, backdrops } = useMemo(() => {
    if (!data) return { trailers: [], keywords: [], watchProviders: [], similar: [], seasons: [], backdrops: [] };
    return {
      trailers: (data.videos?.results?.filter((v: Video) =>
        v.site === "YouTube" && ["Trailer", "Teaser", "Clip"].includes(v.type),
      ) || []) as Video[],
      keywords: extractKeywords(data.keywords as any),
      watchProviders: extractWatchProviders(data as any),
      similar: data.similar?.results || [],
      seasons: data.seasons || [],
      backdrops: data.images?.backdrops || [],
    };
  }, [data]);

  const reviews = useMemo(
    () => reviewsData?.results?.filter((r: any) => r.author && r.content?.trim()) || [],
    [reviewsData],
  );
  const tabVideos = useMemo(() => videosData?.results || [], [videosData]);
  const allImages = useMemo(() => {
    if (!imagesData) return [];
    return [...(imagesData.backdrops || []), ...(imagesData.posters || []), ...(imagesData.logos || [])];
  }, [imagesData]);
  const usProviders = useMemo(() => providersData?.results?.US, [providersData]);
  const { cast, crew } = useMemo(
    () => ({ cast: creditsData?.cast || [], crew: creditsData?.crew || [] }),
    [creditsData],
  );
  const recommendations = useMemo(() => recommendationsData?.results || [], [recommendationsData]);

  if (isLoading) return <PageSkeleton />;

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
      <HelmetMeta
        name={data.name || "TV Show Details"}
        description={data.overview || "Watch this TV show on Netflix"}
        image={data.poster_path ? `https://image.tmdb.org/t/p/original${data.poster_path}` : undefined}
        url={window.location.href}
        type="video.tv_series"
      />

      {/* Hero */}
      <Suspense fallback={<SectionSkeleton variant="hero" />}>
        <LazyWrapper height={500}>
          <MediaHero media={data as any} />
        </LazyWrapper>
      </Suspense>

      {/* Tabs Nav */}
      <DetailPageNav type="tv" activeTab={activeTab} onTabChange={handleTabChange as any} />

      {/* Overview */}
      {activeTab === "overview" && (
        <>
          <Suspense fallback={<SectionSkeleton variant="grid" />}>
            <LazyWrapper height={300}>
              <MediaInfoSection media={data as any} />
            </LazyWrapper>
          </Suspense>

          {seasons.length > 0 && (
            <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
              <LazyWrapper height={500}>
                <EpisodesSection seasons={seasons} tvShowId={data.id} />
              </LazyWrapper>
            </Suspense>
          )}

          {trailers.length > 0 && (
            <Suspense fallback={<SectionSkeleton variant="grid" cardCount={3} />}>
              <LazyWrapper height={400}>
                <TrailersSection videos={trailers} />
              </LazyWrapper>
            </Suspense>
          )}

          <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
            <LazyWrapper height={400}>
              <BehindTheScenesSection images={backdrops} />
            </LazyWrapper>
          </Suspense>

          {keywords.length > 0 && (
            <Suspense fallback={<SectionSkeleton variant="grid" cardCount={1} />}>
              <LazyWrapper height={200}>
                <section className="bg-black py-4 md:py-12">
                  <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Tags</h3>
                    <KeywordsSection keywords={keywords} />
                  </div>
                </section>
              </LazyWrapper>
            </Suspense>
          )}

          {watchProviders.length > 0 && (
            <Suspense fallback={<SectionSkeleton variant="grid" cardCount={1} />}>
              <LazyWrapper height={300}>
                <WatchProvidersSection providers={watchProviders} />
              </LazyWrapper>
            </Suspense>
          )}

          {similar.length > 0 && (
            <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
              <LazyWrapper height={500}>
                <MoreLikeThisSection similar={similar} />
              </LazyWrapper>
            </Suspense>
          )}
        </>
      )}

      {/* Reviews */}
      {activeTab === "reviews" && (
        <Suspense fallback={<SectionSkeleton variant="list" cardCount={5} />}>
          <LazyWrapper height={600}>
            {reviews.length > 0 ? (
              <ReviewsSection reviews={reviews} />
            ) : (
              <EmptyState message="No reviews available for this TV show yet." />
            )}
          </LazyWrapper>
        </Suspense>
      )}

      {/* Videos */}
      {activeTab === "videos" && (
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
          <LazyWrapper height={600}>
            {tabVideos.length > 0 ? (
              <VideosSection videos={tabVideos} title="All Videos & Trailers" />
            ) : (
              <EmptyState message="No videos available for this TV show yet." />
            )}
          </LazyWrapper>
        </Suspense>
      )}

      {/* Images */}
      {activeTab === "images" && (
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={12} />}>
          <LazyWrapper height={800}>
            {allImages.length > 0 ? (
              <ImagesGallery images={allImages} title="Complete Image Gallery" type="all" />
            ) : (
              <EmptyState message="No images available for this TV show yet." />
            )}
          </LazyWrapper>
        </Suspense>
      )}

      {/* Watch */}
      {activeTab === "watch" && (
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
          <LazyWrapper height={600}>
            <WatchProvidersDetail providers={usProviders} region="US" title="Streaming Providers" />
          </LazyWrapper>
        </Suspense>
      )}

      {/* Credits */}
      {activeTab === "credits" && (
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={12} />}>
          <LazyWrapper height={1200}>
            {cast.length > 0 || crew.length > 0 ? (
              <FullCreditsDetail cast={cast} crew={crew} title="Complete Cast & Crew" />
            ) : (
              <EmptyState message="No cast or crew information available for this TV show yet." />
            )}
          </LazyWrapper>
        </Suspense>
      )}

      {/* Recommendations */}
      {activeTab === "recommendations" && (
        <LazyWrapper height={600}>
          {recommendations.length > 0 ? (
            <RecommendationsSection recommendations={recommendations} title="More Like This" variant="recommendations" />
          ) : (
            <section className="bg-black py-16">
              <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl text-center">
                <Heart className="w-20 h-20 text-white/20 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">No Recommendations Available</h2>
                <p className="text-white/60 text-lg">We don't have enough data to recommend similar shows yet.</p>
              </div>
            </section>
          )}
        </LazyWrapper>
      )}
    </div>
  );
});

function EmptyState({ message }: { message: string }) {
  return (
    <section className="bg-black py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl text-center">
        <p className="text-white/60 text-lg">{message}</p>
      </div>
    </section>
  );
}

export default TVShowDetailsPage;

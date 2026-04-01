import { memo, useMemo, lazy, Suspense, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import { OptimizedSectionWrapper } from "@/components/optimized-section-wrapper";
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
      <OptimizedSectionWrapper
        data={data}
        isLoading={isLoading}
        fallback={<SectionSkeleton variant="hero" />}
        height={500}
        title="Hero"
      >
        {(mediaData) => <MediaHero media={mediaData as any} />}
      </OptimizedSectionWrapper>

      {/* Tabs Nav */}
      <DetailPageNav type="tv" activeTab={activeTab} onTabChange={handleTabChange as any} />

      {/* Overview */}
      {activeTab === "overview" && (
        <>
          <OptimizedSectionWrapper
            data={data}
            isLoading={isLoading}
            fallback={<SectionSkeleton variant="grid" />}
            height={300}
            title="Media Info"
          >
            {(mediaData) => <MediaInfoSection media={mediaData as any} />}
          </OptimizedSectionWrapper>

          <OptimizedSectionWrapper
            data={seasons.length > 0 ? seasons : null}
            isLoading={isLoading}
            fallback={<SectionSkeleton variant="grid" cardCount={6} />}
            height={500}
            title="Episodes"
          >
            {(seasonsData) => <EpisodesSection seasons={seasonsData} tvShowId={data.id} />}
          </OptimizedSectionWrapper>

          <OptimizedSectionWrapper
            data={trailers.length > 0 ? trailers : null}
            isLoading={isLoading}
            fallback={<SectionSkeleton variant="grid" cardCount={3} />}
            height={400}
            title="Trailers"
          >
            {(trailersData) => <TrailersSection videos={trailersData} />}
          </OptimizedSectionWrapper>

          <OptimizedSectionWrapper
            data={backdrops}
            isLoading={isLoading}
            fallback={<SectionSkeleton variant="grid" cardCount={6} />}
            height={400}
            title="Behind The Scenes"
          >
            <BehindTheScenesSection images={backdrops} />
          </OptimizedSectionWrapper>

          <OptimizedSectionWrapper
            data={keywords.length > 0 ? keywords : null}
            isLoading={isLoading}
            fallback={<SectionSkeleton variant="grid" cardCount={1} />}
            height={200}
            title="Tags"
          >
            {(keywordsData) => (
              <section className="bg-black py-4 md:py-12">
                <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Tags</h3>
                  <KeywordsSection keywords={keywordsData} />
                </div>
              </section>
            )}
          </OptimizedSectionWrapper>

          <OptimizedSectionWrapper
            data={watchProviders.length > 0 ? watchProviders : null}
            isLoading={isLoading}
            fallback={<SectionSkeleton variant="grid" cardCount={1} />}
            height={300}
            title="Watch Providers"
          >
            {(providers) => <WatchProvidersSection providers={providers} />}
          </OptimizedSectionWrapper>

          <OptimizedSectionWrapper
            data={similar.length > 0 ? similar : null}
            isLoading={isLoading}
            fallback={<SectionSkeleton variant="grid" cardCount={6} />}
            height={500}
            title="More Like This"
          >
            {(similarData) => <MoreLikeThisSection similar={similarData} />}
          </OptimizedSectionWrapper>
        </>
      )}

      {/* Reviews */}
      {activeTab === "reviews" && (
        <OptimizedSectionWrapper
          data={true}
          isLoading={false}
          fallback={<SectionSkeleton variant="list" cardCount={5} />}
          height={600}
          title="Reviews"
          isEmptyFallback={<EmptyState message="No reviews available for this TV show yet." />}
        >
          {reviews.length > 0 ? (
            <ReviewsSection reviews={reviews} />
          ) : null}
        </OptimizedSectionWrapper>
      )}

      {/* Videos */}
      {activeTab === "videos" && (
        <OptimizedSectionWrapper
          data={true}
          isLoading={false}
          fallback={<SectionSkeleton variant="grid" cardCount={6} />}
          height={600}
          title="Videos"
          isEmptyFallback={<EmptyState message="No videos available for this TV show yet." />}
        >
          {tabVideos.length > 0 ? (
            <VideosSection videos={tabVideos} title="All Videos & Trailers" />
          ) : null}
        </OptimizedSectionWrapper>
      )}

      {/* Images */}
      {activeTab === "images" && (
        <OptimizedSectionWrapper
          data={true}
          isLoading={false}
          fallback={<SectionSkeleton variant="grid" cardCount={12} />}
          height={800}
          title="Images"
          isEmptyFallback={<EmptyState message="No images available for this TV show yet." />}
        >
          {allImages.length > 0 ? (
            <ImagesGallery images={allImages} title="Complete Image Gallery" type="all" />
          ) : null}
        </OptimizedSectionWrapper>
      )}

      {/* Watch */}
      {activeTab === "watch" && (
        <OptimizedSectionWrapper
          data={true}
          isLoading={false}
          fallback={<SectionSkeleton variant="grid" cardCount={6} />}
          height={600}
          title="Watch Providers"
        >
          <WatchProvidersDetail providers={usProviders} region="US" title="Streaming Providers" />
        </OptimizedSectionWrapper>
      )}

      {/* Credits */}
      {activeTab === "credits" && (
        <OptimizedSectionWrapper
          data={true}
          isLoading={false}
          fallback={<SectionSkeleton variant="grid" cardCount={12} />}
          height={1200}
          title="Credits"
          isEmptyFallback={<EmptyState message="No cast or crew information available for this TV show yet." />}
        >
          {cast.length > 0 || crew.length > 0 ? (
            <FullCreditsDetail cast={cast} crew={crew} title="Complete Cast & Crew" />
          ) : null}
        </OptimizedSectionWrapper>
      )}

      {/* Recommendations */}
      {activeTab === "recommendations" && (
        <OptimizedSectionWrapper
          data={true}
          isLoading={false}
          fallback={<SectionSkeleton variant="grid" cardCount={6} />}
          height={600}
          title="Recommendations"
          isEmptyFallback={
            <section className="bg-[var(--section-bg)] py-16">
              <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl text-center">
                <Heart className="w-20 h-20 text-white/20 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">No Recommendations Available</h2>
                <p className="text-[var(--section-meta-color)] text-lg">We don't have enough data to recommend similar shows yet.</p>
              </div>
            </section>
          }
        >
          {recommendations.length > 0 ? (
            <RecommendationsSection recommendations={recommendations} title="More Like This" variant="recommendations" />
          ) : null}
        </OptimizedSectionWrapper>
      )}
    </div>
  );
});

function EmptyState({ message }: { message: string }) {
  return (
    <section className="bg-[var(--section-bg)] py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl text-center">
        <p className="text-[var(--section-meta-color)] text-lg">{message}</p>
      </div>
    </section>
  );
}

export default TVShowDetailsPage;

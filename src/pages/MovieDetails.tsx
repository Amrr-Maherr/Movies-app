import { memo, useMemo, lazy, Suspense, useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import { OptimizedSectionWrapper } from "@/components/optimized-section-wrapper";
import { PageSkeleton, Error, SectionSkeleton } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import FetchMovieDetails from "@/hooks/shared/FetchMovieDetails";
import DetailPageNav, { type MovieTab } from "@/components/shared/DetailPageNav";
import { useOnboarding } from "@/features/onboarding/providers/OnboardingProvider";
import {
  useMovieReviews,
  useMovieVideos,
  useMovieImages,
  useMovieWatchProviders,
  useMovieCredits,
  useMovieRecommendations,
} from "@/hooks/shared";
import { Heart } from "lucide-react";

const MediaHero = lazy(() => import("@/components/shared/MediaHero"));
const MediaInfoSection = lazy(() => import("@/components/sections/MediaInfoSection"));
const TrailersSection = lazy(() => import("@/components/sections/TrailersSection"));
const BehindTheScenesSection = lazy(() => import("@/components/sections/BehindTheScenesSection"));
const MoreLikeThisSection = lazy(() => import("@/components/sections/MoreLikeThisSection"));
const FullCreditsSection = lazy(() => import("@/components/sections/FullCreditsSection"));
const ReviewsSection = lazy(() => import("@/components/sections/ReviewsSection"));
const VideosSection = lazy(() => import("@/components/sections/VideosSection"));
const ImagesGallery = lazy(() => import("@/components/sections/ImagesGallery"));
const WatchProvidersDetail = lazy(() => import("@/components/sections/WatchProvidersDetail"));
const FullCreditsDetail = lazy(() => import("@/components/sections/FullCreditsDetail"));
const RecommendationsSection = lazy(() => import("@/components/sections/RecommendationsSection"));

const MovieDetailsPage = memo(function MovieDetailsPage() {
  const { startTour } = useOnboarding();
  const { slugWithId } = useParams<{ slugWithId: string }>();
  const id = extractIdFromSlug(slugWithId);
  const numericId = Number(id);

  const [activeTab, setActiveTab] = useState<MovieTab>("overview");

  const { isLoading, data, error, refetch } = FetchMovieDetails(numericId);

  // Tab-specific data hooks — only fetch when tab is active
  const { data: reviewsData } = useMovieReviews(activeTab === "reviews" ? numericId : 0, 1);
  const { data: videosData } = useMovieVideos(activeTab === "videos" ? numericId : 0, 1);
  const { data: imagesData } = useMovieImages(activeTab === "images" ? numericId : 0);
  const { data: providersData } = useMovieWatchProviders(activeTab === "watch" ? numericId : 0, "US");
  const { data: creditsData } = useMovieCredits(activeTab === "credits" ? numericId : 0);
  const { data: recommendationsData } = useMovieRecommendations(activeTab === "recommendations" ? numericId : 0);

  const handleRetry = useCallback(() => refetch(), [refetch]);
  const handleTabChange = useCallback((tab: MovieTab) => setActiveTab(tab), []);

  const { videos, images, similar, credits } = useMemo(() => {
    if (!data) return { videos: [], images: [], similar: [], credits: { cast: [], crew: [] } };
    return {
      videos: data.videos?.results || [],
      images: data.images?.backdrops || [],
      similar: data.similar?.results || [],
      credits: data.credits || { cast: [], crew: [] },
    };
  }, [data]);

  const reviews = useMemo(
    () => reviewsData?.results?.filter((r) => r.author && r.content?.trim()) || [],
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

  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => {
        startTour("movie-details");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [data, startTour]);

  if (isLoading) return <PageSkeleton />;

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
      <HelmetMeta
        name={data.title || "Movie Details"}
        description={data.overview || "Watch this movie on Netflix"}
        image={data.poster_path ? `https://image.tmdb.org/t/p/original${data.poster_path}` : undefined}
        url={window.location.href}
        type="video.movie"
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
      <DetailPageNav type="movie" activeTab={activeTab} onTabChange={handleTabChange as any} />

      {/* Tab Panels */}

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
            data={videos.length > 0 ? videos : null}
            isLoading={isLoading}
            fallback={<SectionSkeleton variant="grid" cardCount={3} />}
            height={400}
            title="Trailers"
          >
            {(videosData) => <TrailersSection videos={videosData} />}
          </OptimizedSectionWrapper>

          <OptimizedSectionWrapper
            data={images}
            isLoading={isLoading}
            fallback={<SectionSkeleton variant="grid" cardCount={6} />}
            height={400}
            title="Behind The Scenes"
          >
            <BehindTheScenesSection images={images} />
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

          <OptimizedSectionWrapper
            data={credits.cast.length > 0 || credits.crew.length > 0 ? credits : null}
            isLoading={isLoading}
            fallback={<SectionSkeleton variant="grid" cardCount={6} />}
            height={500}
            title="Credits"
          >
            {(creditsData) => <FullCreditsSection cast={creditsData.cast} crew={creditsData.crew} />}
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
          isEmptyFallback={<EmptyState message="No reviews available for this movie yet." />}
        >
          {reviews.length > 0 ? <ReviewsSection reviews={reviews} /> : null}
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
          isEmptyFallback={<EmptyState message="No videos available for this movie yet." />}
        >
          {tabVideos.length > 0 ? <VideosSection videos={tabVideos} title="All Videos & Trailers" /> : null}
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
          isEmptyFallback={<EmptyState message="No images available for this movie yet." />}
        >
          {allImages.length > 0 ? (
            <ImagesGallery images={allImages} title="Complete Image Gallery" type="all" />
          ) : null}
        </OptimizedSectionWrapper>
      )}

      {/* Watch Providers */}
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
          isEmptyFallback={<EmptyState message="No cast or crew information available for this movie yet." />}
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
            <section className="bg-black py-16">
              <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl text-center">
                <Heart className="w-20 h-20 text-white/20 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">No Recommendations Available</h2>
                <p className="text-white/60 text-lg">We don't have enough data to recommend similar movies yet.</p>
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
    <section className="bg-black py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl text-center">
        <p className="text-white/60 text-lg">{message}</p>
      </div>
    </section>
  );
}

export default MovieDetailsPage;

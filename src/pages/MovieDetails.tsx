import { memo, useMemo, lazy, Suspense, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { PageSkeleton, Error, SectionSkeleton } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import FetchMovieDetails from "@/hooks/shared/FetchMovieDetails";
import DetailPageNav, { type MovieTab } from "@/components/shared/DetailPageNav";
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
      <Suspense fallback={<SectionSkeleton variant="hero" />}>
        <LazyWrapper height={500}>
          <MediaHero media={data as any} />
        </LazyWrapper>
      </Suspense>

      {/* Tabs Nav */}
      <DetailPageNav type="movie" activeTab={activeTab} onTabChange={handleTabChange as any} />

      {/* Tab Panels */}

      {/* Overview */}
      {activeTab === "overview" && (
        <>
          <Suspense fallback={<SectionSkeleton variant="grid" />}>
            <LazyWrapper height={300}>
              <MediaInfoSection media={data as any} />
            </LazyWrapper>
          </Suspense>

          {videos.length > 0 && (
            <Suspense fallback={<SectionSkeleton variant="grid" cardCount={3} />}>
              <LazyWrapper height={400}>
                <TrailersSection videos={videos} />
              </LazyWrapper>
            </Suspense>
          )}

          <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
            <LazyWrapper height={400}>
              <BehindTheScenesSection images={images} />
            </LazyWrapper>
          </Suspense>

          {similar.length > 0 && (
            <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
              <LazyWrapper height={500}>
                <MoreLikeThisSection similar={similar} />
              </LazyWrapper>
            </Suspense>
          )}

          {(credits.cast.length > 0 || credits.crew.length > 0) && (
            <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
              <LazyWrapper height={500}>
                <FullCreditsSection cast={credits.cast} crew={credits.crew} />
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
              <EmptyState message="No reviews available for this movie yet." />
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
              <EmptyState message="No videos available for this movie yet." />
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
              <EmptyState message="No images available for this movie yet." />
            )}
          </LazyWrapper>
        </Suspense>
      )}

      {/* Watch Providers */}
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
              <EmptyState message="No cast or crew information available for this movie yet." />
            )}
          </LazyWrapper>
        </Suspense>
      )}

      {/* Recommendations */}
      {activeTab === "recommendations" && (
        <LazyWrapper height={600}>
          {recommendations.length > 0 ? (
            <RecommendationsSection
              recommendations={recommendations}
              title="More Like This"
              variant="recommendations"
            />
          ) : (
            <section className="bg-black py-16">
              <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl text-center">
                <Heart className="w-20 h-20 text-white/20 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">No Recommendations Available</h2>
                <p className="text-white/60 text-lg">We don't have enough data to recommend similar movies yet.</p>
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

export default MovieDetailsPage;

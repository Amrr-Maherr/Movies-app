import { memo, useMemo, useCallback, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { PageSkeleton, SectionSkeleton, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import DetailHeader from "@/components/shared/DetailHeader";
import FetchTvShowDetails from "@/hooks/shared/FetchTvShowDetails";
import { useTVImages } from "@/hooks/shared";
import DetailPageNav from "@/components/shared/DetailPageNav";

// Lazy-loaded component - heavy component with modal and grid rendering
const ImagesGallery = lazy(() => import("@/components/sections/ImagesGallery"));

/**
 * TVImagesPage Component
 * Dedicated page for displaying all TV show images
 * Route: /tv/:id/images
 */
const TVImagesPage = memo(function TVImagesPage() {
  const { slugWithId } = useParams<{ slugWithId: string }>();
  const tvId = extractIdFromSlug(slugWithId);
  const numericId = Number(tvId);

  // Fetch TV show details for metadata
  const {
    data: tvData,
    isLoading: tvLoading,
    error: tvError,
    refetch: refetchTv,
  } = FetchTvShowDetails(numericId);

  // Fetch TV images
  const {
    data: imagesData,
    isLoading: imagesLoading,
    error: imagesError,
    refetch: refetchImages,
  } = useTVImages(numericId);

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetchTv();
    refetchImages();
  }, [refetchTv, refetchImages]);

  // Memoized: Combine all images
  const allImages = useMemo(() => {
    if (!imagesData) return [];
    return [
      ...(imagesData.backdrops || []),
      ...(imagesData.posters || []),
      ...(imagesData.logos || []),
    ];
  }, [imagesData]);

  const isLoading = tvLoading || imagesLoading;
  const error = tvError || imagesError;

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error || !tvData) {
    return (
      <Error
        fullscreen
        title="Failed to load images"
        message="We couldn't load the image gallery. Please try again."
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      {/* SEO Meta Tags */}
      <HelmetMeta
        name={`${tvData.name} - Images & Photos`}
        description={`Browse posters, backdrops, and photos for ${tvData.name} on Netflix`}
        image={
          tvData.poster_path
            ? `https://image.tmdb.org/t/p/original${tvData.poster_path}`
            : undefined
        }
        url={window.location.href}
        type="video.tv_series"
      />

      {/* Header Section */}
      <DetailHeader media={tvData} type="tv" />

      {/* Navigation Tabs */}
      <DetailPageNav type="tv" slugWithId={slugWithId || ""} />

      {/* Images Gallery */}
      <LazyWrapper height={800}>
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={12} />}>
          {allImages.length > 0 ? (
            <ImagesGallery
              images={allImages}
              title="Complete Image Gallery"
              type="all"
            />
          ) : (
            <section className="bg-black py-12">
              <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl text-center">
                <p className="text-white/60 text-lg">
                  No images available for this TV show yet.
                </p>
              </div>
            </section>
          )}
        </Suspense>
      </LazyWrapper>

      {/* Image breakdown */}
      {imagesData && (
        <section className="bg-black py-8 border-t border-white/10">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-2xl font-bold text-white">
                  {imagesData.backdrops?.length || 0}
                </p>
                <p className="text-white/60 text-sm">Backdrops</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-2xl font-bold text-white">
                  {imagesData.posters?.length || 0}
                </p>
                <p className="text-white/60 text-sm">Posters</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-2xl font-bold text-white">
                  {imagesData.logos?.length || 0}
                </p>
                <p className="text-white/60 text-sm">Logos</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
});

export default TVImagesPage;

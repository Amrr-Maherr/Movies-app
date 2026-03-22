import { memo, useMemo, useCallback, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { Image as ImageIcon } from "lucide-react";
import { extractIdFromSlug } from "@/utils/slugify";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { PageSkeleton, SectionSkeleton, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import FetchPersonDetails from "@/hooks/shared/FetchPersonDetails";
import { usePersonImages } from "@/hooks/shared";
import DetailPageNav from "@/components/shared/DetailPageNav";

// Lazy-loaded components
const ImagesGallery = lazy(() => import("@/components/sections/ImagesGallery"));
const OptimizedImage = lazy(() => import("@/components/ui/OptimizedImage"));

/**
 * PersonImagesPage Component
 * Dedicated page for displaying person's profile images
 * Route: /person/:id/images
 */
const PersonImagesPage = memo(function PersonImagesPage() {
  const { slugWithId } = useParams<{ slugWithId: string }>();
  const personId = extractIdFromSlug(slugWithId);
  const numericId = Number(personId);

  // Fetch person details for metadata
  const {
    personData,
    isLoading: personLoading,
    error: personError,
    refetch: refetchPerson,
  } = FetchPersonDetails(numericId);

  // Fetch person images
  const {
    data: imagesData,
    isLoading: imagesLoading,
    error: imagesError,
    refetch: refetchImages,
  } = usePersonImages(numericId);

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetchPerson();
    refetchImages();
  }, [refetchPerson, refetchImages]);

  // Memoized: Extract profile images
  const profileImages = useMemo(() => {
    return imagesData?.profiles || [];
  }, [imagesData]);

  const isLoading = personLoading || imagesLoading;
  const error = personError || imagesError;

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error || !personData) {
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
        name={`${personData.name} - Photos & Images`}
        description={`Browse profile photos and images of ${personData.name} on Netflix`}
        image={
          personData.profile_path
            ? `https://image.tmdb.org/t/p/original${personData.profile_path}`
            : undefined
        }
        url={window.location.href}
        type="profile"
      />

      {/* Header Section */}
      <section className="bg-black py-8 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          {/* Page Title */}
          <div className="flex items-center gap-4">
            <Suspense
              fallback={
                <div className="w-20 h-28 bg-zinc-800 animate-pulse rounded-lg" />
              }
            >
              <LazyWrapper height="100%">
                <OptimizedImage
                  src={`https://image.tmdb.org/t/p/w185${personData.profile_path}`}
                  alt={personData.name}
                  className="w-20 h-28 object-cover rounded-lg shadow-lg"
                  objectFit="cover"
                />
              </LazyWrapper>
            </Suspense>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {personData.name}
              </h1>
              <p className="text-white/60 text-sm mb-2 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Photo Gallery
              </p>
              <div className="flex items-center gap-4">
                <span className="text-white/60 text-sm">
                  <span className="text-purple-500 font-bold">
                    {profileImages.length}
                  </span>{" "}
                  Photos
                </span>
                {personData.place_of_birth && (
                  <span className="text-white/60 text-sm">
                    Born:{" "}
                    <span className="text-white font-bold">
                      {personData.place_of_birth}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <DetailPageNav type="person" slugWithId={slugWithId || ""} />

      {/* Images Gallery */}
      <LazyWrapper height={800}>
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={12} />}>
          {profileImages.length > 0 ? (
            <ImagesGallery
              images={profileImages}
              title="Complete Photo Gallery"
              type="posters"
            />
          ) : (
            <section className="bg-black py-12">
              <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl text-center">
                <ImageIcon className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 text-lg">
                  No profile images available yet.
                </p>
              </div>
            </section>
          )}
        </Suspense>
      </LazyWrapper>

      {/* Additional Info */}
      <section className="bg-black py-8 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          <div className="bg-gradient-to-r from-purple-600/20 to-purple-600/5 rounded-xl p-6 border border-purple-600/30">
            <h3 className="text-lg font-bold text-white mb-2">
              📸 Photo Gallery
            </h3>
            <p className="text-white/70 text-sm">
              Browse through {profileImages.length} profile photos of{" "}
              {personData.name}. Click on any image to view it in full size.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
});

export default PersonImagesPage;

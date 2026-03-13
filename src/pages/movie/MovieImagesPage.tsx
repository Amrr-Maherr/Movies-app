import { memo, useMemo, useCallback, Suspense } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { PageSkeleton, SectionSkeleton, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import FetchMovieDetails from "@/queries/FetchMovieDetails";
import { useMovieImages } from "@/queries";
import DetailPageNav from "@/components/shared/DetailPageNav";
import ImagesGallery from "@/components/sections/ImagesGallery";

/**
 * MovieImagesPage Component
 * Dedicated page for displaying all movie images (posters, backdrops, logos)
 * Route: /movie/:id/images
 */
const MovieImagesPage = memo(function MovieImagesPage() {
  const { slugWithId } = useParams<{ slugWithId: string }>();
  const movieId = extractIdFromSlug(slugWithId);
  const numericId = Number(movieId);

  // Fetch movie details for metadata
  const {
    data: movieData,
    isLoading: movieLoading,
    error: movieError,
    refetch: refetchMovie,
  } = FetchMovieDetails(numericId);

  // Fetch movie images
  const {
    data: imagesData,
    isLoading: imagesLoading,
    error: imagesError,
    refetch: refetchImages,
  } = useMovieImages(numericId);

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetchMovie();
    refetchImages();
  }, [refetchMovie, refetchImages]);

  // Memoized: Combine all images
  const allImages = useMemo(() => {
    if (!imagesData) return [];
    return [
      ...(imagesData.backdrops || []),
      ...(imagesData.posters || []),
      ...(imagesData.logos || []),
    ];
  }, [imagesData]);

  const isLoading = movieLoading || imagesLoading;
  const error = movieError || imagesError;

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error || !movieData) {
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
        name={`${movieData.title} - Images & Photos`}
        description={`Browse posters, backdrops, and photos for ${movieData.title} on Netflix`}
        image={
          movieData.poster_path
            ? `https://image.tmdb.org/t/p/original${movieData.poster_path}`
            : undefined
        }
        url={window.location.href}
        type="video.movie"
      />

      {/* Header Section */}
      <section className="bg-black py-8 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          {/* Page Title */}
          <div className="flex items-center gap-4">
            <img
              src={`https://image.tmdb.org/t/p/w92${movieData.poster_path}`}
              alt={movieData.title}
              className="w-20 h-28 object-cover rounded-lg shadow-lg"
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {movieData.title}
              </h1>
              <p className="text-white/60 text-sm mb-2">
                {movieData.release_date?.substring(0, 4)} • {movieData.runtime}{" "}
                min
              </p>
              <div className="flex items-center gap-2">
                <span className="text-purple-500 font-bold">
                  {allImages.length}
                </span>
                <span className="text-white/60 text-sm">
                  {allImages.length === 1 ? "Image" : "Images"} in Gallery
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <DetailPageNav type="movie" slugWithId={slugWithId || ""} />

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
                  No images available for this movie yet.
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

export default MovieImagesPage;

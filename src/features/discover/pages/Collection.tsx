import { useParams, useNavigate } from "react-router-dom";
import { memo, useMemo, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCollectionDetails } from "@/hooks/shared";
import { SectionSkeleton } from "@/components/ui";
import { ReactQueryErrorState } from "@/components/errors";
import { OptimizedSectionWrapper } from "@/components/optimized-section-wrapper";
import { Film, Star } from "lucide-react";
import type { HeroMedia } from "@/types";
import HelmetMeta from "@/components/shared/HelmetMeta";
import { Card } from "@/components/shared/Card";
import OptimizedImage from "@/components/ui/OptimizedImage";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/original";

const Collection = memo(function Collection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang, slug, id } = useParams<{ lang: string; slug: string; id: string }>();

  // Handle old routes where id is in the slug position or id is provided directly
  const collectionId = useMemo(() => {
    const idToUse = id || slug;
    return idToUse ? parseInt(idToUse, 10) : 0;
  }, [id, slug]);

  const {
    data: collection,
    isLoading: collectionLoading,
    error: collectionError,
  } = useCollectionDetails(collectionId);

  // Redirect to SEO-friendly URL if needed
  useEffect(() => {
    if (collection && collection.name) {
      const expectedSlug = collection.name
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-")
        .trim();

      if (slug !== expectedSlug || !id) {
        navigate(`/${lang}/collection/${expectedSlug}/${collectionId}`, { replace: true });
      }
    }
  }, [collection, slug, id, lang, collectionId, navigate]);

  const backdropUrl = useMemo(
    () =>
      collection?.backdrop_path
        ? `${IMAGE_BASE_URL}${collection.backdrop_path}`
        : null,
    [collection?.backdrop_path],
  );

  const posterUrl = useMemo(
    () =>
      collection?.poster_path
        ? `${POSTER_BASE_URL}${collection.poster_path}`
        : null,
    [collection?.poster_path],
  );

  const totalMovies = useMemo(
    () => collection?.parts?.length || 0,
    [collection?.parts],
  );

  const averageRating = useMemo(() => {
    if (!collection?.parts || collection.parts.length === 0) return 0;
    const sum = collection.parts.reduce(
      (acc, movie) => acc + movie.vote_average,
      0,
    );
    return (sum / collection.parts.length).toFixed(1);
  }, [collection?.parts]);

  if (collectionLoading) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)]">
        <SectionSkeleton variant="hero" />
      </div>
    );
  }

  if (collectionError || !collection) {
    return (
      <ReactQueryErrorState
        error={collectionError}
        retry={() => window.history.back()}
        fullscreen
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      <HelmetMeta
        name={collection.name}
        description={`Watch the ${collection.name} movie collection. ${totalMovies} movies with an average rating of ${averageRating}/10.`}
      />
      {/* Hero Section with Backdrop */}
      <div className="relative h-[100dvh] overflow-hidden">
        {backdropUrl ? (
          <Suspense fallback={null}>
            <OptimizedImage
              src={backdropUrl}
              alt={collection.name}
              className="w-full h-full"
              objectFit="cover"
              priority
            />
          </Suspense>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] to-[#16213e]" />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-primary)] via-[var(--background-primary)]/80 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-end pb-12 md:pb-16">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-end">
              {/* Poster */}
              {posterUrl ? (
                <div className="hidden md:block w-48 lg:w-64 flex-shrink-0 rounded-lg overflow-hidden shadow-2xl">
                  <Suspense fallback={null}>
                    <OptimizedImage
                      src={posterUrl}
                      alt={collection.name}
                      className="w-full h-full"
                      objectFit="cover"
                    />
                  </Suspense>
                </div>
              ) : null}

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg">
                  {collection.name}
                </h1>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base">
                  <div className="flex items-center gap-2 text-[var(--success)]">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-bold">{averageRating} {t('common:media.rating')}</span>
                  </div>

                  <div className="flex items-center gap-2 text-white">
                    <Film className="w-5 h-5" />
                    <span>{totalMovies} {t('discover:movies')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      {collection.overview && (
        <div className="border-y border-[#222] bg-black/40">
          <div className="container py-6 md:py-8">
            <h2 className="text-lg md:text-xl font-semibold text-white mb-3">
              About the Collection
            </h2>
            <p className="text-sm md:text-base text-[#b3b3b3] leading-relaxed">
              {collection.overview}
            </p>
          </div>
        </div>
      )}

      {/* Movies Section */}
      <div className="container py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          All Movies in Collection
        </h2>

        <OptimizedSectionWrapper
          data={
            collection.parts && collection.parts.length > 0
              ? collection.parts
              : null
          }
          isLoading={collectionLoading}
          fallback={<SectionSkeleton variant="grid" cardCount={6} />}
          height={350}
          title="Collection Movies"
          isEmptyFallback={
            <div className="text-center py-12 text-[#737373]">
              <Film className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">{t('common:common.noData')}</p>
            </div>
          }
        >
          {(parts) => (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {parts.map((movie) => (
                <Card
                  key={movie.id}
                  movie={movie as HeroMedia}
                />
              ))}
            </div>
          )}
        </OptimizedSectionWrapper>
      </div>
    </div>
  );
});

export default Collection;

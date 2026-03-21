import { memo, useMemo, useCallback, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { PageSkeleton, SectionSkeleton, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import DetailHeader from "@/components/shared/DetailHeader";
import FetchTvShowDetails from "@/hooks/shared/FetchTvShowDetails";
import { useTVCredits } from "@/hooks/shared";
import DetailPageNav from "@/components/shared/DetailPageNav";

// Lazy-loaded component - heavy component with complex grid and search functionality
const FullCreditsDetail = lazy(
  () => import("@/components/sections/FullCreditsDetail"),
);

/**
 * TVCreditsPage Component
 * Dedicated page for displaying complete TV show cast and crew
 * Route: /tv/:id/credits
 */
const TVCreditsPage = memo(function TVCreditsPage() {
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

  // Fetch TV credits
  const {
    data: creditsData,
    isLoading: creditsLoading,
    error: creditsError,
    refetch: refetchCredits,
  } = useTVCredits(numericId);

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetchTv();
    refetchCredits();
  }, [refetchTv, refetchCredits]);

  // Memoized: Extract cast and crew
  const { cast, crew } = useMemo(() => {
    return {
      cast: creditsData?.cast || [],
      crew: creditsData?.crew || [],
    };
  }, [creditsData]);

  const isLoading = tvLoading || creditsLoading;
  const error = tvError || creditsError;

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error || !tvData) {
    return (
      <Error
        fullscreen
        title="Failed to load credits"
        message="We couldn't load the cast and crew information. Please try again."
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      {/* SEO Meta Tags */}
      <HelmetMeta
        name={`${tvData.name} - Cast & Crew`}
        description={`Complete cast and crew list for ${tvData.name} on Netflix`}
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

      {/* Full Credits Section */}
      <LazyWrapper height={1200}>
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={12} />}>
          {cast.length > 0 || crew.length > 0 ? (
            <FullCreditsDetail
              cast={cast}
              crew={crew}
              title="Complete Cast & Crew"
            />
          ) : (
            <section className="bg-black py-12">
              <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl text-center">
                <p className="text-white/60 text-lg">
                  No cast or crew information available for this TV show yet.
                </p>
              </div>
            </section>
          )}
        </Suspense>
      </LazyWrapper>

      {/* Credits Stats */}
      <section className="bg-black py-8 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-white">{cast.length}</p>
              <p className="text-white/60 text-sm">Actors</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-white">
                {crew.filter((c) => c.department === "Directing").length}
              </p>
              <p className="text-white/60 text-sm">Directors</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-white">
                {crew.filter((c) => c.department === "Writing").length}
              </p>
              <p className="text-white/60 text-sm">Writers</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-white">
                {crew.filter((c) => c.department === "Production").length}
              </p>
              <p className="text-white/60 text-sm">Producers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default TVCreditsPage;

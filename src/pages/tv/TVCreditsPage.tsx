import { memo, useMemo, useCallback, Suspense } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { PageSkeleton, SectionSkeleton, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import FetchTvShowDetails from "@/queries/FetchTvShowDetails";
import { useTVCredits } from "@/queries";
import DetailPageNav from "@/components/shared/DetailPageNav";
import FullCreditsDetail from "@/components/sections/FullCreditsDetail";

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
      <section className="bg-black py-8 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          {/* Page Title */}
          <div className="flex items-center gap-4">
            <img
              src={`https://image.tmdb.org/t/p/w92${tvData.poster_path}`}
              alt={tvData.name}
              className="w-20 h-28 object-cover rounded-lg shadow-lg"
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {tvData.name}
              </h1>
              <p className="text-white/60 text-sm mb-2">
                {tvData.first_air_date?.substring(0, 4)} •{" "}
                {tvData.number_of_seasons} Seasons
              </p>
              <div className="flex items-center gap-4">
                <span className="text-white/60 text-sm">
                  <span className="text-white font-bold">{cast.length}</span>{" "}
                  Cast Members
                </span>
                <span className="text-white/60 text-sm">
                  <span className="text-white font-bold">{crew.length}</span>{" "}
                  Crew Members
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

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

import { memo, useMemo, useCallback, Suspense } from "react";
import { useParams } from "react-router-dom";
import { Tv } from "lucide-react";
import { extractIdFromSlug } from "@/utils/slugify";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { PageSkeleton, SectionSkeleton, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import FetchPersonDetails from "@/queries/FetchPersonDetails";
import { usePersonTVCredits } from "@/queries";
import DetailPageNav from "@/components/shared/DetailPageNav";
import MediaGrid from "@/components/shared/MediaGrid";
import { getYear } from "@/utils";

/**
 * PersonTVCreditsPage Component
 * Dedicated page for displaying person's TV show credits
 * Route: /person/:id/tv
 */
const PersonTVCreditsPage = memo(function PersonTVCreditsPage() {
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

  // Fetch person TV credits
  const {
    data: creditsData,
    isLoading: creditsLoading,
    error: creditsError,
    refetch: refetchCredits,
  } = usePersonTVCredits(numericId);

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetchPerson();
    refetchCredits();
  }, [refetchPerson, refetchCredits]);

  // Memoized: Extract and format TV shows
  const tvShows = useMemo(() => {
    if (!creditsData) return [];

    // Combine cast and crew TV shows
    const castShows = (creditsData.cast || []).map((credit) => ({
      id: credit.id,
      title: credit.name,
      name: credit.name,
      overview: credit.overview,
      poster_path: credit.poster_path,
      backdrop_path: credit.backdrop_path,
      vote_average: credit.vote_average,
      vote_count: credit.vote_count,
      release_date: undefined,
      first_air_date: credit.first_air_date,
      genre_ids: credit.genre_ids,
      adult: credit.adult,
      original_language: credit.original_language,
      original_name: credit.original_name,
      original_title: undefined,
      popularity: credit.popularity,
      media_type: "tv" as const,
      character: credit.character,
      episode_count: credit.episode_count,
      department: undefined,
      job: undefined,
    }));

    const crewShows = (creditsData.crew || [])
      .filter(
        (credit) =>
          credit.department === "Directing" ||
          credit.department === "Writing" ||
          credit.department === "Production",
      )
      .map((credit) => ({
        id: credit.id,
        title: credit.name,
        name: credit.name,
        overview: credit.overview,
        poster_path: credit.poster_path,
        backdrop_path: credit.backdrop_path,
        vote_average: credit.vote_average,
        vote_count: credit.vote_count,
        release_date: undefined,
        first_air_date: credit.first_air_date,
        genre_ids: credit.genre_ids,
        adult: credit.adult,
        original_language: credit.original_language,
        original_name: credit.original_name,
        original_title: undefined,
        popularity: credit.popularity,
        media_type: "tv" as const,
        character: undefined,
        episode_count: credit.episode_count,
        department: credit.department,
        job: credit.job,
      }));

    return [...castShows, ...crewShows].sort((a, b) => {
      const dateA = a.first_air_date ? new Date(a.first_air_date).getTime() : 0;
      const dateB = b.first_air_date ? new Date(b.first_air_date).getTime() : 0;
      return dateB - dateA;
    });
  }, [creditsData]);

  const isLoading = personLoading || creditsLoading;
  const error = personError || creditsError;

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error || !personData) {
    return (
      <Error
        fullscreen
        title="Failed to load TV credits"
        message="We couldn't load the TV credits information. Please try again."
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      {/* SEO Meta Tags */}
      <HelmetMeta
        name={`${personData.name} - TV Show Credits`}
        description={`Browse all TV show credits for ${personData.name} on Netflix`}
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
            <img
              src={`https://image.tmdb.org/t/p/w185${personData.profile_path}`}
              alt={personData.name}
              className="w-20 h-28 object-cover rounded-lg shadow-lg"
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {personData.name}
              </h1>
              <p className="text-white/60 text-sm mb-2 flex items-center gap-2">
                <Tv className="w-4 h-4" />
                TV Show Credits
              </p>
              <div className="flex items-center gap-4">
                <span className="text-white/60 text-sm">
                  <span className="text-white font-bold">{tvShows.length}</span>{" "}
                  TV Shows
                </span>
                {personData.known_for_department && (
                  <span className="text-white/60 text-sm">
                    Known for:{" "}
                    <span className="text-white font-bold">
                      {personData.known_for_department}
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

      {/* TV Shows Grid */}
      <section className="bg-black py-8">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          {tvShows.length > 0 ? (
            <>
              <h2 className="text-xl font-bold text-white mb-6">
                TV Filmography ({tvShows.length} shows)
              </h2>
              <LazyWrapper height={800}>
                <Suspense
                  fallback={<SectionSkeleton variant="grid" cardCount={12} />}
                >
                  <MediaGrid items={tvShows} type="tv" />
                </Suspense>
              </LazyWrapper>
            </>
          ) : (
            <div className="text-center py-12">
              <Tv className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60 text-lg">
                No TV show credits available yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Credits breakdown */}
      {creditsData && (
        <section className="bg-black py-8 border-t border-white/10">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-white">
                  {creditsData.cast?.length || 0}
                </p>
                <p className="text-white/60 text-sm">Acting Roles</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-white">
                  {creditsData.crew?.length || 0}
                </p>
                <p className="text-white/60 text-sm">Crew Roles</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-white">
                  {creditsData.crew?.filter((c) => c.department === "Directing")
                    .length || 0}
                </p>
                <p className="text-white/60 text-sm">As Director</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-white">
                  {
                    tvShows.filter(
                      (s) =>
                        s.first_air_date &&
                        parseInt(getYear(s.first_air_date)) >= 2020,
                    ).length
                  }
                </p>
                <p className="text-white/60 text-sm">Since 2020</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
});

export default PersonTVCreditsPage;

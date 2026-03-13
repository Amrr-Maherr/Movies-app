import { memo, useMemo, useCallback, Suspense } from "react";
import { useParams } from "react-router-dom";
import { Film } from "lucide-react";
import { extractIdFromSlug } from "@/utils/slugify";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { PageSkeleton, SectionSkeleton, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import FetchPersonDetails from "@/queries/FetchPersonDetails";
import { usePersonMovieCredits } from "@/queries";
import DetailPageNav from "@/components/shared/DetailPageNav";
import MediaGrid from "@/components/shared/MediaGrid";
import { getYear } from "@/utils";

/**
 * PersonMovieCreditsPage Component
 * Dedicated page for displaying person's movie credits
 * Route: /person/:id/movies
 */
const PersonMovieCreditsPage = memo(function PersonMovieCreditsPage() {
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

  // Fetch person movie credits
  const {
    data: creditsData,
    isLoading: creditsLoading,
    error: creditsError,
    refetch: refetchCredits,
  } = usePersonMovieCredits(numericId);

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetchPerson();
    refetchCredits();
  }, [refetchPerson, refetchCredits]);

  // Memoized: Extract and format movies
  const movies = useMemo(() => {
    if (!creditsData) return [];

    // Combine cast and crew movies
    const castMovies = (creditsData.cast || []).map((credit) => ({
      id: credit.id,
      title: credit.title,
      name: credit.title,
      overview: credit.overview,
      poster_path: credit.poster_path,
      backdrop_path: credit.backdrop_path,
      vote_average: credit.vote_average,
      vote_count: credit.vote_count,
      release_date: credit.release_date,
      first_air_date: undefined,
      genre_ids: credit.genre_ids,
      adult: credit.adult,
      original_language: credit.original_language,
      original_name: credit.original_title,
      original_title: credit.original_title,
      popularity: credit.popularity,
      media_type: "movie" as const,
      character: credit.character,
      department: undefined,
      job: undefined,
    }));

    const crewMovies = (creditsData.crew || [])
      .filter(
        (credit) =>
          credit.department === "Directing" ||
          credit.department === "Writing" ||
          credit.department === "Production",
      )
      .map((credit) => ({
        id: credit.id,
        title: credit.title,
        name: credit.title,
        overview: credit.overview,
        poster_path: credit.poster_path,
        backdrop_path: credit.backdrop_path,
        vote_average: credit.vote_average,
        vote_count: credit.vote_count,
        release_date: credit.release_date,
        first_air_date: undefined,
        genre_ids: credit.genre_ids,
        adult: credit.adult,
        original_language: credit.original_language,
        original_name: credit.original_title,
        original_title: credit.original_title,
        popularity: credit.popularity,
        media_type: "movie" as const,
        character: undefined,
        department: credit.department,
        job: credit.job,
      }));

    return [...castMovies, ...crewMovies].sort((a, b) => {
      const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
      const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
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
        title="Failed to load movie credits"
        message="We couldn't load the movie credits information. Please try again."
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      {/* SEO Meta Tags */}
      <HelmetMeta
        name={`${personData.name} - Movie Credits`}
        description={`Browse all movie credits for ${personData.name} on Netflix`}
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
                <Film className="w-4 h-4" />
                Movie Credits
              </p>
              <div className="flex items-center gap-4">
                <span className="text-white/60 text-sm">
                  <span className="text-white font-bold">{movies.length}</span>{" "}
                  Movies
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

      {/* Movies Grid */}
      <section className="bg-black py-8">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          {movies.length > 0 ? (
            <>
              <h2 className="text-xl font-bold text-white mb-6">
                Filmography ({movies.length} movies)
              </h2>
              <LazyWrapper height={800}>
                <Suspense
                  fallback={<SectionSkeleton variant="grid" cardCount={12} />}
                >
                  <MediaGrid items={movies} type="movie" />
                </Suspense>
              </LazyWrapper>
            </>
          ) : (
            <div className="text-center py-12">
              <Film className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60 text-lg">
                No movie credits available yet.
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
                    movies.filter(
                      (m) =>
                        m.release_date &&
                        parseInt(getYear(m.release_date)) >= 2020,
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

export default PersonMovieCreditsPage;

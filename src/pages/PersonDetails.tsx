import { memo, useMemo, lazy, Suspense, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import { OptimizedSectionWrapper } from "@/components/optimized-section-wrapper";
import { PageSkeleton, SectionSkeleton, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import FetchPersonDetails from "@/hooks/shared/FetchPersonDetails";
import FetchPersonCredits from "@/hooks/shared/FetchPersonCredits";
import DetailPageNav, { type PersonTab } from "@/components/shared/DetailPageNav";
import { usePersonImages, usePersonMovieCredits, usePersonTVCredits } from "@/hooks/shared";
import MediaGrid from "@/components/shared/MediaGrid";
import { Film, Tv, Image as ImageIcon } from "lucide-react";
import { getYear } from "@/utils";

const PersonHero = lazy(() => import("@/components/shared/PersonHero"));
const BiographySection = lazy(() => import("@/components/sections/BiographySection"));
const KnownForSection = lazy(() => import("@/components/sections/KnownForSection"));
const CreditsSection = lazy(() => import("@/components/sections/CreditsSection"));
const SocialLinksSection = lazy(() => import("@/components/sections/SocialLinksSection"));
const ImagesGallery = lazy(() => import("@/components/sections/ImagesGallery"));

const PersonDetailsPage = memo(function PersonDetailsPage() {
  const { slugWithId } = useParams<{ slugWithId: string }>();
  const id = extractIdFromSlug(slugWithId);
  const personId = Number(id);

  const [activeTab, setActiveTab] = useState<PersonTab>("overview");

  const { personData, externalIdsData, error: personError, refetch: refetchPerson, isLoading: personLoading } =
    FetchPersonDetails(personId);
  const { data: creditsData, error: creditsError, refetch: refetchCredits, isLoading: creditsLoading } =
    FetchPersonCredits(personId);

  // Tab-specific hooks — only fetch when tab is active
  const { data: movieCreditsData } = usePersonMovieCredits(activeTab === "movies" ? personId : 0);
  const { data: tvCreditsData } = usePersonTVCredits(activeTab === "tv" ? personId : 0);
  const { data: imagesData } = usePersonImages(activeTab === "images" ? personId : 0);

  const handleRetry = useCallback(() => { refetchPerson(); refetchCredits(); }, [refetchPerson, refetchCredits]);
  const handleTabChange = useCallback((tab: PersonTab) => setActiveTab(tab), []);

  const isLoading = personLoading || creditsLoading;
  const error = personError || creditsError;

  const { cast, crew } = useMemo(
    () => ({ cast: creditsData?.cast || [], crew: creditsData?.crew || [] }),
    [creditsData],
  );

  const movies = useMemo(() => {
    if (!movieCreditsData) return [];
    const castMovies = (movieCreditsData.cast || []).map((c: any) => ({
      ...c, name: c.title, media_type: "movie" as const,
    }));
    const crewMovies = (movieCreditsData.crew || [])
      .filter((c: any) => ["Directing", "Writing", "Production"].includes(c.department))
      .map((c: any) => ({ ...c, name: c.title, media_type: "movie" as const }));
    return [...castMovies, ...crewMovies].sort((a: any, b: any) => {
      const dA = a.release_date ? new Date(a.release_date).getTime() : 0;
      const dB = b.release_date ? new Date(b.release_date).getTime() : 0;
      return dB - dA;
    });
  }, [movieCreditsData]);

  const tvShows = useMemo(() => {
    if (!tvCreditsData) return [];
    const castShows = (tvCreditsData.cast || []).map((c: any) => ({
      ...c, title: c.name, media_type: "tv" as const,
    }));
    const crewShows = (tvCreditsData.crew || [])
      .filter((c: any) => ["Directing", "Writing", "Production"].includes(c.department))
      .map((c: any) => ({ ...c, title: c.name, media_type: "tv" as const }));
    return [...castShows, ...crewShows].sort((a: any, b: any) => {
      const dA = a.first_air_date ? new Date(a.first_air_date).getTime() : 0;
      const dB = b.first_air_date ? new Date(b.first_air_date).getTime() : 0;
      return dB - dA;
    });
  }, [tvCreditsData]);

  const profileImages = useMemo(() => imagesData?.profiles || [], [imagesData]);

  if (isLoading) return <PageSkeleton />;

  if (error || !personData) {
    return (
      <Error
        fullscreen
        title="Failed to load person details"
        message="We couldn't load the person information. Please try again."
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      <HelmetMeta
        name={personData.name || "Person Details"}
        description={personData.biography?.substring(0, 160) || `Discover more about ${personData.name} on Netflix`}
        image={personData.profile_path ? `https://image.tmdb.org/t/p/original${personData.profile_path}` : undefined}
        url={window.location.href}
        type="profile"
      />

      {/* Hero */}
      <OptimizedSectionWrapper
        data={personData}
        isLoading={isLoading}
        fallback={<SectionSkeleton variant="hero" />}
        height={500}
        title="Hero"
      >
        {(data) => <PersonHero person={data} />}
      </OptimizedSectionWrapper>

      {/* Tabs Nav */}
      <DetailPageNav type="person" activeTab={activeTab} onTabChange={handleTabChange as any} />

      {/* Overview */}
      {activeTab === "overview" && (
        <>
          <OptimizedSectionWrapper
            data={externalIdsData}
            isLoading={isLoading}
            fallback={<SectionSkeleton variant="grid" cardCount={1} />}
            height={150}
            title="Social Links"
          >
            {(idsData) => (
              <SocialLinksSection
                imdbId={idsData.imdb_id}
                twitterId={idsData.twitter_id}
                instagramId={idsData.instagram_id}
                facebookId={idsData.facebook_id}
                wikidataId={idsData.wikidata_id}
                homepage={personData.homepage}
              />
            )}
          </OptimizedSectionWrapper>

          <OptimizedSectionWrapper
            data={cast.length > 0 || crew.length > 0 ? { cast, crew } : null}
            isLoading={isLoading}
            fallback={<SectionSkeleton variant="grid" cardCount={4} />}
            height={400}
            title="Known For"
          >
            {(credits) => <KnownForSection cast={credits.cast} crew={credits.crew} />}
          </OptimizedSectionWrapper>

          <OptimizedSectionWrapper
            data={personData}
            isLoading={isLoading}
            fallback={<SectionSkeleton variant="list" cardCount={1} />}
            height={400}
            title="Biography"
          >
            {(data) => (
              <BiographySection
                biography={data.biography}
                placeOfBirth={data.place_of_birth}
                birthday={data.birthday}
                deathday={data.deathday}
                knownForDepartment={data.known_for_department}
              />
            )}
          </OptimizedSectionWrapper>

          <OptimizedSectionWrapper
            data={cast.length > 0 || crew.length > 0 ? { cast, crew } : null}
            isLoading={isLoading}
            fallback={<SectionSkeleton variant="grid" cardCount={6} />}
            height={600}
            title="Credits"
          >
            {(credits) => <CreditsSection cast={credits.cast} crew={credits.crew} />}
          </OptimizedSectionWrapper>
        </>
      )}

      {/* Movies */}
      {activeTab === "movies" && (
        <section className="bg-[var(--section-bg)] py-10">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
            {movies.length > 0 ? (
              <>
                <h2 className="text-xl font-semibold text-[var(--section-title-color)] mb-6 flex items-center gap-2">
                  <Film className="w-5 h-5" /> Filmography ({movies.length} movies)
                </h2>
                <OptimizedSectionWrapper
                  data={true}
                  isLoading={false}
                  fallback={<SectionSkeleton variant="grid" cardCount={12} />}
                  height={500}
                  title="Movies Grid"
                >
                  <MediaGrid items={movies} type="movie" />
                </OptimizedSectionWrapper>
              </>
            ) : (
              <div className="text-center py-12">
                <Film className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-[var(--section-meta-color)] text-lg">No movie credits available yet.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* TV Shows */}
      {activeTab === "tv" && (
        <section className="bg-[var(--section-bg)] py-10">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
            {tvShows.length > 0 ? (
              <>
                <h2 className="text-xl font-semibold text-[var(--section-title-color)] mb-6 flex items-center gap-2">
                  <Tv className="w-5 h-5" /> TV Filmography ({tvShows.length} shows)
                </h2>
                <OptimizedSectionWrapper
                  data={true}
                  isLoading={false}
                  fallback={<SectionSkeleton variant="grid" cardCount={12} />}
                  height={500}
                  title="TV Grid"
                >
                  <MediaGrid items={tvShows} type="tv" />
                </OptimizedSectionWrapper>
              </>
            ) : (
              <div className="text-center py-12">
                <Tv className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-[var(--section-meta-color)] text-lg">No TV show credits available yet.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Images */}
      {activeTab === "images" && (
        <OptimizedSectionWrapper
          data={true}
          isLoading={false}
          fallback={<SectionSkeleton variant="grid" cardCount={12} />}
          height={800}
          title="Images Gallery"
          isEmptyFallback={
            <section className="bg-[var(--section-bg)] py-12">
              <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl text-center">
                <ImageIcon className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-[var(--section-meta-color)] text-lg">No profile images available yet.</p>
              </div>
            </section>
          }
        >
          {profileImages.length > 0 ? (
            <ImagesGallery images={profileImages} title="Photo Gallery" type="posters" />
          ) : null}
        </OptimizedSectionWrapper>
      )}
    </div>
  );
});

export default PersonDetailsPage;

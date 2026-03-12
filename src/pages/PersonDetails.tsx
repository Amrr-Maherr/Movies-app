import { memo, useMemo, lazy, Suspense, useCallback } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import { motion } from "framer-motion";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { LoadingFallback, Error } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import FetchPersonDetails from "@/queries/FetchPersonDetails";
import FetchPersonCredits from "@/queries/FetchPersonCredits";

const PersonHero = lazy(() => import("@/components/shared/PersonHero"));
const BiographySection = lazy(() => import("@/components/sections/BiographySection"));
const KnownForSection = lazy(() => import("@/components/sections/KnownForSection"));
const CreditsSection = lazy(() => import("@/components/sections/CreditsSection"));
const SocialLinksSection = lazy(() => import("@/components/sections/SocialLinksSection"));

const PersonDetailsPage = memo(function PersonDetailsPage() {
  const { slugWithId } = useParams<{ slugWithId: string }>();
  const id = extractIdFromSlug(slugWithId);
  const personId = Number(id);

  const {
    personData,
    externalIdsData,
    error: personError,
    refetch: refetchPerson,
    isLoading: personLoading,
  } = FetchPersonDetails(personId);

  const {
    data: creditsData,
    error: creditsError,
    refetch: refetchCredits,
    isLoading: creditsLoading,
  } = FetchPersonCredits(personId);

  // Memoized: Error state handler
  const handleRetry = useCallback(() => {
    refetchPerson();
    refetchCredits();
  }, [refetchPerson, refetchCredits]);

  const isLoading = useMemo(
    () => personLoading || creditsLoading,
    [personLoading, creditsLoading],
  );

  const error = useMemo(
    () => personError || creditsError,
    [personError, creditsError],
  );

  const { cast, crew } = useMemo(() => {
    const cast = creditsData?.cast || [];
    const crew = creditsData?.crew || [];
    return { cast, crew };
  }, [creditsData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)] flex items-center justify-center">
        <LoadingFallback />
      </div>
    );
  }

  if (error || !personData) {
    return (
      <Error
        fullscreen
        title="Failed to load person details"
        message="We couldn&apos;t load the person information. Please try again."
        onRetry={handleRetry}
      />
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-[var(--background-primary)]"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      {/* SEO Meta Tags */}
      <HelmetMeta
        name={personData.name || "Person Details"}
        description={personData.biography?.substring(0, 160) || `Discover more about ${personData.name} on Netflix`}
        image={personData.profile_path ? `https://image.tmdb.org/t/p/original${personData.profile_path}` : undefined}
        url={window.location.href}
        type="profile"
      />

      {/* Hero Section */}
      <LazyWrapper height={500}>
        <PersonHero person={personData} />
      </LazyWrapper>

      {/* Social Links Section */}
      {externalIdsData && (
        <LazyWrapper height={150}>
          <Suspense fallback={<LoadingFallback />}>
            <SocialLinksSection
              imdbId={externalIdsData.imdb_id}
              twitterId={externalIdsData.twitter_id}
              instagramId={externalIdsData.instagram_id}
              facebookId={externalIdsData.facebook_id}
              wikidataId={externalIdsData.wikidata_id}
              homepage={personData.homepage}
            />
          </Suspense>
        </LazyWrapper>
      )}

      {/* Known For Section */}
      {(cast.length > 0 || crew.length > 0) && (
        <LazyWrapper height={400}>
          <Suspense fallback={<LoadingFallback />}>
            <KnownForSection cast={cast} crew={crew} />
          </Suspense>
        </LazyWrapper>
      )}

      {/* Biography Section */}
      <LazyWrapper height={400}>
        <Suspense fallback={<LoadingFallback />}>
          <BiographySection
            biography={personData.biography}
            placeOfBirth={personData.place_of_birth}
            birthday={personData.birthday}
            deathday={personData.deathday}
            knownForDepartment={personData.known_for_department}
          />
        </Suspense>
      </LazyWrapper>

      {/* Credits Section */}
      {(cast.length > 0 || crew.length > 0) && (
        <LazyWrapper height={600}>
          <Suspense fallback={<LoadingFallback />}>
            <CreditsSection cast={cast} crew={crew} />
          </Suspense>
        </LazyWrapper>
      )}
    </motion.div>
  );
});

export default PersonDetailsPage;

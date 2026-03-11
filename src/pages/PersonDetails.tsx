import { memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import { motion } from "framer-motion";
import { useLazyLoad } from "@/hooks/useLazyLoad";
import { Loader } from "@/components/ui/loader";
import { Error } from "@/components/ui/error";
import PersonHero from "@/components/shared/PersonHero";
import BiographySection from "@/components/sections/BiographySection";
import KnownForSection from "@/components/sections/KnownForSection";
import CreditsSection from "@/components/sections/CreditsSection";
import SocialLinksSection from "@/components/sections/SocialLinksSection";
import FetchPersonDetails from "@/queries/FetchPersonDetails";
import FetchPersonCredits from "@/queries/FetchPersonCredits";

// Memoized PersonDetailsPage component - avoids re-renders when parent updates
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

  // Memoized: Combined loading and error states
  const isLoading = useMemo(
    () => personLoading || creditsLoading,
    [personLoading, creditsLoading],
  );

  const error = useMemo(
    () => personError || creditsError,
    [personError, creditsError],
  );

  // Memoized: Cast and crew arrays
  const { cast, crew } = useMemo(() => {
    const cast = creditsData?.cast || [];
    const crew = creditsData?.crew || [];
    return { cast, crew };
  }, [creditsData]);

  // Lazy load hooks for each section
  const { ref: heroRef, isVisible: heroVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: socialLinksRef, isVisible: socialLinksVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: knownForRef, isVisible: knownForVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: biographyRef, isVisible: biographyVisible } = useLazyLoad<HTMLDivElement>();
  const { ref: creditsRef, isVisible: creditsVisible } = useLazyLoad<HTMLDivElement>();

  if (isLoading) {
    return <Loader fullscreen size="lg" />;
  }

  if (error || !personData) {
    return (
      <Error
        fullscreen
        title="Failed to load person details"
        message="We couldn&apos;t load the person information. Please try again."
        onRetry={() => {
          refetchPerson();
          refetchCredits();
        }}
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
      {/* Hero Section - Profile image, name, basic info */}
      <div ref={heroRef}>
        {heroVisible && <PersonHero person={personData} />}
      </div>

      {/* Social Links Section - IMDb, Twitter, Instagram, etc. */}
      {externalIdsData && (
        <div ref={socialLinksRef}>
          {socialLinksVisible && (
            <SocialLinksSection
              imdbId={externalIdsData.imdb_id}
              twitterId={externalIdsData.twitter_id}
              instagramId={externalIdsData.instagram_id}
              facebookId={externalIdsData.facebook_id}
              wikidataId={externalIdsData.wikidata_id}
              homepage={personData.homepage}
            />
          )}
        </div>
      )}

      {/* Known For Section - Top movies/TV shows */}
      {(cast.length > 0 || crew.length > 0) && (
        <div ref={knownForRef}>
          {knownForVisible && <KnownForSection cast={cast} crew={crew} />}
        </div>
      )}

      {/* Biography Section - Full biography and personal info */}
      <div ref={biographyRef}>
        {biographyVisible && (
          <BiographySection
            biography={personData.biography}
            placeOfBirth={personData.place_of_birth}
            birthday={personData.birthday}
            deathday={personData.deathday}
            knownForDepartment={personData.known_for_department}
          />
        )}
      </div>

      {/* Credits Section - Full filmography with filters */}
      {(cast.length > 0 || crew.length > 0) && (
        <div ref={creditsRef}>
          {creditsVisible && <CreditsSection cast={cast} crew={crew} />}
        </div>
      )}
    </motion.div>
  );
});

export default PersonDetailsPage;

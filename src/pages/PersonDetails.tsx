import { memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
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
  const { id } = useParams<{ id: string }>();
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

  if (isLoading) {
    return <Loader fullscreen size="lg" />;
  }

  if (error || !personData) {
    return (
      <Error
        fullscreen
        title="Failed to load person details"
        message="We couldn't load the person information. Please try again."
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
      <PersonHero person={personData} />

      {/* Social Links Section - IMDb, Twitter, Instagram, etc. */}
      {externalIdsData && (
        <SocialLinksSection
          imdbId={externalIdsData.imdb_id}
          twitterId={externalIdsData.twitter_id}
          instagramId={externalIdsData.instagram_id}
          facebookId={externalIdsData.facebook_id}
          wikidataId={externalIdsData.wikidata_id}
          homepage={personData.homepage}
        />
      )}

      {/* Known For Section - Top movies/TV shows */}
      {(cast.length > 0 || crew.length > 0) && (
        <KnownForSection cast={cast} crew={crew} />
      )}

      {/* Biography Section - Full biography and personal info */}
      <BiographySection
        biography={personData.biography}
        placeOfBirth={personData.place_of_birth}
        birthday={personData.birthday}
        deathday={personData.deathday}
        knownForDepartment={personData.known_for_department}
      />

      {/* Credits Section - Full filmography with filters */}
      {(cast.length > 0 || crew.length > 0) && (
        <CreditsSection cast={cast} crew={crew} />
      )}
    </motion.div>
  );
});

export default PersonDetailsPage;

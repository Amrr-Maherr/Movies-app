import { memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import { motion } from "framer-motion";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { Loader } from "@/components/ui/loader";
import { Error } from "@/components/ui/error";
import PersonHero from "@/components/shared/PersonHero";
import BiographySection from "@/components/sections/BiographySection";
import KnownForSection from "@/components/sections/KnownForSection";
import CreditsSection from "@/components/sections/CreditsSection";
import SocialLinksSection from "@/components/sections/SocialLinksSection";
import FetchPersonDetails from "@/queries/FetchPersonDetails";
import FetchPersonCredits from "@/queries/FetchPersonCredits";

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
      {/* Hero Section */}
      <LazyWrapper threshold={0.01} rootMargin="100px" height={500}>
        <PersonHero person={personData} />
      </LazyWrapper>

      {/* Social Links Section */}
      {externalIdsData && (
        <LazyWrapper threshold={0.01} rootMargin="100px">
          <SocialLinksSection
            imdbId={externalIdsData.imdb_id}
            twitterId={externalIdsData.twitter_id}
            instagramId={externalIdsData.instagram_id}
            facebookId={externalIdsData.facebook_id}
            wikidataId={externalIdsData.wikidata_id}
            homepage={personData.homepage}
          />
        </LazyWrapper>
      )}

      {/* Known For Section */}
      {(cast.length > 0 || crew.length > 0) && (
        <LazyWrapper threshold={0.01} rootMargin="100px">
          <KnownForSection cast={cast} crew={crew} />
        </LazyWrapper>
      )}

      {/* Biography Section */}
      <LazyWrapper threshold={0.01} rootMargin="100px">
        <BiographySection
          biography={personData.biography}
          placeOfBirth={personData.place_of_birth}
          birthday={personData.birthday}
          deathday={personData.deathday}
          knownForDepartment={personData.known_for_department}
        />
      </LazyWrapper>

      {/* Credits Section */}
      {(cast.length > 0 || crew.length > 0) && (
        <LazyWrapper threshold={0.01} rootMargin="200px">
          <CreditsSection cast={cast} crew={crew} />
        </LazyWrapper>
      )}
    </motion.div>
  );
});

export default PersonDetailsPage;

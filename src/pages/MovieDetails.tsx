import { memo } from "react";
import FetchMovieDetails from "@/queries/FetchMovieDetails";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import MediaHero from "@/components/shared/MediaHero";
import MediaInfoSection from "@/components/sections/MediaInfoSection";
import TrailersSection from "@/components/sections/TrailersSection";
import MoreLikeThisSection from "@/components/sections/MoreLikeThisSection";
import FullCreditsSection from "@/components/sections/FullCreditsSection";
import { Loader } from "@/components/ui/loader";
import { Error } from "@/components/ui/error";
import { motion } from "framer-motion";

// Memoized MovieDetailsPage component - avoids re-renders when parent updates
const MovieDetailsPage = memo(function MovieDetailsPage() {
  const { slugWithId } = useParams<{ slugWithId: string }>();
  const id = extractIdFromSlug(slugWithId);
  const { isLoading, data, error, refetch } = FetchMovieDetails(Number(id));

  if (isLoading) {
    return <Loader fullscreen size="lg" />;
  }

  if (error || !data) {
    return (
      <Error
        fullscreen
        title="Failed to load movie details"
        message="We couldn't load the movie information. Please try again."
        onRetry={() => refetch()}
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
      <MediaHero media={data} />
      <MediaInfoSection media={data} />
      <TrailersSection videos={data.videos?.results || []} />
      <MoreLikeThisSection similar={data.similar?.results || []} />
      <FullCreditsSection
        cast={data.credits?.cast || []}
        crew={data.credits?.crew || []}
      />
    </motion.div>
  );
});

export default MovieDetailsPage;

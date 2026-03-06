import FetchMovieDetails from '@/queries/FetchMovieDetails';
import { useParams } from 'react-router-dom';
import MediaHero from '@/components/shared/MediaHero';
import { Loader } from '@/components/ui/loader';
import { Error } from '@/components/ui/error';
import type { MovieDetails } from '@/types';
import { motion } from "framer-motion";
export default function MovieDetails() {
  const { id } = useParams();
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
    </motion.div>
  );
}

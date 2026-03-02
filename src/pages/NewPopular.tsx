import { motion } from "framer-motion";
import HeroSection from "@/components/shared/heroSection/HeroSection";
import useNowPlayingMovies from "@/queries/FetchNowPlayingMovies";
import type { Movie } from "@/types";

export default function NewPopular() {
  const { data: movies, isLoading, error, refetch } = useNowPlayingMovies(1);

  return (
    <motion.div
      className="min-h-screen bg-[var(--background-primary)]"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection
        data={movies as Movie[] | undefined}
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
      />
    </motion.div>
  );
}

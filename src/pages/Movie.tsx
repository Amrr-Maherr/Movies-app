import { motion } from "framer-motion";
import HeroSection from "@/components/shared/heroSection/HeroSection";
import useTopRatedMovies from "@/queries/FetchTopRatedMovies";
import type { Movie } from "@/types";

export default function Movie() {
  const { data: movies, isLoading, error, refetch } = useTopRatedMovies(1);

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

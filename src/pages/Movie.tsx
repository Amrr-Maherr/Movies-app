import { motion } from "framer-motion";
import HeroSection from "@/components/shared/heroSection/HeroSection";
import MediaSection from "@/components/shared/MediaSection";
import useTopRatedMovies from "@/queries/FetchTopRatedMovies";
import usePopularMovies from "@/queries/FetchPopularMovies";
import type { Movie } from "@/types";

export default function Movie() {
  const { data: topRatedMovies, isLoading: topRatedLoading, error: topRatedError, refetch: topRatedRefetch } = useTopRatedMovies(1);
  const { data: popularMovies, isLoading: popularLoading, error: popularError, refetch: popularRefetch } = usePopularMovies();

  return (
    <motion.div
      className="min-h-screen bg-[var(--background-primary)]"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection
        data={topRatedMovies as Movie[] | undefined}
        isLoading={topRatedLoading}
        error={topRatedError}
        onRetry={topRatedRefetch}
      />
      <MediaSection
        title="Top Rated Movies"
        data={topRatedMovies}
        isLoading={topRatedLoading}
        error={topRatedError}
        onRetry={topRatedRefetch}
      />
      <MediaSection
        title="Popular Movies"
        data={popularMovies}
        isLoading={popularLoading}
        error={popularError}
        onRetry={popularRefetch}
      />
    </motion.div>
  );
}

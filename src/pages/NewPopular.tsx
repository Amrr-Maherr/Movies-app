import { motion } from "framer-motion";
import HeroSection from "@/components/shared/heroSection/HeroSection";
import MediaSection from "@/components/shared/MediaSection";
import useNowPlayingMovies from "@/queries/FetchNowPlayingMovies";
import usePopularMovies from "@/queries/FetchPopularMovies";
import type { Movie } from "@/types";

export default function NewPopular() {
  const { data: nowPlayingMovies, isLoading: nowPlayingLoading, error: nowPlayingError, refetch: nowPlayingRefetch } = useNowPlayingMovies(1);
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
        data={nowPlayingMovies as Movie[] | undefined}
        isLoading={nowPlayingLoading}
        error={nowPlayingError}
        onRetry={nowPlayingRefetch}
      />
      <MediaSection
        title="Now Playing in Theaters"
        data={nowPlayingMovies}
        isLoading={nowPlayingLoading}
        error={nowPlayingError}
        onRetry={nowPlayingRefetch}
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

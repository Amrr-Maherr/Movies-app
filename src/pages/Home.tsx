import { HeroSection } from "@/components/shared/heroSection";
import MediaSection from "@/components/shared/MediaSection";
import usePopularMovies from "@/queries/FetchPopularMovies";
import useTopRatedMovies from "@/queries/FetchTopRatedMovies";
import useNowPlayingMovies from "@/queries/FetchNowPlayingMovies";
import { motion } from "framer-motion";

const Home = () => {
  const { data: popularMovies, isLoading: popularLoading, error: popularError, refetch: popularRefetch } = usePopularMovies();
  const { data: topRatedMovies, isLoading: topRatedLoading, error: topRatedError, refetch: topRatedRefetch } = useTopRatedMovies();
  const { data: nowPlayingMovies, isLoading: nowPlayingLoading, error: nowPlayingError, refetch: nowPlayingRefetch } = useNowPlayingMovies();

  return (
    <motion.div
      className="min-h-screen bg-[var(--background-primary)]"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection
        data={popularMovies}
        isLoading={popularLoading}
        error={popularError}
        onRetry={popularRefetch}
      />
      <MediaSection
        title="Popular Movies"
        data={popularMovies}
        isLoading={popularLoading}
        error={popularError}
        onRetry={popularRefetch}
      />
      <MediaSection
        title="Top Rated Movies"
        data={topRatedMovies}
        isLoading={topRatedLoading}
        error={topRatedError}
        onRetry={topRatedRefetch}
      />
      <MediaSection
        title="Now Playing in Theaters"
        data={nowPlayingMovies}
        isLoading={nowPlayingLoading}
        error={nowPlayingError}
        onRetry={nowPlayingRefetch}
      />
    </motion.div>
  );
};

export default Home;

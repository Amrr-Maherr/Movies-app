import { HeroSection } from "@/components/shared/heroSection";
import MovieCardsSection from "@/components/shared/MovieCardsSection";
import usePopularMovies from "@/queries/FetchPopularMovies";
import { motion } from "framer-motion";

const Home = () => {
  const { data: movies, isLoading, error, refetch } = usePopularMovies();

  return (
    <motion.div
      className="min-h-screen bg-[var(--background-primary)]"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection
        data={movies}
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
      />
      <MovieCardsSection
        title="Popular Movies"
        data={movies}
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
      />
    </motion.div>
  );
};

export default Home;

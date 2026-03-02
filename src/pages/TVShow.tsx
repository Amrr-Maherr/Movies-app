import { motion } from "framer-motion";
import HeroSection from "@/components/shared/heroSection/HeroSection";
import usePopularTvShows from "@/queries/FetchPopularTvShows";
import type { TvShow } from "@/types";

export default function TVShow() {
  const { data: tvShows, isLoading, error, refetch } = usePopularTvShows(1);

  return (
    <motion.div
      className="min-h-screen bg-[var(--background-primary)]"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection
        data={tvShows as TvShow[] | undefined}
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
      />
    </motion.div>
  );
}

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Film, Clock, Star } from "lucide-react";
import { Loader } from "@/components/ui/loader";
import { Error } from "@/components/ui/error";
import FetchTvSeasonDetails from "@/queries/FetchTvSeasonDetails";
import EpisodeCard from "@/components/shared/cards/EpisodeCard";
import type { Episode } from "@/types";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

// Memoized SeasonDetailsPage component - avoids re-renders when parent updates
const SeasonDetailsPage = memo(function SeasonDetailsPage() {
  const { tvId, seasonNumber } = useParams<{
    tvId: string;
    seasonNumber: string;
  }>();
  const { isLoading, data: season, error, refetch } = FetchTvSeasonDetails(
    Number(tvId),
    Number(seasonNumber),
  );

  // Memoized: Formatted air date
  const formattedAirDate = useMemo(() => {
    if (!season?.air_date) return "TBA";
    return new Date(season.air_date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [season?.air_date]);

  // Memoized: Average runtime calculation
  const averageRuntime = useMemo(() => {
    if (!season?.episodes || season.episodes.length === 0) return 0;
    return Math.round(
      season.episodes.reduce((acc, ep) => acc + (ep.runtime || 0), 0) /
        season.episodes.length,
    );
  }, [season?.episodes]);

  // Memoized: Average rating calculation
  const averageRating = useMemo(() => {
    if (!season?.episodes || season.episodes.length === 0) return "N/A";
    return (
      season.episodes.reduce((acc, ep) => acc + ep.vote_average, 0) /
      season.episodes.length
    ).toFixed(1);
  }, [season?.episodes]);

  // Memoized: Backdrop URL
  const backdropUrl = useMemo(
    () =>
      season?.poster_path
        ? `${BACKDROP_BASE_URL}${season.poster_path}`
        : null,
    [season?.poster_path],
  );

  if (isLoading) {
    return <Loader fullscreen size="lg" />;
  }

  if (error || !season) {
    return (
      <Error
        fullscreen
        title="Failed to load season details"
        message="We couldn't load the season information. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-[var(--background-primary)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header Section */}
      <div className="relative">
        {/* Backdrop Background */}
        {backdropUrl && (
          <div
            className="absolute inset-0 h-64 md:h-80 bg-cover bg-center"
            style={{ backgroundImage: `url(${backdropUrl})` }}
          />
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-primary)] via-[var(--background-primary)]/80 to-transparent" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl pt-8">
          {/* Back Button */}
          <Link
            to={`/tv/${tvId}`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Back to TV Show</span>
          </Link>

          {/* Season Info */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Poster */}
            <div className="flex-shrink-0">
              {season.poster_path ? (
                <img
                  src={`${IMAGE_BASE_URL}${season.poster_path}`}
                  alt={season.name}
                  className="w-40 md:w-52 rounded-lg shadow-2xl mx-auto md:mx-0"
                />
              ) : (
                <div className="w-40 md:w-52 aspect-[2/3] rounded-lg bg-zinc-800 flex items-center justify-center mx-auto md:mx-0 shadow-2xl">
                  <Film className="h-16 w-16 text-zinc-600" />
                </div>
              )}
            </div>

            {/* Season Details */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {season.name}
              </h1>

              <p className="text-gray-400 mb-4">
                {season.overview || "No overview available."}
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Film className="h-4 w-4" />
                  <span>{season.episode_count} Episodes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formattedAirDate}</span>
                </div>
                {averageRuntime > 0 && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>~{averageRuntime} min per episode</span>
                  </div>
                )}
                {averageRating !== "N/A" && (
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span>{averageRating}/10</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Episodes Section */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl py-8">
        <h2 className="text-2xl font-bold text-white mb-6">Episodes</h2>

        {season.episodes && season.episodes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {season.episodes.map((episode: Episode) => (
              <EpisodeCard
                key={episode.id}
                episode={episode}
                tvShowId={Number(tvId)}
                seasonNumber={Number(seasonNumber)}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-12 text-gray-400">
            <p>Episodes coming soon...</p>
          </div>
        )}
      </div>
    </motion.div>
  );
});

export default SeasonDetailsPage;

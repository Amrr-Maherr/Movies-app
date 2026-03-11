import { memo, useMemo, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { ArrowLeft, Calendar, Film, Clock, Star } from "lucide-react";
import { Loader } from "@/components/ui/loader";
import { Error } from "@/components/ui/error";
import FetchTvSeasonDetails from "@/queries/FetchTvSeasonDetails";
import type { Episode } from "@/types";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

const EpisodeCard = lazy(() => import("@/components/shared/cards/EpisodeCard"));

const EpisodeCardSkeleton = () => (
  <div className="bg-zinc-900/50 rounded-lg overflow-hidden animate-pulse">
    <div className="aspect-video bg-zinc-800" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-zinc-800 rounded w-3/4" />
      <div className="h-3 bg-zinc-800 rounded w-1/2" />
      <div className="h-3 bg-zinc-800 rounded w-full" />
    </div>
  </div>
);

const SectionSkeleton = () => (
  <div className="w-full py-12 bg-zinc-900/50 animate-pulse">
    <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
      <div className="h-8 bg-zinc-800 rounded w-48 mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {[...Array(4)].map((_, i) => (
          <EpisodeCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

const SeasonDetailsPage = memo(function SeasonDetailsPage() {
  const { tvId: tvIdParam, seasonNumber: seasonNumberParam } = useParams<{
    tvId: string;
    seasonNumber: string;
  }>();

  const tvId = extractIdFromSlug(tvIdParam);
  const seasonNumber = seasonNumberParam;

  const { isLoading, data: season, error, refetch } = FetchTvSeasonDetails(
    Number(tvId),
    Number(seasonNumber),
  );

  const formattedAirDate = useMemo(() => {
    if (!season?.air_date) return "TBA";
    return new Date(season.air_date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [season?.air_date]);

  const averageRuntime = useMemo(() => {
    if (!season?.episodes || season.episodes.length === 0) return 0;
    return Math.round(
      season.episodes.reduce((acc, ep) => acc + (ep.runtime || 0), 0) /
        season.episodes.length,
    );
  }, [season?.episodes]);

  const averageRating = useMemo(() => {
    if (!season?.episodes || season.episodes.length === 0) return "N/A";
    return (
      season.episodes.reduce((acc, ep) => acc + ep.vote_average, 0) /
      season.episodes.length
    ).toFixed(1);
  }, [season?.episodes]);

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
        message="We couldn&apos;t load the season information. Please try again."
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
      <LazyWrapper height={400}>
        <>
          {backdropUrl && (
            <div
              className="absolute inset-0 h-64 md:h-80 bg-cover bg-center"
              style={{ backgroundImage: `url(${backdropUrl})` }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-primary)] via-[var(--background-primary)]/80 to-transparent" />

          <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl pt-8">
            <Link
              to={`/tv/${tvIdParam}`}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Back to TV Show</span>
            </Link>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex-shrink-0">
                {season.poster_path ? (
                  <img
                    src={`${IMAGE_BASE_URL}${season.poster_path}`}
                    alt={season.name}
                    className="w-40 md:w-52 rounded-lg shadow-2xl mx-auto md:mx-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-40 md:w-52 aspect-[2/3] rounded-lg bg-zinc-800 flex items-center justify-center mx-auto md:mx-0 shadow-2xl">
                    <Film className="h-16 w-16 text-zinc-600" />
                  </div>
                )}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {season.name}
                </h1>

                <p className="text-gray-400 mb-4">
                  {season.overview || "No overview available."}
                </p>

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
        </>
      </LazyWrapper>

      {/* Episodes Section */}
      <LazyWrapper>
        <Suspense fallback={<SectionSkeleton />}>
          <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl py-8">
            <h2 className="text-2xl font-bold text-white mb-6">Episodes</h2>

            {season.episodes && season.episodes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {season.episodes.map((episode: Episode) => (
                  <Suspense key={episode.id} fallback={<EpisodeCardSkeleton />}>
                    <EpisodeCard
                      episode={episode}
                      tvShowId={Number(tvId)}
                      seasonNumber={Number(seasonNumber)}
                    />
                  </Suspense>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-12 text-gray-400">
                <p>Episodes coming soon...</p>
              </div>
            )}
          </div>
        </Suspense>
      </LazyWrapper>
    </motion.div>
  );
});

export default SeasonDetailsPage;

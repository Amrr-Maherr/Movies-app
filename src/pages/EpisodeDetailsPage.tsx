import { memo, useMemo, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import HelmetMeta from "@/components/shared/HelmetMeta";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { Clock, Calendar, Star } from "lucide-react";
import { PageSkeleton, SectionSkeleton, Error } from "@/components/ui";
import FetchEpisodeDetails from "@/queries/FetchEpisodeDetails";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

const FullCreditsSection = lazy(
  () => import("@/components/sections/FullCreditsSection"),
);

const EpisodeDetailsPage = memo(function EpisodeDetailsPage() {
  const { slugWithId, seasonNumber, episodeNumber } = useParams<{
    slugWithId: string;
    seasonNumber: string;
    episodeNumber: string;
  }>();

  const tvId = extractIdFromSlug(slugWithId);

  const {
    isLoading,
    data: episode,
    error,
    refetch,
  } = FetchEpisodeDetails(
    Number(tvId),
    Number(seasonNumber),
    Number(episodeNumber),
  );

  const formattedRuntime = useMemo(() => {
    if (!episode?.runtime) return "N/A";
    const hours = Math.floor(episode.runtime / 60);
    const minutes = episode.runtime % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }, [episode?.runtime]);

  const formattedAirDate = useMemo(() => {
    if (!episode?.air_date) return "TBA";
    return new Date(episode.air_date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [episode?.air_date]);

  const stillImageUrl = useMemo(
    () =>
      episode?.still_path ? `${IMAGE_BASE_URL}${episode.still_path}` : null,
    [episode?.still_path],
  );

  const guestStars = useMemo(
    () => episode?.guest_stars?.slice(0, 10) || [],
    [episode?.guest_stars],
  );

  const keyCrew = useMemo(
    () =>
      episode?.crew?.filter(
        (member) => member.job === "Director" || member.job === "Writer",
      ) || [],
    [episode?.crew],
  );

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error || !episode) {
    return (
      <Error
        fullscreen
        title="Failed to load episode details"
        message="We couldn't load the episode information. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      {/* SEO Meta Tags */}
      <HelmetMeta
        name={episode.name || "Episode Details"}
        description={
          episode.overview?.substring(0, 160) ||
          `Watch Episode ${episode.episode_number} of Season ${episode.season_number} on Netflix`
        }
        image={
          episode.still_path
            ? `https://image.tmdb.org/t/p/original${episode.still_path}`
            : undefined
        }
        url={window.location.href}
        type="video.episode"
      />

      {/* Hero Section with Episode Still */}
      <LazyWrapper height={500}>
        <>
          <div className="relative w-full h-[70vh] min-h-[500px]">
            <div className="absolute inset-0 w-full h-full">
              {stillImageUrl ? (
                <OptimizedImage
                  src={stillImageUrl}
                  alt={episode.name}
                  className="w-full h-full"
                  objectFit="cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-zinc-600">
                      S{episode.season_number}:E{episode.episode_number}
                    </h1>
                  </div>
                </div>
              )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-primary)] via-[var(--background-primary)]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

            <div className="relative h-full container mx-auto px-4 md:px-8 lg:px-16 flex items-end pb-16">
              <div className="flex-1 space-y-4 md:space-y-6">
                <div className="flex items-center gap-3">
                  <span className="bg-[var(--netflix-red)] text-white px-3 py-1 rounded-md text-sm font-bold">
                    Season {episode.season_number}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-md text-sm font-medium">
                    Episode {episode.episode_number}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg leading-tight max-w-4xl">
                  {episode.name}
                </h1>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="h-5 w-5" />
                    <span>{formattedAirDate}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="h-5 w-5" />
                    <span>{formattedRuntime}</span>
                  </div>

                  {episode.vote_average > 0 && (
                    <div className="flex items-center gap-2 text-yellow-400">
                      <Star className="h-5 w-5 fill-yellow-400" />
                      <span className="font-semibold">
                        {episode.vote_average.toFixed(1)}
                      </span>
                      <span className="text-gray-400 text-sm">
                        ({episode.vote_count} votes)
                      </span>
                    </div>
                  )}
                </div>

                {episode.overview && (
                  <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-3xl">
                    {episode.overview}
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      </LazyWrapper>

      {/* Guest Stars Section */}
      {guestStars.length > 0 && (
        <LazyWrapper>
          <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
            <section className="bg-black py-8 md:py-12 border-t border-zinc-800">
              <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                  Guest Stars
                </h2>
                <FullCreditsSection
                  cast={guestStars.map((guest) => ({
                    id: guest.id,
                    name: guest.name,
                    character: guest.character || "Guest role",
                    profile_path: guest.profile_path,
                    order: 0,
                  }))}
                  crew={[]}
                />
              </div>
            </section>
          </Suspense>
        </LazyWrapper>
      )}

      {/* Key Crew Section */}
      {keyCrew.length > 0 && (
        <LazyWrapper>
          <section className="bg-black py-8 md:py-12 border-t border-zinc-800">
            <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                Production Crew
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {keyCrew.map((member) => (
                  <div
                    key={member.id}
                    className="bg-zinc-900/50 rounded-lg p-4 text-center hover:bg-zinc-800/50 transition-colors"
                  >
                    {member.profile_path ? (
                      <OptimizedImage
                        src={`${POSTER_BASE_URL}${member.profile_path}`}
                        alt={member.name}
                        className="w-full aspect-[2/3] rounded-md mb-3"
                        objectFit="cover"
                      />
                    ) : (
                      <div className="w-full aspect-[2/3] bg-zinc-800 rounded-md mb-3 flex items-center justify-center">
                        <span className="text-4xl text-zinc-600">🎬</span>
                      </div>
                    )}
                    <h3 className="text-sm font-medium text-white line-clamp-1">
                      {member.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">{member.job}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </LazyWrapper>
      )}

      {/* Episode Info Section */}
      <LazyWrapper>
        <section className="bg-black py-8 md:py-12 border-t border-zinc-800">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
            <div className="grid md:grid-cols-1 gap-8">
              <div className="bg-zinc-900/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Episode Details
                </h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Season</dt>
                    <dd className="text-white font-medium">
                      {episode.season_number}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Episode</dt>
                    <dd className="text-white font-medium">
                      {episode.episode_number}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Air Date</dt>
                    <dd className="text-white font-medium">
                      {formattedAirDate}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Runtime</dt>
                    <dd className="text-white font-medium">
                      {formattedRuntime}
                    </dd>
                  </div>
                  {episode.production_code && (
                    <div className="flex justify-between">
                      <dt className="text-gray-400">Production Code</dt>
                      <dd className="text-white font-medium">
                        {episode.production_code}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </section>
      </LazyWrapper>
    </div>
  );
});

export default EpisodeDetailsPage;

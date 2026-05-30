import { memo, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";

import HelmetMeta from "@/components/shared/HelmetMeta";
import {
  Calendar,
  Clock,
  Star,
  Film,
  ExternalLink,
} from "lucide-react";
import { PageSkeleton, SectionSkeleton, Badge } from "@/components/ui";
import { ReactQueryErrorState } from "@/components/errors";
import { Separator } from "@/components/ui/separator";
import FetchEpisodeDetails from "@/features/tv-shows/hooks/FetchEpisodeDetails";
import { OptimizedSectionWrapper } from "@/components/optimized-section-wrapper";
import OptimizedImage from "@/components/ui/OptimizedImage";
import PersonCard from "@/components/shared/MediaCard/PersonCard";
import VideosSection from "@/components/sections/VideosSection";
import ImagesGallery from "@/components/sections/ImagesGallery";
import type { Video, ImageFile } from "@/types";
import type {
  GuestStar,
  EpisodeCrewMember,
  EpisodeCastMember,
} from "@/features/tv-shows/types";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const EpisodeDetailsPage = memo(function EpisodeDetailsPage() {
  const { id: tvId, seasonNumber, episodeNumber } = useParams<{
    slug: string;
    id: string;
    seasonNumber: string;
    episodeNumber: string;
  }>();

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

  const handleRetry = useCallback(() => refetch(), [refetch]);

  const stillImageUrl = useMemo(
    () =>
      episode?.still_path ? `${IMAGE_BASE_URL}${episode.still_path}` : null,
    [episode?.still_path],
  );

  const formattedDate = useMemo(() => {
    if (!episode?.air_date) return "TBA";
    return new Date(episode.air_date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [episode?.air_date]);

  const formattedRuntime = useMemo(() => {
    if (episode?.runtime == null) return "N/A";
    const h = Math.floor(episode.runtime / 60);
    const m = episode.runtime % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }, [episode?.runtime]);

  // Cast from credits
  const creditsCast = useMemo(
    () =>
      (
        (episode as unknown as Record<string, unknown>)?.credits as
          | { cast: EpisodeCastMember[] }
          | undefined
      )?.cast ?? [],
    [episode],
  );

  // Crew from credits
  const creditsCrew = useMemo(
    () =>
      (
        (episode as unknown as Record<string, unknown>)?.credits as
          | { crew: EpisodeCrewMember[] }
          | undefined
      )?.crew ?? [],
    [episode],
  );

  // Root crew
  const rootCrew = useMemo(
    () => (episode?.crew ?? []) as EpisodeCrewMember[],
    [episode],
  );

  // Guest stars
  const guestStars = useMemo(
    () => (episode?.guest_stars ?? []) as GuestStar[],
    [episode],
  );

  // Group crew by department
  const crewByDepartment = useMemo(() => {
    const map = new Map<string, EpisodeCrewMember[]>();
    creditsCrew.forEach((member) => {
      const dept = member.department || "Other";
      if (!map.has(dept)) map.set(dept, []);
      map.get(dept)!.push(member);
    });
    if (creditsCrew.length === 0) {
      rootCrew.forEach((member) => {
        const dept = member.department || "Other";
        if (!map.has(dept)) map.set(dept, []);
        map.get(dept)!.push(member);
      });
    }
    return map;
  }, [creditsCrew, rootCrew]);

  // Videos
  const videos = useMemo(() => {
    const episodeAny = episode as unknown as Record<string, unknown>;
    const v = episodeAny?.videos as { results?: Video[] } | undefined;
    return v?.results ?? [];
  }, [episode]);

  // Images
  const images = useMemo(() => {
    const episodeAny = episode as unknown as Record<string, unknown>;
    const imgs = episodeAny?.images as
      | { stills?: ImageFile[]; backdrops?: ImageFile[] }
      | undefined;
    return imgs?.stills ?? imgs?.backdrops ?? [];
  }, [episode]);

  // External IDs
  const externalIds = useMemo(() => {
    const episodeAny = episode as unknown as Record<string, unknown>;
    return (episodeAny?.external_ids ?? {}) as Record<string, unknown>;
  }, [episode]);

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error || !episode) {
    return <ReactQueryErrorState error={error} retry={handleRetry} fullscreen />;
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      <HelmetMeta
        name={episode.name || "Episode Details"}
        description={
          episode.overview?.substring(0, 160) ||
          `Watch Episode ${episode.episode_number} of Season ${episode.season_number} on Netflix`
        }
        image={
          episode.still_path
            ? `${IMAGE_BASE_URL}${episode.still_path}`
            : undefined
        }
        url={window.location.href}
        type="video.episode"
      />

      {/* ════════════════════════════════════════════════
          HERO — full screen
          ════════════════════════════════════════════════ */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background */}
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
            <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center">
              <Film className="w-24 h-24 text-zinc-700" />
            </div>
          )}
        </div>

        {/* Gradient overlays — Netflix style */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-primary)] via-[var(--background-primary)]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-32">
          <div className="container">
            {/* Season / Episode badges */}
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[var(--netflix-red)] text-white px-3 py-1 rounded text-sm font-bold">
                Season {episode.season_number}
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded text-sm font-medium">
                Episode {episode.episode_number}
              </span>
              {episode.episode_type && (
                <Badge
                  variant="outline"
                  className="text-white/80 border-white/30 text-[11px] uppercase tracking-wider"
                >
                  {episode.episode_type}
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 leading-tight drop-shadow-2xl">
              {episode.name}
            </h1>

            {/* Meta row */}
            <div className="flex items-center gap-4 flex-wrap text-sm md:text-base mb-5">
              <div className="flex items-center gap-1.5 text-gray-300">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-300">
                <Clock className="h-4 w-4" />
                <span>{formattedRuntime}</span>
              </div>
              {episode.vote_average > 0 && (
                <div className="flex items-center gap-1.5 text-yellow-400">
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <span className="font-semibold">
                    {episode.vote_average.toFixed(1)}
                  </span>
                  <span className="text-gray-400 text-xs">
                    ({episode.vote_count})
                  </span>
                </div>
              )}
              {episode.production_code && (
                <span className="text-gray-500 text-xs border border-gray-700 px-2 py-0.5 rounded">
                  PC: {episode.production_code}
                </span>
              )}
            </div>

            {/* Overview */}
            {episode.overview && (
              <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-2xl drop-shadow-lg">
                {episode.overview}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION — Episode Quick Info
          ════════════════════════════════════════════════ */}
      <section className="bg-black py-8 md:py-10">
        <div className="container">
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-neutral-500 block text-xs uppercase tracking-wider">
                Air Date
              </span>
              <span className="text-white font-medium">{formattedDate}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-xs uppercase tracking-wider">
                Runtime
              </span>
              <span className="text-white font-medium">
                {formattedRuntime}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block text-xs uppercase tracking-wider">
                Season
              </span>
              <span className="text-white font-medium">
                {episode.season_number}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block text-xs uppercase tracking-wider">
                Episode
              </span>
              <span className="text-white font-medium">
                {episode.episode_number}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block text-xs uppercase tracking-wider">
                Episode Type
              </span>
              <span className="text-white font-medium capitalize">
                {episode.episode_type || "N/A"}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block text-xs uppercase tracking-wider">
                Production Code
              </span>
              <span className="text-white font-medium">
                {episode.production_code || "N/A"}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block text-xs uppercase tracking-wider">
                Rating
              </span>
              <span className="text-yellow-400 font-medium">
                {episode.vote_average > 0
                  ? `${episode.vote_average.toFixed(1)} / 10`
                  : "No ratings"}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block text-xs uppercase tracking-wider">
                Vote Count
              </span>
              <span className="text-white font-medium">
                {episode.vote_count}
              </span>
            </div>
          </div>
        </div>
      </section>

      <Separator className="bg-neutral-800" />

      {/* ════════════════════════════════════════════════
          SECTION — Cast
          ════════════════════════════════════════════════ */}
      <OptimizedSectionWrapper
        data={creditsCast.length > 0 ? creditsCast : null}
        isLoading={isLoading}
        fallback={<SectionSkeleton variant="grid" cardCount={8} />}
        height={400}
        title="Cast"
      >
        {(cast) => (
          <section className="bg-black py-8 md:py-12">
            <div className="container">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                Cast
              </h2>
              <p className="text-sm text-neutral-500 mb-6">
                {cast.length} member{cast.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                {cast.map((actor) => (
                  <PersonCard
                    key={actor.id}
                    id={actor.id}
                    name={actor.name}
                    profilePath={actor.profile_path}
                    role={actor.character || "Unknown role"}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </OptimizedSectionWrapper>

      <Separator className="bg-neutral-800" />

      {/* ════════════════════════════════════════════════
          SECTION — Crew (grouped by department)
          ════════════════════════════════════════════════ */}
      <OptimizedSectionWrapper
        data={crewByDepartment.size > 0 ? crewByDepartment : null}
        isLoading={isLoading}
        fallback={<SectionSkeleton variant="grid" cardCount={6} />}
        height={400}
        title="Crew"
      >
        {() => (
          <section className="bg-black py-8 md:py-12">
            <div className="container">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
                Crew
              </h2>
              {Array.from(crewByDepartment.entries()).map(
                ([department, members]) => (
                  <div key={department} className="mb-8 last:mb-0">
                    <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-widest mb-3">
                      {department}
                      <span className="text-neutral-600 ml-2">
                        ({members.length})
                      </span>
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                      {members.map((member) => (
                        <PersonCard
                          key={`${member.id}-${member.credit_id}`}
                          id={member.id}
                          name={member.name}
                          profilePath={member.profile_path}
                          role={member.job || "Unknown"}
                        />
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </section>
        )}
      </OptimizedSectionWrapper>

      <Separator className="bg-neutral-800" />

      {/* ════════════════════════════════════════════════
          SECTION — Guest Stars
          ════════════════════════════════════════════════ */}
      <OptimizedSectionWrapper
        data={guestStars.length > 0 ? guestStars : null}
        isLoading={isLoading}
        fallback={<SectionSkeleton variant="grid" cardCount={6} />}
        height={300}
        title="Guest Stars"
      >
        {(stars) => (
          <section className="bg-black py-8 md:py-12">
            <div className="container">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                Guest Stars
              </h2>
              <p className="text-sm text-neutral-500 mb-6">
                {stars.length} guest star{stars.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                {stars.map((guest) => (
                  <PersonCard
                    key={guest.id}
                    id={guest.id}
                    name={guest.name}
                    profilePath={guest.profile_path}
                    role={guest.character || "Guest role"}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </OptimizedSectionWrapper>

      <Separator className="bg-neutral-800" />

      {/* ════════════════════════════════════════════════
          SECTION — Videos
          ════════════════════════════════════════════════ */}
      <OptimizedSectionWrapper
        data={videos.length > 0 ? videos : null}
        isLoading={isLoading}
        fallback={<SectionSkeleton variant="grid" cardCount={4} />}
        height={400}
        title="Videos"
      >
        {(videosData) => <VideosSection videos={videosData} title="Videos" />}
      </OptimizedSectionWrapper>

      <Separator className="bg-neutral-800" />

      {/* ════════════════════════════════════════════════
          SECTION — External Links
          ════════════════════════════════════════════════ */}
      <OptimizedSectionWrapper
        data={
          Object.keys(externalIds).some(
            (k) => externalIds[k] != null,
          )
            ? externalIds
            : null
        }
        isLoading={isLoading}
        fallback={
          <div className="h-[120px] animate-pulse bg-zinc-900/50 rounded-lg" />
        }
        height={120}
        title="External Links"
      >
        {() => {
          const links: { label: string; url: string; id: string }[] = [];
          if (externalIds.imdb_id)
            links.push({
              label: "IMDb",
              url: `https://www.imdb.com/title/${externalIds.imdb_id}`,
              id: externalIds.imdb_id as string,
            });
          if (externalIds.tvdb_id)
            links.push({
              label: "TVDB",
              url: `https://www.thetvdb.com/dereferrer/series/${tvId}/seasons/${episode.season_number}/episodes/${episode.episode_number}`,
              id: String(externalIds.tvdb_id),
            });
          if (externalIds.wikidata_id)
            links.push({
              label: "Wikidata",
              url: `https://www.wikidata.org/wiki/${externalIds.wikidata_id}`,
              id: externalIds.wikidata_id as string,
            });
          if (externalIds.facebook_id)
            links.push({
              label: "Facebook",
              url: `https://www.facebook.com/${externalIds.facebook_id}`,
              id: externalIds.facebook_id as string,
            });
          if (externalIds.instagram_id)
            links.push({
              label: "Instagram",
              url: `https://www.instagram.com/${externalIds.instagram_id}`,
              id: externalIds.instagram_id as string,
            });
          if (externalIds.twitter_id)
            links.push({
              label: "Twitter / X",
              url: `https://x.com/${externalIds.twitter_id}`,
              id: externalIds.twitter_id as string,
            });

          if (links.length === 0) return null;

          return (
            <section className="bg-black py-8 md:py-12">
              <div className="container">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
                  External Links
                </h2>
                <div className="flex flex-wrap gap-3">
                  {links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-500 text-white text-sm transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>{link.label}</span>
                      <span className="text-neutral-500 text-xs">
                        {link.id}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          );
        }}
      </OptimizedSectionWrapper>

      <Separator className="bg-neutral-800" />

      {/* ════════════════════════════════════════════════
          SECTION — Gallery / Images
          ════════════════════════════════════════════════ */}
      <OptimizedSectionWrapper
        data={images.length > 0 ? images : null}
        isLoading={isLoading}
        fallback={<SectionSkeleton variant="grid" cardCount={6} />}
        height={400}
        title="Gallery"
      >
        {(imagesData) => (
          <ImagesGallery
            images={imagesData as ImageFile[]}
            title="Episode Gallery"
          />
        )}
      </OptimizedSectionWrapper>
    </div>
  );
});

export default EpisodeDetailsPage;

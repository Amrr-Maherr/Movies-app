import { memo, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";

import { PageSkeleton, SectionSkeleton } from "@/components/ui";
import { ReactQueryErrorState } from "@/components/errors";
import { Separator } from "@/components/ui/separator";
import HelmetMeta from "@/components/shared/HelmetMeta";
import {
  Calendar,
  Film,
  Clock,
  Star,
  ExternalLink,
} from "lucide-react";
import FetchTvSeasonDetails from "@/features/tv-shows/hooks/FetchTvSeasonDetails";
import type { Episode, CastMember, CrewMember, Video, ImageFile } from "@/types";
import { OptimizedSectionWrapper } from "@/components/optimized-section-wrapper";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { Card } from "@/components/shared/Card";
import VideosSection from "@/components/sections/VideosSection";
import ImagesGallery from "@/components/sections/ImagesGallery";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const SeasonDetailsPage = memo(function SeasonDetailsPage() {
  const { id: tvId, seasonNumber } = useParams<{
    slug: string;
    id: string;
    seasonNumber: string;
  }>();

  const {
    isLoading,
    data: season,
    error,
    refetch,
  } = FetchTvSeasonDetails(Number(tvId), Number(seasonNumber));

  const handleRetry = useCallback(() => refetch(), [refetch]);

  const backdropUrl = useMemo(
    () =>
      season?.poster_path ? `${IMAGE_BASE_URL}${season.poster_path}` : null,
    [season?.poster_path],
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
    if (!season?.episodes || season.episodes.length === 0) return null;
    const avg =
      season.episodes.reduce((acc, ep) => acc + ep.vote_average, 0) /
      season.episodes.length;
    return avg > 0 ? avg.toFixed(1) : null;
  }, [season?.episodes]);

  // Cast from credits
  const cast = useMemo(
    () =>
      ((season as unknown as Record<string, unknown>)?.credits as
        | { cast: CastMember[] }
        | undefined)?.cast ?? [],
    [season],
  );

  // Crew from credits
  const crew = useMemo(
    () =>
      ((season as unknown as Record<string, unknown>)?.credits as
        | { crew: CrewMember[] }
        | undefined)?.crew ?? [],
    [season],
  );

  // Group crew by department
  const crewByDepartment = useMemo(() => {
    const map = new Map<string, CrewMember[]>();
    crew.forEach((member) => {
      const dept = member.department || "Other";
      if (!map.has(dept)) map.set(dept, []);
      map.get(dept)!.push(member);
    });
    return map;
  }, [crew]);

  // Episodes
  const episodes = useMemo(
    () => season?.episodes ?? [],
    [season?.episodes],
  );

  // Videos
  const videos = useMemo(() => {
    const s = season as unknown as Record<string, unknown>;
    const v = s?.videos as { results?: Video[] } | undefined;
    return v?.results ?? [];
  }, [season]);

  // Images
  const allImages = useMemo(() => {
    const s = season as unknown as Record<string, unknown>;
    const imgs = s?.images as
      | { backdrops?: ImageFile[]; posters?: ImageFile[] }
      | undefined;
    return [
      ...(imgs?.backdrops ?? []),
      ...(imgs?.posters ?? []),
    ];
  }, [season]);

  // External IDs
  const externalIds = useMemo(() => {
    const s = season as unknown as Record<string, unknown>;
    return (s?.external_ids ?? {}) as Record<string, unknown>;
  }, [season]);

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error || !season) {
    return <ReactQueryErrorState error={error} retry={handleRetry} fullscreen />;
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      <HelmetMeta
        name={season.name || "Season Details"}
        description={
          season.overview || `Watch Season ${seasonNumber} on Netflix`
        }
        image={
          season.poster_path
            ? `${IMAGE_BASE_URL}${season.poster_path}`
            : undefined
        }
        url={window.location.href}
        type="video.tv_season"
      />

      {/* ════════════════════════════════════════════════
          HERO — full screen
          ════════════════════════════════════════════════ */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 w-full h-full">
          {backdropUrl ? (
            <OptimizedImage
              src={backdropUrl}
              alt={season.name}
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
          <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
            {/* Season badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[var(--netflix-red)] text-white px-3 py-1 rounded text-sm font-bold">
                Season {season.season_number}
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded text-sm font-medium">
                {season.episode_count} Episode{season.episode_count !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 leading-tight drop-shadow-2xl">
              {season.name}
            </h1>

            {/* Meta row */}
            <div className="flex items-center gap-4 flex-wrap text-sm md:text-base mb-5">
              <div className="flex items-center gap-1.5 text-gray-300">
                <Calendar className="h-4 w-4" />
                <span>{formattedAirDate}</span>
              </div>
              {averageRuntime > 0 && (
                <div className="flex items-center gap-1.5 text-gray-300">
                  <Clock className="h-4 w-4" />
                  <span>~{averageRuntime} min avg</span>
                </div>
              )}
              {averageRating && (
                <div className="flex items-center gap-1.5 text-yellow-400">
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <span className="font-semibold">{averageRating}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-gray-300">
                <Film className="h-4 w-4" />
                <span>{season.episode_count} Episodes</span>
              </div>
            </div>

            {/* Overview */}
            {season.overview && (
              <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-2xl drop-shadow-lg">
                {season.overview}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION — Season Quick Info
          ════════════════════════════════════════════════ */}
      <section className="bg-black py-8 md:py-10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-neutral-500 block text-xs uppercase tracking-wider">
                Season Number
              </span>
              <span className="text-white font-medium">
                {season.season_number}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block text-xs uppercase tracking-wider">
                Episodes
              </span>
              <span className="text-white font-medium">
                {season.episode_count}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block text-xs uppercase tracking-wider">
                Air Date
              </span>
              <span className="text-white font-medium">
                {formattedAirDate}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block text-xs uppercase tracking-wider">
                Avg Runtime
              </span>
              <span className="text-white font-medium">
                {averageRuntime > 0 ? `~${averageRuntime} min` : "N/A"}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block text-xs uppercase tracking-wider">
                Avg Rating
              </span>
              <span className="text-yellow-400 font-medium">
                {averageRating ? `${averageRating} / 10` : "No ratings"}
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
        data={cast.length > 0 ? cast : null}
        isLoading={isLoading}
        fallback={<SectionSkeleton variant="grid" cardCount={8} />}
        height={400}
        title="Cast"
      >
        {(castData) => (
          <section className="bg-black py-8 md:py-12">
            <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                Cast
              </h2>
              <p className="text-sm text-neutral-500 mb-6">
                {castData.length} member{castData.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                {castData.map((actor) => (
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
            <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
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
                          key={`${member.id}-${member.job}`}
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
          SECTION — Episodes
          ════════════════════════════════════════════════ */}
      <OptimizedSectionWrapper
        data={episodes.length > 0 ? episodes : null}
        isLoading={isLoading}
        fallback={<SectionSkeleton variant="grid" cardCount={8} />}
        height={600}
        title="Episodes"
        isEmptyFallback={
          <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl py-8">
            <h2 className="text-2xl font-bold text-white mb-6">Episodes</h2>
            <div className="flex items-center justify-center py-12 text-gray-400">
              <p>Episodes coming soon...</p>
            </div>
          </div>
        }
      >
        {(episodesData) => (
          <section className="bg-black py-8 md:py-12">
            <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                Episodes
              </h2>
              <p className="text-sm text-neutral-500 mb-6">
                {episodesData.length} episode{episodesData.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {episodesData.map((episode: Episode) => (
                  <Card
                    key={episode.id}
                    variant="episode"
                    episode={episode}
                    tvShowId={Number(tvId)}
                    seasonNumber={Number(seasonNumber)}
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
        {(videosData) => (
          <VideosSection videos={videosData} title="Videos" />
        )}
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
              url: `https://www.thetvdb.com/dereferrer/series/${tvId}`,
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
              <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
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
        data={allImages.length > 0 ? allImages : null}
        isLoading={isLoading}
        fallback={<SectionSkeleton variant="grid" cardCount={6} />}
        height={400}
        title="Gallery"
      >
        {(imagesData) => (
          <ImagesGallery
            images={imagesData as ImageFile[]}
            title="Season Gallery"
          />
        )}
      </OptimizedSectionWrapper>
    </div>
  );
});

export default SeasonDetailsPage;

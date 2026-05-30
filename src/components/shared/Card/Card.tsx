import { memo } from "react";
import { Link } from "react-router-dom";
import { User, Film, Star, Calendar, Clock } from "lucide-react";
import MediaCard from "../MediaCard/MediaCard";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { getLocalizedLink } from "@/lib/utils/i18n";
import type { HeroMedia, Episode } from "@/types";

interface PersonData {
  id: number;
  name: string;
  profileImage?: string | null;
  role?: string;
}

interface CardProps {
  movie?: HeroMedia;
  variant?: "compact" | "standard" | "person" | "episode";
  person?: PersonData;
  episode?: Episode;
  tvShowId?: number;
  seasonNumber?: number;
  rank?: number;
  mediaType?: "movie" | "tv";
  key?: string | number;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w185";

const PersonCard = memo(({ person }: { person: PersonData }) => {
  const slug = person.name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .trim();

  return (
    <Link
      to={getLocalizedLink(`/actor/${slug}/${person.id}`)}
      className="group relative block touch-manipulation"
    >
      <div className="relative rounded-md bg-zinc-900 shadow-lg transition-all duration-300 ease-in-out group-hover:shadow-2xl">
        <div className="relative aspect-[2/3]">
          {person.profileImage ? (
            <>
              <OptimizedImage
                src={`${IMAGE_BASE_URL}${person.profileImage}`}
                alt={person.name}
                className="h-full w-full transition-transform duration-300 ease-in-out"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-zinc-600">
              <User size={48} />
            </div>
          )}
        </div>
        <div className="absolute inset-0 rounded-md ring-2 ring-white/0 ring-offset-2 ring-offset-zinc-900 transition-all duration-300 group-focus-within:ring-white/50" />
      </div>
      <div className="mt-3 space-y-1 px-1">
        <p className="text-sm font-medium text-white line-clamp-1 group-hover:text-[var(--netflix-red)] transition-colors duration-300">
          {person.name}
        </p>
        {person.role && (
          <p className="text-xs text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
            {person.role}
          </p>
        )}
      </div>
    </Link>
  );
});

const EpisodeCard = memo(({ episode, tvShowId, seasonNumber }: { episode: Episode; tvShowId: number; seasonNumber: number }) => {
  const stillUrl = episode.still_path
    ? `https://image.tmdb.org/t/p/w342${episode.still_path}`
    : null;

  const formattedDate = episode.air_date
    ? new Date(episode.air_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : null;

  const episodeTitle = episode.name || `Episode ${episode.episode_number}`;

  return (
    <Link
      to={getLocalizedLink(`/series/${episodeTitle.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-").trim()}/${tvShowId}/season/${seasonNumber}/episode/${episode.episode_number}`)}
      className="group relative block touch-manipulation"
    >
      <div className="relative rounded-md bg-zinc-900 shadow-lg transition-all duration-300 ease-in-out group-hover:shadow-2xl overflow-hidden">
        {stillUrl ? (
          <div className="relative aspect-video">
            <OptimizedImage
              src={stillUrl}
              alt={episodeTitle}
              className="h-full w-full transition-transform duration-300 ease-in-out group-hover:scale-105"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-3 flex items-center gap-2">
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="h-3.5 w-3.5 fill-yellow-400" />
                <span className="text-xs font-semibold">{episode.vote_average?.toFixed(1)}</span>
              </div>
              {episode.runtime && (
                <div className="flex items-center gap-1 text-gray-300">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="text-xs">{episode.runtime}m</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="aspect-video flex items-center justify-center bg-zinc-800 text-zinc-600">
            <Film size={40} />
          </div>
        )}
      </div>
      <div className="mt-2 space-y-1">
        <p className="text-sm font-medium text-white line-clamp-1 group-hover:text-[var(--netflix-red)] transition-colors">
          {episode.episode_number}. {episodeTitle}
        </p>
        {formattedDate && (
          <div className="flex items-center gap-1 text-gray-400">
            <Calendar className="h-3 w-3" />
            <span className="text-xs">{formattedDate}</span>
          </div>
        )}
        {episode.overview && (
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {episode.overview}
          </p>
        )}
      </div>
    </Link>
  );
});

const Card = memo(function Card({ movie, variant, person, episode, tvShowId, seasonNumber, rank, mediaType }: CardProps) {
  if (variant === "person" && person) {
    return <PersonCard person={person} />;
  }

  if (variant === "episode" && episode && tvShowId != null && seasonNumber != null) {
    return <EpisodeCard episode={episode} tvShowId={tvShowId} seasonNumber={seasonNumber} />;
  }

  if (movie) {
    return <MediaCard movie={movie} rank={rank} mediaType={mediaType} />;
  }

  return null;
});

export default Card;

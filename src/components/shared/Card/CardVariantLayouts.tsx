import { memo } from "react";
import { motion } from "framer-motion";
import { Award, Calendar, Star, Play, Film, User, Info, Flame } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import type { HeroMedia, Episode, Season } from "@/types";

export interface Top10BadgeProps {
  rank: number;
}

export interface NewReleaseLayoutProps {
  movie: HeroMedia;
  title: string;
  posterUrl: string;
  ratingValue?: string;
  formattedReleaseDate?: string;
  isHovered: boolean;
  children?: React.ReactNode;
}

export interface AwardWinnerLayoutProps {
  movie: HeroMedia;
  title: string;
  posterUrl: string;
  ratingValue?: string;
  isHovered: boolean;
}

export interface RecommendationLayoutProps {
  movie: HeroMedia;
  title: string;
  posterUrl: string;
  matchPercentage?: number;
  isHovered: boolean;
}

// Top 10 Badge Component
const Top10Badge = memo(({ rank }: Top10BadgeProps) => {
  return (
    <div className="absolute -left-2 md:-left-4 -bottom-2 md:-bottom-3 z-10">
      <div className="relative">
        <span
          className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-black"
          style={{ WebkitTextStroke: "2px #ddd" }}
        >
          {rank}
        </span>
      </div>
    </div>
  );
});

// Add displayName for better debugging in React DevTools
Top10Badge.displayName = "Top10Badge";

// New Release Layout Component
const NewReleaseLayout = memo(
  ({
    title,
    posterUrl,
    ratingValue,
    formattedReleaseDate,
    children,
  }: NewReleaseLayoutProps) => {
    return (
      <>
        <div className="relative aspect-[2/3] overflow-hidden rounded mb-2">
          <OptimizedImage
            src={posterUrl}
            alt={title}
            className="w-full h-full"
            objectFit="cover"
          />
          {/* NEW Badge */}
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
            NEW
          </div>
          {/* Rating Badge */}
          {ratingValue && (
            <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 z-10">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              {ratingValue}
            </div>
          )}
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center px-4">
              <p className="text-white text-sm font-semibold line-clamp-2">
                {title}
              </p>
            </div>
          </div>
          {/* Children (additional overlays) */}
          {children}
        </div>
        <h3 className="text-sm md:text-base text-white font-medium line-clamp-1 group-hover:text-gray-300 transition-colors">
          {title}
        </h3>
        {formattedReleaseDate && (
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
            <Calendar className="w-3 h-3" />
            {formattedReleaseDate}
          </div>
        )}
      </>
    );
  },
);

// Add displayName for better debugging in React DevTools
NewReleaseLayout.displayName = "NewReleaseLayout";

// Award Winner Layout Component
const AwardWinnerLayout = memo(
  ({ title, posterUrl, ratingValue, isHovered }: AwardWinnerLayoutProps) => {
    return (
      <>
        {/* Award Badge */}
        <div className="absolute -top-2 -right-2 z-10 bg-yellow-500 rounded-full p-2 shadow-lg">
          <Award className="w-4 h-4 md:w-5 md:h-5 text-black" />
        </div>
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg border-2 border-yellow-500/30 group-hover:border-yellow-500 transition-colors duration-300">
          <OptimizedImage
            src={posterUrl}
            alt={title}
            className="w-full h-full"
            objectFit="cover"
          />
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent transition-opacity duration-300 ease-in-out"
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            <div className="absolute bottom-2 left-2 right-2">
              {ratingValue && (
                <div className="flex items-center gap-1 bg-black/80 backdrop-blur-sm px-2 py-1 rounded">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-bold text-white">
                    {ratingValue}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <h3 className="text-xs md:text-sm text-white font-medium mt-2 line-clamp-2 group-hover:text-yellow-400 transition-colors">
          {title}
        </h3>
      </>
    );
  },
);

// Add displayName for better debugging in React DevTools
AwardWinnerLayout.displayName = "AwardWinnerLayout";

// Recommendation Layout Component
const RecommendationLayout = memo(
  ({
    title,
    posterUrl,
    matchPercentage,
    isHovered,
  }: RecommendationLayoutProps) => {
    return (
      <>
        <div className="relative aspect-[2/3] overflow-hidden rounded mb-2">
          <OptimizedImage
            src={posterUrl}
            alt={title}
            className="w-full h-full"
            objectFit="cover"
          />
          {/* Hover Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ease-in-out"
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            <div className="absolute bottom-2 left-2 right-2">
              <div className="flex items-center justify-between">
                {matchPercentage && (
                  <span className="text-xs font-bold text-green-400">
                    {matchPercentage}% Match
                  </span>
                )}
                <Star className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-xs md:text-sm text-gray-300 group-hover:text-white transition-colors line-clamp-2">
          {title}
        </h3>
      </>
    );
  },
);

// Add displayName for better debugging in React DevTools
RecommendationLayout.displayName = "RecommendationLayout";

// Episode Layout Component
export interface EpisodeLayoutProps {
  episode: Episode;
  title: string;
  imageUrl: string | null;
  formattedRuntime: string;
  formattedAirDate: string;
  isHovered: boolean;
}

const EpisodeLayout = memo(
  ({
    episode,
    title,
    imageUrl,
    formattedRuntime,
    formattedAirDate,
  }: EpisodeLayoutProps) => {
    return (
      <div className="relative">
        <div className="relative overflow-hidden rounded-md bg-zinc-900 shadow-lg transition-all duration-300 ease-in-out group-hover:scale-[1.02] group-hover:shadow-2xl">
          <div className="relative aspect-video overflow-hidden">
            {imageUrl ? (
              <>
                <OptimizedImage
                  src={imageUrl}
                  alt={title}
                  className="h-full w-full transition-transform duration-300 ease-in-out "
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-zinc-800">
                <Play className="h-12 w-12 text-zinc-600" />
              </div>
            )}

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 opacity-0 transition-all duration-300 group-hover:opacity-100  shadow-xl">
                <Play className="h-5 w-5 fill-black text-black ml-0.5" />
              </div>
            </div>

            <div className="absolute top-2 left-2 rounded bg-black/80 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              E{episode.episode_number}
            </div>
          </div>
        </div>

        <div className="mt-3 space-y-1 px-1">
          <h4 className="text-sm font-medium text-white line-clamp-1 group-hover:text-[var(--netflix-red)] transition-colors duration-300">
            {title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{formattedRuntime}</span>
            <span>•</span>
            <span>{formattedAirDate}</span>
          </div>
          {episode.overview && (
            <p className="text-xs text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
              {episode.overview}
            </p>
          )}
        </div>
      </div>
    );
  },
);
EpisodeLayout.displayName = "EpisodeLayout";

// Person Layout Component
export interface PersonLayoutProps {
  name: string;
  imageUrl: string | null;
  role: string;
  isHovered: boolean;
}

const PersonLayout = memo(({ name, imageUrl, role }: PersonLayoutProps) => {
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-md bg-zinc-900 shadow-lg transition-all duration-300 ease-in-out  group-hover:shadow-2xl">
        <div className="relative aspect-[2/3] overflow-hidden">
          {imageUrl ? (
            <>
              <OptimizedImage
                src={imageUrl}
                alt={name}
                className="h-full w-full transition-transform duration-300 ease-in-out "
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
          {name}
        </p>
        <p className="text-xs text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
          {role}
        </p>
      </div>
    </div>
  );
});
PersonLayout.displayName = "PersonLayout";

// Review Layout Component
export interface ReviewLayoutProps {
  author: string;
  content: string;
  formattedDate: string;
  ratingStars: React.ReactNode;
  truncatedContent: string;
}

const ReviewLayout = memo(
  ({
    author,
    formattedDate,
    ratingStars,
    truncatedContent,
  }: ReviewLayoutProps) => {
    return (
      <div className="group h-full w-full">
        <div className="relative h-full overflow-hidden rounded-lg bg-zinc-900/90 p-4 shadow-lg transition-all duration-300 ease-in-out group-hover:scale-[1.02] group-hover:shadow-xl group-hover:bg-zinc-800/90 border border-zinc-800/50">
          <div className="mb-3 flex items-start justify-between gap-2">
            <div className="flex-1">
              <h4 className="text-base font-bold text-white group-hover:text-[var(--netflix-red)] transition-colors duration-300">
                {author}
              </h4>
              <p className="text-xs text-gray-500">{formattedDate}</p>
            </div>
            {ratingStars}
          </div>
          <div className="mb-3">
            <p className="text-sm leading-relaxed text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
              {truncatedContent}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--netflix-red)]/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </div>
    );
  },
);
ReviewLayout.displayName = "ReviewLayout";

// Season Layout Component
export interface SeasonLayoutProps {
  season: Season;
  title: string;
  imageUrl: string | null;
  formattedAirDate: string;
  isHovered: boolean;
}

const SeasonLayout = memo(
  ({ season, title, imageUrl, formattedAirDate }: SeasonLayoutProps) => {
    return (
      <div className="relative">
        <div className="relative overflow-hidden rounded-lg bg-zinc-900 shadow-lg transition-all duration-300 ease-in-out group-hover:scale-[1.02] group-hover:shadow-2xl">
          <div className="relative aspect-[2/3] overflow-hidden">
            {imageUrl ? (
              <>
                <OptimizedImage
                  src={imageUrl}
                  alt={title}
                  className="h-full w-full transition-transform duration-300 ease-in-out "
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-zinc-800">
                <Film className="h-16 w-16 text-zinc-600" />
              </div>
            )}
            <div className="absolute top-2 left-2 rounded bg-black/80 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
              Season {season.season_number}
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-black shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                View Details
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 p-1">
          <h4 className="text-sm font-semibold text-white line-clamp-1 group-hover:text-[var(--netflix-red)] transition-colors duration-300">
            {title}
          </h4>
          <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <Film className="h-3.5 w-3.5" />
              <span>{season.episode_count} Episodes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formattedAirDate}</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
SeasonLayout.displayName = "SeasonLayout";

// Trailer Layout Component
export interface TrailerLayoutProps {
  title: string;
  thumbnailUrl: string;
  type?: string;
  imageLoaded: boolean;
  onImageLoad: () => void;
}

const TrailerLayout = memo(
  ({
    title,
    thumbnailUrl,
    type,
    imageLoaded,
    onImageLoad,
  }: TrailerLayoutProps) => {
    return (
      <div className="relative">
        <div className="relative overflow-hidden rounded-md bg-zinc-900 shadow-lg transition-all duration-300 ease-in-out  group-hover:shadow-2xl">
          <div className="relative aspect-video overflow-hidden">
            <OptimizedImage
              src={thumbnailUrl}
              alt={title}
              className={`h-full w-full transition-all duration-300 ease-in-out  ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              objectFit="cover"
              onLoad={onImageLoad}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                <Play className="h-12 w-12 text-zinc-600" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 transition-transform duration-300  group-hover:bg-white shadow-xl">
                <Play className="h-6 w-6 fill-black text-black ml-1" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 px-1">
          <p className="text-sm font-medium text-white line-clamp-2 group-hover:text-[var(--netflix-red)] transition-colors duration-300">
            {title}
          </p>
          {type && (
            <p className="mt-1 text-xs text-gray-500 uppercase tracking-wider">
              {type}
            </p>
          )}
        </div>
      </div>
    );
  },
);
TrailerLayout.displayName = "TrailerLayout";

// Promo Layout Component (Banner/Promo)
export interface PromoLayoutProps {
  movie: HeroMedia;
  title: string;
  imageUrl: string;
  detailsUrl: string;
  year: string | number;
  mediaType: "movie" | "tv";
  promoVariant?: "left" | "right" | "center";
}

const PromoLayout = memo(
  ({
    movie,
    title,
    imageUrl,
    detailsUrl,
    year,
    mediaType,
    promoVariant = "left",
  }: PromoLayoutProps) => {
    const contentAlignment =
      promoVariant === "left"
        ? "items-start text-left"
        : promoVariant === "right"
          ? "items-end text-right md:ml-auto"
          : "items-center text-center md:mx-auto";

    const gradientDirection =
      promoVariant === "left"
        ? "bg-gradient-to-r from-black/90 via-black/70 to-transparent"
        : promoVariant === "right"
          ? "bg-gradient-to-l from-black/90 via-black/70 to-transparent"
          : "bg-gradient-to-t from-black/90 via-black/60 to-black/20";

    return (
      <div className="relative w-full h-[50vh] sm:h-[55vh] md:h-[65vh] lg:h-[75vh] overflow-hidden my-6 md:my-8 group">
        {/* Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover object-center transition-transform duration-700 "
            objectFit="cover"
            priority
          />
          <div className={`absolute inset-0 ${gradientDirection}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-end md:items-center">
          <div className="container pb-8 md:pb-12">
            <div
              className={`flex flex-col ${contentAlignment} max-w-full md:max-w-xl lg:max-w-2xl space-y-2 md:space-y-4`}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl leading-tight">
                {title}
              </h2>

              <div
                className={`flex flex-wrap items-center gap-2 md:gap-3 text-white ${promoVariant === "right" ? "justify-end" : promoVariant === "center" ? "justify-center" : ""}`}
              >
                {movie.vote_average && movie.vote_average > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm md:text-base font-semibold">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                )}
                {year && (
                  <span className="text-sm md:text-base font-medium text-gray-300">
                    {year}
                  </span>
                )}
                <span className="px-2 py-0.5 md:px-2.5 md:py-1 border border-gray-400 rounded text-xs md:text-sm font-medium text-gray-300">
                  {mediaType === "movie" ? "Movie" : "Series"}
                </span>
              </div>

              {movie.overview && (
                <p className="hidden md:block text-sm lg:text-base text-gray-200 leading-relaxed line-clamp-2 lg:line-clamp-3 drop-shadow-lg max-w-lg">
                  {movie.overview}
                </p>
              )}

              <div
                className={`flex gap-2 md:gap-3 pt-1 md:pt-2 ${promoVariant === "right" ? "justify-end" : promoVariant === "center" ? "justify-center" : ""}`}
              >
                <a href={detailsUrl}>
                  <button className="inline-flex items-center gap-1.5 md:gap-2 bg-white text-black hover:bg-white/90 px-4 md:px-6 py-1.5 md:py-2 rounded text-sm md:text-base font-semibold transition-all duration-200">
                    <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                    <span className="hidden sm:inline">Play</span>
                  </button>
                </a>
                <a href={detailsUrl}>
                  <button className="inline-flex items-center gap-1.5 md:gap-2 bg-gray-500/70 text-white hover:bg-gray-500/90 px-4 md:px-6 py-1.5 md:py-2 rounded text-sm md:text-base font-semibold transition-all duration-200">
                    <Info className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden sm:inline">More Info</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
PromoLayout.displayName = "PromoLayout";

// Continue Watching Layout
export interface ContinueWatchingLayoutProps {
  title: string;
  imageUrl: string;
  progress: number;
}

const ContinueWatchingLayout = memo(({ title, imageUrl, progress }: ContinueWatchingLayoutProps) => (
  <div className="group cursor-pointer bg-zinc-900 rounded overflow-hidden w-full">
    <div className="relative aspect-video overflow-hidden">
      <OptimizedImage
        src={imageUrl}
        alt={title}
        className="w-full h-full transition-transform duration-300 "
        objectFit="cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/50 transition-colors duration-300">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-white ml-1" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
        <div className="h-full bg-red-600" style={{ width: `${progress}%` }} />
      </div>
    </div>
    <div className="p-3 md:p-4">
      <h3 className="text-sm md:text-base text-white font-medium line-clamp-1">{title}</h3>
    </div>
  </div>
));
ContinueWatchingLayout.displayName = "ContinueWatchingLayout";

// Showcase Layout (Large featured cards)
export interface ShowcaseLayoutProps {
  title: string;
  imageUrl: string;
  mediaType: "movie" | "tv";
  isNew?: boolean;
  isFeatured?: boolean;
  rating?: number;
  overview?: string;
  detailsUrl: string;
  aspectRatio?: string;
}

const ShowcaseLayout = memo(({ title, imageUrl, mediaType, isNew, isFeatured, rating, overview, detailsUrl, aspectRatio = "aspect-video md:aspect-[10/9]" }: ShowcaseLayoutProps) => (
  <a href={detailsUrl} className="block w-full group">
    <motion.div
      className={`relative ${aspectRatio} overflow-hidden rounded-xl cursor-pointer shadow-2xl`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <OptimizedImage
          src={imageUrl}
          alt={title}
          className="w-full h-full"
          objectFit="cover"
        />
      </motion.div>
      {/* Multi-layer gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      {/* Hover shine effect */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
        <div className="flex items-center gap-2 mb-3">
          {isFeatured && (
            <span className="bg-yellow-400 text-black text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow-lg">
              ⭐ Featured Pick
            </span>
          )}
          {isNew && (
            <span className="px-2.5 py-1 bg-red-600 text-white text-[10px] md:text-xs font-bold rounded-full shadow-lg">
              NEW
            </span>
          )}
          {rating && rating > 0 && (
            <div className="flex items-center gap-1 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-[10px] md:text-xs font-bold text-white">{rating.toFixed(1)}</span>
            </div>
          )}
          <span className="text-xs md:text-sm text-gray-400 font-medium">
            {mediaType === "movie" ? "🎬 Movie" : "📺 Series"}
          </span>
        </div>
        <h3 className="text-xl md:text-3xl lg:text-4xl font-black text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300 drop-shadow-2xl leading-tight">
          {title}
        </h3>
        {overview && (
          <p className="hidden md:block text-sm text-gray-300/90 line-clamp-2 max-w-2xl leading-relaxed">
            {overview}
          </p>
        )}
        {/* CTA hint */}
        <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-1.5 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            <Play className="w-3 h-3 fill-current" />
            Watch Now
          </div>
        </div>
      </div>
    </motion.div>
  </a>
));
ShowcaseLayout.displayName = "ShowcaseLayout";

// Horizontal Layout (Image on left, text on right)
export interface HorizontalLayoutProps {
  title: string;
  imageUrl: string;
  overview?: string;
  mediaType: "movie" | "tv";
  isOriginal?: boolean;
  rating?: number;
  detailsUrl: string;
  plainLayout?: boolean;
}

const HorizontalLayout = memo(({ title, imageUrl, overview, mediaType, isOriginal, rating, detailsUrl, plainLayout }: HorizontalLayoutProps) => (
  <a href={detailsUrl} className="block w-full group">
    <motion.div
      className={`cursor-pointer bg-zinc-900/80 rounded-xl overflow-hidden flex gap-3 border border-white/5 shadow-lg ${
        !plainLayout ? "flex-col md:flex-row" : "hover:bg-zinc-700/80"
      }`}
      whileHover={{ y: -2, boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className={`relative overflow-hidden flex-shrink-0 ${
        plainLayout ? "w-20 md:w-24 aspect-[2/3]" : "w-full md:w-2/5 aspect-video md:aspect-auto"
      }`}>
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <OptimizedImage
            src={imageUrl}
            alt={title}
            className="w-full h-full"
            objectFit="cover"
          />
        </motion.div>
        {!plainLayout && <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-900/60 md:to-zinc-900" />}
      </div>
      <div className="flex-1 p-3 md:p-4 flex flex-col justify-center">
        {!plainLayout && (
          <div className="flex items-center gap-2 mb-2">
            {isOriginal && (
              <span className="bg-red-600 text-white text-[10px] md:text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                Netflix Original
              </span>
            )}
            <span className="text-[10px] md:text-xs text-gray-500">
              {mediaType === "movie" ? "Film" : "Series"}
            </span>
          </div>
        )}
        <h3 className={`font-bold text-white mb-1 group-hover:text-red-400 transition-colors duration-200 ${
          plainLayout ? "text-sm md:text-base line-clamp-2" : "text-lg md:text-2xl"
        }`}>
          {title}
        </h3>
        {rating && rating > 0 && (
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-gray-400 font-medium">{rating.toFixed(1)}</span>
          </div>
        )}
        {overview && !plainLayout && (
          <p className="text-xs md:text-sm text-gray-400 line-clamp-2 md:line-clamp-3 leading-relaxed mt-1">
            {overview}
          </p>
        )}
      </div>
    </motion.div>
  </a>
));
HorizontalLayout.displayName = "HorizontalLayout";

// Landscape Layout (Backdrop with overlays)
export interface LandscapeLayoutProps {
  title: string;
  imageUrl: string;
  isHot?: boolean;
  matchPercentage?: number;
  mediaType: "movie" | "tv";
  detailsUrl: string;
}

const LandscapeLayout = memo(({ title, imageUrl, isHot, matchPercentage, mediaType, detailsUrl }: LandscapeLayoutProps) => (
  <a href={detailsUrl} className="block w-full group">
    <motion.div
      className="relative overflow-hidden rounded-xl w-full shadow-xl cursor-pointer"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="relative aspect-video overflow-hidden">
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <OptimizedImage
            src={imageUrl}
            alt={title}
            className="w-full h-full"
            objectFit="cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        {/* Hover vignette */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-400" />
        {isHot && (
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg backdrop-blur-sm">
            <Flame className="w-3 h-3" />
            HOT
          </div>
        )}
        {/* Play button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-2xl backdrop-blur-sm">
            <Play className="w-4 h-4 fill-black text-black ml-0.5" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
          <h3 className="text-sm md:text-base font-bold text-white mb-1 line-clamp-2 group-hover:text-orange-300 transition-colors duration-300 drop-shadow-lg">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-300">
            {matchPercentage && matchPercentage > 0 && (
              <span className="font-semibold text-green-400">
                {matchPercentage}% Match
              </span>
            )}
            <span className="text-gray-400">{mediaType === "tv" ? "Series" : "Movie"}</span>
          </div>
        </div>
      </div>
    </motion.div>
  </a>
));
LandscapeLayout.displayName = "LandscapeLayout";

export {
  Top10Badge,
  NewReleaseLayout,
  AwardWinnerLayout,
  RecommendationLayout,
  EpisodeLayout,
  PersonLayout,
  ReviewLayout,
  SeasonLayout,
  TrailerLayout,
  PromoLayout,
  ContinueWatchingLayout,
  ShowcaseLayout,
  HorizontalLayout,
  LandscapeLayout,
};

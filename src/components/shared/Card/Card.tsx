import { useState, useCallback, useMemo, memo } from "react";
import { Play, Info, ChevronDown, Tv, Flame, Award, Calendar, Radio, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getMatchScore, getYear, getAgeRating } from "@/utils/movieHelpers";
import MovieModal from "@/components/shared/MovieModal";
import type { HeroMedia } from "@/types";

export interface CardProps {
  movie: HeroMedia;
  variant?: "standard" | "compact" | "trending" | "award" | "airing" | "onair" | "upcoming" | "top10" | "newRelease" | "awardWinner" | "recommendation";
  rank?: number;
  onClick?: () => void;
  showBadge?: boolean;
  badgeType?: "trending" | "award" | "live" | "onair" | "calendar";
}

const Card = memo(({
  movie,
  variant = "standard",
  rank,
  onClick,
  showBadge = false,
  badgeType
}: CardProps) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getTitle = useCallback((media: HeroMedia) => {
    return "title" in media ? media.title : media.name;
  }, []);

  const getReleaseDate = useCallback((media: HeroMedia) => {
    return "release_date" in media ? media.release_date : media.first_air_date;
  }, []);

  const posterUrl = useMemo(() => {
    return movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/500x750?text=No+Image";
  }, [movie.poster_path]);

  const matchScore = useMemo(() => getMatchScore(movie.vote_average), [movie.vote_average]);
  const year = useMemo(() => getYear(getReleaseDate(movie)), [movie, getReleaseDate]);
  const ageRating = useMemo(() => getAgeRating(movie.vote_average), [movie.vote_average]);
  const title = useMemo(() => getTitle(movie), [movie, getTitle]);

  const isTvShow = useMemo(() => "first_air_date" in movie, [movie]);

  // Navigate to details page
  const handleNavigate = useCallback(() => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/${isTvShow ? "tv" : "movie"}/${movie.id}`);
    }
  }, [onClick, navigate, isTvShow, movie.id]);

  const handleMoreInfoClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsModalOpen(true);
  }, []);

  const handlePlayClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    handleNavigate();
  }, [handleNavigate]);

  const handleCardMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleCardMouseLeave = useCallback(() => setIsHovered(false), []);

  const handleLinkClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    handleNavigate();
  }, [handleNavigate]);

  const formattedReleaseDate = useMemo(() => {
    const releaseDate = "release_date" in movie ? movie.release_date : movie.first_air_date;
    return releaseDate ? new Date(releaseDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : null;
  }, [movie]);

  const ratingValue = useMemo(() => {
    return movie.vote_average && movie.vote_average > 0 ? movie.vote_average.toFixed(1) : null;
  }, [movie.vote_average]);

  const matchPercentage = useMemo(() => {
    return movie.vote_average && movie.vote_average > 0 ? Math.round(movie.vote_average * 10) : null;
  }, [movie.vote_average]);

  // Compact variant for dense grids
  if (variant === "compact") {
    return (
      <>
        <div
          className="relative group cursor-pointer"
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
          onClick={handleNavigate}
        >
          <div className="relative aspect-[2/3] rounded-md overflow-hidden shadow-lg bg-[var(--background-secondary)]">
            <img
              src={posterUrl}
              alt={title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded">
              <span className="text-[var(--success)] text-xs font-bold">{matchScore}%</span>
            </div>
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-3 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
              style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <button
                  className="flex-1 bg-white text-black py-2 rounded font-semibold text-xs flex items-center justify-center gap-1 hover:bg-gray-200"
                  onClick={handlePlayClick}
                >
                  <Play className="h-3 w-3 fill-black" />
                </button>
                <button
                  className="bg-[var(--background-secondary)]/90 backdrop-blur text-white p-2 rounded hover:bg-[var(--background-tertiary)] border border-white/20"
                  onClick={handleMoreInfoClick}
                >
                  <Info className="h-3 w-3" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-gray-300">
                <span className="text-[var(--success)] font-bold">{matchScore}%</span>
                <span className="border border-gray-500 px-1 rounded">{ageRating}</span>
                <span className="border border-gray-500 px-1 rounded">HD</span>
              </div>
            </div>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-[var(--text-primary)] font-medium text-center line-clamp-1 group-hover:text-white">
            {title}
          </p>
        </div>
        <MovieModal movie={movie} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    );
  }

  // Top 10 variant with large gradient number badge
  if (variant === "top10" && rank) {
    return (
      <>
        <Link
          to={`/movies/${movie.id}`}
          // href={movie.id ? `/${isTvShow ? "tv" : "movie"}/${movie.id}` : "#"}
          className="relative group cursor-pointer block"
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
          onClick={handleLinkClick}
        >
          {/* Large Number Badge */}
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

          {/* Image */}
          <div className="relative aspect-[2/3] overflow-hidden rounded">
            <img
              src={posterUrl}
              alt={title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>
          </div>
        </Link>
        <MovieModal
          movie={movie}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  // New Release variant with NEW badge and date
  if (variant === "newRelease") {
    return (
      <>
        <a
          href={movie.id ? `/${isTvShow ? "tv" : "movie"}/${movie.id}` : "#"}
          className="group cursor-pointer block"
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
          onClick={handleLinkClick}
        >
          <div className="relative aspect-[2/3] overflow-hidden rounded mb-2">
            <img
              src={posterUrl}
              alt={title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* NEW Badge */}
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              NEW
            </div>
            {/* Rating Badge */}
            {ratingValue && (
              <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                {ratingValue}
              </div>
            )}
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-center px-4">
                <p className="text-white text-sm font-semibold line-clamp-2">{title}</p>
              </div>
            </div>
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
        </a>
        <MovieModal movie={movie} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    );
  }

  // Award Winner variant with gold border and award badge
  if (variant === "awardWinner") {
    return (
      <>
        <a
          href={movie.id ? `/${isTvShow ? "tv" : "movie"}/${movie.id}` : "#"}
          className="group cursor-pointer relative block"
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
          onClick={handleLinkClick}
        >
          {/* Award Badge */}
          <div className="absolute -top-2 -right-2 z-10 bg-yellow-500 rounded-full p-2 shadow-lg">
            <Award className="w-4 h-4 md:w-5 md:h-5 text-black" />
          </div>
          {/* Poster */}
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg border-2 border-yellow-500/30 group-hover:border-yellow-500 transition-colors duration-300">
            <img
              src={posterUrl}
              alt={title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-in-out"
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
        </a>
        <MovieModal movie={movie} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    );
  }

  // Recommendation variant (Because You Watched)
  if (variant === "recommendation") {
    return (
      <>
        <a
          href={movie.id ? `/${isTvShow ? "tv" : "movie"}/${movie.id}` : "#"}
          className="group cursor-pointer block"
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
          onClick={handleLinkClick}
        >
          <div className="relative aspect-[2/3] overflow-hidden rounded mb-2">
            <img
              src={posterUrl}
              alt={title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Hover Overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-in-out"
              style={{ opacity: isHovered ? 1 : 0 }}
            >
              <div className="absolute bottom-2 left-2 right-2">
                <div className="flex items-center justify-between">
                  {matchPercentage && (
                    <span className="text-xs font-bold text-green-400">
                      {matchPercentage}% Match
                    </span>
                  )}
                  <Info className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-xs md:text-sm text-gray-300 group-hover:text-white transition-colors line-clamp-2">
            {title}
          </h3>
        </a>
        <MovieModal movie={movie} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    );
  }

  // Standard Netflix Card with optional badges
  return (
    <>
      <div
        className="relative group cursor-pointer rounded-md overflow-hidden shadow-lg bg-[var(--background-secondary)]"
        onMouseEnter={handleCardMouseEnter}
        onMouseLeave={handleCardMouseLeave}
        onClick={handleNavigate}
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          {/* Rank Badge (for trending top 10) */}
          {rank && (
            <div className="absolute top-0 left-0 z-30 bg-gradient-to-br from-orange-500 to-red-600 text-white w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-bold text-base sm:text-lg rounded-full shadow-lg border-2 border-[var(--background-primary)]">
              #{rank}
            </div>
          )}

          {/* Custom Badges */}
          {showBadge && badgeType === "trending" && (
            <div className="absolute top-2 left-2 z-20 bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-lg">
              <Flame className="h-2.5 w-2.5 fill-white" />
              TRENDING
            </div>
          )}
          {showBadge && badgeType === "award" && (
            <div className="absolute top-2 left-2 z-20 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg text-xs font-bold">
              <Award className="h-3 w-3" />
              Award
            </div>
          )}
          {showBadge && badgeType === "live" && (
            <div className="absolute top-2 left-2 z-20 bg-green-600 text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-lg">
              <Tv className="h-2.5 w-2.5" />
              LIVE
            </div>
          )}
          {showBadge && badgeType === "onair" && (
            <div className="absolute top-2 left-2 z-20 bg-pink-600 text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-lg animate-pulse">
              <Radio className="h-2.5 w-2.5" />
              ON AIR
            </div>
          )}
          {showBadge && badgeType === "calendar" && (
            <div className="absolute top-2 left-2 z-20 bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-lg">
              <Calendar className="h-2.5 w-2.5" />
              SOON
            </div>
          )}

          {/* Poster Image */}
          <img
            src={posterUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="eager"
          />

          {/* Match Score Badge */}
          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1 z-10">
            <span className="text-[var(--success)] text-xs font-bold">{matchScore}%</span>
          </div>

          {/* Hover Overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 transition-opacity duration-300 ease-in-out"
            style={{ opacity: isHovered ? 1 : 0, pointerEvents: isHovered ? 'auto' : 'none' }}
          >
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="text-white text-sm font-bold mb-3 line-clamp-2 drop-shadow-lg">
                {title}
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <button
                  className="flex-1 bg-white text-black py-2 px-3 rounded-md font-semibold text-xs flex items-center justify-center gap-1 hover:bg-gray-200 transition-colors"
                  onClick={handlePlayClick}
                >
                  <Play className="h-3 w-3 fill-black" />
                  Play
                </button>
                <button
                  className="bg-[var(--background-secondary)]/90 backdrop-blur-sm text-white py-2 px-3 rounded-md font-semibold text-xs flex items-center justify-center gap-1 hover:bg-[var(--background-tertiary)] transition-colors border border-white/20"
                  onClick={handleMoreInfoClick}
                >
                  <Info className="h-3 w-3" />
                  Info
                </button>
                <button
                  className="bg-[var(--background-secondary)]/90 backdrop-blur-sm text-white p-2 rounded-md hover:bg-[var(--background-tertiary)] transition-colors border border-white/20"
                >
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="text-[var(--success)] font-bold">{matchScore}% Match</span>
                <span className="text-gray-300">{year}</span>
                <span className="border border-gray-500 px-1 rounded text-gray-300">{ageRating}</span>
                <span className="border border-gray-500 px-1 rounded text-gray-300">HD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MovieModal movie={movie} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
});

export default Card;

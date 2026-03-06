import { useState, useCallback, useMemo, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMatchScore, getYear, getAgeRating } from "@/utils/movieHelpers";
import MovieModal from "@/components/shared/MovieModal";
import type { HeroMedia } from "@/types";

// Sub-components
import CardPoster from "./CardPoster";
import CardHoverOverlay from "./CardHoverOverlay";
import CardBadges from "./CardBadges";
import CardMetadata from "./CardMetadata";
import {
  Top10Badge,
  NewReleaseLayout,
  AwardWinnerLayout,
  RecommendationLayout,
} from "./CardVariantLayouts";

export interface CardProps {
  movie: HeroMedia;
  variant?: "standard" | "compact" | "top10" | "newRelease" | "awardWinner" | "recommendation";
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

  // Determine if it's a TV show using media_type or first_air_date
  const isTvShow = useMemo(() => {
    if ("media_type" in movie && movie.media_type) {
      return movie.media_type === "tv";
    }
    return "first_air_date" in movie;
  }, [movie]);

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
                  <span className="sr-only">Play</span>
                  <svg className="h-3 w-3 fill-black" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <button
                  className="bg-[var(--background-secondary)]/90 backdrop-blur text-white p-2 rounded hover:bg-[var(--background-tertiary)] border border-white/20"
                  onClick={handleMoreInfoClick}
                >
                  <span className="sr-only">More info</span>
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                </button>
              </div>
              <CardMetadata
                matchScore={matchScore}
                ageRating={ageRating}
                variant="compact"
              />
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
          className="relative group cursor-pointer block"
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
          onClick={handleLinkClick}
        >
          <Top10Badge rank={rank} />
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
          <NewReleaseLayout
            movie={movie}
            title={title}
            posterUrl={posterUrl}
            ratingValue={ratingValue ?? undefined}
            formattedReleaseDate={formattedReleaseDate ?? undefined}
            isHovered={isHovered}
          />
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
          <AwardWinnerLayout
            movie={movie}
            title={title}
            posterUrl={posterUrl}
            ratingValue={ratingValue ?? undefined}
            isHovered={isHovered}
          />
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
          <RecommendationLayout
            movie={movie}
            title={title}
            posterUrl={posterUrl}
            matchPercentage={matchPercentage ?? undefined}
            isHovered={isHovered}
          />
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
        <CardPoster movie={movie} title={title} rank={rank}>
          <CardBadges
            showBadge={showBadge}
            badgeType={badgeType}
            showMatchScore
            matchScore={matchScore}
          />
          <CardHoverOverlay
            title={title}
            matchScore={matchScore}
            year={year}
            ageRating={ageRating}
            isHovered={isHovered}
            onPlay={handlePlayClick}
            onMoreInfo={handleMoreInfoClick}
          />
        </CardPoster>
      </div>
      <MovieModal movie={movie} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
});

export default Card;

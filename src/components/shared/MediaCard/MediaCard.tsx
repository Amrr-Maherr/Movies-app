import { memo, useState, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { HeroMedia } from "@/types";
import OptimizedImage from "@/components/ui/OptimizedImage";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { getMatchScore, getYear, getAgeRating } from "@/utils/movieHelpers";
import { getLocalizedLink } from "@/lib/utils/i18n";
import { useMovieModal } from "@/shared/contexts/MovieModalContext";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToList, removeFromList, selectIsInList } from "@/features/my-list/store/listSlice";
import MediaBadge from "./MediaBadge";
import MediaCardOverlay from "./MediaCardOverlay";

export interface MediaCardProps {
  movie: HeroMedia;
  rank?: number;
  mediaType?: "movie" | "tv";
}

function getTitle(media: HeroMedia): string {
  return "title" in media ? media.title : media.name;
}

function getReleaseDate(media: HeroMedia): string {
  return "release_date" in media ? media.release_date : media.first_air_date;
}

function isTvShow(media: HeroMedia): boolean {
  if ("media_type" in media && media.media_type) {
    return media.media_type === "tv";
  }
  return "first_air_date" in media;
}

const MediaCard = memo(function MediaCard({ movie, rank, mediaType }: MediaCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { openModal } = useMovieModal();
  const dispatch = useAppDispatch();

  const isInList = useAppSelector((state) =>
    selectIsInList(state, movie.id),
  );

  const title = useMemo(() => getTitle(movie), [movie]);
  const releaseDate = useMemo(() => getReleaseDate(movie), [movie]);
  const tvShow = useMemo(() => mediaType === "tv" || isTvShow(movie), [movie, mediaType]);

  const posterUrl = useMemo(
    () =>
      movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image",
    [movie.poster_path],
  );

  const slug = useMemo(
    () =>
      title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-")
        .trim(),
    [title],
  );
  const detailsUrl = useMemo(
    () => getLocalizedLink(`/${tvShow ? "series" : "movie"}/${slug}/${movie.id}`),
    [movie.id, tvShow, slug],
  );

  const matchScore = useMemo(() => getMatchScore(movie.vote_average), [movie.vote_average]);
  const year = useMemo(() => getYear(releaseDate), [releaseDate]);
  const ageRating = useMemo(() => getAgeRating(movie.vote_average), [movie.vote_average]);
  const isAdult = movie.adult === true;

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const handlePlay = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (detailsUrl) navigate(detailsUrl);
    },
    [navigate, detailsUrl],
  );

  const handleMoreInfo = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      openModal(movie);
    },
    [openModal, movie],
  );

  const handleToggleList = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (isInList) {
        dispatch(removeFromList(movie.id));
      } else {
        dispatch(addToList(movie));
      }
    },
    [dispatch, movie, isInList],
  );

  return (
    <LazyWrapper height={350}>
      <motion.div
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="h-full w-full"
      >
        <Link
          to={detailsUrl}
          className="relative group cursor-pointer block"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {rank && (
            <div className="absolute -left-2 md:-left-4 -bottom-2 md:-bottom-3 z-10">
              <span
                className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-black"
                style={{ WebkitTextStroke: "2px #ddd" }}
              >
                {rank}
              </span>
            </div>
          )}

          <div className="relative aspect-[2/3] rounded-md shadow-lg bg-[var(--background-secondary)]">
            <OptimizedImage
              src={posterUrl}
              alt={title}
              className={`w-full h-full transition-all duration-300 ${
                isAdult ? "blur-md" : ""
              }`}
              objectFit="cover"
            />

            {isAdult && <div className="absolute inset-0 bg-black/60" />}

            {!rank && (
              <MediaBadge
                isAdult={isAdult}
                matchScore={matchScore}
                showMatchScore={!isAdult}
              />
            )}

            <MediaCardOverlay
              title={title}
              matchScore={matchScore}
              year={year}
              ageRating={ageRating}
              isHovered={isHovered}
              isInList={isInList}
              onPlay={handlePlay}
              onMoreInfo={handleMoreInfo}
              onToggleList={handleToggleList}
            />
          </div>

          <p className="mt-2 text-xs sm:text-sm text-[var(--text-primary)] font-medium text-center line-clamp-1 group-hover:text-white transition-colors">
            {title}
          </p>
        </Link>
      </motion.div>
    </LazyWrapper>
  );
});

export default MediaCard;

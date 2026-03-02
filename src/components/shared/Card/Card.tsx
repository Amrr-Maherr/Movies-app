import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Info, ChevronDown, Tv, Flame, Award, Calendar, Radio } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getMatchScore, getYear, getAgeRating } from "@/utils/movieHelpers";
import MovieModal from "@/components/shared/MovieModal";
import type { HeroMedia } from "@/types";

export interface CardProps {
  movie: HeroMedia;
  variant?: "standard" | "compact" | "trending" | "award" | "airing" | "onair" | "upcoming";
  rank?: number;
  onClick?: () => void;
  showBadge?: boolean;
  badgeType?: "trending" | "award" | "live" | "onair" | "calendar";
}

const getTitle = (media: HeroMedia) => {
  return "title" in media ? media.title : media.name;
};

const getReleaseDate = (media: HeroMedia) => {
  return "release_date" in media ? media.release_date : media.first_air_date;
};

export default function Card({ 
  movie, 
  variant = "standard", 
  rank,
  onClick,
  showBadge = false,
  badgeType 
}: CardProps) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const matchScore = getMatchScore(movie.vote_average);
  const year = getYear(getReleaseDate(movie));
  const ageRating = getAgeRating(movie.vote_average);
  const title = getTitle(movie);

  // Navigate to details page
  const handleNavigate = () => {
    const isTvShow = "first_air_date" in movie;
    if (onClick) {
      onClick();
    } else {
      navigate(`/${isTvShow ? "tv" : "movie"}/${movie.id}`);
    }
  };

  const handleMoreInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    handleNavigate();
  };

  // Compact variant for dense grids
  if (variant === "compact") {
    return (
      <>
        <motion.div
          className="relative group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ y: -8, scale: 1.08 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={handleNavigate}
        >
          <div className="relative aspect-[2/3] rounded-md overflow-hidden shadow-lg bg-[var(--background-secondary)]">
            <img
              src={posterUrl}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded">
              <span className="text-[var(--success)] text-xs font-bold">{matchScore}%</span>
            </div>
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-3"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <motion.button
                      className="flex-1 bg-white text-black py-2 rounded font-semibold text-xs flex items-center justify-center gap-1 hover:bg-gray-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePlayClick}
                    >
                      <Play className="h-3 w-3 fill-black" />
                    </motion.button>
                    <motion.button
                      className="bg-[var(--background-secondary)]/90 backdrop-blur text-white p-2 rounded hover:bg-[var(--background-tertiary)] border border-white/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleMoreInfoClick}
                    >
                      <Info className="h-3 w-3" />
                    </motion.button>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-300">
                    <span className="text-[var(--success)] font-bold">{matchScore}%</span>
                    <span className="border border-gray-500 px-1 rounded">{ageRating}</span>
                    <span className="border border-gray-500 px-1 rounded">HD</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-[var(--text-primary)] font-medium text-center line-clamp-1 group-hover:text-white">
            {title}
          </p>
        </motion.div>
        <MovieModal movie={movie} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    );
  }

  // Standard Netflix Card with optional badges
  return (
    <>
      <motion.div
        className="relative group cursor-pointer rounded-md overflow-hidden shadow-lg bg-[var(--background-secondary)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, zIndex: 20, boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
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
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
            loading="lazy"
          />

          {/* Match Score Badge */}
          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1 z-10">
            <span className="text-[var(--success)] text-xs font-bold">{matchScore}%</span>
          </div>

          {/* Hover Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"
              >
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-white text-sm font-bold mb-3 line-clamp-2 drop-shadow-lg">
                    {title}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <motion.button
                      className="flex-1 bg-white text-black py-2 px-3 rounded-md font-semibold text-xs flex items-center justify-center gap-1 hover:bg-gray-200 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePlayClick}
                    >
                      <Play className="h-3 w-3 fill-black" />
                      Play
                    </motion.button>
                    <motion.button
                      className="bg-[var(--background-secondary)]/90 backdrop-blur-sm text-white py-2 px-3 rounded-md font-semibold text-xs flex items-center justify-center gap-1 hover:bg-[var(--background-tertiary)] transition-colors border border-white/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleMoreInfoClick}
                    >
                      <Info className="h-3 w-3" />
                      Info
                    </motion.button>
                    <motion.button
                      className="bg-[var(--background-secondary)]/90 backdrop-blur-sm text-white p-2 rounded-md hover:bg-[var(--background-tertiary)] transition-colors border border-white/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronDown className="h-3 w-3" />
                    </motion.button>
                  </div>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-[var(--success)] font-bold">{matchScore}% Match</span>
                    <span className="text-gray-300">{year}</span>
                    <span className="border border-gray-500 px-1 rounded text-gray-300">{ageRating}</span>
                    <span className="border border-gray-500 px-1 rounded text-gray-300">HD</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      <MovieModal movie={movie} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

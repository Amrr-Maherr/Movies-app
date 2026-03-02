import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Plus, ThumbsUp } from "lucide-react";
import { Dialog, DialogContent, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { getMatchScore, getYear, getAgeRating, getGenres } from "@/utils/movieHelpers";
import type { HeroMedia } from "@/types";

interface MovieModalProps {
  movie: HeroMedia | null;
  isOpen: boolean;
  onClose: () => void;
}

const backdropUrl = (backdropPath: string | null) => {
  return backdropPath
    ? `https://image.tmdb.org/t/p/original${backdropPath}`
    : "https://via.placeholder.com/1920x1080?text=No+Image";
};

const posterUrl = (posterPath: string | null) => {
  return posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : "https://via.placeholder.com/500x750?text=No+Image";
};

export default function MovieModal({ movie, isOpen, onClose }: MovieModalProps) {
  if (!movie) return null;

  const matchScore = getMatchScore(movie.vote_average);
  const year = getYear("release_date" in movie ? movie.release_date : movie.first_air_date);
  const ageRating = getAgeRating(movie.vote_average);
  const title = "title" in movie ? movie.title : movie.name;
  const genres = getGenres(movie.genre_ids);

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <DialogPortal>
            <DialogOverlay className="bg-black/80 backdrop-blur-sm" />
            <DialogContent
              className="sm:max-w-4xl max-w-[95vw] p-0 bg-[var(--background-primary)] border-none overflow-hidden"
              showCloseButton={false}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Background Image with Gradient */}
                <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
                  <img
                    src={backdropUrl(movie.backdrop_path)}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-primary)] via-[var(--background-primary)]/50 to-transparent" />
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-50 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Content */}
                <div className="relative px-6 pb-6 -mt-32 sm:-mt-40 md:-mt-48">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Poster */}
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      <img
                        src={posterUrl(movie.poster_path)}
                        alt={title}
                        className="w-48 sm:w-56 rounded-lg shadow-2xl border border-white/10"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center sm:text-left pt-4 sm:pt-32 md:pt-40">
                      {/* Title */}
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                        {title}
                      </h2>

                      {/* Meta Row */}
                      <div className="flex items-center justify-center sm:justify-start gap-3 mb-4 flex-wrap">
                        {/* Match Score */}
                        <span className="text-[var(--success)] text-sm font-bold">
                          {matchScore}% Match
                        </span>

                        {/* Year */}
                        <span className="text-[var(--text-secondary)] text-sm">
                          {year}
                        </span>

                        {/* Age Rating */}
                        <span className="border border-[var(--text-muted)] px-2 py-0.5 text-[var(--text-secondary)] text-xs font-medium uppercase">
                          {ageRating}
                        </span>

                        {/* HD Badge */}
                        <span className="border border-[var(--text-muted)] px-2 py-0.5 text-[var(--text-secondary)] text-xs font-medium">
                          HD
                        </span>
                      </div>

                      {/* Genres */}
                      {genres.length > 0 && (
                        <div className="flex items-center justify-center sm:justify-start gap-2 mb-4 flex-wrap">
                          {genres.map((genre) => (
                            <span
                              key={genre}
                              className="bg-[var(--background-secondary)] text-[var(--text-primary)] px-3 py-1 rounded-full text-xs"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Overview */}
                      <p className="text-[var(--text-primary)] text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                        {movie.overview || "No description available."}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-center sm:justify-start gap-3 flex-wrap">
                        {/* Play Button */}
                        <motion.button
                          className="bg-white text-black px-6 py-3 rounded-md font-semibold text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Play className="h-4 w-4 fill-black" />
                          Play
                        </motion.button>

                        {/* Add to List Button */}
                        <motion.button
                          className="bg-[var(--background-secondary)]/80 backdrop-blur-sm text-white px-6 py-3 rounded-md font-semibold text-sm flex items-center gap-2 hover:bg-[var(--background-tertiary)] transition-colors border border-white/20"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Plus className="h-4 w-4" />
                          My List
                        </motion.button>

                        {/* Rate Button */}
                        <motion.button
                          className="bg-[var(--background-secondary)]/80 backdrop-blur-sm text-white px-4 py-3 rounded-md font-semibold text-sm flex items-center gap-2 hover:bg-[var(--background-tertiary)] transition-colors border border-white/20"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

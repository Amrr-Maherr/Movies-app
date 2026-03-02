import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";
import type { Movie } from "@/types";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const rating = Math.round(movie.vote_average * 10);

  return (
    <motion.div
      className="relative group cursor-pointer rounded-md overflow-hidden bg-[var(--background-secondary)] shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
          <span className="text-[var(--success)] text-xs font-bold">{rating}%</span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          {/* Title */}
          <h3 className="text-white text-sm font-bold mb-3 line-clamp-2 drop-shadow-lg">
            {movie.title}
          </h3>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Play Button */}
            <motion.button
              className="flex-1 bg-white text-black py-2 px-3 rounded-md font-semibold text-xs flex items-center justify-center gap-1 hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="h-3 w-3 fill-black" />
              Play
            </motion.button>

            {/* More Info Button */}
            <motion.button
              className="flex-1 bg-[var(--background-secondary)]/80 backdrop-blur-sm text-white py-2 px-3 rounded-md font-semibold text-xs flex items-center justify-center gap-1 hover:bg-[var(--background-tertiary)] transition-colors border border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Info className="h-3 w-3" />
              More Info
            </motion.button>
          </div>

          {/* Meta Info */}
          <div className="mt-3 flex items-center gap-2 text-[10px] text-gray-300">
            <span>{movie.release_date?.split("-")[0]}</span>
            <span>•</span>
            <span className="border border-gray-500 px-1 rounded">HD</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

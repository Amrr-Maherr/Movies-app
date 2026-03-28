import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import OptimizedImage from "@/components/ui/OptimizedImage";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import CardMetadata from "@/components/shared/Card/CardMetadata";
import { useMovieDerivedValues } from "../hooks/useCardDerivedValues";
import { useCardActions } from "../hooks/useCardActions";
import type { CardProps } from "../types";

type CompactCardProps = Pick<CardProps, "movie" | "onClick" | "matchPercentageProp">;

const CompactCard = memo(({ movie, onClick, matchPercentageProp }: CompactCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { title, posterUrl, matchScore, ageRating, detailsUrl } =
    useMovieDerivedValues(movie, matchPercentageProp);
  const { handlePlayClick, handleMoreInfoClick } = useCardActions(detailsUrl, movie, onClick);

  if (!movie) return null;
  const isAdult = movie.adult === true;

  return (
    <LazyWrapper height={350}>
      <motion.div transition={{ duration: 0.3, ease: "easeOut" }} className="h-full w-full">
        <Link
          to={detailsUrl}
          className="relative group cursor-pointer block"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative aspect-[2/3] rounded-md shadow-lg bg-[var(--background-secondary)]">
            <OptimizedImage
              src={posterUrl}
              alt={title}
              className={`w-full h-full transition-all duration-300 ${isAdult ? "blur-md" : ""}`}
              objectFit="cover"
            />
            {isAdult && <div className="absolute inset-0 bg-black/60" />}
            {isAdult && (
              <div className="absolute top-2 right-2 z-30 bg-red-700/95 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded shadow-lg border border-red-500/50">
                +18
              </div>
            )}
            {!isAdult && (
              <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded">
                <span className="text-[var(--success)] text-xs font-bold">{matchScore}%</span>
              </div>
            )}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-3 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
              style={{ pointerEvents: isHovered ? "auto" : "none" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <button
                  className="flex-1 bg-white text-black min-h-[48px] rounded font-semibold text-xs flex items-center justify-center gap-2 hover:bg-gray-200 touch-manipulation"
                  onClick={handlePlayClick}
                  aria-label={`Play ${title}`}
                >
                  <svg className="h-4 w-4 fill-black" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <button
                  className="min-w-[48px] min-h-[48px] bg-[var(--background-secondary)]/90 backdrop-blur text-white rounded hover:bg-[var(--background-tertiary)] border border-white/20 touch-manipulation flex items-center justify-center"
                  onClick={handleMoreInfoClick}
                  aria-label={`More information about ${title}`}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                </button>
              </div>
              <CardMetadata matchScore={matchScore} ageRating={ageRating} variant="compact" />
            </div>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-[var(--text-primary)] font-medium text-center line-clamp-1 group-hover:text-white transition-colors">
            {title}
          </p>
        </Link>
      </motion.div>
    </LazyWrapper>
  );
});

CompactCard.displayName = "CompactCard";
export default CompactCard;

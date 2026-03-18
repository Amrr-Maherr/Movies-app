import { Link } from "react-router-dom";
import { memo } from "react";
import { Film } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";

interface MovieCardProps {
  id: number;
  title: string;
  poster_path?: string | null;
  release_date?: string;
  vote_average?: number;
}

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/original";

const MovieCard = memo(function MovieCard({
  id,
  title,
  poster_path,
  release_date,
  vote_average,
}: MovieCardProps) {
  const year = release_date
    ? new Date(release_date).getFullYear()
    : "TBA";

  const rating = vote_average ? vote_average.toFixed(1) : "N/A";

  return (
    <Link
      to={`/movie/${id}`}
      className="group cursor-pointer block"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-[#1a1a1a] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
        {poster_path ? (
          <OptimizedImage
            src={`${POSTER_BASE_URL}${poster_path}`}
            alt={title}
            className="w-full h-full"
            objectFit="cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#333]">
            <Film className="w-12 h-12 text-[#555]" />
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-sm font-medium px-2 text-center">
            View Details
          </span>
        </div>
      </div>

      {/* Movie Info */}
      <div className="mt-2 md:mt-3">
        <h3 className="text-xs md:text-sm text-white font-medium line-clamp-2 group-hover:text-[var(--netflix-red)] transition-colors">
          {title}
        </h3>
        <div className="flex items-center justify-between mt-1 text-[#737373] text-xs">
          <span>{year}</span>
          <span className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            {rating}
          </span>
        </div>
      </div>
    </Link>
  );
});

export default MovieCard;

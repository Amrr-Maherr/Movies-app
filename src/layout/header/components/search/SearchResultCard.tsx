import { Movie, TvShow } from "@/types/movies";
import { cn } from "@/lib/utils";
import { getPosterUrl, IMAGE_SIZES } from "@/utils/tmdb";

interface SearchResultCardProps {
  item: Movie | TvShow;
  type: "movie" | "tv";
  onClick: () => void;
}

export default function SearchResultCard({
  item,
  type,
  onClick,
}: SearchResultCardProps) {
  const isMovie = type === "movie";
  const title = isMovie ? (item as Movie).title : (item as TvShow).name;
  const posterPath = item.poster_path;
  const releaseDate = isMovie
    ? (item as Movie).release_date
    : (item as TvShow).first_air_date;
  const year = releaseDate?.split("-")[0] || "N/A";
  const voteAverage = item.vote_average;

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-2 rounded-md cursor-pointer",
        "hover:bg-white/10 transition-colors duration-200",
        "group"
      )}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Poster Thumbnail */}
      <div className="relative w-12 h-16 flex-shrink-0 overflow-hidden rounded">
        {posterPath ? (
          <img
            src={getPosterUrl(posterPath, IMAGE_SIZES.POSTER_SMALL) || ""}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <span className="text-gray-500 text-xs">No Image</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-medium text-sm truncate group-hover:text-[var(--netflix-red)] transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
          <span className="uppercase">{isMovie ? "Movie" : "TV Show"}</span>
          <span>•</span>
          <span>{year}</span>
          {voteAverage > 0 && (
            <>
              <span>•</span>
              <span className="text-green-500">{Math.round(voteAverage * 10)}% match</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

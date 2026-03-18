import { Movie, TvShow } from "@/types/movies";
import { cn } from "@/lib/utils";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { getPosterUrl, IMAGE_SIZES } from "@/utils/tmdb";
import type { MultiSearchResult } from "@/services/searchService";

interface SearchResultCardProps {
  item: Movie | TvShow | MultiSearchResult;
  type: "movie" | "tv" | "person";
  onClick: () => void;
}

export default function SearchResultCard({
  item,
  type,
  onClick,
}: SearchResultCardProps) {
  const isMovie = type === "movie";
  const isPerson = type === "person";

  const title = isMovie
    ? (item as Movie).title
    : isPerson
      ? (item as MultiSearchResult).name
      : (item as TvShow).name;

  const posterPath = isPerson
    ? (item as MultiSearchResult).profile_path
    : (item as Movie | TvShow).poster_path;

  const releaseDate = isPerson
    ? undefined
    : isMovie
      ? (item as Movie).release_date
      : (item as TvShow).first_air_date;

  const year = isPerson ? "Person" : releaseDate?.split("-")[0] || "N/A";

  const voteAverage = isPerson ? 0 : (item as Movie | TvShow).vote_average;

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-2 rounded-md cursor-pointer",
        "hover:bg-white/10 transition-colors duration-200",
        "group",
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
      {/* Poster/Profile Thumbnail */}
      <div className="relative w-12 h-16 flex-shrink-0 overflow-hidden rounded">
        {posterPath ? (
          <OptimizedImage
            src={getPosterUrl(posterPath, IMAGE_SIZES.POSTER_SMALL) || ""}
            alt={title}
            className="w-full h-full"
            objectFit="cover"
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
          <span className="uppercase">
            {isPerson ? "Person" : isMovie ? "Movie" : "TV Show"}
          </span>
          {!isPerson && (
            <>
              <span>•</span>
              <span>{year}</span>
              {voteAverage > 0 && (
                <>
                  <span>•</span>
                  <span className="text-green-500">
                    {Math.round(voteAverage * 10)}% match
                  </span>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

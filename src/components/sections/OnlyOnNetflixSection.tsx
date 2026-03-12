import { memo, useMemo } from "react";
import { Sparkles } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import OptimizedImage from "@/components/ui/OptimizedImage";
import type { HeroMedia } from "@/types";

interface OnlyOnNetflixSectionProps {
  movies: HeroMedia[];
  mediaType: "movie" | "tv";
}

// Memoized OnlyOnNetflixSection component - avoids re-renders when parent updates
const OnlyOnNetflixSection = memo(function OnlyOnNetflixSection({
  movies,
  mediaType,
}: OnlyOnNetflixSectionProps) {
  // Memoized: Get first 5 items with pre-calculated values - avoids array slicing on every render
  const items = useMemo(() => {
    return movies.slice(0, 5).map((movie) => ({
      movie,
      imageUrl: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
        : movie.poster_path
          ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
          : "/Netflix_Symbol_RGB.png",
      detailsUrl:
        mediaType === "movie" ? `/movie/${movie.id}` : `/tv/${movie.id}`,
      movieTitle: "title" in movie ? movie.title : movie.name,
    }));
  }, [movies, mediaType]);

  return (
    <div className="py-6 md:py-8">
      <div className="container">
        <SectionHeader
          title="Only on Netflix"
          icon={Sparkles}
          iconColor="text-red-600"
        />

        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {items.map(({ movie, imageUrl, detailsUrl, movieTitle }, index) => (
            <a href={detailsUrl} key={movie.id}>
              <div
                className={`group cursor-pointer bg-zinc-900 rounded-lg overflow-hidden ${index === 0 ? "md:col-span-2" : ""}`}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative w-full md:w-2/5 aspect-video md:aspect-auto">
                    <OptimizedImage
                      src={imageUrl}
                      alt={movieTitle}
                      className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                      objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-900/50 md:to-zinc-900" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 md:p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                        Netflix Original
                      </span>
                      <span className="text-xs text-gray-400">
                        {mediaType === "movie" ? "Film" : "Series"}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-2xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors">
                      {movieTitle}
                    </h3>

                    {movie.overview && (
                      <p className="text-sm md:text-base text-gray-400 line-clamp-2 md:line-clamp-3">
                        {movie.overview}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});

export default OnlyOnNetflixSection;

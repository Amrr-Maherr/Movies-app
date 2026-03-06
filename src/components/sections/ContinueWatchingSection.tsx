import { memo, useMemo, useState } from "react";
import { Play } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import type { HeroMedia } from "@/types";

interface ContinueWatchingSectionProps {
  movies: HeroMedia[];
  title?: string;
  mediaType: "movie" | "tv";
}

// Memoized ContinueWatchingSection component - avoids re-renders when parent updates
const ContinueWatchingSection = memo(function ContinueWatchingSection({
  movies,
  title = "Continue Watching",
  mediaType,
}: ContinueWatchingSectionProps) {
  // State for progress bars (random values generated once)
  const [progressValues] = useState(() =>
    Array.from({ length: 6 }, () => Math.random() * 60 + 20),
  );

  // Memoized: Get first 6 items with pre-calculated values
  const items = useMemo(() => {
    return movies.slice(0, 6).map((movie, index) => ({
      movie,
      imageUrl: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
        : movie.poster_path
          ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
          : "/Netflix_Symbol_RGB.png",
      detailsUrl:
        mediaType === "movie" ? `/movie/${movie.id}` : `/tv/${movie.id}`,
      movieTitle: "title" in movie ? movie.title : movie.name,
      progress: progressValues[index] || 50,
    }));
  }, [movies, mediaType, progressValues]);

  return (
    <div className="py-6 md:py-8">
      <div className="container">
        <SectionHeader title={title} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {items.map(({ movie, imageUrl, detailsUrl, movieTitle, progress }) => (
            <a href={detailsUrl} key={movie.id}>
              <div className="group cursor-pointer bg-zinc-900 rounded overflow-hidden">
                {/* Image with Progress Bar */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={movieTitle}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Play Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/50 transition-colors duration-300">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-white ml-1" />
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                    <div
                      className="h-full bg-red-600"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="p-3 md:p-4">
                  <h3 className="text-sm md:text-base text-white font-medium line-clamp-1">
                    {movieTitle}
                  </h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});

export default ContinueWatchingSection;

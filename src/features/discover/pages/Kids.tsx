import { memo, useMemo } from "react";
import type { HeroMedia } from "@/types";
import HelmetMeta from "@/components/shared/HelmetMeta";
import MediaHeroSection from "@/components/shared/MediaHeroSection";
import MediaRow from "@/components/shared/MediaRow";
import { PageSkeleton } from "@/components/ui";
import useKidsMovies from "@/features/discover/hooks/FetchKidsMovies";

const Kids = memo(function Kids() {
  const { data: movies, isLoading, error, refetch } = useKidsMovies(1);

  const featuredMovie = useMemo(
    () =>
      (movies?.[0] ?? null) as unknown as HeroMedia | null,
    [movies],
  );

  const movieItems = useMemo(
    () => (movies || []) as unknown as HeroMedia[],
    [movies],
  );

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error || !movies || movies.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
        <p className="text-xl text-[var(--error)] font-medium mb-4">
          Failed to load kids movies. Please try again.
        </p>
        <button
          onClick={() => refetch()}
          className="px-6 py-3 bg-white text-black font-semibold rounded hover:bg-white/80 transition-colors min-h-[48px]"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <HelmetMeta
        name="Kids"
        description="Discover movies that are perfect for the whole family."
      />

      {featuredMovie && <MediaHeroSection item={featuredMovie} />}

      <div className="pb-12 md:pb-16 space-y-2">
        {movieItems.length > 0 && (
          <MediaRow title="Kids Movies" items={movieItems} />
        )}
      </div>
    </div>
  );
});

export default Kids;

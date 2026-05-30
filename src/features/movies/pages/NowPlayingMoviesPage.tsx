import { memo, useMemo } from "react";
import type { HeroMedia } from "@/types";
import HelmetMeta from "@/components/shared/HelmetMeta";
import MediaHeroSection from "@/components/shared/MediaHeroSection";
import MediaRow from "@/components/shared/MediaRow";
import { PageSkeleton } from "@/components/ui";
import { useNowPlayingMoviesQuery } from "@/hooks/shared";

const NowPlayingMoviesPage = memo(function NowPlayingMoviesPage() {
  const { data: movies, isLoading, error, refetch } = useNowPlayingMoviesQuery(1);

  const featuredMovie = useMemo(
    () =>
      (movies?.results?.[0] ?? null) as unknown as HeroMedia | null,
    [movies],
  );

  const movieItems = useMemo(
    () =>
      ((movies?.results?.slice(0, 20) || []) as unknown as HeroMedia[]),
    [movies],
  );

  const mediaRows = useMemo(() => {
    if (!movies?.results || movies.results.length < 2) return [];
    const rows: { title: string; items: HeroMedia[] }[] = [];
    const all = movies.results as unknown as HeroMedia[];

    if (all.length > 0) {
      rows.push({ title: "Now Playing", items: all.slice(0, 20) });
    }
    if (all.length > 10) {
      rows.push({ title: "More in Theaters", items: all.slice(10, 30) });
    }
    return rows;
  }, [movies]);

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (error || !movies) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
        <p className="text-xl text-[var(--error)] font-medium mb-4">
          Failed to load now playing movies. Please try again.
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
        name="Now Playing in Theaters"
        description="Discover movies currently playing in theaters near you."
      />

      {featuredMovie && <MediaHeroSection item={featuredMovie} />}

      <div className="container pb-12 md:pb-16 space-y-2">
        {mediaRows.map((row) => (
          <MediaRow key={row.title} title={row.title} items={row.items} />
        ))}
        {movieItems.length > 0 && (
          <MediaRow title={`All ${movies.results.length} Movies in Theaters`} items={movieItems} />
        )}
      </div>
    </div>
  );
});

export default NowPlayingMoviesPage;

import { useParams } from "react-router-dom";
import { memo, useMemo, useState } from "react";
import { useTvShowsByGenre, useTvGenres } from "@/queries";
import { SectionSkeleton, Error } from "@/components/ui";
import { Tv } from "lucide-react";
import Card from "@/components/shared/Card/Card";
import Pagination from "@/components/Pagination";
import type { HeroMedia } from "@/types";

const GenreTV = memo(function GenreTV() {
  const { id } = useParams<{ id: string }>();
  const genreId = id ? parseInt(id, 10) : 0;
  const [page, setPage] = useState(1);

  const { data: tvGenres } = useTvGenres();
  const { data: tvData, isLoading, error } = useTvShowsByGenre(genreId, page);

  const genreName = useMemo(() => {
    if (!tvGenres) return "Genre";
    const genre = tvGenres.find((g) => g.id === genreId);
    return genre?.name || "Genre";
  }, [tvGenres, genreId]);

  const tvShows = useMemo(() => tvData?.results || [], [tvData]);
  const totalPages = useMemo(() => tvData?.total_pages || 1, [tvData]);
  const totalResults = useMemo(() => tvData?.total_results || 0, [tvData]);

  if (isLoading && page === 1) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)]">
        <SectionSkeleton variant="hero" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)] flex items-center justify-center">
        <Error
          message="Failed to load TV shows"
          retryButtonText="Try Again"
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)] pt-20 pb-12">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Tv className="w-8 h-8 text-[var(--netflix-red)]" />
            <h1 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)]">
              {genreName} TV Shows
            </h1>
          </div>
          <p className="text-base text-[var(--text-secondary)]">
            {totalResults} TV shows available
          </p>
        </div>

        {/* TV Shows Grid */}
        {tvShows.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 mb-8">
              {tvShows.map((show: HeroMedia) => (
                <Card key={show.id} movie={show} variant="compact" />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              isLoading={isLoading}
              onPageChange={setPage}
            />
          </>
        ) : (
          <div className="text-center py-12 text-[var(--text-muted)]">
            <Tv className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No TV shows available in this genre</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default GenreTV;

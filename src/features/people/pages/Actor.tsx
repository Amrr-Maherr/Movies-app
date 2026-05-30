import { useState, memo, useMemo, useCallback, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { OptimizedSectionWrapper } from "@/components/optimized-section-wrapper";
import { SectionSkeleton } from "@/components/ui";
import HelmetMeta from "@/components/shared/HelmetMeta";
import Pagination from "@/components/shared/Pagination";
import { ReactQueryErrorState } from "@/components/errors";
import usePopularPeople from "@/features/people/hooks/FetchPopularPeople";
import { TrendingUp } from "lucide-react";
import { getLocalizedLink } from "@/lib/utils/i18n";

const MediaGrid = lazy(() => import("@/components/shared/MediaGrid"));

const ActorsPage = memo(function ActorsPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading, isFetching, error, refetch } =
    usePopularPeople(currentPage);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const allItems = useMemo(() => {
    return data?.results ?? [];
  }, [data]);

  const totalPages = data?.total_pages ?? 1;

  return (
    <div className="min-h-screen bg-[var(--background-primary)] pt-24">
      <HelmetMeta
        name="Popular Actors"
        description="Explore the most popular actors and celebrities in the industry today on Netflix."
      />

      <div className="container mb-8">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Popular Actors
          </h1>
          <Link
            to={getLocalizedLink('/trending/actors')}
            className="flex items-center gap-2 text-[var(--netflix-red)] hover:underline font-semibold"
          >
            <TrendingUp className="w-5 h-5" />
            <span>Trending Now</span>
          </Link>
        </div>
        <p className="text-[var(--text-secondary)] text-sm md:text-lg max-w-3xl leading-relaxed">
          Explore the most popular actors and celebrities in the industry today.
        </p>
      </div>

      {error ? (
        <ReactQueryErrorState error={error} retry={handleRetry} fullscreen />
      ) : (
        <div className="container">
          <OptimizedSectionWrapper
            data={allItems.length > 0 ? allItems : null}
            isLoading={isLoading}
            fallback={<SectionSkeleton variant="grid" cardCount={6} />}
            height={500}
            title="Actors Grid"
          >
            {(items) => <MediaGrid items={items} type="person" />}
          </OptimizedSectionWrapper>

          {/* Pagination Component */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            isLoading={isFetching}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
});

export default ActorsPage;

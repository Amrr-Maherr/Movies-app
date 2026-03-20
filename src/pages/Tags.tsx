import { useSearch } from "@/hooks/shared";
import React, { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import type { HeroMedia } from "@/types";
import { SectionSkeleton, Error } from "@/components/ui";
import LazyWrapper from "@/components/ui/lazy-wrapper";

// Lazy-loaded components
const Card = lazy(() => import("@/components/shared/Card/Card"));

export default function Tags() {
  const { slug } = useParams();

  // Decode the keyword from URL
  const keyword = slug ? decodeURIComponent(slug) : "";
  console.log(keyword);

  const { isLoading, results, error } = useSearch(keyword);

  if (isLoading) {
    return <SectionSkeleton variant="grid" cardCount={12} />;
  }

  if (error) {
    return (
      <Error
        fullscreen
        title="Search Error"
        message="We couldn't load the search results. Please try again."
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen bg-[var(--background-primary)]">
      <h1 className="text-3xl font-bold text-white mb-6">Tag: {keyword}</h1>

      {results.length === 0 ? (
        <p className="text-white/70">No results found</p>
      ) : (
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={12} />}>
          <LazyWrapper height={500}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {results.map((result, index) => (
                <Card
                  key={`${result.type}-${result.item.id}-${index}`}
                  movie={result.item as HeroMedia}
                  variant="standard"
                />
              ))}
            </div>
          </LazyWrapper>
        </Suspense>
      )}
    </div>
  );
}

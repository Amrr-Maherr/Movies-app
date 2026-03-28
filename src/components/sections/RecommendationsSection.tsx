import { memo, useMemo, lazy, Suspense } from "react";
import { SectionSkeleton } from "@/components/ui";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import Card from "@/components/shared/Card/Card";
import type { HeroMedia } from "@/types";

const Slider = lazy(() => import("@/components/shared/Slider/slider"));

interface RecommendationsSectionProps {
  recommendations: HeroMedia[];
  title?: string;
  variant?: "similar" | "recommendations";
}

const RecommendationsSection = memo(function RecommendationsSection({
  recommendations,
  title = "More Like This",
}: RecommendationsSectionProps) {
  const items = useMemo(
    () =>
      recommendations
        .filter((i) => i.poster_path)
        .sort((a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0))
        .slice(0, 20),
    [recommendations],
  );

  if (!items.length) return null;

  return (
    <section className="bg-[var(--section-bg)] py-10">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        <h2 className="text-xl font-semibold text-[var(--section-title-color)] mb-6">{title}</h2>
        <Suspense fallback={<SectionSkeleton variant="grid" cardCount={6} />}>
          <LazyWrapper height={350}>
            <Slider slidesPerView={6} slidesPerViewMobile={3} spaceBetween={12} hideNavigation={false}>
              {items.map((m) => (
                <Card key={m.id} movie={m} variant="standard" showBadge={false} />
              ))}
            </Slider>
          </LazyWrapper>
        </Suspense>
        <p className="text-[var(--section-meta-color)] text-xs mt-4">{items.length} titles</p>
      </div>
    </section>
  );
});

export default RecommendationsSection;

import { memo, useMemo, lazy, Suspense } from "react";
import { SectionSkeleton } from "@/components/ui";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { Card } from "@/components/shared/Card";

const Slider = lazy(() => import("@/components/shared/Slider/slider"));

interface ReviewsSectionProps {
  reviews: {
    id?: string | number;
    author: string;
    content: string;
    created_at: string;
    author_details?: { rating?: number | null };
  }[];
}

const ReviewsSection = memo(function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const validReviews = useMemo(
    () => reviews.filter((r) => r.author && r.content?.trim()),
    [reviews],
  );

  if (!validReviews.length) return null;

  return (
    <section className="bg-[var(--section-bg)] py-10">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        <h3 className="text-xl font-semibold text-[var(--section-title-color)] mb-6">User Reviews</h3>
        <Suspense fallback={<SectionSkeleton variant="list" cardCount={4} />}>
          <LazyWrapper height={400}>
            <Slider slidesPerView={3} slidesPerViewMobile={1} spaceBetween={16} hideNavigation={false}>
              {validReviews.map((review) => (
                <Card
                  key={review.id || review.author}
                  variant="review"
                  review={{
                    author: review.author,
                    rating: review.author_details?.rating ?? null,
                    content: review.content,
                    date: review.created_at,
                  }}
                />
              ))}
            </Slider>
          </LazyWrapper>
        </Suspense>
        <p className="text-[var(--section-meta-color)] text-xs mt-4">{validReviews.length} reviews</p>
      </div>
    </section>
  );
});

export default ReviewsSection;

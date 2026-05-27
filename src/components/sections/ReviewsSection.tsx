import { memo, useMemo, lazy, Suspense } from "react";
import { SectionSkeleton } from "@/components/ui";
import { OptimizedSectionWrapper } from "@/components/optimized-section-wrapper";
import { Card } from "@/components/shared/Card";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const validReviews = useMemo(
    () => reviews.filter((r) => r.author && r.content?.trim()),
    [reviews],
  );

  if (!validReviews.length) return null;

  return (
    <section className="bg-[var(--section-bg)] py-10">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        <h3 className="text-xl font-semibold text-[var(--section-title-color)] mb-6">{t("media.userReviews")}</h3>
        <OptimizedSectionWrapper
          data={validReviews}
          isLoading={false}
          fallback={<SectionSkeleton variant="list" cardCount={4} />}
          height={400}
          title={t("media.userReviews")}
        >
          {(reviewsData) => (
            <Slider slidesPerView={3} slidesPerViewMobile={1} spaceBetween={16} hideNavigation={false}>
              {reviewsData.map((review) => (
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
          )}
        </OptimizedSectionWrapper>
        <p className="text-[var(--section-meta-color)] text-xs mt-4">{validReviews.length} {t("media.reviews")}</p>
      </div>
    </section>
  );
});

export default ReviewsSection;

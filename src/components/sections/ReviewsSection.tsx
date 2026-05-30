import { memo, useMemo, lazy, Suspense } from "react";
import { Star } from "lucide-react";
import { SectionSkeleton } from "@/components/ui";
import { OptimizedSectionWrapper } from "@/components/optimized-section-wrapper";
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

function ReviewCard({ review }: { review: ReviewsSectionProps["reviews"][0] }) {
  const rating = review.author_details?.rating && review.author_details.rating > 0
    ? review.author_details.rating
    : null;
  const starCount = rating ? Math.round(rating / 2) : 0;
  const date = review.created_at
    ? new Date(review.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";
  const truncatedContent = review.content.length <= 150
    ? review.content
    : review.content.slice(0, 150) + "...";

  return (
    <div className="group h-full w-full">
      <div className="relative h-full rounded-lg bg-zinc-900/90 p-4 shadow-lg transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:bg-zinc-800/90 border border-zinc-800/50">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="flex-1">
            <h4 className="text-base font-bold text-white group-hover:text-[var(--netflix-red)] transition-colors duration-300">
              {review.author}
            </h4>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
          {rating && (
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`h-3 w-3 ${s <= starCount ? "fill-yellow-400 text-yellow-400" : "fill-zinc-700 text-zinc-700"}`}
                />
              ))}
              <span className="ml-1 text-[10px] font-medium text-yellow-400">
                {rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
        <div className="mb-3">
          <p className="text-sm leading-relaxed text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
            {truncatedContent}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--netflix-red)]/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </div>
  );
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
                <ReviewCard key={review.id || review.author} review={review} />
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

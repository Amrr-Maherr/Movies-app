import { memo, useMemo } from "react";
import Slider from "@/components/shared/Slider/slider";
import ReviewCard from "@/components/shared/cards/ReviewCard";

interface ReviewsSectionProps {
  reviews: {
    id?: string | number;
    author: string;
    content: string;
    created_at: string;
    author_details?: { rating?: number | null };
  }[];
}

// Memoized ReviewsSection component - avoids re-renders when parent updates
const ReviewsSection = memo(function ReviewsSection({ reviews }: ReviewsSectionProps) {
  // Memoized: Filter out empty or invalid reviews
  const validReviews = useMemo(
    () =>
      reviews.filter(
        (review) => review.author && review.content?.trim(),
      ),
    [reviews],
  );

  if (!validReviews || validReviews.length === 0) {
    return null;
  }

  return (
    <section className="bg-black py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
          User Reviews
        </h3>
        <Slider
          slidesPerView={4}
          slidesPerViewMobile={1}
          spaceBetween={16}
          hideNavigation={false}
        >
          {validReviews.map((review) => (
            <ReviewCard
              key={review.id || review.author}
              author={review.author}
              rating={review.author_details?.rating ?? null}
              content={review.content}
              date={review.created_at}
            />
          ))}
        </Slider>
      </div>
    </section>
  );
});

export default ReviewsSection;

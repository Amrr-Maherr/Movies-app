/**
 * ReviewCard Component
 *
 * Review card with author, rating, and content preview.
 * Features:
 * - Star rating display
 * - Author name and date
 * - Truncated review content
 */

import { memo } from "react";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { useReviewDerivedValues } from "../hooks";
import type { ReviewCardProps } from "../types";
import { Star } from "lucide-react";

const ReviewCard = memo(({ review }: ReviewCardProps) => {
  const { reviewDate, truncatedReview } = useReviewDerivedValues(review);

  const reviewStars = review?.rating ? (
    <div className="flex items-center gap-1">
      <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
      <span className="text-xs font-medium text-yellow-500">
        {review.rating.toFixed(1)}
      </span>
    </div>
  ) : null;

  return (
    <LazyWrapper height={150}>
      <div className="h-full bg-zinc-900/50 rounded-lg p-4 border border-white/5">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="text-sm font-semibold text-white">
              {review.author}
            </h4>
            {reviewDate && (
              <p className="text-xs text-gray-400">{reviewDate}</p>
            )}
          </div>
          {reviewStars}
        </div>
        <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed">
          {truncatedReview}
        </p>
      </div>
    </LazyWrapper>
  );
});

ReviewCard.displayName = "ReviewCard";

export default ReviewCard;

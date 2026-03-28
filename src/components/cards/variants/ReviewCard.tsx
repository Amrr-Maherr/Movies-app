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
import { useCardDerivedValues } from "../hooks";
import type { ReviewCardProps } from "../types";

const ReviewCard = memo(({ review }: ReviewCardProps) => {
  const { reviewDate, reviewStars, truncatedReview } = useCardDerivedValues({
    review,
  });

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

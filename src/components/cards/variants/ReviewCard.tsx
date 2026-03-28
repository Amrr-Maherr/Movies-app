import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { ReviewLayout } from "@/components/shared/Card/CardVariantLayouts";
import type { CardProps } from "../types";

type ReviewCardProps = Pick<CardProps, "review">;

const ReviewCard = memo(({ review }: ReviewCardProps) => {
  const formattedDate = useMemo(() => {
    if (!review?.date) return "";
    try {
      return new Date(review.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return review.date;
    }
  }, [review]);

  const ratingStars = useMemo(() => {
    if (!review?.rating || review.rating <= 0) return null;
    const starCount = Math.round(review.rating / 2);
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`h-3 w-3 ${s <= starCount ? "fill-yellow-400 text-yellow-400" : "fill-zinc-700 text-zinc-700"}`}
          />
        ))}
        <span className="ml-1 text-[10px] font-medium text-yellow-400">
          {review.rating.toFixed(1)}
        </span>
      </div>
    );
  }, [review]);

  const truncatedContent = useMemo(() => {
    if (!review?.content) return "";
    return review.content.length <= 150
      ? review.content
      : review.content.slice(0, 150) + "...";
  }, [review]);

  if (!review) return null;

  return (
    <LazyWrapper height={150}>
      <motion.div transition={{ duration: 0.3, ease: "easeOut" }} className="h-full w-full">
        <div className="h-full">
          <ReviewLayout
            author={review.author}
            formattedDate={formattedDate}
            ratingStars={ratingStars}
            truncatedContent={truncatedContent}
            content={review.content}
          />
        </div>
      </motion.div>
    </LazyWrapper>
  );
});

ReviewCard.displayName = "ReviewCard";
export default ReviewCard;

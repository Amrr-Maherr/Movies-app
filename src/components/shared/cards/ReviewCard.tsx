import { useMemo } from "react";
import { Star } from "lucide-react";

export interface ReviewCardProps {
  author: string;
  rating?: number | null;
  content: string;
  date: string;
}

const ReviewCard = ({ author, rating, content, date }: ReviewCardProps) => {
  // Format the date nicely
  const formattedDate = useMemo(() => {
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return date;
    }
  }, [date]);

  // Render star rating
  const renderStars = useMemo(() => {
    if (!rating || rating <= 0) return null;

    // Normalize rating to 0-10 scale (TMDB uses 0-10)
    const normalizedRating = Math.min(Math.max(rating, 0), 10);
    const starCount = Math.round(normalizedRating / 2); // Convert to 5-star scale

    return (
      <div className="flex items-center gap-0.5" aria-label={`Rating: ${normalizedRating} out of 10`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= starCount
                ? "fill-yellow-400 text-yellow-400"
                : "fill-zinc-700 text-zinc-700"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-yellow-400">
          {normalizedRating.toFixed(1)}/10
        </span>
      </div>
    );
  }, [rating]);

  // Truncate content if too long (show first 150 chars)
  const truncatedContent = useMemo(() => {
    if (content.length <= 150) return content;
    return content.slice(0, 150) + "...";
  }, [content]);

  return (
    <div className="group h-full w-[280px] flex-shrink-0">
      {/* Card Container */}
      <div className="relative h-full overflow-hidden rounded-lg bg-zinc-900/90 p-4 shadow-lg transition-all duration-300 ease-in-out group-hover:scale-[1.02] group-hover:shadow-xl group-hover:bg-zinc-800/90">
        {/* Header: Author + Rating */}
        <div className="mb-3 flex items-start justify-between">
          <div className="flex-1">
            <h4 className="text-base font-bold text-white group-hover:text-gray-100 transition-colors duration-300">
              {author}
            </h4>
            <p className="text-xs text-gray-500">{formattedDate}</p>
          </div>
          {renderStars}
        </div>

        {/* Review Content */}
        <div className="mb-3">
          <p className="text-sm leading-relaxed text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
            {truncatedContent}
          </p>
        </div>

        {/* Decorative bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </div>
  );
};

export default ReviewCard;

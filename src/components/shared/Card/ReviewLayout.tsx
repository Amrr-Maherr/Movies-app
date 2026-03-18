import { memo } from "react";
import { Star } from "lucide-react";

export interface ReviewLayoutProps {
  author: string;
  content: string;
  formattedDate: string;
  ratingStars: React.ReactNode;
  truncatedContent: string;
}

/**
 * Review Layout Component
 * Displays a review card with author, date, rating and content
 */
const ReviewLayout = memo(
  ({
    author,
    formattedDate,
    ratingStars,
    truncatedContent,
  }: ReviewLayoutProps) => {
    return (
      <div className="group h-full w-full">
        <div className="relative h-full rounded-lg bg-zinc-900/90 p-4 shadow-lg transition-all duration-300 ease-in-out group-hover:scale-[1.02] group-hover:shadow-xl group-hover:bg-zinc-800/90 border border-zinc-800/50">
          <div className="mb-3 flex items-start justify-between gap-2">
            <div className="flex-1">
              <h4 className="text-base font-bold text-white group-hover:text-[var(--netflix-red)] transition-colors duration-300">
                {author}
              </h4>
              <p className="text-xs text-gray-500">{formattedDate}</p>
            </div>
            {ratingStars}
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
  },
);

ReviewLayout.displayName = "ReviewLayout";

export default ReviewLayout;

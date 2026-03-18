import { memo } from "react";
import { Calendar, Star } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import type { HeroMedia } from "@/types";

export interface NewReleaseLayoutProps {
  movie: HeroMedia;
  title: string;
  posterUrl: string;
  ratingValue?: string;
  formattedReleaseDate?: string;
  isHovered: boolean;
  children?: React.ReactNode;
}

/**
 * New Release Layout Component
 * Displays a card with NEW badge and release date
 */
const NewReleaseLayout = memo(
  ({
    title,
    posterUrl,
    ratingValue,
    formattedReleaseDate,
    children,
  }: NewReleaseLayoutProps) => {
    return (
      <>
        <div className="relative aspect-[2/3] overflow-hidden rounded mb-2">
          <OptimizedImage
            src={posterUrl}
            alt={title}
            className="w-full h-full"
            objectFit="cover"
          />
          {/* NEW Badge */}
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
            NEW
          </div>
          {/* Rating Badge */}
          {ratingValue && (
            <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 z-10">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              {ratingValue}
            </div>
          )}
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center px-4">
              <p className="text-white text-sm font-semibold line-clamp-2">
                {title}
              </p>
            </div>
          </div>
          {/* Children (additional overlays) */}
          {children}
        </div>
        <h3 className="text-sm md:text-base text-white font-medium line-clamp-1 group-hover:text-gray-300 transition-colors">
          {title}
        </h3>
        {formattedReleaseDate && (
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
            <Calendar className="w-3 h-3" />
            {formattedReleaseDate}
          </div>
        )}
      </>
    );
  },
);

NewReleaseLayout.displayName = "NewReleaseLayout";

export default NewReleaseLayout;

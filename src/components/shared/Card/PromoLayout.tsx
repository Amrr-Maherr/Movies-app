import { memo } from "react";
import { Star, Play, Info } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import type { HeroMedia } from "@/types";

export interface PromoLayoutProps {
  movie: HeroMedia;
  title: string;
  imageUrl: string;
  detailsUrl: string;
  year: string | number;
  mediaType: "movie" | "tv";
  promoVariant?: "left" | "right" | "center";
}

/**
 * Promo Layout Component (Banner/Promo)
 * Displays a large promotional banner with gradient overlays
 *
 * ACCESSIBILITY FIX:
 * - CRITICAL: Removed nested Link elements (invalid HTML)
 * - Changed to clickable div with proper role and keyboard support
 * - Buttons now have proper 48px touch targets
 * - Added aria-label for screen readers
 * - Added touch-manipulation for better mobile behavior
 */
const PromoLayout = memo(
  ({
    movie,
    title,
    imageUrl,
    detailsUrl,
    year,
    mediaType,
    promoVariant = "left",
  }: PromoLayoutProps) => {
    const contentAlignment =
      promoVariant === "left"
        ? "items-start text-left"
        : promoVariant === "right"
          ? "items-end text-right md:ml-auto"
          : "items-center text-center md:mx-auto";

    const gradientDirection =
      promoVariant === "left"
        ? "bg-gradient-to-r from-black/90 via-black/70 to-transparent"
        : promoVariant === "right"
          ? "bg-gradient-to-l from-black/90 via-black/70 to-transparent"
          : "bg-gradient-to-t from-black/90 via-black/60 to-black/20";

    // Handle navigation
    const handleNavigate = () => {
      window.location.href = detailsUrl;
    };

    return (
      <div
        className="relative w-full h-[50vh] sm:h-[55vh] md:h-[65vh] lg:h-[75vh] overflow-hidden my-6 md:my-8 group touch-manipulation"
        role="article"
        aria-label={`Promotional banner for ${title}`}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover object-center transition-transform duration-700"
            objectFit="cover"
            priority
          />
          <div className={`absolute inset-0 ${gradientDirection}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-end md:items-center">
          <div className="container pb-8 md:pb-12">
            <div
              className={`flex flex-col ${contentAlignment} max-w-full md:max-w-xl lg:max-w-2xl space-y-2 md:space-y-4`}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl leading-tight">
                {title}
              </h2>

              <div
                className={`flex flex-wrap items-center gap-2 md:gap-3 text-white ${promoVariant === "right" ? "justify-end" : promoVariant === "center" ? "justify-center" : ""}`}
              >
                {movie.vote_average && movie.vote_average > 0 && (
                  <div className="flex items-center gap-1">
                    <Star
                      className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400"
                      aria-hidden="true"
                    />
                    <span className="text-sm md:text-base font-semibold">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                )}
                {year && (
                  <span className="text-sm md:text-base font-medium text-gray-300">
                    {year}
                  </span>
                )}
                <span className="px-2 py-0.5 md:px-2.5 md:py-1 border border-gray-400 rounded text-xs md:text-sm font-medium text-gray-300">
                  {mediaType === "movie" ? "Movie" : "Series"}
                </span>
              </div>

              {movie.overview && (
                <p className="hidden md:block text-sm lg:text-base text-gray-200 leading-relaxed line-clamp-2 lg:line-clamp-3 drop-shadow-lg max-w-lg">
                  {movie.overview}
                </p>
              )}

              {/* 
                ACCESSIBILITY FIX: Action buttons with proper 48px touch targets
                Removed nested Link elements - using buttons with onClick instead
              */}
              <div
                className={`flex gap-3 pt-1 md:pt-2 ${promoVariant === "right" ? "justify-end" : promoVariant === "center" ? "justify-center" : ""}`}
              >
                <button
                  onClick={handleNavigate}
                  className="inline-flex items-center gap-2 bg-white text-black hover:bg-white/90 min-h-[48px] px-4 md:px-6 py-2 md:py-3 rounded text-sm md:text-base font-semibold transition-all duration-200 touch-manipulation"
                  aria-label={`Play ${title}`}
                >
                  <Play
                    className="w-5 h-5 md:w-6 md:h-6 fill-current"
                    aria-hidden="true"
                  />
                  <span className="hidden sm:inline">Play</span>
                </button>
                <button
                  onClick={handleNavigate}
                  className="inline-flex items-center gap-2 bg-gray-500/70 text-white hover:bg-gray-500/90 min-h-[48px] px-4 md:px-6 py-2 md:py-3 rounded text-sm md:text-base font-semibold transition-all duration-200 touch-manipulation"
                  aria-label={`More information about ${title}`}
                >
                  <Info className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
                  <span className="hidden sm:inline">More Info</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

PromoLayout.displayName = "PromoLayout";

export default PromoLayout;

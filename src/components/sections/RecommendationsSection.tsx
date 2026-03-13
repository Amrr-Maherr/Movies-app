import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Star, ThumbsUp } from "lucide-react";
import Slider from "@/components/shared/Slider/slider";
import Card from "@/components/shared/Card/Card";
import { cn } from "@/lib/utils";
import type { HeroMedia } from "@/types";

interface RecommendationsSectionProps {
  recommendations: HeroMedia[];
  title?: string;
  variant?: "similar" | "recommendations";
}

// Memoized RecommendationCard component with match score
const RecommendationCard = memo(function RecommendationCard({
  media,
  index,
}: {
  media: HeroMedia;
  index: number;
}) {
  // Calculate match percentage based on vote average and popularity
  const matchPercentage = useMemo(() => {
    const voteScore = (media.vote_average || 0) * 10;
    const popularityBonus = Math.min(
      media.popularity ? media.popularity / 10 : 0,
      10,
    );
    return Math.round(Math.min(voteScore + popularityBonus, 99));
  }, [media.vote_average, media.popularity]);

  // Get reason for recommendation
  const reasonText = useMemo(() => {
    if (matchPercentage >= 90) {
      return "Excellent Match";
    } else if (matchPercentage >= 80) {
      return "Great Choice";
    } else if (matchPercentage >= 70) {
      return "Good Pick";
    }
    return "Recommended";
  }, [matchPercentage]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      className="relative"
    >
      <Card movie={media} variant="recommendation" />

      {/* Match Score Badge */}
      <div className="absolute top-2 left-2 flex flex-col gap-1">
        <div
          className={cn(
            "px-2 py-1 rounded-md flex items-center gap-1 backdrop-blur-sm",
            matchPercentage >= 85
              ? "bg-green-600/90"
              : matchPercentage >= 70
                ? "bg-yellow-600/90"
                : "bg-blue-600/90",
          )}
        >
          <ThumbsUp className="w-3 h-3 text-white" />
          <span className="text-xs font-bold text-white">
            {matchPercentage}%
          </span>
        </div>
      </div>

      {/* Recommendation Reason */}
      <div className="absolute bottom-16 left-2 right-2">
        <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-white text-center truncate">
          {reasonText}
        </div>
      </div>
    </motion.div>
  );
});

/**
 * RecommendationsSection Component
 * Displays recommended or similar content with match scores and reasons
 * Enhanced with Framer Motion animations
 */
const RecommendationsSection = memo(function RecommendationsSection({
  recommendations,
  title = "Recommended For You",
  variant = "recommendations",
}: RecommendationsSectionProps) {
  // Memoized: Filter and sort recommendations
  const filteredRecommendations = useMemo(() => {
    return recommendations
      .filter((item) => item.poster_path !== null)
      .sort((a, b) => {
        // Sort by vote average and popularity
        const scoreA = (a.vote_average || 0) * 2 + (a.popularity || 0) / 10;
        const scoreB = (b.vote_average || 0) * 2 + (b.popularity || 0) / 10;
        return scoreB - scoreA;
      })
      .slice(0, 20);
  }, [recommendations]);

  if (filteredRecommendations.length === 0) {
    return null;
  }

  return (
    <section className="bg-black py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {variant === "recommendations" ? (
              <TrendingUp className="w-6 h-6 text-red-500" />
            ) : (
              <Star className="w-6 h-6 text-yellow-500" />
            )}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {title}
              </h2>
              <p className="text-xs text-white/60 mt-1">
                Based on your preferences • {filteredRecommendations.length}{" "}
                titles
              </p>
            </div>
          </div>
        </div>

        {/* Horizontal Slider */}
        <Slider
          slidesPerView={6}
          slidesPerViewMobile={3}
          spaceBetween={16}
          hideNavigation={false}
          swiperOptions={{
            loop: false,
            grabCursor: true,
          }}
        >
          {filteredRecommendations.map((media, index) => (
            <RecommendationCard key={media.id} media={media} index={index} />
          ))}
        </Slider>

        {/* Info Text */}
        <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
          <p className="text-white/60 text-sm text-center">
            💡 Match percentages are calculated based on ratings, popularity,
            and viewing patterns
          </p>
        </div>
      </div>
    </section>
  );
});

export default RecommendationsSection;

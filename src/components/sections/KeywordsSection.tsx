import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Slider from "@/components/shared/Slider/slider";

export interface KeywordsSectionProps {
  keywords: string[];
  onKeywordClick?: (keyword: string) => void;
  className?: string;
}

/**
 * Netflix-style Keywords/Tags section
 * Displays keywords as clickable badges/pills in a horizontal slider
 */
export function KeywordsSection({
  keywords,
  onKeywordClick,
  className,
}: KeywordsSectionProps) {
  if (!keywords || keywords.length === 0) {
    return null;
  }

  return (
    <div className={cn("w-full", className)}>
      <Slider
        slidesPerView={6}
        slidesPerViewMobile={2}
        spaceBetween={12}
        hideNavigation={true}
        swiperOptions={{
          autoplay: false,
        }}
      >
        {keywords.map((keyword, index) => (
          <motion.button
            key={`${keyword}-${index}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.2,
              delay: index * 0.03,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(229, 9, 20, 0.2)",
              borderColor: "var(--netflix-red)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onKeywordClick?.(keyword)}
            className={cn(
              "px-4 py-1.5 text-sm font-medium",
              "rounded-full border border-white/20",
              "bg-white/10 text-white/90",
              "backdrop-blur-sm",
              "transition-all duration-200",
              "hover:text-white hover:border-netflix-red",
              "focus:outline-none focus:ring-2 focus:ring-netflix-red/60",
              "cursor-pointer select-none",
              "whitespace-nowrap",
              "w-fit"
            )}
            type="button"
            aria-label={`Filter by keyword: ${keyword}`}
          >
            {keyword}
          </motion.button>
        ))}
      </Slider>
    </div>
  );
}

export default KeywordsSection;

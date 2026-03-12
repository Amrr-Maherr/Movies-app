import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import { cn } from "@/lib/utils";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Slider from "@/components/shared/Slider/slider";
import type { Provider } from "@/types";

interface WatchProviderCardProps {
  provider: Provider;
}

const PROVIDER_TYPE_COLORS: Record<string, string> = {
  Subscription: "bg-red-600/90 hover:bg-red-600",
  Rent: "bg-blue-600/90 hover:bg-blue-600",
  Buy: "bg-green-600/90 hover:bg-green-600",
  Free: "bg-yellow-600/90 hover:bg-yellow-600",
};

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w92";

// Memoized WatchProviderCard component
const WatchProviderCard = memo(function WatchProviderCard({
  provider,
}: WatchProviderCardProps) {
  const providerType = provider.provider_type || "Subscription";
  const hasLogo = !!provider.logo_path;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative flex flex-col items-center gap-2 p-3 rounded-lg",
        "bg-white/10 backdrop-blur-sm border border-white/10",
        "hover:border-white/30 transition-colors duration-200",
        "min-w-[100px] md:min-w-[120px]",
      )}
    >
      {/* Provider Logo */}
      <div
        className={cn(
          "relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden",
          "bg-white/5 flex items-center justify-center",
          "border border-white/10",
        )}
      >
        {hasLogo ? (
          <OptimizedImage
            src={`${TMDB_IMAGE_BASE_URL}${provider.logo_path}`}
            alt={provider.name}
            className="w-full h-full object-contain p-1"
            objectFit="contain"
          />
        ) : (
          /* Placeholder for missing logo */
          <div className="flex flex-col items-center justify-center text-white/60">
            <svg
              className="w-8 h-8 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs font-medium">No Logo</span>
          </div>
        )}
      </div>

      {/* Provider Name */}
      <span
        className={cn(
          "text-xs md:text-sm font-medium text-white/90 text-center",
          "line-clamp-2 max-w-full",
        )}
        title={provider.name}
      >
        {provider.name}
      </span>

      {/* Provider Type Badge */}
      <span
        className={cn(
          "px-2 py-0.5 text-xs font-semibold rounded-full text-white",
          PROVIDER_TYPE_COLORS[providerType] ||
            PROVIDER_TYPE_COLORS.Subscription,
        )}
      >
        {providerType}
      </span>
    </motion.div>
  );
});

export interface WatchProvidersSectionProps {
  providers: Provider[];
  className?: string;
  title?: string;
}

// Memoized WatchProvidersSection component - avoids re-renders when parent updates
const WatchProvidersSection = memo(function WatchProvidersSection({
  providers,
  className,
  title = "Watch Providers",
}: WatchProvidersSectionProps) {
  // Memoized: Sort providers by display_priority
  const sortedProviders = useMemo(() => {
    if (!providers || providers.length === 0) {
      return [];
    }
    return [...providers].sort((a, b) => {
      const priorityA = a.display_priority ?? 999;
      const priorityB = b.display_priority ?? 999;
      return priorityA - priorityB;
    });
  }, [providers]);

  if (sortedProviders.length === 0) {
    return null;
  }

  return (
    <section
      className={cn(
        "w-full py-8 px-4 md:px-12",
        "bg-gradient-to-b from-black/80 via-neutral-900/80 to-black/80",
        "border-y border-white/5",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        {title && (
          <h2
            className={cn(
              "text-xl md:text-2xl font-bold text-white mb-6",
              "tracking-wide",
            )}
          >
            {title}
          </h2>
        )}

        {/* Horizontal Slider of Providers */}
        <Slider
          slidesPerView={6}
          slidesPerViewMobile={2}
          spaceBetween={16}
          hideNavigation={false}
          swiperOptions={{
            loop: false,
            grabCursor: true,
          }}
          className="watch-providers-slider"
        >
          {sortedProviders.map((provider) => (
            <WatchProviderCard key={provider.id} provider={provider} />
          ))}
        </Slider>

        {/* Optional: Additional info text */}
        <p className="text-white/50 text-sm mt-4 text-center md:text-left">
          Availability may vary by region. Check provider for current pricing.
        </p>
      </div>
    </section>
  );
});

export default WatchProvidersSection;

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, Tv, DollarSign, Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import OptimizedImage from "@/components/ui/OptimizedImage";
import type { WatchProviderRegion } from "@/services/moviesService";

interface WatchProvidersDetailProps {
  providers?: WatchProviderRegion;
  region?: string;
  title?: string;
}

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w92";

// Provider type configuration
const PROVIDER_TYPES = {
  flatrate: {
    label: "Subscription",
    icon: Tv,
    color: "bg-red-600 hover:bg-red-700",
    description: "Included with subscription",
  },
  rent: {
    label: "Rent",
    icon: DollarSign,
    color: "bg-blue-600 hover:bg-blue-700",
    description: "Available for rent",
  },
  buy: {
    label: "Buy",
    icon: DollarSign,
    color: "bg-green-600 hover:bg-green-700",
    description: "Available for purchase",
  },
  free: {
    label: "Free",
    icon: Gift,
    color: "bg-yellow-600 hover:bg-yellow-700",
    description: "Available for free",
  },
};

// Memoized ProviderCard component
const ProviderCard = memo(function ProviderCard({
  provider,
  type,
}: {
  provider: {
    provider_id: number;
    provider_name: string;
    logo_path: string | null;
    display_priority?: number;
  };
  type: keyof typeof PROVIDER_TYPES;
}) {
  const config = PROVIDER_TYPES[type];
  const Icon = config.icon;
  const hasLogo = !!provider.logo_path;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={cn(
        "relative flex flex-col items-center gap-3 p-4 rounded-xl",
        "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm",
        "border border-white/10 hover:border-white/20",
        "transition-all duration-300 min-w-[120px]",
      )}
    >
      {/* Provider Logo */}
      <div
        className={cn(
          "relative w-20 h-20 rounded-xl overflow-hidden",
          "bg-white/10 flex items-center justify-center",
          "border border-white/20 shadow-lg",
        )}
      >
        {hasLogo ? (
          <OptimizedImage
            src={`${TMDB_IMAGE_BASE_URL}${provider.logo_path}`}
            alt={provider.provider_name}
            className="w-full h-full object-contain p-2"
            objectFit="contain"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-white/60">
            <Icon className="w-8 h-8 mb-1" />
            <span className="text-xs font-medium">No Logo</span>
          </div>
        )}
      </div>

      {/* Provider Name */}
      <span className="text-sm font-semibold text-white text-center line-clamp-2 max-w-full">
        {provider.provider_name}
      </span>

      {/* Provider Type Badge */}
      <span
        className={cn(
          "px-3 py-1 text-xs font-bold rounded-full text-white flex items-center gap-1",
          config.color,
        )}
      >
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    </motion.div>
  );
});

// Memoized ProviderSection component
const ProviderSection = memo(function ProviderSection({
  providers,
  type,
}: {
  providers: Array<{
    provider_id: number;
    provider_name: string;
    logo_path: string | null;
    display_priority?: number;
  }>;
  type: keyof typeof PROVIDER_TYPES;
}) {
  const config = PROVIDER_TYPES[type];
  const Icon = config.icon;

  if (!providers || providers.length === 0) {
    return null;
  }

  // Sort by display priority
  const sortedProviders = [...providers].sort(
    (a, b) => (a.display_priority ?? 999) - (b.display_priority ?? 999),
  );

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <Icon
          className={cn(
            "w-5 h-5",
            config.color.replace("bg-", "text-").replace("hover:", ""),
          )}
        />
        <div>
          <h3 className="text-lg font-bold text-white">{config.label}</h3>
          <p className="text-xs text-white/60">{config.description}</p>
        </div>
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {sortedProviders.map((provider) => (
          <ProviderCard
            key={provider.provider_id}
            provider={provider}
            type={type}
          />
        ))}
      </div>
    </div>
  );
});

/**
 * WatchProvidersDetail Component
 * Displays detailed streaming provider information organized by type
 * (Subscription, Rent, Buy, Free) with prominent cards and animations
 */
const WatchProvidersDetail = memo(function WatchProvidersDetail({
  providers,
  region = "US",
  title = "Where to Watch",
}: WatchProvidersDetailProps) {
  // Memoized: Check if providers exist
  const hasProviders = useMemo(() => {
    if (!providers) return false;
    return (
      (providers.flatrate && providers.flatrate.length > 0) ||
      (providers.rent && providers.rent.length > 0) ||
      (providers.buy && providers.buy.length > 0) ||
      (providers.free && providers.free.length > 0)
    );
  }, [providers]);

  if (!hasProviders) {
    return (
      <section className="bg-black py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
          <div className="text-center py-12">
            <Tv className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/60 text-lg">
              Streaming information not available for {region}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "w-full py-12 px-4 md:px-12",
        "bg-gradient-to-b from-black via-neutral-900/90 to-black",
        "border-y border-white/5",
      )}
    >
      <div>
        {/* Section Title */}
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {title}
          </h2>
          <p className="text-white/60 text-sm flex items-center gap-2 justify-center md:justify-start">
            <Link className="w-4 h-4" />
            Availability in {region.toUpperCase()}
          </p>
        </div>

        {/* Provider Sections */}
        <div className="space-y-8">
          {/* Subscription Providers */}
          {providers?.flatrate && providers.flatrate.length > 0 && (
            <ProviderSection providers={providers.flatrate} type="flatrate" />
          )}

          {/* Free Providers */}
          {providers?.free && providers.free.length > 0 && (
            <ProviderSection providers={providers.free} type="free" />
          )}

          {/* Rent Providers */}
          {providers?.rent && providers.rent.length > 0 && (
            <ProviderSection providers={providers.rent} type="rent" />
          )}

          {/* Buy Providers */}
          {providers?.buy && providers.buy.length > 0 && (
            <ProviderSection providers={providers.buy} type="buy" />
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
          <p className="text-white/50 text-sm text-center">
            💡 Prices and availability may vary. Click on a provider to check
            current pricing.
          </p>
        </div>
      </div>
    </section>
  );
});

export default WatchProvidersDetail;

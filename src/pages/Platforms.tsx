import { memo } from "react";
import { Link } from "react-router-dom";
import { Tv, ArrowLeft } from "lucide-react";
import { useStreamingPlatforms } from "@/queries";
import { SectionSkeleton, Error } from "@/components/ui";
import OptimizedImage from "@/components/ui/OptimizedImage";
import PlatformCard from "@/components/sections/PlatformCard";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

/**
 * Platforms Page
 *
 * Displays all available streaming platforms in a grid layout.
 * Each platform card links to its dedicated page showing available content.
 */
const Platforms = memo(function Platforms() {
  const { data: platforms, isLoading, error } = useStreamingPlatforms();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)] pt-20">
        <SectionSkeleton variant="grid" cardCount={12} />
      </div>
    );
  }

  if (error || !platforms || platforms.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)] pt-20 flex items-center justify-center">
        <Error
          message="Failed to load streaming platforms"
          retryButtonText="Try Again"
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)] pt-20 pb-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
              <Tv className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              Streaming Platforms
            </h1>
          </div>

          <p className="text-lg text-[#b3b3b3] max-w-2xl">
            Browse all available streaming platforms and discover movies and TV shows
            available on each service.
          </p>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {platforms.map((platform) => (
            <div key={platform.id} className="h-[200px] md:h-[240px]">
              <PlatformCard platform={platform} />
            </div>
          ))}
        </div>

        {/* Platform Count */}
        <div className="mt-8 text-center text-[#737373]">
          <p className="text-sm">
            Showing {platforms.length} streaming platforms
          </p>
        </div>
      </div>
    </div>
  );
});

export default Platforms;

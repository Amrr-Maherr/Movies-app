import { useParams, Link } from "react-router-dom";
import { memo, useMemo } from "react";
import { useNetworkDetails, useNetworkTVSeries } from "@/queries";
import { SectionSkeleton, Error } from "@/components/ui";
import MediaSection from "@/components/shared/MediaSection";
import { Tv, MapPin, Globe, Building2 } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const Network = memo(function Network() {
  const { id } = useParams<{ id: string }>();
  const networkId = id ? parseInt(id, 10) : 0;

  const {
    data: network,
    isLoading: networkLoading,
    error: networkError,
  } = useNetworkDetails(networkId);

  const {
    data: networkShows,
    isLoading: showsLoading,
    error: showsError,
  } = useNetworkTVSeries(networkId, 1);

  const logoUrl = useMemo(
    () =>
      network?.logo_path
        ? `${IMAGE_BASE_URL}${network.logo_path}`
        : null,
    [network?.logo_path]
  );

  if (networkLoading) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)]">
        <SectionSkeleton variant="hero" />
      </div>
    );
  }

  if (networkError || !network) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)] flex items-center justify-center">
        <Error
          message="Network not found"
          retryButtonText="Go Back"
          onRetry={() => window.history.back()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      {/* Header Section */}
      <div className="relative h-[300px] md:h-[400px] bg-gradient-to-b from-black/80 to-[var(--background-primary)]">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl h-full flex items-center">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            {/* Network Logo */}
            {logoUrl ? (
              <div className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                <OptimizedImage
                  src={logoUrl}
                  alt={network.name}
                  className="w-full h-full object-contain p-2"
                  objectFit="contain"
                />
              </div>
            ) : (
              <div className="w-32 h-32 md:w-48 md:h-48 bg-[#333] rounded-lg flex items-center justify-center flex-shrink-0">
                <Tv className="w-16 h-16 md:w-24 md:h-24 text-white" />
              </div>
            )}

            {/* Network Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                {network.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-[#737373]">
                {network.origin_country && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{network.origin_country}</span>
                  </div>
                )}

                {network.headquarters && (
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>{network.headquarters}</span>
                  </div>
                )}

                {networkShows && (
                  <div className="flex items-center gap-2">
                    <Tv className="w-4 h-4" />
                    <span>{networkShows.total_results} TV Shows</span>
                  </div>
                )}

                {network.homepage && (
                  <a
                    href={network.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:underline"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Official Website</span>
                  </a>
                )}
              </div>

              {network.description && (
                <p className="mt-4 text-sm md:text-base text-[#b3b3b3] line-clamp-3 max-w-3xl">
                  {network.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Parent Organization Section */}
      {network.parent_organization && (
        <div className="border-y border-[#222] bg-black/40">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl py-6">
            <div className="flex items-center gap-4">
              <span className="text-[#737373] text-sm">Parent Organization:</span>
              <Link
                to={`/network/${network.parent_organization.id}`}
                className="text-white hover:underline font-medium flex items-center gap-2"
              >
                {network.parent_organization.logo_path ? (
                  <img
                    src={`${IMAGE_BASE_URL}${network.parent_organization.logo_path}`}
                    alt={network.parent_organization.name}
                    className="h-8 object-contain"
                  />
                ) : (
                  <span>{network.parent_organization.name}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TV Series Section */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          TV Shows by {network.name}
        </h2>

        {showsLoading ? (
          <SectionSkeleton variant="grid" cardCount={6} />
        ) : showsError ? (
          <Error
            message="Failed to load TV shows"
            retryButtonText="Try Again"
            onRetry={() => window.location.reload()}
          />
        ) : networkShows?.results && networkShows.results.length > 0 ? (
          <MediaSection
            title=""
            data={networkShows.results}
            isLoading={false}
            error={null}
            onRetry={() => {}}
          />
        ) : (
          <div className="text-center py-12 text-[#737373]">
            <Tv className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No TV shows available</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default Network;

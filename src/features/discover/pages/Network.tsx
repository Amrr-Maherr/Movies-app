import { useParams, Link } from "react-router-dom";
import { memo, useMemo, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useNetworkDetails, useNetworkTVSeries } from "@/hooks/shared";
import { SectionSkeleton } from "@/components/ui";
import { ReactQueryErrorState } from "@/components/errors";
import { OptimizedSectionWrapper } from "@/components/optimized-section-wrapper";
import { Tv, MapPin, Globe, Building2 } from "lucide-react";
import HelmetMeta from "@/components/shared/HelmetMeta";

const OptimizedImage = lazy(() => import("@/components/ui/OptimizedImage"));

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const Network = memo(function Network() {
  const { t } = useTranslation();
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
    () => (network?.logo_path ? `${IMAGE_BASE_URL}${network.logo_path}` : null),
    [network?.logo_path],
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
      <ReactQueryErrorState
        error={networkError}
        retry={() => window.history.back()}
        fullscreen
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      <HelmetMeta
        name={network.name}
        description={`Browse TV shows from ${network.name}. ${networkShows?.total_results || 0} TV series available.`}
      />
      {/* Header Section */}
      <div className="relative h-[300px] md:h-[400px] bg-gradient-to-b from-black/80 to-[var(--background-primary)]">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl h-full flex items-center">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            {/* Network Logo */}
            {logoUrl ? (
              <OptimizedSectionWrapper
                data={logoUrl}
                isLoading={networkLoading}
                fallback={<SectionSkeleton variant="grid" cardCount={1} />}
                height={200}
                title="Network Logo"
              >
                {(url) => (
                  <div className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                    <OptimizedImage
                      src={url}
                      alt={network.name}
                      className="w-full h-full object-contain p-2"
                      objectFit="contain"
                    />
                  </div>
                )}
              </OptimizedSectionWrapper>
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
                    <span>{networkShows.total_results} {t('discover:tvShows')}</span>
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
              <span className="text-[#737373] text-sm">
                Parent Organization:
              </span>
              <Link
                to={`/network/${network.parent_organization.id}`}
                className="text-white hover:underline font-medium flex items-center gap-2"
              >
                <OptimizedSectionWrapper
                  data={network.parent_organization}
                  isLoading={networkLoading}
                  fallback={<span className="text-white/60">{t('common:common.loading')}</span>}
                  height={32}
                  title="Parent Org"
                >
                  {(org) => (
                    <OptimizedImage
                      src={`${IMAGE_BASE_URL}${org.logo_path}`}
                      alt={org.name}
                      className="h-8 object-contain"
                      objectFit="contain"
                    />
                  )}
                </OptimizedSectionWrapper>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TV Series Section */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          {t('discover:tvShows')} by {network.name}
        </h2>

        {showsError ? (
          <ReactQueryErrorState
            error={showsError}
            retry={() => window.location.reload()}
            fullscreen
          />
        ) : (
          <OptimizedSectionWrapper
            data={networkShows?.results && networkShows.results.length > 0 ? networkShows.results : null}
            isLoading={showsLoading}
            fallback={<SectionSkeleton variant="grid" cardCount={6} />}
            height={350}
            title="TV Shows Grid"
            isEmptyFallback={
              <div className="text-center py-12 text-[#737373]">
                <Tv className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">{t('common:common.noData')}</p>
              </div>
            }
          >
            {(shows) => (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {shows.map((show: any) => (
                  <Link
                    key={show.id}
                    to={`/tv/${show.id}`}
                    className="group cursor-pointer block"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-[#1a1a1a] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                      {show.poster_path ? (
                        <OptimizedImage
                          src={`${IMAGE_BASE_URL}${show.poster_path}`}
                          alt={show.name}
                          className="w-full h-full"
                          objectFit="cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#333]">
                          <Tv className="w-12 h-12 text-[#555]" />
                        </div>
                      )}
                    </div>
                    <div className="mt-2 md:mt-3">
                      <h3 className="text-xs md:text-sm text-white font-medium line-clamp-2 group-hover:text-[var(--netflix-red)] transition-colors">
                        {show.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </OptimizedSectionWrapper>
        )}
      </div>
    </div>
  );
});

export default Network;

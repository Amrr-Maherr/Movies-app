import { memo, useMemo, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { getLocalizedLink } from "@/lib/utils/i18n";
import { useTranslation } from "react-i18next";
import type { MediaDetails, Genre } from "@/types";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { buildMediaUrl } from "@/utils/url";
import {
  formatRuntime,
  formatDate,
  getLanguageName,
  formatNumber,
  getReleaseDate,
  getTitle,
  getRuntime,
} from "@/utils";
import { SectionSkeleton } from "@/components/ui";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import ProductionSection from "@/components/sections/ProductionSection";

// Lazy-loaded component
const Slider = lazy(() => import("@/components/shared/Slider/slider"));

interface MediaInfoSectionProps {
  media: MediaDetails;
}

// Memoized MediaInfoSection component - avoids re-renders when parent updates
const MediaInfoSection = memo(function MediaInfoSection({
  media,
}: MediaInfoSectionProps) {
  const { t } = useTranslation();
  // Memoized: Pre-calculated values
  const title = useMemo(() => getTitle(media), [media]);
  const releaseDate = useMemo(() => getReleaseDate(media), [media]);
  const runtime = useMemo(() => getRuntime(media), [media]);

  // Memoized: Build metadata rows dynamically - avoids array operations on every render
  const metadataRows = useMemo(() => {
    const rows = [
      {
        label: t('media.genres'),
        value:
          media.genres && media.genres.length > 0
            ? media.genres.map((g: Genre) => g.name).join(", ")
            : "",
      },
      {
        label: t('media.releaseDate'),
        value: releaseDate ? formatDate(releaseDate) : "",
      },
      {
        label: t('media.runtime'),
        value: runtime ? formatRuntime(runtime) : "",
      },
      {
        label: t('media.language'),
        value: media.original_language
          ? getLanguageName(media.original_language)
          : "",
      },
      {
        label: t('media.rating'),
        value: media.vote_average
          ? `⭐ ${media.vote_average.toFixed(1)} (${t('media.voteCount', { count: media.vote_count })})`
          : "",
      },
      {
        label: t('media.status'),
        value: media.status && media.status !== "Released" ? media.status : "",
      },
      {
        label: t('media.productionCompanies'),
        value: "",
        component:
          media.production_companies &&
          media.production_companies.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {media.production_companies.map((c, index) => (
                  <Link
                  key={c.id}
                  to={getLocalizedLink(`/company/${c.id}`)}
                  className="text-base text-gray-200 hover:text-white hover:underline transition-colors"
                >
                  {c.name}
                  {index < media.production_companies.length - 1 && ", "}
                </Link>
              ))}
            </div>
          ) : undefined,
      },
    ];
    return rows.filter((row) => row.value);
  }, [media, releaseDate, runtime]);

  // Memoized: Top cast (limit to 12)
  const topCast = useMemo(() => {
    return media.credits?.cast?.slice(0, 12) || [];
  }, [media.credits?.cast]);

  return (
    <section className="bg-black py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          {/* Left Column - Overview & Tagline (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tagline */}
            {media.tagline && (
              <div className="space-y-3">
                <p className="text-lg md:text-xl text-gray-400 italic">
                  {media.tagline}
                </p>
              </div>
            )}

            {/* Overview */}
            {media.overview && (
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {t('media.overview')}
                </h2>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-4xl">
                  {media.overview}
                </p>
              </div>
            )}

            {/* Cast Section */}
            {topCast.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {t('media.topCast')}
                </h3>
                <Suspense
                  fallback={<SectionSkeleton variant="grid" cardCount={4} />}
                >
                  <LazyWrapper height={300}>
                    <Slider
                      slidesPerView={4}
                      slidesPerViewMobile={1.5}
                      spaceBetween={16}
                      hideNavigation={false}
                    >
                      {topCast.map((actor) => {
                        const actorImage = actor.profile_path
                          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                          : null;
                        return (
                          <Link
                            key={actor.id}
                            to={getLocalizedLink(buildMediaUrl("person", actor.name || "", actor.id))}
                            className="group relative block touch-manipulation"
                          >
                            <div className="relative rounded-md bg-zinc-900 shadow-lg transition-all duration-300 ease-in-out group-hover:shadow-2xl">
                              <div className="relative aspect-[2/3]">
                                {actorImage ? (
                                  <>
                                    <OptimizedImage
                                      src={actorImage}
                                      alt={actor.name}
                                      className="h-full w-full transition-transform duration-300 ease-in-out"
                                      objectFit="cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
                                  </>
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-zinc-600">
                                    <User size={48} />
                                  </div>
                                )}
                              </div>
                              <div className="absolute inset-0 rounded-md ring-2 ring-white/0 ring-offset-2 ring-offset-zinc-900 transition-all duration-300 group-focus-within:ring-white/50" />
                            </div>
                            <div className="mt-3 space-y-1 px-1">
                              <p className="text-sm font-medium text-white line-clamp-1 group-hover:text-[var(--netflix-red)] transition-colors duration-300">
                                {actor.name}
                              </p>
                              <p className="text-xs text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                                {actor.character || t('media.noOverview')}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </Slider>
                  </LazyWrapper>
                </Suspense>
              </div>
            )}
          </div>

          {/* Right Column - Metadata (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {metadataRows.map((row) => (
                <div key={row.label} className="space-y-1.5">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {row.label}
                  </span>
                  {row.component ? (
                    row.component
                  ) : (
                    <p className="text-base text-gray-200 font-normal leading-relaxed">
                      {row.value}
                    </p>
                  )}
                </div>
              ))}

              {/* Production Countries */}
              {media.production_countries &&
                media.production_countries.length > 0 && (
                  <div className="space-y-1.5 pt-4 border-t border-zinc-800">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {t('media.productionCountries')}
                    </span>
                    <p className="text-base text-gray-200 font-normal">
                      {media.production_countries.map((c) => c.name).join(", ")}
                    </p>
                  </div>
                )}

              {/* Spoken Languages */}
              {media.spoken_languages && media.spoken_languages.length > 0 && (
                <div className="space-y-1.5 pt-4 border-t border-zinc-800">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {t('media.language')}
                  </span>
                  <p className="text-base text-gray-200 font-normal">
                    {media.spoken_languages
                      .map((lang) => lang.english_name || lang.name)
                      .join(", ")}
                  </p>
                </div>
              )}

              {/* Budget & Revenue */}
              {"budget" in media && media.budget && media.budget > 0 && (
                <div className="space-y-1.5 pt-4 border-t border-zinc-800">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {t('media.budget')}
                    </span>
                  <p className="text-base text-gray-200 font-normal">
                    ${formatNumber(media.budget)}
                  </p>
                </div>
              )}

              {"budget" in media && media.revenue && media.revenue > 0 && (
                <div className="space-y-1.5 pt-4 border-t border-zinc-800">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {t('media.revenue')}
                    </span>
                  <p className="text-base text-gray-200 font-normal">
                    ${formatNumber(media.revenue)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Production Companies / Networks Section */}
        <ProductionSection
          companies={media.production_companies}
          networks={"networks" in media ? media.networks : undefined}
          collection={
            "belongs_to_collection" in media
              ? (media.belongs_to_collection as any)
              : null
          }
        />
      </div>
    </section>
  );
});

export default MediaInfoSection;

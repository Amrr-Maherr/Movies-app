import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import type { MediaDetails, Genre } from "@/types";
import {
  formatRuntime,
  formatDate,
  getLanguageName,
  formatNumber,
  getReleaseDate,
  getTitle,
  getRuntime,
} from "@/utils";
import { Card } from "@/components/shared/Card";
import Slider from "@/components/shared/Slider/slider";
import ProductionSection from "@/components/sections/ProductionSection";

interface MediaInfoSectionProps {
  media: MediaDetails;
}

// Memoized MediaInfoSection component - avoids re-renders when parent updates
const MediaInfoSection = memo(function MediaInfoSection({
  media,
}: MediaInfoSectionProps) {
  // Memoized: Pre-calculated values
  const title = useMemo(() => getTitle(media), [media]);
  const releaseDate = useMemo(() => getReleaseDate(media), [media]);
  const runtime = useMemo(() => getRuntime(media), [media]);

  // Memoized: Build metadata rows dynamically - avoids array operations on every render
  const metadataRows = useMemo(() => {
    const rows = [
      {
        label: "Genres",
        value:
          media.genres && media.genres.length > 0
            ? media.genres.map((g: Genre) => g.name).join(", ")
            : "",
      },
      {
        label: "Release Date",
        value: releaseDate ? formatDate(releaseDate) : "",
      },
      {
        label: "Runtime",
        value: runtime ? formatRuntime(runtime) : "",
      },
      {
        label: "Original Language",
        value: media.original_language
          ? getLanguageName(media.original_language)
          : "",
      },
      {
        label: "Rating",
        value: media.vote_average
          ? `⭐ ${media.vote_average.toFixed(1)} (${formatNumber(media.vote_count)} votes)`
          : "",
      },
      {
        label: "Status",
        value: media.status && media.status !== "Released" ? media.status : "",
      },
      {
        label: "Production",
        value: "",
        component:
          media.production_companies &&
          media.production_companies.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {media.production_companies.map((c, index) => (
                <Link
                  key={c.id}
                  to={`/company/${c.id}`}
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
                  About {title}
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
                  Cast
                </h3>
                <Slider
                  slidesPerView={4}
                  slidesPerViewMobile={1.5}
                  spaceBetween={16}
                  hideNavigation={false}
                >
                  {topCast.map((actor) => (
                    <Card
                      key={actor.id}
                      variant="person"
                      person={{
                        id: actor.id,
                        name: actor.name,
                        profileImage: actor.profile_path,
                        role: actor.character || "Unknown role",
                      }}
                    />
                  ))}
                </Slider>
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
                      Production Countries
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
                    Available In
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
                    Budget
                  </span>
                  <p className="text-base text-gray-200 font-normal">
                    ${formatNumber(media.budget)}
                  </p>
                </div>
              )}

              {"budget" in media && media.revenue && media.revenue > 0 && (
                <div className="space-y-1.5 pt-4 border-t border-zinc-800">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Revenue
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
        />
      </div>
    </section>
  );
});

export default MediaInfoSection;

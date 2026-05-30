import { memo, useMemo, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import type { CastMember, CrewMember } from "@/types";
import { SectionSkeleton } from "@/components/ui";
import OptimizedImage from "@/components/ui/OptimizedImage";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { buildMediaUrl } from "@/utils/url";
import { getLocalizedLink } from "@/lib/utils/i18n";
import { filterKeyCrew } from "@/utils";
import { useTranslation } from "react-i18next";

// Lazy-loaded component
const Slider = lazy(() => import("@/components/shared/Slider/slider"));

interface FullCreditsSectionProps {
  cast: CastMember[];
  crew: CrewMember[];
}

// Memoized FullCreditsSection component - avoids re-renders when parent updates
const FullCreditsSection = memo(function FullCreditsSection({
  cast,
  crew,
}: FullCreditsSectionProps) {
  const { t } = useTranslation();
  // Memoized: Top billed cast (limit to 20)
  const topBilledCast = useMemo(() => cast.slice(0, 20), [cast]);

  // Memoized: Filter crew to show only key roles
  const keyCrew = useMemo(() => filterKeyCrew(crew), [crew]);

  // Don't render if no cast or crew data
  if (topBilledCast.length === 0 && keyCrew.length === 0) {
    return null;
  }

  return (
    <section className="bg-black py-4 md:py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        {/* Top Billed Cast Section */}
        {topBilledCast.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
              {t("media.topCast")}
            </h2>
            <Suspense
              fallback={<SectionSkeleton variant="grid" cardCount={6} />}
            >
              <LazyWrapper height={350}>
                <Slider
                  slidesPerView={4}
                  slidesPerViewMobile={3}
                  spaceBetween={16}
                  hideNavigation={false}
                >
                  {topBilledCast.map((actor) => {
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
                            {actor.character || "Unknown role"}
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

        {/* Crew Section */}
        {keyCrew.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
              {t("people.crew")}
            </h2>
            <Suspense
              fallback={<SectionSkeleton variant="grid" cardCount={6} />}
            >
              <LazyWrapper height={350}>
                <Slider
                  slidesPerView={4}
                  slidesPerViewMobile={3}
                  spaceBetween={16}
                  hideNavigation={false}
                >
                  {keyCrew.map((member) => {
                    const memberImage = member.profile_path
                      ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                      : null;
                    return (
                      <Link
                        key={member.id}
                        to={getLocalizedLink(buildMediaUrl("person", member.name || "", member.id))}
                        className="group relative block touch-manipulation"
                      >
                        <div className="relative rounded-md bg-zinc-900 shadow-lg transition-all duration-300 ease-in-out group-hover:shadow-2xl">
                          <div className="relative aspect-[2/3]">
                            {memberImage ? (
                              <>
                                <OptimizedImage
                                  src={memberImage}
                                  alt={member.name}
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
                            {member.name}
                          </p>
                          <p className="text-xs text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                            {member.job}
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
    </section>
  );
});

export default FullCreditsSection;

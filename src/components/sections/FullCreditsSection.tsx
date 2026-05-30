import { memo, useMemo, lazy, Suspense } from "react";
import type { CastMember, CrewMember } from "@/types";
import { SectionSkeleton } from "@/components/ui";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { filterKeyCrew } from "@/utils";
import PersonCard from "@/components/shared/MediaCard/PersonCard";
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
      <div className="container">
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
                    {topBilledCast.map((actor) => (
                      <PersonCard
                        key={actor.id}
                        id={actor.id}
                        name={actor.name}
                        profilePath={actor.profile_path}
                        role={actor.character || "Unknown role"}
                      />
                    ))}
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
                  {keyCrew.map((member) => (
                    <PersonCard
                      key={member.id}
                      id={member.id}
                      name={member.name}
                      profilePath={member.profile_path}
                      role={member.job}
                    />
                  ))}
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

import { memo, useMemo } from "react";
import type { CastMember } from "@/types";
import { Card } from "@/components/shared/Card";
import Slider from "@/components/shared/Slider/slider";
import { filterKeyCrew, type CrewMember } from "@/utils";

interface FullCreditsSectionProps {
  cast: CastMember[];
  crew: CrewMember[];
}

// Memoized FullCreditsSection component - avoids re-renders when parent updates
const FullCreditsSection = memo(function FullCreditsSection({
  cast,
  crew,
}: FullCreditsSectionProps) {
  // Memoized: Top billed cast (limit to 20)
  const topBilledCast = useMemo(() => cast.slice(0, 20), [cast]);

  // Memoized: Filter crew to show only key roles
  const keyCrew = useMemo(() => filterKeyCrew(crew), [crew]);

  // Don't render if no cast or crew data
  if (topBilledCast.length === 0 && keyCrew.length === 0) {
    return null;
  }

  return (
    <section className="bg-black py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        {/* Top Billed Cast Section */}
        {topBilledCast.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
              Top Billed Cast
            </h2>
            <Slider
              slidesPerView={6}
              slidesPerViewMobile={3}
              spaceBetween={16}
              hideNavigation={false}
            >
              {topBilledCast.map((actor) => (
                <Card
                  key={actor.id}
                  variant="person"
                  person={{
                    id: actor.id,
                    name: actor.name,
                    profileImage: actor.profile_path,
                    role: actor.character || "Unknown role"
                  }}
                />
              ))}
            </Slider>
          </div>
        )}

        {/* Crew Section */}
        {keyCrew.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
              Crew
            </h2>
            <Slider
              slidesPerView={6}
              slidesPerViewMobile={3}
              spaceBetween={16}
              hideNavigation={false}
            >
              {keyCrew.map((member) => (
                <Card
                  key={member.id}
                  variant="person"
                  person={{
                    id: member.id,
                    name: member.name,
                    profileImage: member.profile_path,
                    role: member.job
                  }}
                />
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
});

export default FullCreditsSection;

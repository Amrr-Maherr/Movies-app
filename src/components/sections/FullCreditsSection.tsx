import type { CastMember } from "@/types";
import PersonCard from "@/components/shared/cards/PersonCard";
import Slider from "@/components/shared/Slider/slider";
import { filterKeyCrew, type CrewMember } from "@/utils";

interface FullCreditsSectionProps {
  cast: CastMember[];
  crew: CrewMember[];
}

export default function FullCreditsSection({
  cast,
  crew,
}: FullCreditsSectionProps) {
  // Limit cast to top 20 billed actors
  const topBilledCast = cast.slice(0, 20);

  // Filter crew to show only key roles
  const keyCrew = filterKeyCrew(crew);

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
                <PersonCard
                  key={actor.id}
                  id={actor.id}
                  name={actor.name}
                  profileImage={actor.profile_path}
                  role={actor.character || "Unknown role"}
                  type="cast"
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
                <PersonCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  profileImage={member.profile_path}
                  role={member.job}
                  type="crew"
                />
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
}

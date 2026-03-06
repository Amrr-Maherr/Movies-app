import type { CastMember } from "@/types";
import PersonCard from "@/components/shared/cards/PersonCard";
import Slider from "@/components/shared/Slider/slider";

// Crew member interface for TMDB crew data
interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

interface FullCreditsSectionProps {
  cast: CastMember[];
  crew: CrewMember[];
}

// Key crew jobs to display in the Crew section
const KEY_CREW_JOBS = [
  "Director",
  "Producer",
  "Writer",
  "Screenplay",
  "Executive Producer",
  "Director of Photography",
  "Editor",
  "Original Music Composer",
  "Production Design",
  "Casting",
];

/**
 * Filters and sorts crew members to show only key roles
 */
function filterKeyCrew(crew: CrewMember[]): CrewMember[] {
  const filtered = crew.filter((member) =>
    KEY_CREW_JOBS.includes(member.job)
  );

  // Remove duplicates by job (keep first occurrence)
  const uniqueJobs = new Map<string, CrewMember>();
  filtered.forEach((member) => {
    if (!uniqueJobs.has(member.job)) {
      uniqueJobs.set(member.job, member);
    }
  });

  return Array.from(uniqueJobs.values());
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

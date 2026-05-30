import { useMemo, memo } from "react";
import type { PersonDetails, CastCredit, CrewCredit } from "@/features/people/api/personService";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { formatDate, calculateAge } from "@/utils";
import ActorStats from "./ActorStats";
import BiographyPreview from "./BiographyPreview";
import ActorActions from "./ActorActions";

interface PersonHeroProps {
  person: PersonDetails;
  cast?: CastCredit[];
  crew?: CrewCredit[];
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const PersonHero = memo(function PersonHero({
  person,
  cast = [],
  crew = [],
}: PersonHeroProps) {
  const profileUrl = useMemo(
    () =>
      person.profile_path
        ? `${IMAGE_BASE_URL}/h632${person.profile_path}`
        : null,
    [person.profile_path],
  );

  const bgUrl = useMemo(
    () =>
      person.profile_path
        ? `${IMAGE_BASE_URL}/original${person.profile_path}`
        : null,
    [person.profile_path],
  );

  const formattedBirthday = useMemo(
    () => formatDate(person.birthday),
    [person.birthday],
  );

  const age = useMemo(
    () => calculateAge(person.birthday, person.deathday),
    [person.birthday, person.deathday],
  );

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* ── Background Layer ── */}
      {bgUrl ? (
        <div className="absolute inset-0">
          <div className="absolute inset-0 scale-110 blur-3xl opacity-30">
            <OptimizedImage
              src={bgUrl}
              alt=""
              className="w-full h-full"
              objectFit="cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_black_100%)] opacity-60" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-950" />
      )}

      {/* ── Foreground Content ── */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16 min-h-screen flex items-center">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 lg:gap-16 w-full py-20 md:py-24">
          {/* ── Profile Image ── */}
          <div className="flex-shrink-0">
            <div className="group relative">
              {profileUrl ? (
                <div className="relative w-48 h-72 md:w-64 md:h-96 lg:w-72 lg:h-[28rem] overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl shadow-black/50 transition-all duration-500 ease-out group-hover:ring-white/20 group-hover:shadow-3xl group-hover:shadow-black/60 group-hover:scale-[1.02]">
                  <OptimizedImage
                    src={profileUrl}
                    alt={person.name}
                    className="w-full h-full"
                    objectFit="cover"
                    priority
                  />
                </div>
              ) : (
                <div className="w-48 h-72 md:w-64 md:h-96 lg:w-72 lg:h-[28rem] bg-zinc-800 rounded-2xl flex items-center justify-center ring-1 ring-white/10">
                  <svg
                    className="w-20 h-20 text-zinc-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* ── Main Information ── */}
          <div className="flex-1 text-center md:text-left space-y-6 max-w-3xl">
            {/* Name */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight hero-title">
              {person.name}
            </h1>

            {/* Department + Meta */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2">
              {person.known_for_department && (
                <span className="inline-flex items-center bg-[var(--netflix-red)] text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  {person.known_for_department}
                </span>
              )}
              {formattedBirthday && (
                <span className="text-gray-400 text-sm">
                  {formattedBirthday}
                  {age !== null && (
                    <span className="text-gray-500 ml-1">({age} years)</span>
                  )}
                </span>
              )}
              {person.place_of_birth && (
                <span className="text-gray-500 text-sm hidden sm:inline-flex items-center">
                  <span className="mr-2 text-gray-600">•</span>
                  {person.place_of_birth}
                </span>
              )}
            </div>

            {/* Statistics */}
            <ActorStats
              birthday={person.birthday}
              deathday={person.deathday}
              popularity={person.popularity}
              cast={cast}
              crew={crew}
              className="justify-center md:justify-start"
            />

            {/* Biography Preview */}
            <BiographyPreview biography={person.biography} />

            {/* Action Buttons */}
            <ActorActions name={person.name} />
          </div>
        </div>
      </div>
    </section>
  );
});

export default PersonHero;

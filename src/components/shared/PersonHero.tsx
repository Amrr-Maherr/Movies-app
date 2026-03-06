import { useMemo } from "react";
import type { PersonDetails } from "@/api/PersonDetails";

interface PersonHeroProps {
  person: PersonDetails;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

/**
 * Formats a date string to a readable format
 */
function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

/**
 * Calculates age from birthday and optional deathday
 */
function calculateAge(birthday: string | null, deathday: string | null): number | null {
  if (!birthday) return null;
  const birth = new Date(birthday);
  const end = deathday ? new Date(deathday) : new Date();
  let age = end.getFullYear() - birth.getFullYear();
  const monthDiff = end.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && end.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export default function PersonHero({ person }: PersonHeroProps) {
  const profileUrl = useMemo(() => {
    return person.profile_path
      ? `${IMAGE_BASE_URL}${person.profile_path}`
      : null;
  }, [person.profile_path]);

  const formattedBirthday = useMemo(() => formatDate(person.birthday), [person.birthday]);
  const formattedDeathday = useMemo(() => formatDate(person.deathday), [person.deathday]);
  const age = useMemo(() => calculateAge(person.birthday, person.deathday), [person.birthday, person.deathday]);

  return (
    <div className="relative w-full min-h-[60vh] md:min-h-[70vh] bg-gradient-to-b from-zinc-900 to-black">
      {/* Background Blur Effect */}
      {profileUrl && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 blur-3xl"
            style={{ backgroundImage: `url(${profileUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-zinc-900" />
        </>
      )}

      {/* Content Container */}
      <div className="relative container mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Profile Image */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="relative">
              {profileUrl ? (
                <img
                  src={profileUrl}
                  alt={person.name}
                  className="w-64 md:w-80 rounded-lg shadow-2xl border-2 border-white/20"
                  loading="eager"
                />
              ) : (
                <div className="w-64 md:w-80 aspect-[2/3] bg-zinc-800 rounded-lg flex items-center justify-center border-2 border-white/10">
                  <svg
                    className="w-32 h-32 text-zinc-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Person Info */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            {/* Name */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {person.name}
            </h1>

            {/* Known For Department */}
            {person.known_for_department && (
              <div className="inline-block bg-[var(--netflix-red)] text-white px-4 py-2 rounded-full font-semibold text-sm">
                {person.known_for_department}
              </div>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-300">
              {/* Birthday */}
              {formattedBirthday && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Born:</span>
                  <span className="font-medium">{formattedBirthday}</span>
                  {age !== null && (
                    <span className="text-gray-500">
                      ({age}{person.deathday ? ` - ${age}` : ''} years)
                    </span>
                  )}
                </div>
              )}

              {/* Deathday */}
              {formattedDeathday && (
                <>
                  <span className="text-gray-500">•</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Died:</span>
                    <span className="font-medium">{formattedDeathday}</span>
                  </div>
                </>
              )}

              {/* Birthplace */}
              {person.place_of_birth && (
                <>
                  <span className="text-gray-500">•</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">From:</span>
                    <span className="font-medium">{person.place_of_birth}</span>
                  </div>
                </>
              )}
            </div>

            {/* Also Known As */}
            {person.also_known_as && person.also_known_as.length > 0 && (
              <div className="space-y-2">
                <span className="text-gray-400 text-sm">Also Known As:</span>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {person.also_known_as.slice(0, 5).map((alias, index) => (
                    <span
                      key={index}
                      className="text-sm text-gray-300 bg-zinc-800 px-3 py-1 rounded-full"
                    >
                      {alias}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

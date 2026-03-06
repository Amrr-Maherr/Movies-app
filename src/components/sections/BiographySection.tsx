import { useMemo } from "react";

interface BiographySectionProps {
  biography: string;
  placeOfBirth?: string | null;
  birthday?: string | null;
  deathday?: string | null;
  knownForDepartment?: string;
}

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

export default function BiographySection({
  biography,
  placeOfBirth,
  birthday,
  deathday,
  knownForDepartment,
}: BiographySectionProps) {
  const formattedBirthday = useMemo(() => formatDate(birthday ?? null), [birthday]);
  const formattedDeathday = useMemo(() => formatDate(deathday ?? null), [deathday]);
  const age = useMemo(() => calculateAge(birthday ?? null, deathday ?? null), [birthday, deathday]);

  // Truncate biography for initial display (optional expandable feature)
  const displayBiography = useMemo(() => {
    if (!biography) return "No biography available.";
    return biography;
  }, [biography]);

  return (
    <section className="bg-black py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Biography */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Biography
            </h2>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-4xl">
              {displayBiography}
            </p>
          </div>

          {/* Right Column - Personal Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Known For */}
            {knownForDepartment && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Known For
                </span>
                <p className="text-base text-gray-200 font-medium">
                  {knownForDepartment}
                </p>
              </div>
            )}

            {/* Birthday */}
            {formattedBirthday && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Born
                </span>
                <p className="text-base text-gray-200">
                  {formattedBirthday}
                  {age !== null && (
                    <span className="text-gray-400 ml-2">
                      ({age}{deathday ? ` - ${age}` : ''} years old)
                    </span>
                  )}
                </p>
              </div>
            )}

            {/* Deathday */}
            {formattedDeathday && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Died
                </span>
                <p className="text-base text-gray-200">
                  {formattedDeathday}
                </p>
              </div>
            )}

            {/* Place of Birth */}
            {placeOfBirth && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Birthplace
                </span>
                <p className="text-base text-gray-200">
                  {placeOfBirth}
                </p>
              </div>
            )}

            {/* Also Known As */}
            {/* Can be added if needed from also_known_as array */}
          </div>
        </div>
      </div>
    </section>
  );
}

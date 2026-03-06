/**
 * Calculates age from birthday and optional deathday.
 *
 * @param birthday - Birth date string in ISO format or null
 * @param deathday - Death date string in ISO format or null (uses current date if null)
 * @returns Age in years, or null if birthday is not provided
 *
 * @example
 * calculateAge("1990-01-15", null) // 36 (current age)
 * calculateAge("1990-01-15", "2020-06-01") // 30 (age at death)
 */
export function calculateAge(birthday: string | null, deathday: string | null): number | null {
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

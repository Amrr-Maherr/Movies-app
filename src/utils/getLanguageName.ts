/**
 * Gets language display name from ISO language code.
 *
 * @param code - ISO 639-1 language code (e.g., "en", "es", "fr")
 * @returns Language display name in English, or empty string if invalid
 *
 * @example
 * getLanguageName("en") // "English"
 * getLanguageName("es") // "Spanish"
 * getLanguageName("") // ""
 */
export function getLanguageName(code: string): string {
  if (!code) return "";
  try {
    const displayNames = new Intl.DisplayNames(["en"], { type: "language" });
    return displayNames.of(code) || "";
  } catch {
    return "";
  }
}

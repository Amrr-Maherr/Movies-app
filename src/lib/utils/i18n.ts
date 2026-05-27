import i18n from '@/lib/i18n';

const SUPPORTED_LANGS = ['en', 'ar'];
const DEFAULT_LANG = 'en';

/**
 * Get localized link with language prefix
 * @param path - The original path (relative, e.g. "/home" or "home")
 * @param lang - Optional language code. Defaults to current i18n language.
 * @returns Localized path with language prefix
 */
export function getLocalizedLink(path: string, lang?: string): string {
  const currentLang = lang || i18n.language || DEFAULT_LANG;
  
  if (!path) return `/${currentLang}`;
  
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `/${currentLang}${cleanPath}`;
}

/**
 * Get localized URL with language prefix
 * @param path - The original path
 * @param lang - Optional language code
 * @returns Full localized URL with language prefix
 */
export function getLocalizedUrl(path: string, lang?: string): string {
  return getLocalizedLink(path, lang);
}

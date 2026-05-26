import i18n from '@/lib/i18n';

/**
 * Get localized link with language prefix
 * @param path - The original path (with or without language prefix)
 * @returns Localized path with current language prefix
 */
export function getLocalizedLink(path: string): string {
  const currentLang = i18n.language || 'en';
  
  // If path already has language prefix, update it
  const parts = path.split('/').filter(Boolean);
  if (parts.length > 0 && ['en', 'ar'].includes(parts[0])) {
    parts[0] = currentLang;
    return '/' + parts.join('/');
  }
  
  // Add language prefix
  return `/${currentLang}${path.startsWith('/') ? '' : '/'}${path}`;
}

/**
 * Get localized URL with language prefix
 * @param path - The original path
 * @returns Full localized URL with language prefix
 */
export function getLocalizedUrl(path: string): string {
  return getLocalizedLink(path);
}

import type { FooterLink as FooterLinkType } from "@/layout/types";
import { Link } from "react-router-dom";
import { memo } from "react";
import { useTranslation } from "react-i18next";

interface FooterLinkProps {
  link: FooterLinkType;
}

/**
 * Memoized FooterLink Component
 *
 * Renders a single link in the footer.
 * Memoized to prevent unnecessary re-renders when footer updates.
 */
const FooterLink = memo(function FooterLink({ link }: FooterLinkProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  
  // Update link to include current language
  const getLocalizedLink = (originalLink: string) => {
    const parts = originalLink.split('/').filter(Boolean);
    if (parts.length > 0 && ['en', 'ar'].includes(parts[0])) {
      parts[0] = currentLang;
      return '/' + parts.join('/');
    }
    return `/${currentLang}${originalLink.startsWith('/') ? '' : '/'}${originalLink}`;
  };
  
  const localizedLink = getLocalizedLink(link.href);
  
  return (
    <Link
      to={localizedLink}
      className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 no-underline"
    >
      {t(link.title)}
    </Link>
  );
});

export default FooterLink;

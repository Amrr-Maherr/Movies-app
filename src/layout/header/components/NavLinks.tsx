import { HeaderLink } from "@/layout/types";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { useTranslation } from "react-i18next";

interface NavLinksProps {
  link: HeaderLink;
  onClick?: () => void;
}

/**
 * Memoized NavLinks Component
 *
 * Renders a navigation link in the header.
 * Memoized to prevent unnecessary re-renders when header updates.
 */
const NavLinks = memo(function NavLinks({ link, onClick }: NavLinksProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  
  // Update link to include current language
  const getLocalizedLink = (originalLink: string) => {
    // If link already has language prefix, update it
    const parts = originalLink.split('/').filter(Boolean);
    if (parts.length > 0 && ['en', 'ar'].includes(parts[0])) {
      parts[0] = currentLang;
      return '/' + parts.join('/');
    }
    // Add language prefix
    return `/${currentLang}${originalLink.startsWith('/') ? '' : '/'}${originalLink}`;
  };
  
  const localizedLink = getLocalizedLink(link.link);
  
  return (
    <NavLink
      to={localizedLink}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "text-sm font-medium transition-colors duration-300 ease-in-out no-underline",
          "hover:text-[var(--text-secondary)]",
          isActive
            ? "font-semibold text-[var(--text-primary)]"
            : "text-[var(--text-secondary)]",
        )
      }
    >
      {t(link.title)}
    </NavLink>
  );
});

export default NavLinks;

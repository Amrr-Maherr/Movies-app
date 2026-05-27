import type { FooterLink as FooterLinkType } from "@/layout/types";
import { Link } from "react-router-dom";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { getLocalizedLink } from "@/lib/utils/i18n";

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
  const { t } = useTranslation();
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

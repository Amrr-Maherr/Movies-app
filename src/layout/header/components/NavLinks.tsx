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
  const { t } = useTranslation('common');
  
  return (
    <NavLink
      to={link.link}
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

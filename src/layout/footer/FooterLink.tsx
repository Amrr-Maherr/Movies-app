import type { FooterLink as FooterLinkType } from "@/types/footer";
import { Link } from "react-router-dom";
import { memo } from "react";

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
  return (
    <Link
      to={link.href}
      className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 no-underline"
    >
      {link.title}
    </Link>
  );
});

export default FooterLink;

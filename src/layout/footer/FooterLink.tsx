import type { FooterLink as FooterLinkType } from "@/types/footer";
import { Link } from "react-router-dom";

interface FooterLinkProps {
  link: FooterLinkType;
}

export default function FooterLink({ link }: FooterLinkProps) {
  return (
    <Link
      to={link.href}
      className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 no-underline"
    >
      {link.title}
    </Link>
  );
}

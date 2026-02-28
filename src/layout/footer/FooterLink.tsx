import { FooterLinks } from "@/data/footer";
import { Link } from "react-router-dom";

export default function FooterLink({ link }: { link: typeof FooterLinks[0] }) {
  return (
    <Link
      to={link.href}
      className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 no-underline"
    >
      {link.title}
    </Link>
  );
}

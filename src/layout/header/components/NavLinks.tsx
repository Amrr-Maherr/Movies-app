import { HeaderLink } from "@/types/header";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinksProps {
  link: HeaderLink;
  onClick?: () => void;
}

export default function NavLinks({ link, onClick }: NavLinksProps) {
  return (
    <NavLink
      to={link.link}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "text-sm font-medium transition-colors duration-300 ease-in-out no-underline",
          "hover:text-[var(--text-secondary)]",
          isActive ? "font-semibold text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
        )
      }
    >
      {link.title}
    </NavLink>
  );
}

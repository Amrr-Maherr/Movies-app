import type { HeaderLink } from "@/types/header";
import { NavLink } from "react-router-dom";
// import {NavLink} from "react-router-dom"

export default function NavLinks({ link }: { link: HeaderLink}) {
  return (
    <NavLink
      to={link.link}
      className={({ isActive }) =>
        `text-sm font-medium transition-colors duration-300 ease-in-out no-underline ${
          isActive ? "font-semibold text-[var(--netflix-red)]" : "text-[var(--header-text)]"
        }`
      }
    >
      {link.title}
    </NavLink>
  );
}

import FooterLink from "./FooterLink";
import { FooterLinks, SocialLinks } from "@/data/footer";
import { Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" bg-[var(--background-primary)] text-[var(--text-primary)] py-16">
      <div className="container">
        {/* Social Links */}
        <div className="flex gap-4 mb-8">
          {SocialLinks.map((social) => (
            <a
              key={social.platform}
              href={social.href}
              className="text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors duration-300"
              aria-label={social.ariaLabel}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {FooterLinks.map((link, index) => (
            <FooterLink key={index} link={link} />
          ))}
        </div>

        {/* Service Code Button */}
        <button className="text-sm text-[var(--text-secondary)] border border-[var(--text-secondary)] px-4 py-2 mb-6 hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-colors duration-300 bg-transparent cursor-pointer">
          Service Code
        </button>

        {/* Copyright and Language */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[var(--text-secondary)]" />
            <span className="text-sm text-[var(--text-secondary)]">English</span>
          </div>
          <span className="text-xs text-[var(--text-secondary)]">
            © 1997-2026 Netflix, Inc.
          </span>
        </div>
      </div>
    </footer>
  );
}

import type { FooterLink, SocialLink } from "@/types/footer";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

/**
 * Footer navigation links
 * Displayed in the footer navigation grid
 */
export const FooterLinks: FooterLink[] = [
  { title: "FAQ", href: "/faq" },
  { title: "Help Center", href: "/help-center" },
  { title: "Account", href: "/account" },
  { title: "Media Center", href: "/media-center" },
  { title: "Investor Relations", href: "/investor-relations" },
  { title: "Jobs", href: "/jobs" },
  { title: "Ways to Watch", href: "/ways-to-watch" },
  { title: "Terms of Use", href: "/terms-of-use" },
  { title: "Privacy", href: "/privacy" },
  { title: "Cookie Preferences", href: "/cookie-preferences" },
  { title: "Corporate Information", href: "/corporate-information" },
  { title: "Contact Us", href: "/contact-us" },
  { title: "Speed Test", href: "/speed-test" },
  { title: "Legal Notices", href: "/legal-notices" },
  { title: "Only on Netflix", href: "/only-on-netflix" },
];

/**
 * Social media links
 * Displayed in the footer social section
 */
export const SocialLinks: SocialLink[] = [
  {
    platform: "Facebook",
    href: "#",
    ariaLabel: "Facebook",
    icon: <Facebook className="w-6 h-6" />,
  },
  {
    platform: "Instagram",
    href: "#",
    ariaLabel: "Instagram",
    icon: <Instagram className="w-6 h-6" />,
  },
  {
    platform: "Twitter",
    href: "#",
    ariaLabel: "Twitter",
    icon: <Twitter className="w-6 h-6" />,
  },
  {
    platform: "YouTube",
    href: "#",
    ariaLabel: "YouTube",
    icon: <Youtube className="w-6 h-6" />,
  },
];

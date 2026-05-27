import type { FooterLink, SocialLink } from "@/layout/types";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

/**
 * Footer navigation links
 * Displayed in the footer navigation grid
 */
export const FooterLinks: FooterLink[] = [
  { title: "footer.faq", href: "/faq" },
  { title: "footer.help", href: "/help-center" },
  { title: "footer.account", href: "/account" },
  { title: "footer.mediaCenter", href: "/media-center" },
  { title: "footer.investorRelations", href: "/investor-relations" },
  { title: "footer.jobs", href: "/jobs" },
  { title: "footer.waysToWatch", href: "/ways-to-watch" },
  { title: "footer.termsOfUse", href: "/terms-of-use" },
  { title: "footer.privacy", href: "/privacy" },
  { title: "footer.cookiePreferences", href: "/cookie-preferences" },
  { title: "footer.corporateInformation", href: "/corporate-information" },
  { title: "footer.contact", href: "/contact-us" },
  { title: "footer.speedTest", href: "/speed-test" },
  { title: "footer.legalNotices", href: "/legal-notices" },
  { title: "footer.onlyOnNetflix", href: "/only-on-netflix" },
];

/**
 * Social media links
 * Displayed in the footer social section
 */
export const SocialLinks: SocialLink[] = [
  {
    platform: "Facebook",
    href: "#",
    ariaLabel: "footer.social.facebook",
    icon: <Facebook className="w-6 h-6" />,
  },
  {
    platform: "Instagram",
    href: "#",
    ariaLabel: "footer.social.instagram",
    icon: <Instagram className="w-6 h-6" />,
  },
  {
    platform: "Twitter",
    href: "#",
    ariaLabel: "footer.social.twitter",
    icon: <Twitter className="w-6 h-6" />,
  },
  {
    platform: "YouTube",
    href: "#",
    ariaLabel: "footer.social.youtube",
    icon: <Youtube className="w-6 h-6" />,
  },
];

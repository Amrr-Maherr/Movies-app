import type { FooterLink, SocialLink } from "@/layout/types";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

/**
 * Footer navigation links
 * Displayed in the footer navigation grid
 */
export const FooterLinks: FooterLink[] = [
  { title: "footer.faq", href: "/en/faq" },
  { title: "footer.help", href: "/en/help-center" },
  { title: "footer.account", href: "/en/account" },
  { title: "footer.mediaCenter", href: "/en/media-center" },
  { title: "footer.investorRelations", href: "/en/investor-relations" },
  { title: "footer.jobs", href: "/en/jobs" },
  { title: "footer.waysToWatch", href: "/en/ways-to-watch" },
  { title: "footer.termsOfUse", href: "/en/terms-of-use" },
  { title: "footer.privacy", href: "/en/privacy" },
  { title: "footer.cookiePreferences", href: "/en/cookie-preferences" },
  { title: "footer.corporateInformation", href: "/en/corporate-information" },
  { title: "footer.contact", href: "/en/contact-us" },
  { title: "footer.speedTest", href: "/en/speed-test" },
  { title: "footer.legalNotices", href: "/en/legal-notices" },
  { title: "footer.onlyOnNetflix", href: "/en/only-on-netflix" },
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

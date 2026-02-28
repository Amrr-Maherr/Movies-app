/**
 * Footer Link type definition
 * Used for navigation links in the footer
 */
export interface FooterLink {
  title: string;
  href: string;
}

/**
 * Social Media Link type definition
 * Used for social media links in the footer
 */
export interface SocialLink {
  platform: string;
  href: string;
  ariaLabel: string;
  icon: React.ReactNode;
}

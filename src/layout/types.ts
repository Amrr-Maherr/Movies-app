export interface HeaderLink {
  title: string;
  link: string;
}

export interface FooterLink {
  title: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  ariaLabel: string;
  icon: React.ReactNode;
}

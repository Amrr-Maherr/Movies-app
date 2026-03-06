import { useMemo } from "react";
import { Github, Twitter, Instagram, Globe, Film } from "lucide-react";

interface SocialLinksSectionProps {
  imdbId?: string | null;
  twitterId?: string | null;
  instagramId?: string | null;
  facebookId?: string | null;
  wikidataId?: string | null;
  homepage?: string | null;
}

interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: React.ReactNode;
}

export default function SocialLinksSection({
  imdbId,
  twitterId,
  instagramId,
  facebookId,
  wikidataId,
  homepage,
}: SocialLinksSectionProps) {
  const socialLinks = useMemo(() => {
    const links: SocialLink[] = [];

    if (imdbId) {
      links.push({
        id: "imdb",
        label: "IMDb",
        url: `https://www.imdb.com/name/${imdbId}/`,
        icon: <Film className="w-5 h-5" />,
      });
    }

    if (twitterId) {
      links.push({
        id: "twitter",
        label: "Twitter",
        url: `https://twitter.com/${twitterId}`,
        icon: <Twitter className="w-5 h-5" />,
      });
    }

    if (instagramId) {
      links.push({
        id: "instagram",
        label: "Instagram",
        url: `https://www.instagram.com/${instagramId}/`,
        icon: <Instagram className="w-5 h-5" />,
      });
    }

    if (facebookId) {
      links.push({
        id: "facebook",
        label: "Facebook",
        url: `https://www.facebook.com/${facebookId}`,
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        ),
      });
    }

    if (wikidataId) {
      links.push({
        id: "wikidata",
        label: "Wikidata",
        url: `https://www.wikidata.org/wiki/${wikidataId}`,
        icon: <Github className="w-5 h-5" />,
      });
    }

    if (homepage) {
      links.push({
        id: "homepage",
        label: "Website",
        url: homepage,
        icon: <Globe className="w-5 h-5" />,
      });
    }

    return links;
  }, [imdbId, twitterId, instagramId, facebookId, wikidataId, homepage]);

  if (socialLinks.length === 0) {
    return null;
  }

  return (
    <section className="bg-black py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
          Social Links
        </h2>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 rounded-full transition-colors duration-200 group"
            >
              <span className="text-white group-hover:text-[var(--netflix-red)] transition-colors">
                {link.icon}
              </span>
              <span className="text-sm font-medium">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

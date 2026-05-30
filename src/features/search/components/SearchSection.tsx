import { memo, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, User } from "lucide-react";
import { motion } from "framer-motion";
import Card from "@/components/shared/Card/Card";
import OptimizedImage from "@/components/ui/OptimizedImage";
import type { HeroMedia } from "@/types";
import { buildMediaUrl } from "@/utils/url";
import { getLocalizedLink } from "@/lib/utils/i18n";

// ── Section-specific configuration ─────────────────────────────

interface SearchSectionConfig {
  /** Section heading text */
  title: string;
  /** Icon shown in header */
  icon: ReactNode;
  /** Header gradient: from → to colors */
  gradient: string;
  /** Badge background color */
  badgeBg: string;
  /** Badge text color */
  badgeText: string;
  /** "View all" link text color */
  linkColor: string;
  /** "View all" link hover color */
  linkHoverColor: string;
  /** Type query param value */
  typeParam: string;
  /** Max items to display */
  maxDisplay: number;
  /** Grid column classes */
  gridCols: string;
}

const CONFIGS = (t: (key: string) => string): Record<string, SearchSectionConfig> => ({
  movie: {
    title: t('common:search.movies'),
    icon: (
      <svg
        className="w-4 h-4 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
        <line x1="17" y1="17" x2="22" y2="17" />
      </svg>
    ),
    gradient: "from-blue-500 to-cyan-500",
    badgeBg: "bg-blue-500/20",
    badgeText: "text-blue-400",
    linkColor: "text-blue-400",
    linkHoverColor: "hover:text-blue-300",
    typeParam: "movie",
    maxDisplay: 10,
    gridCols: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
  },
  tv: {
    title: t('common:search.tvShows'),
    icon: (
      <svg
        className="w-4 h-4 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
        <polyline points="17 2 12 7 7 2" />
      </svg>
    ),
    gradient: "from-purple-500 to-pink-500",
    badgeBg: "bg-purple-500/20",
    badgeText: "text-purple-400",
    linkColor: "text-purple-400",
    linkHoverColor: "hover:text-purple-300",
    typeParam: "tv",
    maxDisplay: 10,
    gridCols: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
  },
  person: {
    title: t('common:search.people'),
    icon: (
      <svg
        className="w-4 h-4 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    gradient: "from-orange-500 to-red-500",
    badgeBg: "bg-orange-500/20",
    badgeText: "text-orange-400",
    linkColor: "text-orange-400",
    linkHoverColor: "hover:text-orange-300",
    typeParam: "person",
    maxDisplay: 8,
    gridCols: "grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8",
  },
});

// ── Props ──────────────────────────────────────────────────────

interface SearchSectionProps {
  type: "movie" | "tv" | "person";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: { item: any }[];
  query: string;
  onClose: () => void;
}

const SearchSection = memo(function SearchSection({
  type,
  results,
  query,
  onClose,
}: SearchSectionProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const cfg = CONFIGS(t)[type];
  if (!cfg) return null;

  const { maxDisplay, gridCols } = cfg;
  const visible = results.slice(0, maxDisplay);
  const currentLang = i18n.language || 'en';

  const handleViewAll = () => {
    navigate(`/${currentLang}/search?q=${encodeURIComponent(query)}&type=${cfg.typeParam}`);
    onClose();
  };

  return (
    <section>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${cfg.gradient}`}>
          {cfg.icon}
        </div>
        <h3 className="text-lg font-semibold text-white">{cfg.title}</h3>
        <span
          className={`px-2.5 py-0.5 rounded-full ${cfg.badgeBg} ${cfg.badgeText} text-xs font-medium`}
        >
          {results.length}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
        <motion.button
          onClick={handleViewAll}
          whileHover={{ x: 4 }}
          className={`flex items-center gap-1.5 text-xs font-medium ${cfg.linkColor} ${cfg.linkHoverColor} transition-colors`}
        >
          {t('common:search.viewAll')}
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>

      {/* Grid */}
      <div className={`grid ${gridCols} gap-4`}>
        {visible.map(({ item }) => {
          if (type === "person") {
            const personName = String(item.name);
            const personImage = item.profile_path
              ? `https://image.tmdb.org/t/p/w185${item.profile_path}`
              : null;
            return (
              <div key={String(item.id)}>
                <Link
                  to={getLocalizedLink(buildMediaUrl("person", personName, Number(item.id)))}
                  className="group relative block touch-manipulation"
                >
                  <div className="relative rounded-md bg-zinc-900 shadow-lg transition-all duration-300 ease-in-out group-hover:shadow-2xl">
                    <div className="relative aspect-[2/3]">
                      {personImage ? (
                        <>
                          <OptimizedImage
                            src={personImage}
                            alt={personName}
                            className="h-full w-full transition-transform duration-300 ease-in-out"
                            objectFit="cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
                        </>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-zinc-600">
                          <User size={48} />
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 rounded-md ring-2 ring-white/0 ring-offset-2 ring-offset-zinc-900 transition-all duration-300 group-focus-within:ring-white/50" />
                  </div>
                  <div className="mt-3 space-y-1 px-1">
                    <p className="text-sm font-medium text-white line-clamp-1 group-hover:text-[var(--netflix-red)] transition-colors duration-300">
                      {personName}
                    </p>
                    <p className="text-xs text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                      {t('common:search.actor')}
                    </p>
                  </div>
                </Link>
              </div>
            );
          }
          return (
            <Card
              key={String(item.id)}
              movie={item as unknown as HeroMedia}
            />
          );
        })}
      </div>

      {/* Showing X of Y */}
      {results.length > maxDisplay && (
        <p className="text-white/30 text-xs mt-3 text-center">
          {t('common:search.showingXOfY', { count: maxDisplay, total: results.length })}
        </p>
      )}
    </section>
  );
});

export default SearchSection;

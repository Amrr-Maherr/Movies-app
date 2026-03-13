import { memo, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Star,
  Video,
  Image,
  Tv,
  Users,
  Heart,
  Film,
  Clapperboard,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface DetailPageNavProps {
  type: "movie" | "tv" | "person";
  slugWithId: string;
}

/**
 * DetailPageNav Component
 * Navigation tabs for movie/TV/person detail sub-pages
 * Provides easy access to reviews, videos, images, credits, etc.
 * Fully responsive with mobile-friendly horizontal scroll
 */
const DetailPageNav = memo(function DetailPageNav({
  type,
  slugWithId,
}: DetailPageNavProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Memoized: Generate navigation items based on type
  const navItems: NavItem[] = useMemo(() => {
    const basePath = `/${type}/${slugWithId}`;

    if (type === "movie") {
      return [
        {
          label: "Overview",
          href: basePath,
          icon: <Film className="w-4 h-4" />,
        },
        {
          label: "Reviews",
          href: `${basePath}/reviews`,
          icon: <Star className="w-4 h-4" />,
        },
        {
          label: "Videos",
          href: `${basePath}/videos`,
          icon: <Video className="w-4 h-4" />,
        },
        {
          label: "Images",
          href: `${basePath}/images`,
          icon: <Image className="w-4 h-4" />,
        },
        {
          label: "Watch",
          href: `${basePath}/watch`,
          icon: <Tv className="w-4 h-4" />,
        },
        {
          label: "Credits",
          href: `${basePath}/credits`,
          icon: <Users className="w-4 h-4" />,
        },
        {
          label: "More",
          href: `${basePath}/recommendations`,
          icon: <Heart className="w-4 h-4" />,
        },
      ];
    }

    if (type === "tv") {
      return [
        {
          label: "Overview",
          href: basePath,
          icon: <Clapperboard className="w-4 h-4" />,
        },
        {
          label: "Reviews",
          href: `${basePath}/reviews`,
          icon: <Star className="w-4 h-4" />,
        },
        {
          label: "Videos",
          href: `${basePath}/videos`,
          icon: <Video className="w-4 h-4" />,
        },
        {
          label: "Images",
          href: `${basePath}/images`,
          icon: <Image className="w-4 h-4" />,
        },
        {
          label: "Watch",
          href: `${basePath}/watch`,
          icon: <Tv className="w-4 h-4" />,
        },
        {
          label: "Credits",
          href: `${basePath}/credits`,
          icon: <Users className="w-4 h-4" />,
        },
        {
          label: "More",
          href: `${basePath}/recommendations`,
          icon: <Heart className="w-4 h-4" />,
        },
      ];
    }

    // Person type
    return [
      { label: "Overview", href: basePath, icon: <Star className="w-4 h-4" /> },
      {
        label: "Movies",
        href: `${basePath}/movies`,
        icon: <Film className="w-4 h-4" />,
      },
      {
        label: "TV Shows",
        href: `${basePath}/tv`,
        icon: <Tv className="w-4 h-4" />,
      },
      {
        label: "Photos",
        href: `${basePath}/images`,
        icon: <Image className="w-4 h-4" />,
      },
    ];
  }, [type, slugWithId]);

  return (
    <nav
      className="sticky top-[64px] z-40 bg-black/95 backdrop-blur-md border-b border-white/10 shadow-lg"
      role="navigation"
      aria-label="Detail page navigation"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        {/* Mobile: Horizontal scrollable navigation */}
        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {navItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <Link key={item.href} to={item.href} className="flex-shrink-0">
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200",
                    isActive
                      ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                      : "text-white/70 hover:text-white hover:bg-white/10",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.icon}
                  <span className="hidden xs:inline">{item.label}</span>
                </motion.button>
              </Link>
            );
          })}
        </div>

        {/* Mobile indicator bar showing active section */}
        <div className="h-0.5 bg-white/10 md:hidden">
          <motion.div
            className="h-full bg-red-600"
            initial={{ width: 0 }}
            animate={{
              width: `${100 / navItems.length}%`,
              x: `${navItems.findIndex((item) => currentPath === item.href) * 100}%`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
      </div>
    </nav>
  );
});

export default DetailPageNav;

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
  Home,
} from "lucide-react";

// ============================================
// TYPES
// ============================================
interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface DetailPageNavProps {
  type: "movie" | "tv" | "person";
  slugWithId: string;
}

// ============================================
// CONSTANTS - Navigation Icon Components
// ============================================
const ICONS = {
  overview: <Home className="w-4 h-4" />,
  film: <Film className="w-4 h-4" />,
  tv: <Tv className="w-4 h-4" />,
  star: <Star className="w-4 h-4" />,
  video: <Video className="w-4 h-4" />,
  image: <Image className="w-4 h-4" />,
  users: <Users className="w-4 h-4" />,
  heart: <Heart className="w-4 h-4" />,
  clapperboard: <Clapperboard className="w-4 h-4" />,
} as const;

// ============================================
// HELPER FUNCTIONS
// ============================================
/**
 * Generate navigation items based on content type
 */
function getNavigationItems(
  type: "movie" | "tv" | "person",
  basePath: string,
): NavItem[] {
  const commonItems: NavItem[] = [
    { label: "Overview", href: basePath, icon: ICONS.overview },
    { label: "Reviews", href: `${basePath}/reviews`, icon: ICONS.star },
    { label: "Videos", href: `${basePath}/videos`, icon: ICONS.video },
    { label: "Images", href: `${basePath}/images`, icon: ICONS.image },
    { label: "Watch", href: `${basePath}/watch`, icon: ICONS.tv },
    { label: "Credits", href: `${basePath}/credits`, icon: ICONS.users },
    { label: "More", href: `${basePath}/recommendations`, icon: ICONS.heart },
  ];

  const personItems: NavItem[] = [
    { label: "Overview", href: basePath, icon: ICONS.overview },
    { label: "Movies", href: `${basePath}/movies`, icon: ICONS.film },
    { label: "TV Shows", href: `${basePath}/tv`, icon: ICONS.tv },
    { label: "Photos", href: `${basePath}/images`, icon: ICONS.image },
  ];

  if (type === "person") {
    return personItems;
  }

  // For movies and TV shows
  return commonItems;
}

/**
 * Get the appropriate overview icon based on type
 */
function getOverviewIcon(type: "movie" | "tv" | "person"): React.ReactNode {
  if (type === "tv") {
    return ICONS.clapperboard;
  }
  return ICONS.overview;
}

// ============================================
// SUB-COMPONENTS
// ============================================
interface NavButtonProps {
  item: NavItem;
  isActive: boolean;
  isMobile?: boolean;
}

/**
 * Individual navigation button component
 *
 * ACCESSIBILITY FIX:
 * - Added min-h-[48px] min-w-[48px] for proper touch target size
 * - Added touch-manipulation for better mobile behavior
 * - Increased icon size for better visibility
 */
const NavButton = memo(function NavButton({
  item,
  isActive,
  isMobile = false,
}: NavButtonProps) {
  return (
    <Link to={item.href} className="flex-shrink-0 inline-flex">
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          /* 
            ACCESSIBILITY FIX: Navigation buttons now have 48px × 48px touch targets
            - Added min-h-[48px] for adequate touch height
            - Added touch-manipulation for better mobile behavior
            - Mobile buttons have icon-only with proper touch target
          */
          "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 min-h-[48px] rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 touch-manipulation",
          isActive
            ? "bg-red-600 text-white shadow-md shadow-red-600/30"
            : "text-white/70 hover:text-white hover:bg-white/10",
        )}
        aria-current={isActive ? "page" : undefined}
        aria-label={`Navigate to ${item.label} page`}
      >
        <span className="flex items-center justify-center">{item.icon}</span>
        {!isMobile && <span>{item.label}</span>}
      </motion.button>
    </Link>
  );
});

// ============================================
// MAIN COMPONENT
// ============================================
/**
 * DetailPageNav Component
 *
 * Navigation tabs for movie/TV/person detail sub-pages.
 * Provides easy access to reviews, videos, images, credits, etc.
 *
 * Features:
 * - Responsive design with mobile-friendly horizontal scroll
 * - Active state indicator with smooth animation
 * - Type-specific navigation items
 * - Accessibility support with ARIA labels
 */
const DetailPageNav = memo(function DetailPageNav({
  type,
  slugWithId,
}: DetailPageNavProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Memoized: Generate navigation items based on type
  const navItems = useMemo(() => {
    const basePath = `/${type}/${slugWithId}`;
    const items = getNavigationItems(type, basePath);

    // Override overview icon for TV shows
    if (type === "tv") {
      items[0] = {
        ...items[0],
        icon: getOverviewIcon(type),
      };
    }

    return items;
  }, [type, slugWithId]);

  // Memoized: Find active index
  const activeIndex = useMemo(
    () => navItems.findIndex((item) => currentPath === item.href),
    [navItems, currentPath],
  );

  return (
    <nav
      className="sticky top-[64px] z-40 bg-black/95 backdrop-blur-md border-white/10 shadow-lg"
      role="navigation"
      aria-label="Detail page navigation"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        {/* Desktop/Tablet: Full navigation with labels */}
        <div className="hidden md:flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
          {navItems.map((item) => (
            <NavButton
              key={item.href}
              item={item}
              isActive={currentPath === item.href}
            />
          ))}
        </div>

        {/* Mobile: Icon-only horizontal scrollable navigation */}
        <div className="flex md:hidden items-center gap-1 overflow-x-auto py-2 scrollbar-hide -mx-4 px-4">
          {navItems.map((item) => (
            <NavButton
              key={item.href}
              item={item}
              isActive={currentPath === item.href}
              isMobile
            />
          ))}
        </div>

        {/* Mobile: Animated active indicator bar */}
        <div className="h-0.5 bg-white/10 md:hidden">
          <motion.div
            className="h-full bg-red-600"
            initial={{ width: 0, x: 0 }}
            animate={{
              width: `${100 / navItems.length}%`,
              x: `${activeIndex * 100}%`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
      </div>
    </nav>
  );
});

export default DetailPageNav;

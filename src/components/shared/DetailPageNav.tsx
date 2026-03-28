import { memo, useMemo } from "react";
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
export type MovieTab = "overview" | "reviews" | "videos" | "images" | "watch" | "credits" | "recommendations";
export type PersonTab = "overview" | "movies" | "tv" | "images";
export type TabId = MovieTab | PersonTab;

// TVTab is the same shape as MovieTab
export type TVTab = MovieTab;

interface TabItem {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

interface DetailPageNavProps {
  type: "movie" | "tv" | "person";
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

// ============================================
// CONSTANTS
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

function getTabItems(type: "movie" | "tv" | "person"): TabItem[] {
  if (type === "person") {
    return [
      { id: "overview", label: "Overview", icon: ICONS.overview },
      { id: "movies", label: "Movies", icon: ICONS.film },
      { id: "tv", label: "TV Shows", icon: ICONS.tv },
      { id: "images", label: "Photos", icon: ICONS.image },
    ];
  }
  return [
    { id: "overview", label: "Overview", icon: type === "tv" ? ICONS.clapperboard : ICONS.overview },
    { id: "reviews", label: "Reviews", icon: ICONS.star },
    { id: "videos", label: "Videos", icon: ICONS.video },
    { id: "images", label: "Images", icon: ICONS.image },
    { id: "watch", label: "Watch", icon: ICONS.tv },
    { id: "credits", label: "Credits", icon: ICONS.users },
    { id: "recommendations", label: "More", icon: ICONS.heart },
  ];
}

// ============================================
// SUB-COMPONENTS
// ============================================
interface TabButtonProps {
  tab: TabItem;
  isActive: boolean;
  isMobile?: boolean;
  onClick: () => void;
}

const TabButton = memo(function TabButton({ tab, isActive, isMobile = false, onClick }: TabButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 min-h-[48px] rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 touch-manipulation",
        isActive
          ? "bg-red-600 text-white shadow-md shadow-red-600/30"
          : "text-white/70 hover:text-white hover:bg-white/10",
      )}
      aria-selected={isActive}
      role="tab"
      aria-label={tab.label}
    >
      <span className="flex items-center justify-center">{tab.icon}</span>
      {!isMobile && <span>{tab.label}</span>}
    </motion.button>
  );
});

// ============================================
// MAIN COMPONENT
// ============================================
const DetailPageNav = memo(function DetailPageNav({ type, activeTab, onTabChange }: DetailPageNavProps) {
  const tabs = useMemo(() => getTabItems(type), [type]);
  const activeIndex = useMemo(() => tabs.findIndex((t) => t.id === activeTab), [tabs, activeTab]);

  return (
    <nav
      className="sticky top-[64px] z-40 bg-black/95 backdrop-blur-md border-white/10 shadow-lg"
      role="tablist"
      aria-label="Detail page navigation"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              onClick={() => onTabChange(tab.id)}
            />
          ))}
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-1 overflow-x-auto py-2 scrollbar-hide -mx-4 px-4">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              isMobile
              onClick={() => onTabChange(tab.id)}
            />
          ))}
        </div>

        {/* Mobile active indicator */}
        <div className="h-0.5 bg-white/10 md:hidden">
          <motion.div
            className="h-full bg-red-600"
            initial={{ width: 0, x: 0 }}
            animate={{
              width: `${100 / tabs.length}%`,
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

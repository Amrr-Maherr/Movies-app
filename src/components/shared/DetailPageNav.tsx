import { memo, useMemo } from "react";
import { cn } from "@/lib/utils";

// ============================================
// TYPES
// ============================================
export type MovieTab =
  | "overview"
  | "reviews"
  | "videos"
  | "images"
  | "watch"
  | "credits"
  | "recommendations";
export type PersonTab = "overview" | "movies" | "tv" | "images";
export type TabId = MovieTab | PersonTab;
export type TVTab = MovieTab;

interface TabItem {
  id: TabId;
  label: string;
}

interface DetailPageNavProps {
  type: "movie" | "tv" | "person";
  activeTab?: TabId;
  onTabChange?: (tab: TabId) => void;
  // Legacy — backward compat
  slugWithId?: string;
}

// ============================================
// TAB DEFINITIONS  (no Overview — hidden per request)
// ============================================
function getTabItems(type: "movie" | "tv" | "person"): TabItem[] {
  if (type === "person") {
    return [
      { id: "overview", label: "Overview" },
      { id: "movies", label: "Movies" },
      { id: "tv", label: "TV Shows" },
      { id: "images", label: "Photos" },
    ];
  }
  return [
    { id: "overview", label: "Overview" },
    { id: "reviews", label: "Reviews" },
    { id: "videos", label: "Videos" },
    { id: "images", label: "Photos" },
    { id: "watch", label: "Where to Watch" },
    { id: "credits", label: "Cast & Crew" },
    { id: "recommendations", label: "More Like This" },
  ];
}

// ============================================
// MAIN COMPONENT
// ============================================
const DetailPageNav = memo(function DetailPageNav({
  type,
  activeTab,
  onTabChange,
}: DetailPageNavProps) {
  const tabs = useMemo(() => getTabItems(type), [type]);
  const handleClick = (tab: TabId) => onTabChange?.(tab);

  return (
    <nav
      className="sticky top-[56px] md:top-[64px] z-40 bg-black/95 backdrop-blur-md shadow-md border-b border-white/10"
      role="tablist"
      aria-label="Detail page navigation"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        <div className="flex flex-wrap items-center gap-2 md:gap-0 md:overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                data-tab={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleClick(tab.id)}
                className={cn(
                  "relative px-3 py-2 md:px-4 md:py-4 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-150 touch-manipulation select-none",
                  isActive
                    ? "text-white"
                    : "text-white/50 hover:text-white/80 active:text-white/70",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
});

export default DetailPageNav;

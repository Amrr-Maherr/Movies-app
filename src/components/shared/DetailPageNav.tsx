import { memo, useMemo, useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// ============================================
// TYPES
// ============================================
export type MovieTab = "overview" | "reviews" | "videos" | "images" | "watch" | "credits" | "recommendations";
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
      { id: "movies",   label: "Movies" },
      { id: "tv",       label: "TV Shows" },
      { id: "images",   label: "Photos" },
    ];
  }
  return [
    { id: "overview",        label: "Overview" },
    { id: "reviews",         label: "Reviews" },
    { id: "videos",          label: "Videos" },
    { id: "images",          label: "Photos" },
    { id: "watch",           label: "Where to Watch" },
    { id: "credits",         label: "Cast & Crew" },
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

  // Track indicator position
  const listRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (!listRef.current || !activeTab) return;
    const btn = listRef.current.querySelector<HTMLButtonElement>(
      `[data-tab="${activeTab}"]`,
    );
    if (!btn) { setIndicator({ left: 0, width: 0 }); return; }
    const parentLeft = listRef.current.getBoundingClientRect().left;
    const { left, width } = btn.getBoundingClientRect();
    setIndicator({ left: left - parentLeft + listRef.current.scrollLeft, width });
  }, [activeTab, tabs]);

  return (
    <nav
      className="sticky top-[64px] z-40 bg-black/95 backdrop-blur-md shadow-md"
      role="tablist"
      aria-label="Detail page navigation"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        <div
          ref={listRef}
          className="relative flex items-end overflow-x-auto scrollbar-hide"
        >
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
                  "relative shrink-0 px-4 py-4 text-sm font-medium whitespace-nowrap transition-colors duration-150 touch-manipulation select-none",
                  isActive
                    ? "text-white"
                    : "text-white/50 hover:text-white/80",
                )}
              >
                {tab.label}
              </button>
            );
          })}

          {/* Sliding red underline */}
          <span
            className="absolute bottom-0 h-[3px] bg-[#e50914] rounded-t-sm transition-all duration-200 ease-out pointer-events-none"
            style={{
              left: indicator.width ? indicator.left : 0,
              width: indicator.width || 0,
              opacity: indicator.width ? 1 : 0,
            }}
          />

          {/* Full-width bottom border */}
          <span className="absolute bottom-0 left-0 right-0 h-px bg-white/10 -z-10" />
        </div>
      </div>
    </nav>
  );
});

export default DetailPageNav;

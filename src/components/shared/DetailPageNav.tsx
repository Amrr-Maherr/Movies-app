import { memo, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

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

interface TabItem {
  id: TabId;
  label: string;
}

interface DetailPageNavProps {
  type: "movie" | "tv" | "person";
  activeTab?: TabId;
  onTabChange?: (tab: TabId) => void;
}

// ============================================
// TAB DEFINITIONS
// ============================================
function getTabItems(type: "movie" | "tv" | "person", t: (key: string) => string): TabItem[] {
  if (type === "person") {
    return [
      { id: "overview", label: t('media.overview') },
      { id: "movies", label: t('discover.movies') },
      { id: "tv", label: t('discover.tvShows') },
      { id: "images", label: t('personDetails.images') },
    ];
  }
  return [
    { id: "overview", label: t('media.overview') },
    { id: "reviews", label: t('media.reviews') },
    { id: "videos", label: t('media.trailersVideos') },
    { id: "images", label: t('personDetails.images') },
    { id: "watch", label: t('media.watchProviders') },
    { id: "credits", label: t('media.fullCastAndCrew') },
    { id: "recommendations", label: t('media.moreLikeThis') },
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
  const { t } = useTranslation();
  const tabs = useMemo(() => getTabItems(type, t), [type, t]);
  const handleClick = (tab: TabId) => onTabChange?.(tab);

  return (
    <nav
      className="sticky top-[56px] md:top-[64px] z-40 bg-black/95 backdrop-blur-md shadow-md border-b border-white/10 detail-nav-tabs"
      role="tablist"
      aria-label="Detail page navigation"
    >
      <div className="container">
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

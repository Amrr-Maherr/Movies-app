import { memo } from "react";
import Card from "./Card/Card";
import PersonCard from "./cards/PersonCard";

interface MediaGridProps {
  items: any[];
  type?: "movie" | "tv" | "person";
  emptyMessage?: string;
}

const MediaGrid = memo(({ items, type = "movie", emptyMessage = "No items found." }: MediaGridProps) => {
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <p className="text-xl text-[var(--text-secondary)] font-medium">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8 pb-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="w-full transition-transform duration-300 hover:scale-105 hover:z-10"
          >
            {type === "person" ? (
              <PersonCard
                id={item.id}
                name={item.name}
                profileImage={item.profile_path}
                role={item.known_for_department || "Actor"}
              />
            ) : (
              <Card
                movie={item}
                variant="standard"
                showBadge={index < 10}
                badgeType={index < 10 ? "trending" : undefined}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

export default MediaGrid;

import { memo, useMemo } from "react";
import Card from "./Card/Card";
import PersonCard from "./MediaCard/PersonCard";

interface MediaGridProps {
  items: any[];
  type?: "movie" | "tv" | "person";
  emptyMessage?: string;
}

const StandardGrid = memo(({ items, type }: { items: any[]; type: "movie" | "tv" | "person" }) => {
  const renderedItems = useMemo(() => {
    return items.map((item) => (
      <div
        key={item.id}
        className="w-full"
      >
        {type === "person" ? (
          <PersonCard
            id={item.id}
            name={item.name || ""}
            profilePath={item.profile_path}
            role={item.known_for_department || "Actor"}
          />
        ) : (
          <Card movie={item} />
        )}
      </div>
    ));
  }, [items, type]);

  return (
    <div className="container">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {renderedItems}
      </div>
    </div>
  );
});

StandardGrid.displayName = "StandardGrid";

const MediaGrid = memo(({ items, type = "movie", emptyMessage = "No items found." }: MediaGridProps) => {
  const isEmpty = useMemo(() => !items || items.length === 0, [items]);

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <p className="text-xl text-[var(--text-secondary)] font-medium">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return <StandardGrid items={items} type={type} />;
});

MediaGrid.displayName = "MediaGrid";

export default MediaGrid;

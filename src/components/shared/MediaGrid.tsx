import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import Card from "./Card/Card";
import { buildMediaUrl } from "@/utils/url";
import { getLocalizedLink } from "@/lib/utils/i18n";
import OptimizedImage from "@/components/ui/OptimizedImage";

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
          <Link
            to={getLocalizedLink(buildMediaUrl("person", item.name || "", item.id))}
            className="group relative block touch-manipulation"
          >
            <div className="relative rounded-md bg-zinc-900 shadow-lg transition-all duration-300 ease-in-out group-hover:shadow-2xl">
              <div className="relative aspect-[2/3]">
                {item.profile_path ? (
                  <>
                    <OptimizedImage
                      src={`https://image.tmdb.org/t/p/w185${item.profile_path}`}
                      alt={item.name}
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
                {item.name}
              </p>
              <p className="text-xs text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                {item.known_for_department || "Actor"}
              </p>
            </div>
          </Link>
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

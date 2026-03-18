import { Link } from "react-router-dom";
import { memo } from "react";
import { Film, Tv } from "lucide-react";

interface GenreCardProps {
  id: number;
  name: string;
  type: "movie" | "tv";
}

const GenreCard = memo(function GenreCard({ id, name, type }: GenreCardProps) {
  return (
    <Link
      to={`/${type}/genre/${id}`}
      className="group relative overflow-hidden rounded-md bg-[var(--background-secondary)] hover:bg-[var(--background-tertiary)] transition-all duration-200 shadow-md hover:shadow-xl hover:scale-[1.02] aspect-[16/9] flex items-center justify-center"
    >
      <div className="text-center p-4">
        {type === "movie" ? (
          <Film className="w-10 h-10 mx-auto mb-2 text-[var(--text-primary)]" />
        ) : (
          <Tv className="w-10 h-10 mx-auto mb-2 text-[var(--text-primary)]" />
        )}
        <h3 className="text-sm md:text-base font-semibold text-[var(--text-primary)] line-clamp-2">
          {name}
        </h3>
      </div>

      {/* Play icon overlay on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="w-12 h-12 rounded-full bg-[var(--hover-overlay)] flex items-center justify-center backdrop-blur-sm">
          <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-[var(--text-primary)] border-b-[8px] border-b-transparent ml-1" />
        </div>
      </div>
    </Link>
  );
});

export default GenreCard;

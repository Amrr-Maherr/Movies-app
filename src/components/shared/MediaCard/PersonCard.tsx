import { memo } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { buildMediaUrl } from "@/utils/url";
import { getLocalizedLink } from "@/lib/utils/i18n";

export interface PersonCardProps {
  id: number;
  name: string;
  profilePath: string | null;
  role: string;
}

const PersonCard = memo(function PersonCard({ id, name, profilePath, role }: PersonCardProps) {
  const personImage = profilePath
    ? `https://image.tmdb.org/t/p/w185${profilePath}`
    : null;

  return (
    <Link
      to={getLocalizedLink(buildMediaUrl("person", name, id))}
      className="group relative block touch-manipulation"
    >
      <div className="relative rounded-md bg-zinc-900 shadow-lg transition-all duration-300 ease-in-out group-hover:shadow-2xl">
        <div className="relative aspect-[2/3]">
          {personImage ? (
            <>
              <OptimizedImage
                src={personImage}
                alt={name}
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
          {name}
        </p>
        <p className="text-xs text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
          {role}
        </p>
      </div>
    </Link>
  );
});

export default PersonCard;

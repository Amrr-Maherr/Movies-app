import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { generateSlug, formatSlugWithId } from "@/utils/slugify";

export interface PersonCardProps {
  id: number;
  name: string;
  profileImage: string | null;
  role: string;
  type?: "cast" | "crew";
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w185";

const PersonCard = memo(({ id, name, profileImage, role }: PersonCardProps) => {
  const imageUrl = profileImage ? `${IMAGE_BASE_URL}${profileImage}` : null;

  const detailsUrl = useMemo(() => {
    const slug = generateSlug(name);
    return `/person/${formatSlugWithId(slug, id)}`;
  }, [name, id]);

  return (
    <Link
      to={detailsUrl}
      className="group relative cursor-pointer block"
      aria-label={`View ${name}'s profile`}
    >
      {/* Card Container */}
      <div className="relative overflow-hidden rounded-md bg-zinc-900 shadow-lg transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl">
        {/* Image Container */}
        <div className="relative aspect-[2/3] overflow-hidden">
          {imageUrl ? (
            <>
              {/* Profile Image */}
              <img
                src={imageUrl}
                alt={name}
                className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover Overlay - Gradient from bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
            </>
          ) : (
            /* Placeholder Avatar */
            <div className="flex h-full w-full items-center justify-center bg-zinc-800">
              <svg
                className="h-16 w-16 text-zinc-600"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          )}
        </div>

        {/* Focus Ring for Accessibility */}
        <div className="absolute inset-0 rounded-md ring-2 ring-white/0 ring-offset-2 ring-offset-zinc-900 transition-all duration-300 group-focus-within:ring-white/50" />
      </div>

      {/* Text Section */}
      <div className="mt-3 space-y-1 px-1">
        {/* Name - White, Medium Weight */}
        <p className="text-sm font-medium text-white line-clamp-1 group-hover:text-gray-200 transition-colors duration-300">
          {name}
        </p>

        {/* Role - Smaller, Gray */}
        <p className="text-xs text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
          {role}
        </p>
      </div>
    </Link>
  );
});

PersonCard.displayName = "PersonCard";

export default PersonCard;

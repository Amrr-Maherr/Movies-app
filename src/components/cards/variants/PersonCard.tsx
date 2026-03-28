/**
 * PersonCard Component
 *
 * Person/Actor card with profile image and role.
 * Features:
 * - Profile image
 * - Name and role display
 * - Link to person detail page
 */

import { memo } from "react";
import { Link } from "react-router-dom";
import OptimizedImage from "@/components/ui/OptimizedImage";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { useCardDerivedValues } from "../hooks";
import type { PersonCardProps } from "../types";

const PersonCard = memo(({ person }: PersonCardProps) => {
  const { title, personImageUrl, personDetailsUrl } = useCardDerivedValues({
    person,
  });

  return (
    <LazyWrapper height={350}>
      <Link
        to={personDetailsUrl}
        className="group relative cursor-pointer block touch-manipulation min-h-[48px]"
        role="article"
        aria-label={`View profile: ${person.name}`}
      >
        <div className="relative aspect-[2/3] overflow-hidden rounded mb-2">
          {personImageUrl ? (
            <OptimizedImage
              src={personImageUrl}
              alt={person.name}
              className="w-full h-full transition-transform duration-300 group-hover:scale-105"
              objectFit="cover"
            />
          ) : (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
              <span className="text-zinc-600 text-sm">No Photo</span>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
              View Profile
            </span>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-sm font-medium text-white line-clamp-1 group-hover:text-gray-300 transition-colors">
            {person.name}
          </h3>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
            {person.role}
          </p>
        </div>
      </Link>
    </LazyWrapper>
  );
});

PersonCard.displayName = "PersonCard";

export default PersonCard;

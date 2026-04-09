import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import OptimizedImage from "@/components/ui/OptimizedImage";

export interface Collection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface CollectionSectionProps {
  collection: Collection;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const CollectionSection = memo(function CollectionSection({
  collection,
}: CollectionSectionProps) {
  return (
    <div className="py-4 md:py-8 border-b border-zinc-800">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
        Part of the {collection.name}
      </h2>
      <Link
        to={`/collection/${collection.id}`}
        className="group cursor-pointer block"
      >
        <motion.div
          className="relative aspect-video overflow-hidden rounded-lg bg-zinc-900 border border-neutral-700/50 shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{
            scale: 1.05,
            boxShadow:
              "0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(229,9,20,0.15)",
            borderColor: "rgba(229, 9, 20, 0.3)",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {collection.backdrop_path ? (
            <OptimizedImage
              src={`${IMAGE_BASE_URL}${collection.backdrop_path}`}
              alt={collection.name}
              className="w-full h-full transition-transform duration-500 group-hover:scale-110"
              objectFit="cover"
            />
          ) : collection.poster_path ? (
            <OptimizedImage
              src={`https://image.tmdb.org/t/p/w500${collection.poster_path}`}
              alt={collection.name}
              className="w-full h-full transition-transform duration-500 group-hover:scale-110 brightness-75"
              objectFit="cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
              <span className="text-xl font-semibold text-zinc-500">
                {collection.name}
              </span>
            </div>
          )}

          {/* Bottom gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center px-4">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 drop-shadow-2xl line-clamp-2">
                {collection.name}
              </h3>
              <div className="inline-flex items-center gap-2 bg-[var(--netflix-red)]/90 backdrop-blur-sm text-white px-6 py-2.5 rounded-md font-semibold text-sm transition-all duration-300 group-hover:bg-[var(--netflix-red)] hover:scale-105">
                <span>View Collection</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Always visible bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-sm text-gray-300 font-medium">
              Click to explore all movies in this collection
            </p>
          </div>
        </motion.div>
      </Link>
    </div>
  );
});

export default CollectionSection;

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
    <div className="mb-8 pb-8 border-b border-zinc-800">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
        Part of {collection.name}
      </h2>
      <Link
        to={`/collection/${collection.id}`}
        className="group cursor-pointer block"
      >
        <motion.div
          className="relative aspect-[16/9] overflow-hidden rounded-md bg-zinc-900 border border-zinc-800"
          initial={{ scale: 1, boxShadow: "0 0 0 rgba(0,0,0,0)" }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
            borderColor: "rgba(82, 82, 91, 0.8)",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {collection.backdrop_path ? (
            <OptimizedImage
              src={`${IMAGE_BASE_URL}${collection.backdrop_path}`}
              alt={collection.name}
              className="w-full h-full transition-transform duration-300 group-hover:scale-105"
              objectFit="cover"
            />
          ) : collection.poster_path ? (
            <OptimizedImage
              src={`${IMAGE_BASE_URL}${collection.poster_path}`}
              alt={collection.name}
              className="w-full h-full transition-transform duration-300 group-hover:scale-105"
              objectFit="cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-800">
              <span className="text-2xl font-bold text-zinc-600">
                {collection.name}
              </span>
            </div>
          )}

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="text-center"
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold text-white mb-2">
                {collection.name}
              </h3>
              <p className="text-sm text-gray-300">View Collection →</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </Link>
    </div>
  );
});

export default CollectionSection;

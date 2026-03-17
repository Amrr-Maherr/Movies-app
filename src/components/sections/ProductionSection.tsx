import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Slider from "@/components/shared/Slider/slider";

interface Company {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

interface Network {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

interface Collection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

interface ProductionSectionProps {
  companies?: Company[];
  networks?: Network[];
  collection?: Collection | null;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w185";

// Memoized ProductionCard component
const ProductionCard = memo(function ProductionCard({
  name,
  logoPath,
  type,
  id,
}: {
  name: string;
  logoPath: string | null;
  type: "company" | "network";
  id: number;
}) {
  // Memoized: Image URL
  const imageUrl = useMemo(
    () => (logoPath ? `${IMAGE_BASE_URL}${logoPath}` : null),
    [logoPath],
  );

  return (
    <Link to={`/company/${id}`} className="group cursor-pointer block">
      <div className="relative aspect-video overflow-hidden rounded-md bg-zinc-900 border border-zinc-800 transition-all duration-300 group-hover:border-zinc-600 group-hover:shadow-lg">
        {/* Logo or Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          {imageUrl ? (
            <OptimizedImage
              src={imageUrl}
              alt={name}
              className="max-h-full max-w-full transition-transform duration-300 group-hover:scale-105"
              objectFit="contain"
            />
          ) : (
            /* Placeholder with initials */
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-zinc-600 group-hover:text-zinc-500 transition-colors">
                {name.charAt(0).toUpperCase()}
              </div>
              <div className="text-xs text-zinc-700 mt-1">{type}</div>
            </div>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Company/Network Name */}
      <div className="mt-2 text-center">
        <p className="text-xs md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 line-clamp-2">
          {name}
        </p>
      </div>
    </Link>
  );
});

// Memoized ProductionSection component - avoids re-renders when parent updates
const ProductionSection = memo(function ProductionSection({
  companies = [],
  networks = [],
  collection,
}: ProductionSectionProps) {
  // Memoized: Combine companies and networks
  const allItems = useMemo(() => {
    if (companies.length === 0 && networks.length === 0) {
      return [];
    }

    const combined = [
      ...companies.map((c) => ({ ...c, type: "company" as const })),
      ...networks.map((n) => ({ ...n, type: "network" as const })),
    ];
    return combined.slice(0, 12); // Limit to 12 items
  }, [companies, networks]);

  // Don't render if no data
  if (allItems.length === 0 && !collection) {
    return null;
  }

  const hasNetworks = networks.length > 0;

  return (
    <section className="bg-black py-8 md:py-12 border-t border-zinc-800">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        {/* Collection Section */}
        {collection && (
          <div className="mb-8 pb-8 border-b border-zinc-800">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
              Part of {collection.name}
            </h2>
            <Link
              to={`/collection/${collection.id}`}
              className="group cursor-pointer block"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-zinc-900 border border-zinc-800 transition-all duration-300 group-hover:border-zinc-600 group-hover:shadow-xl">
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
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-gray-300">View Collection →</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Section Title */}
        {allItems.length > 0 && (
          <>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
              {hasNetworks ? "Networks & Production" : "Production Companies"}
            </h2>

            {/* Slider with Company/Network Cards */}
            <Slider
              slidesPerView={6}
              slidesPerViewMobile={3}
              spaceBetween={16}
              hideNavigation={false}
            >
              {allItems.map((item) => (
                <ProductionCard
                  key={`${item.type}-${item.id}`}
                  id={item.id}
                  name={item.name}
                  logoPath={item.logo_path}
                  type={item.type}
                />
              ))}
            </Slider>
          </>
        )}
      </div>
    </section>
  );
});

export default ProductionSection;

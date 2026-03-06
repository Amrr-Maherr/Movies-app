import { useMemo } from "react";
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

interface ProductionSectionProps {
  companies?: Company[];
  networks?: Network[];
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w185";

export default function ProductionSection({
  companies = [],
  networks = [],
}: ProductionSectionProps) {
  // Combine companies and networks, or show them separately
  const hasCompanies = companies.length > 0;
  const hasNetworks = networks.length > 0;

  // Don't render if no data
  if (!hasCompanies && !hasNetworks) {
    return null;
  }

  // Combine both arrays for display
  const allItems = useMemo(() => {
    const combined = [
      ...companies.map((c) => ({ ...c, type: "company" as const })),
      ...networks.map((n) => ({ ...n, type: "network" as const })),
    ];
    return combined.slice(0, 12); // Limit to 12 items
  }, [companies, networks]);

  return (
    <section className="bg-black py-8 md:py-12 border-t border-zinc-800">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        {/* Section Title */}
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
              name={item.name}
              logoPath={item.logo_path}
              type={item.type}
            />
          ))}
        </Slider>
      </div>
    </section>
  );
}

interface ProductionCardProps {
  name: string;
  logoPath: string | null;
  type: "company" | "network";
}

function ProductionCard({ name, logoPath, type }: ProductionCardProps) {
  const imageUrl = logoPath ? `${IMAGE_BASE_URL}${logoPath}` : null;

  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-video overflow-hidden rounded-md bg-zinc-900 border border-zinc-800 transition-all duration-300 group-hover:border-zinc-600 group-hover:shadow-lg">
        {/* Logo or Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
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
    </div>
  );
}

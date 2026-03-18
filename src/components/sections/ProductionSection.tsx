import { memo, useMemo } from "react";
import Slider from "@/components/shared/Slider/slider";
import CollectionSection from "./CollectionSection";
import type { Collection } from "./CollectionSection";
import PlatformCard from "./PlatformCard";

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
  is_network?: boolean;
}

interface ProductionSectionProps {
  companies?: Company[];
  networks?: Network[];
  collection?: Collection | null;
}

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
    <section className="bg-black py-4 md:py-12 border-t border-zinc-800">
      <div className="container">
        {/* Collection Section */}
        {collection && <CollectionSection collection={collection} />}

        {/* Section Title */}
        {allItems.length > 0 && (
          <>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
              {hasNetworks ? "Networks & Production" : "Production Companies"}
            </h2>

            {/* Slider with Company/Network Cards */}
            <Slider
              slidesPerView={6}
              slidesPerViewMobile={1.5}
              spaceBetween={16}
              hideNavigation={true}
            >
              {allItems.map((item) => (
                <PlatformCard
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

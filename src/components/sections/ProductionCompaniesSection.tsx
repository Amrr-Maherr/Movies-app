import { memo } from "react";
import { Building2 } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import Slider from "@/components/shared/Slider/slider";
import PlatformCard from "./PlatformCard";
import type { ProductionCompany } from "@/services/productionCompaniesService";
import { SectionSkeleton } from "@/components/ui";
import { Link } from "react-router-dom";

export interface ProductionCompaniesSectionProps {
  companies: ProductionCompany[];
  isLoading?: boolean;
  error?: Error | null;
}

/**
 * ProductionCompaniesSection Component
 *
 * Displays a horizontal slider of production company cards.
 * Each company appears as a card with logo and smooth hover animations.
 * Includes skeleton loading state while data is being fetched.
 */
const ProductionCompaniesSection = memo(function ProductionCompaniesSection({
  companies,
  isLoading,
  error,
}: ProductionCompaniesSectionProps) {
  // Show skeleton while loading
  if (isLoading) {
    return (
      <div className="py-6 md:py-8">
        <div className="container">
          <SectionHeader
            title="Production Companies"
            icon={Building2}
            iconColor="text-red-600"
          />
          <SectionSkeleton variant="grid" cardCount={6} className="mt-6" />
        </div>
      </div>
    );
  }

  // Show nothing if error or no data
  if (error || !companies || companies.length === 0) {
    return null;
  }

  return (
    <div className="py-6 md:py-8">
      <div className="container">
        <SectionHeader
          title="Production Companies"
          icon={Building2}
          iconColor="text-red-600"
          badgeText="Browse by Company"
        />
        <Link
          to="/production-companies"
          className="ml-4 text-sm md:text-base text-gray-300 hover:text-white transition-colors flex-shrink-0"
        >
          View All →
        </Link>
        {/* Horizontal Slider with Company Cards */}
        <div className="mt-6">
          <Slider
            slidesPerView={6}
            slidesPerViewMobile={2}
            spaceBetween={16}
            hideNavigation={false}
            swiperOptions={{
              loop: false,
              speed: 600,
              breakpoints: {
                320: { slidesPerView: 2, spaceBetween: 12 },
                640: { slidesPerView: 3, spaceBetween: 14 },
                768: { slidesPerView: 4, spaceBetween: 16 },
                1024: { slidesPerView: 5, spaceBetween: 16 },
                1280: { slidesPerView: 6, spaceBetween: 16 },
              },
            }}
          >
            {companies.map((company) => (
              <div
                key={company.id}
                className="h-[200px] md:h-[240px] lg:h-[280px]"
              >
                <PlatformCard
                  id={company.id}
                  name={company.name}
                  logoPath={company.logo_path}
                  type="company"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
});

export default ProductionCompaniesSection;

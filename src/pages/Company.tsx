import { useParams, Link } from "react-router-dom";
import { memo, useMemo } from "react";
import { useCompanyDetails, useCompanyMovies } from "@/queries";
import { SectionSkeleton, Error } from "@/components/ui";
import MediaSection from "@/components/shared/MediaSection";
import { Film, MapPin, Globe, Building2 } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const Company = memo(function Company() {
  const { id } = useParams<{ id: string }>();
  const companyId = id ? parseInt(id, 10) : 0;

  const {
    data: company,
    isLoading: companyLoading,
    error: companyError,
  } = useCompanyDetails(companyId);

  const {
    data: companyMovies,
    isLoading: moviesLoading,
    error: moviesError,
  } = useCompanyMovies(companyId, 1);

  const logoUrl = useMemo(
    () =>
      company?.logo_path
        ? `${IMAGE_BASE_URL}${company.logo_path}`
        : null,
    [company?.logo_path]
  );

  if (companyLoading) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)]">
        <SectionSkeleton variant="hero" />
      </div>
    );
  }

  if (companyError || !company) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)] flex items-center justify-center">
        <Error
          message="Company not found"
          retryButtonText="Go Back"
          onRetry={() => window.history.back()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)]">
      {/* Header Section */}
      <div className="relative h-[300px] md:h-[400px] bg-gradient-to-b from-black/80 to-[var(--background-primary)]">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl h-full flex items-center">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            {/* Company Logo */}
            {logoUrl ? (
              <div className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                <OptimizedImage
                  src={logoUrl}
                  alt={company.name}
                  className="w-full h-full object-contain p-2"
                  objectFit="contain"
                />
              </div>
            ) : (
              <div className="w-32 h-32 md:w-48 md:h-48 bg-[#333] rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-16 h-16 md:w-24 md:h-24 text-white" />
              </div>
            )}

            {/* Company Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                {company.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-[#737373]">
                {company.origin_country && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{company.origin_country}</span>
                  </div>
                )}

                {company.headquarters && (
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>{company.headquarters}</span>
                  </div>
                )}

                {companyMovies && (
                  <div className="flex items-center gap-2">
                    <Film className="w-4 h-4" />
                    <span>{companyMovies.total_results} Movies</span>
                  </div>
                )}

                {company.homepage && (
                  <a
                    href={company.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:underline"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Official Website</span>
                  </a>
                )}
              </div>

              {company.description && (
                <p className="mt-4 text-sm md:text-base text-[#b3b3b3] line-clamp-3 max-w-3xl">
                  {company.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Parent Company Section */}
      {company.parent_company && (
        <div className="border-y border-[#222] bg-black/40">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl py-6">
            <div className="flex items-center gap-4">
              <span className="text-[#737373] text-sm">Parent Company:</span>
              <Link
                to={`/company/${company.parent_company.id}`}
                className="text-white hover:underline font-medium flex items-center gap-2"
              >
                {company.parent_company.logo_path ? (
                  <img
                    src={`${IMAGE_BASE_URL}${company.parent_company.logo_path}`}
                    alt={company.parent_company.name}
                    className="h-8 object-contain"
                  />
                ) : (
                  <span>{company.parent_company.name}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Movies Section */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Movies by {company.name}
        </h2>

        {moviesLoading ? (
          <SectionSkeleton variant="grid" cardCount={6} />
        ) : moviesError ? (
          <Error
            message="Failed to load movies"
            retryButtonText="Try Again"
            onRetry={() => window.location.reload()}
          />
        ) : companyMovies?.results && companyMovies.results.length > 0 ? (
          <MediaSection
            title=""
            data={companyMovies.results}
            isLoading={false}
            error={null}
            onRetry={() => {}}
          />
        ) : (
          <div className="text-center py-12 text-[#737373]">
            <Film className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No movies available</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default Company;

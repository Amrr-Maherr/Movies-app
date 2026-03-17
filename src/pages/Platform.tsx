import { useParams, Link } from "react-router-dom";
import { memo, useMemo, useState } from "react";
import { usePlatformMovies, usePlatformTVShows } from "@/queries";
import { useStreamingPlatforms } from "@/queries/FetchStreamingPlatforms";
import { SectionSkeleton, Error, OptimizedImage } from "@/components/ui";
import { Film, Tv, Globe } from "lucide-react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const LOGO_BASE_URL = "https://image.tmdb.org/t/p/w200";

// Popular platform IDs for display
const PLATFORM_INFO: Record<number, { description: string; country: string }> =
  {
    8: { description: "Stream unlimited movies and TV shows", country: "US" },
    49: { description: "Premium TV series and movies", country: "US" },
    337: {
      description: "Disney, Pixar, Marvel, Star Wars, and National Geographic",
      country: "US",
    },
    9: {
      description: "Amazon Prime Video original and licensed content",
      country: "US",
    },
    350: { description: "Apple TV+ original programming", country: "US" },
    1899: { description: "Max original series and movies", country: "US" },
  };

const Platform = memo(function Platform() {
  const { id } = useParams<{ id: string }>();
  const platformId = id ? parseInt(id, 10) : 0;
  const [activeTab, setActiveTab] = useState<"movies" | "tv">("movies");
  const [page, setPage] = useState(1);

  const {
    data: moviesData,
    isLoading: moviesLoading,
    error: moviesError,
  } = usePlatformMovies(platformId, activeTab === "movies" ? page : 1);

  const {
    data: tvData,
    isLoading: tvLoading,
    error: tvError,
  } = usePlatformTVShows(platformId, activeTab === "tv" ? page : 1);

  const platformInfo = PLATFORM_INFO[platformId];
  const contentData = activeTab === "movies" ? moviesData : tvData;
  const isLoading = activeTab === "movies" ? moviesLoading : tvLoading;
  const error = activeTab === "movies" ? moviesError : tvError;

  const content = useMemo(() => contentData?.results || [], [contentData]);
  const totalPages = useMemo(
    () => contentData?.total_pages || 1,
    [contentData],
  );
  const totalResults = useMemo(
    () => contentData?.total_results || 0,
    [contentData],
  );

  if (isLoading && page === 1) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)]">
        <SectionSkeleton variant="hero" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)] flex items-center justify-center">
        <Error
          message="Failed to load platform content"
          retryButtonText="Try Again"
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)] pt-20 pb-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#b3b3b3] hover:text-white transition-colors mb-6"
          >
            <span>← Back to Home</span>
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Platform Logo */}
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
              <img
                src={`${LOGO_BASE_URL}/path_for_platform_${platformId}.png`}
                alt={`Platform ${platformId}`}
                className="w-full h-full object-contain p-2"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  (
                    e.target as HTMLImageElement
                  ).nextElementSibling?.classList.remove("hidden");
                }}
              />
              <div className="hidden text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#333]">
                  {platformId}
                </div>
              </div>
            </div>

            {/* Platform Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                Platform #{platformId}
              </h1>
              {platformInfo && (
                <>
                  <p className="text-base md:text-lg text-[#b3b3b3] mb-3">
                    {platformInfo.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-[#737373]">
                    <Globe className="w-4 h-4" />
                    <span>Available in {platformInfo.country}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-8 border-b border-[#222]">
          <button
            onClick={() => {
              setActiveTab("movies");
              setPage(1);
            }}
            className={`px-6 py-3 font-semibold transition-colors flex items-center gap-2 ${
              activeTab === "movies"
                ? "text-white border-b-2 border-[var(--netflix-red)]"
                : "text-[#737373] hover:text-white"
            }`}
          >
            <Film className="w-5 h-5" />
            Movies
          </button>
          <button
            onClick={() => {
              setActiveTab("tv");
              setPage(1);
            }}
            className={`px-6 py-3 font-semibold transition-colors flex items-center gap-2 ${
              activeTab === "tv"
                ? "text-white border-b-2 border-[var(--netflix-red)]"
                : "text-[#737373] hover:text-white"
            }`}
          >
            <Tv className="w-5 h-5" />
            TV Shows
          </button>
          <span className="ml-auto text-[#737373]">{totalResults} titles</span>
        </div>

        {/* Content Grid */}
        {content.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 mb-8">
              {content.map((item: any) => (
                <Link
                  key={item.id}
                  to={`/${activeTab === "movies" ? "movie" : "tv"}/${item.id}`}
                  className="group cursor-pointer block"
                >
                  <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-[#1a1a1a] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                    {item.poster_path ? (
                      <OptimizedImage
                        src={`${IMAGE_BASE_URL}${item.poster_path}`}
                        alt={item.title || item.name}
                        className="w-full h-full"
                        objectFit="cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#333]">
                        {activeTab === "movies" ? (
                          <Film className="w-12 h-12 text-[#555]" />
                        ) : (
                          <Tv className="w-12 h-12 text-[#555]" />
                        )}
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-sm font-medium px-2 text-center">
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Item Info */}
                  <div className="mt-2 md:mt-3">
                    <h3 className="text-xs md:text-sm text-white font-medium line-clamp-2 group-hover:text-[var(--netflix-red)] transition-colors">
                      {item.title || item.name}
                    </h3>
                    <div className="flex items-center justify-between mt-1 text-[#737373] text-xs">
                      <span>
                        {(
                          activeTab === "movies"
                            ? item.release_date
                            : item.first_air_date
                        )
                          ? new Date(
                              activeTab === "movies"
                                ? item.release_date
                                : item.first_air_date,
                            ).getFullYear()
                          : "TBA"}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        {item.vote_average?.toFixed(1) || "N/A"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-6 py-3 bg-[#333] text-white rounded-md hover:bg-[#444] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="text-white">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-6 py-3 bg-[#333] text-white rounded-md hover:bg-[#444] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 text-[#737373]">
            {activeTab === "movies" ? (
              <Film className="w-16 h-16 mx-auto mb-4 opacity-50" />
            ) : (
              <Tv className="w-16 h-16 mx-auto mb-4 opacity-50" />
            )}
            <p className="text-lg">No content available on this platform</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default Platform;

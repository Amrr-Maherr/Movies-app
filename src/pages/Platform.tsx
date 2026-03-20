import {useParams } from "react-router-dom";
import { memo, useMemo, useState } from "react";
import { usePlatformMovies, usePlatformTVShows } from "@/hooks/shared";
import { SectionSkeleton, Error } from "@/components/ui";
import { Film, Tv, Globe } from "lucide-react";
import Card from "@/components/shared/Card/Card";
import Pagination from "@/components/Pagination";
import type { HeroMedia } from "@/types";

// Popular platform IDs for display
const PLATFORM_INFO: Record<
  number,
  { name?: string; description: string; country: string }
> = {
  8: {
    name: "Netflix",
    description: "Stream unlimited movies and TV shows",
    country: "US",
  },
  49: {
    name: "HBO Max",
    description: "Premium TV series and movies",
    country: "US",
  },
  337: {
    name: "Disney+",
    description: "Disney, Pixar, Marvel, Star Wars, and National Geographic",
    country: "US",
  },
  9: {
    name: "Amazon Prime Video",
    description: "Amazon Prime Video original and licensed content",
    country: "US",
  },
  350: {
    name: "Apple TV+",
    description: "Apple TV+ original programming",
    country: "US",
  },
  1899: {
    name: "Max",
    description: "Max original series and movies",
    country: "US",
  },
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
  } = usePlatformMovies(platformId, page);

  const {
    data: tvData,
    isLoading: tvLoading,
    error: tvError,
  } = usePlatformTVShows(platformId, page);

  const platformInfo = PLATFORM_INFO[platformId];
  const displayName = platformInfo?.name || `Platform #${platformId}`;
  const displayDescription =
    platformInfo?.description || "Browse movies and TV shows";
  const displayCountry = platformInfo?.country || "US";

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

  if (isLoading) {
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
          {/* <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#b3b3b3] hover:text-white transition-colors mb-6"
          >
            <span>← Back to Home</span>
          </Link> */}

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Platform Logo */}
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-4xl md:text-5xl font-bold text-white">
                {displayName.charAt(0)}
              </span>
            </div>

            {/* Platform Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                {displayName}
              </h1>
              <p className="text-base md:text-lg text-[#b3b3b3] mb-3">
                {displayDescription}
              </p>
              <div className="flex items-center gap-2 text-sm text-[#737373]">
                <Globe className="w-4 h-4" />
                <span>Available in {displayCountry}</span>
              </div>
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
              {content.map((item: HeroMedia) => (
                <Card key={item.id} movie={item} variant="compact" />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              isLoading={isLoading}
              onPageChange={setPage}
            />
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

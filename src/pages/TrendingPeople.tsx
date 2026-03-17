import { memo, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTrendingPeopleDay, useTrendingPeopleWeek } from "@/queries";
import { SectionSkeleton, Error, OptimizedImage } from "@/components/ui";
import { Star, TrendingUp } from "lucide-react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const TrendingPeople = memo(function TrendingPeople() {
  const [timeWindow, setTimeWindow] = useState<"day" | "week">("day");

  const {
    data: trendingDay,
    isLoading: dayLoading,
    error: dayError,
  } = useTrendingPeopleDay();

  const {
    data: trendingWeek,
    isLoading: weekLoading,
    error: weekError,
  } = useTrendingPeopleWeek();

  const trendingPeople = timeWindow === "day" ? trendingDay : trendingWeek;
  const isLoading = timeWindow === "day" ? dayLoading : weekLoading;
  const error = timeWindow === "day" ? dayError : weekError;

  const people = useMemo(() => trendingPeople?.slice(0, 20) || [], [trendingPeople]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)]">
        <SectionSkeleton variant="grid" cardCount={12} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)] flex items-center justify-center">
        <Error
          message="Failed to load trending people"
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
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-[var(--netflix-red)]" />
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              Trending People
            </h1>
          </div>
          <p className="text-base text-[#b3b3b3]">
            The most popular actors and directors right now
          </p>
        </div>

        {/* Time Window Tabs */}
        <div className="flex items-center gap-4 mb-8 border-b border-[#222]">
          <button
            onClick={() => setTimeWindow("day")}
            className={`px-6 py-3 font-semibold transition-colors flex items-center gap-2 ${
              timeWindow === "day"
                ? "text-white border-b-2 border-[var(--netflix-red)]"
                : "text-[#737373] hover:text-white"
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            Today
          </button>
          <button
            onClick={() => setTimeWindow("week")}
            className={`px-6 py-3 font-semibold transition-colors flex items-center gap-2 ${
              timeWindow === "week"
                ? "text-white border-b-2 border-[var(--netflix-red)]"
                : "text-[#737373] hover:text-white"
            }`}
          >
            <Star className="w-5 h-5" />
            This Week
          </button>
        </div>

        {/* People Grid */}
        {people.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {people.map((person: any, index) => (
              <Link
                key={person.id}
                to={`/person/${person.id}`}
                className="group cursor-pointer block"
              >
                <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-[#1a1a1a] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                  {person.profile_path ? (
                    <OptimizedImage
                      src={`${IMAGE_BASE_URL}${person.profile_path}`}
                      alt={person.name}
                      className="w-full h-full"
                      objectFit="cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#333]">
                      <span className="text-4xl text-[#555]">👤</span>
                    </div>
                  )}

                  {/* Rank Badge */}
                  <div className="absolute top-2 left-2 bg-[var(--netflix-red)] text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-medium px-2 text-center">
                      View Profile
                    </span>
                  </div>
                </div>

                {/* Person Info */}
                <div className="mt-2 md:mt-3">
                  <h3 className="text-xs md:text-sm text-white font-medium line-clamp-2 group-hover:text-[var(--netflix-red)] transition-colors">
                    {person.name}
                  </h3>
                  {person.known_for_department && (
                    <p className="text-[#737373] text-xs mt-1">
                      {person.known_for_department}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-[#737373]">
            <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No trending people available</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default TrendingPeople;

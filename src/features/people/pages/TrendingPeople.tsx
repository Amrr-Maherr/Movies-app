import { memo, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTrendingPeopleDay, getTrendingPeopleWeek } from "@/services";
import { SectionSkeleton } from "@/components/ui";
import { ReactQueryErrorState } from "@/components/errors";
import { Star, TrendingUp } from "lucide-react";
import HelmetMeta from "@/components/shared/HelmetMeta";
import { OptimizedSectionWrapper } from "@/components/optimized-section-wrapper";
import PersonCard from "@/components/shared/MediaCard/PersonCard";

const TrendingPeople = memo(function TrendingPeople() {
  const [timeWindow, setTimeWindow] = useState<"day" | "week">("day");

  const {
    data: trendingDay,
    isLoading: dayLoading,
    error: dayError,
  } = useQuery({
    queryKey: ["trending", "people", "day"],
    queryFn: async () => {
      const result = await getTrendingPeopleDay(1);
      return result;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const {
    data: trendingWeek,
    isLoading: weekLoading,
    error: weekError,
  } = useQuery({
    queryKey: ["trending", "people", "week"],
    queryFn: async () => {
      const result = await getTrendingPeopleWeek(1);
      return result;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const trendingPeople = (
    timeWindow === "day" ? trendingDay?.results : trendingWeek?.results
  ) as any[];
  const isLoading = timeWindow === "day" ? dayLoading : weekLoading;
  const error = timeWindow === "day" ? dayError : weekError;

  const people = useMemo(
    () => trendingPeople?.slice(0, 20) || [],
    [trendingPeople],
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background-primary)]">
        <SectionSkeleton variant="grid" cardCount={12} />
      </div>
    );
  }

  if (error) {
    return (
      <ReactQueryErrorState
        error={error}
        retry={() => window.location.reload()}
        fullscreen
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)] pt-20 pb-12">
      <HelmetMeta
        name="Trending People"
        description="Discover the most popular actors and directors trending right now on Netflix."
      />
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
        <OptimizedSectionWrapper
          data={people.length > 0 ? people : null}
          isLoading={isLoading}
          fallback={<SectionSkeleton variant="grid" cardCount={12} />}
          height={400}
          title="Trending People"
          isEmptyFallback={
            <div className="text-center py-12 text-[#737373]">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No trending people available</p>
            </div>
          }
        >
          {(peopleData) => (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {peopleData.map((person: any, index) => (
                <div key={person.id} className="relative">
                  <div className="absolute top-2 left-2 z-10 bg-[var(--netflix-red)] text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                    {index + 1}
                  </div>
                  <PersonCard
                    id={person.id}
                    name={person.name}
                    profilePath={person.profile_path}
                    role={person.known_for_department || ""}
                  />
                </div>
              ))}
            </div>
          )}
        </OptimizedSectionWrapper>
      </div>
    </div>
  );
});

export default TrendingPeople;

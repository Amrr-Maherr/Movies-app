import { memo, useMemo, useState, useCallback } from "react";
import Slider from "@/components/shared/Slider/slider";
import Card from "@/components/shared/Card/Card";
import type { CastCredit, CrewCredit } from "@/api/PersonCredits";

type FilterType = "all" | "movies" | "tv";

interface CreditsSectionProps {
  cast: CastCredit[];
  crew: CrewCredit[];
}

// Memoized CreditsSection component - avoids re-renders when parent updates
const CreditsSection = memo(function CreditsSection({
  cast,
  crew,
}: CreditsSectionProps) {
  const [filter, setFilter] = useState<FilterType>("all");

  // Memoized: Filter and sort cast credits
  const filteredCast = useMemo(() => {
    let filtered = cast;

    if (filter === "movies") {
      filtered = cast.filter((c) => c.media_type === "movie");
    } else if (filter === "tv") {
      filtered = cast.filter((c) => c.media_type === "tv");
    }

    // Sort by order (if available) or by popularity
    return [...filtered].sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      return b.popularity - a.popularity;
    });
  }, [cast, filter]);

  // Memoized: Filter and sort crew credits by department
  const filteredCrew = useMemo(() => {
    let filtered = crew;

    if (filter === "movies") {
      filtered = crew.filter((c) => c.media_type === "movie");
    } else if (filter === "tv") {
      filtered = crew.filter((c) => c.media_type === "tv");
    }

    // Group by department and sort by popularity
    return [...filtered]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 20); // Limit crew to top 20
  }, [crew, filter]);

  const hasCast = filteredCast.length > 0;
  const hasCrew = filteredCrew.length > 0;

  // Memoized: Filter button click handlers
  const handleFilterChange = useCallback((newFilter: FilterType) => {
    setFilter(newFilter);
  }, []);

  if (!hasCast && !hasCrew) {
    return null;
  }

  return (
    <section className="bg-black py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        {/* Header with Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Credits
          </h2>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleFilterChange("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-white text-black"
                  : "bg-zinc-800 text-white hover:bg-zinc-700"
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterChange("movies")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === "movies"
                  ? "bg-white text-black"
                  : "bg-zinc-800 text-white hover:bg-zinc-700"
              }`}
            >
              Movies
            </button>
            <button
              onClick={() => handleFilterChange("tv")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === "tv"
                  ? "bg-white text-black"
                  : "bg-zinc-800 text-white hover:bg-zinc-700"
              }`}
            >
              TV Shows
            </button>
          </div>
        </div>

        {/* Cast Section */}
        {hasCast && (
          <div className="mb-12">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4">
              Acting Credits
              {filter !== "all" && (
                <span className="text-gray-400 text-sm ml-2">
                  ({filteredCast.length})
                </span>
              )}
            </h3>
            <Slider
              slidesPerView={6}
              slidesPerViewMobile={3}
              spaceBetween={16}
              hideNavigation={false}
            >
              {filteredCast.slice(0, 24).map((credit) => (
                <Card
                  key={credit.credit_id}
                  movie={{
                    id: credit.id,
                    title: credit.title || credit.name,
                    name: credit.name,
                    overview: credit.overview,
                    poster_path: credit.poster_path,
                    backdrop_path: credit.backdrop_path,
                    vote_average: credit.vote_average,
                    vote_count: credit.vote_count,
                    release_date: credit.release_date || credit.first_air_date,
                    first_air_date: credit.first_air_date,
                    genre_ids: credit.genre_ids,
                    adult: credit.adult,
                    original_language: credit.original_language,
                    original_name: credit.original_name,
                    original_title: credit.original_title,
                    popularity: credit.popularity,
                    media_type: credit.media_type,
                  }}
                  variant="compact"
                />
              ))}
            </Slider>
          </div>
        )}

        {/* Crew Section */}
        {hasCrew && (
          <div className="mb-12">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4">
              Crew Credits
              {filter !== "all" && (
                <span className="text-gray-400 text-sm ml-2">
                  ({filteredCrew.length})
                </span>
              )}
            </h3>
            <Slider
              slidesPerView={6}
              slidesPerViewMobile={3}
              spaceBetween={16}
              hideNavigation={false}
            >
              {filteredCrew.map((credit) => (
                <Card
                  key={credit.credit_id}
                  movie={{
                    id: credit.id,
                    title: credit.title || credit.name,
                    name: credit.name,
                    overview: credit.overview,
                    poster_path: credit.poster_path,
                    backdrop_path: credit.backdrop_path,
                    vote_average: credit.vote_average,
                    vote_count: credit.vote_count,
                    release_date: credit.release_date || credit.first_air_date,
                    first_air_date: credit.first_air_date,
                    genre_ids: credit.genre_ids,
                    adult: credit.adult,
                    original_language: credit.original_language,
                    original_name: credit.original_name,
                    original_title: credit.original_title,
                    popularity: credit.popularity,
                    media_type: credit.media_type,
                  }}
                  variant="compact"
                />
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
});

export default CreditsSection;

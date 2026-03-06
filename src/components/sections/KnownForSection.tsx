import { useMemo } from "react";
import Slider from "@/components/shared/Slider/slider";
import Card from "@/components/shared/Card/Card";
import type { CastCredit, CrewCredit } from "@/api/PersonCredits";

interface KnownForSectionProps {
  cast: CastCredit[];
  crew: CrewCredit[];
}

/**
 * Combines and sorts credits by popularity to show "known for" items
 */
function getKnownForItems(cast: CastCredit[], crew: CrewCredit[]) {
  // Combine cast and crew credits
  const allCredits = [...cast, ...crew];
  
  // Filter out items without posters
  const withPosters = allCredits.filter(
    (credit) => credit.poster_path !== null && credit.poster_path !== undefined
  );
  
  // Sort by popularity and vote average
  const sorted = withPosters.sort((a, b) => {
    // First by popularity
    if (b.popularity !== a.popularity) {
      return b.popularity - a.popularity;
    }
    // Then by vote average
    return b.vote_average - a.vote_average;
  });
  
  // Take top 12
  return sorted.slice(0, 12);
}

export default function KnownForSection({ cast, crew }: KnownForSectionProps) {
  const knownForItems = useMemo(
    () => getKnownForItems(cast, crew),
    [cast, crew]
  );

  if (knownForItems.length === 0) {
    return null;
  }

  return (
    <section className="bg-black py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
          Known For
        </h2>
        <Slider
          slidesPerView={6}
          slidesPerViewMobile={3}
          spaceBetween={16}
          hideNavigation={false}
        >
          {knownForItems.map((credit) => (
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
    </section>
  );
}

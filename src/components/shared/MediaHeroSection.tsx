import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import type { HeroMedia } from "@/types";
import { Star, Info } from "lucide-react";
import { getLocalizedLink } from "@/lib/utils/i18n";
import OptimizedImage from "@/components/ui/OptimizedImage";

interface MediaHeroSectionProps {
  item: HeroMedia | null;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

function getItemTitle(item: HeroMedia): string {
  return "title" in item ? item.title : item.name;
}

function getItemYear(item: HeroMedia): number | null {
  const date = "release_date" in item ? item.release_date : item.first_air_date;
  return date ? new Date(date).getFullYear() : null;
}

const MediaHeroSection = memo(function MediaHeroSection({
  item,
}: MediaHeroSectionProps) {
  const backdropUrl = useMemo(
    () =>
      item?.backdrop_path
        ? `${IMAGE_BASE_URL}/original${item.backdrop_path}`
        : item?.poster_path
          ? `${IMAGE_BASE_URL}/original${item.poster_path}`
          : null,
    [item?.backdrop_path, item?.poster_path],
  );

  const title = useMemo(() => (item ? getItemTitle(item) : ""), [item]);
  const year = useMemo(() => (item ? getItemYear(item) : null), [item]);

  const rating = useMemo(
    () =>
      item?.vote_average
        ? Math.round(item.vote_average * 10) / 10
        : null,
    [item?.vote_average],
  );

  const isTvShow = item ? "first_air_date" in item : false;

  const slug = useMemo(
    () =>
      title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-")
        .trim(),
    [title],
  );
  const detailsUrl = useMemo(() => {
    if (!item) return "#";
    return getLocalizedLink(`/${isTvShow ? "series" : "movie"}/${slug}/${item.id}`);
  }, [item, isTvShow, slug]);

  if (!item) return null;

  return (
    <section className="relative w-full min-h-[70vh] md:min-h-screen overflow-hidden bg-black">
      {backdropUrl ? (
        <div className="absolute inset-0">
          <OptimizedImage
            src={backdropUrl}
            alt={title}
            className="w-full h-full"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-950" />
      )}

      <div className="relative z-10 container h-full min-h-[70vh] md:min-h-screen flex flex-col justify-end pb-16 md:pb-24 pt-24">
        <div className="max-w-2xl space-y-5">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight hero-title">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 hero-description">
            {rating && (
              <span className="flex items-center gap-1.5 text-yellow-400 font-semibold text-base">
                <Star className="w-5 h-5 fill-current" />
                {rating}
              </span>
            )}
            {year && (
              <span className="text-gray-300 font-medium">{year}</span>
            )}
            {item.vote_count > 0 && (
              <span className="text-gray-400 text-sm">
                {item.vote_count.toLocaleString()} votes
              </span>
            )}
          </div>

          {item.overview && (
            <p className="text-gray-300 text-base md:text-lg leading-relaxed line-clamp-3 hero-description">
              {item.overview}
            </p>
          )}

          <div className="flex flex-wrap gap-3 pt-1 hero-buttons">
            <Link
              to={detailsUrl}
              className="inline-flex items-center gap-2 bg-[var(--netflix-red)] hover:bg-[var(--netflix-red-hover)] text-white font-semibold px-6 py-3 min-h-[48px] rounded-md transition-all duration-200 shadow-lg shadow-red-600/25 hover:shadow-red-600/40"
            >
              <Info className="w-5 h-5" />
              View Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

export default MediaHeroSection;

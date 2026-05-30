import { memo, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Search, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CastMember, CrewMember } from "@/types";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { buildMediaUrl } from "@/utils/url";
import { getLocalizedLink } from "@/lib/utils/i18n";
import { useTranslation } from "react-i18next";

interface FullCreditsDetailProps {
  cast: CastMember[];
  crew: CrewMember[];
  title?: string;
}

function PersonCard({ name, image, role, id }: { name: string; image: string | null; role: string; id: number }) {
  const personImage = image ? `https://image.tmdb.org/t/p/w185${image}` : null;
  return (
    <Link
      to={getLocalizedLink(buildMediaUrl("person", name || "", id))}
      className="group relative block touch-manipulation"
    >
      <div className="relative rounded-md bg-zinc-900 shadow-lg transition-all duration-300 ease-in-out group-hover:shadow-2xl">
        <div className="relative aspect-[2/3]">
          {personImage ? (
            <>
              <OptimizedImage
                src={personImage}
                alt={name}
                className="h-full w-full transition-transform duration-300 ease-in-out"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-zinc-600">
              <User size={48} />
            </div>
          )}
        </div>
        <div className="absolute inset-0 rounded-md ring-2 ring-white/0 ring-offset-2 ring-offset-zinc-900 transition-all duration-300 group-focus-within:ring-white/50" />
      </div>
      <div className="mt-3 space-y-1 px-1">
        <p className="text-sm font-medium text-white line-clamp-1 group-hover:text-[var(--netflix-red)] transition-colors duration-300">
          {name}
        </p>
        <p className="text-xs text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
          {role}
        </p>
      </div>
    </Link>
  );
}

const FullCreditsDetail = memo(function FullCreditsDetail({
  cast,
  crew,
  title = "Cast & Crew",
}: FullCreditsDetailProps) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("all");

  const departments = useMemo(
    () => ["all", ...Array.from(new Set(crew.map((m) => m.department)))],
    [crew],
  );

  const filteredCast = useMemo(() => {
    if (!query) return cast;
    const q = query.toLowerCase();
    return cast.filter(
      (a) => a.name.toLowerCase().includes(q) || a.character?.toLowerCase().includes(q),
    );
  }, [cast, query]);

  const filteredCrew = useMemo(() => {
    let result = crew;
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (m) => m.name.toLowerCase().includes(q) || m.job.toLowerCase().includes(q),
      );
    }
    if (dept !== "all") result = result.filter((m) => m.department === dept);
    return result;
  }, [crew, query, dept]);

  const handleQuery = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value), []);
  const handleDept  = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => setDept(e.target.value), []);

  return (
    <section className="bg-[var(--section-bg)] py-10 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-semibold text-[var(--section-title-color)]">{title}</h2>
            <p className="text-[var(--section-meta-color)] text-sm mt-1">
              {cast.length} cast · {crew.length} crew
            </p>
          </div>

          {/* Controls */}
          <div className="flex gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder={t("common.search")}
                value={query}
                onChange={handleQuery}
                className="pl-9 pr-4 py-2 rounded bg-[var(--input-search-bg)] border border-[var(--tab-border)] text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 w-52"
                aria-label={t("media.fullCastAndCrew")}
              />
            </div>

            <select
              value={dept}
              onChange={handleDept}
              className="px-3 py-2 rounded bg-[var(--input-search-bg)] border border-[var(--tab-border)] text-sm text-white focus:outline-none focus:border-white/30 cursor-pointer"
              aria-label="Filter by department"
            >
              {departments.map((d) => (
                <option key={d} value={d} className="bg-zinc-900">
                  {d === "all" ? t("common.viewAll") : d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cast */}
        {filteredCast.length > 0 && (
          <div className="mb-10">
            <p className="text-[var(--section-meta-color)] text-xs font-semibold uppercase tracking-widest mb-4">
              {t("people.cast")} <span className="opacity-50">({filteredCast.length})</span>
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {filteredCast.map((a) => (
                <PersonCard
                  key={a.id}
                  id={a.id}
                  name={a.name}
                  image={a.profile_path}
                  role={a.character || "Unknown role"}
                />
              ))}
            </div>
          </div>
        )}

        {/* Crew */}
        {filteredCrew.length > 0 && (
          <div>
            <p className="text-[var(--section-meta-color)] text-xs font-semibold uppercase tracking-widest mb-4">
              {t("people.crew")} <span className="opacity-50">({filteredCrew.length})</span>
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {filteredCrew.map((m) => (
                <PersonCard
                  key={`${m.id}-${m.job}`}
                  id={m.id}
                  name={m.name}
                  image={m.profile_path}
                  role={`${m.job} · ${m.department}`}
                />
              ))}
            </div>
          </div>
        )}

        {!filteredCast.length && !filteredCrew.length && (
          <p className="text-[var(--section-meta-color)] text-center py-16">{t("search.noResults")}</p>
        )}
      </div>
    </section>
  );
});

export default FullCreditsDetail;

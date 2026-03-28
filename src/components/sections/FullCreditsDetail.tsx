import { memo, useMemo, useState, useCallback } from "react";
import { Search } from "lucide-react";
import { Card } from "@/components/shared/Card";
import { cn } from "@/lib/utils";
import type { CastMember, CrewMember } from "@/types";

interface FullCreditsDetailProps {
  cast: CastMember[];
  crew: CrewMember[];
  title?: string;
}

// ── Cast card ─────────────────────────────────────────────────────────────────
const CastCard = memo(function CastCard({ actor }: { actor: CastMember }) {
  return (
    <Card
      variant="person"
      person={{
        id: actor.id,
        name: actor.name,
        profileImage: actor.profile_path,
        role: actor.character || "Unknown role",
      }}
    />
  );
});

// ── Crew card ─────────────────────────────────────────────────────────────────
const CrewCard = memo(function CrewCard({ member }: { member: CrewMember }) {
  return (
    <Card
      variant="person"
      person={{
        id: member.id,
        name: member.name,
        profileImage: member.profile_path,
        role: `${member.job} · ${member.department}`,
      }}
    />
  );
});

// ── Main ──────────────────────────────────────────────────────────────────────
const FullCreditsDetail = memo(function FullCreditsDetail({
  cast,
  crew,
  title = "Cast & Crew",
}: FullCreditsDetailProps) {
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
                placeholder="Search..."
                value={query}
                onChange={handleQuery}
                className="pl-9 pr-4 py-2 rounded bg-[var(--input-search-bg)] border border-[var(--tab-border)] text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 w-52"
                aria-label="Search cast and crew"
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
                  {d === "all" ? "All Departments" : d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cast */}
        {filteredCast.length > 0 && (
          <div className="mb-10">
            <p className="text-[var(--section-meta-color)] text-xs font-semibold uppercase tracking-widest mb-4">
              Cast <span className="opacity-50">({filteredCast.length})</span>
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {filteredCast.map((a) => <CastCard key={a.id} actor={a} />)}
            </div>
          </div>
        )}

        {/* Crew */}
        {filteredCrew.length > 0 && (
          <div>
            <p className="text-[var(--section-meta-color)] text-xs font-semibold uppercase tracking-widest mb-4">
              Crew <span className="opacity-50">({filteredCrew.length})</span>
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {filteredCrew.map((m) => <CrewCard key={`${m.id}-${m.job}`} member={m} />)}
            </div>
          </div>
        )}

        {!filteredCast.length && !filteredCrew.length && (
          <p className="text-[var(--section-meta-color)] text-center py-16">No results found.</p>
        )}
      </div>
    </section>
  );
});

export default FullCreditsDetail;

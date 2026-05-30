import { memo, useMemo } from "react";
import type { CastCredit, CrewCredit } from "@/features/people/api/personService";
import { calculateAge } from "@/utils";
import { cn } from "@/lib/utils";

interface ActorStatsProps {
  birthday: string | null;
  deathday: string | null;
  popularity: number;
  cast?: CastCredit[];
  crew?: CrewCredit[];
  className?: string;
}

interface StatItem {
  label: string;
  value: string | number;
}

const ActorStats = memo(function ActorStats({
  birthday,
  deathday,
  popularity,
  cast = [],
  crew = [],
  className,
}: ActorStatsProps) {
  const age = useMemo(
    () => calculateAge(birthday, deathday),
    [birthday, deathday],
  );

  const movieCount = useMemo(
    () =>
      cast.filter((c) => c.media_type === "movie").length +
      crew.filter((c) => c.media_type === "movie").length,
    [cast, crew],
  );

  const tvCount = useMemo(
    () =>
      cast.filter((c) => c.media_type === "tv").length +
      crew.filter((c) => c.media_type === "tv").length,
    [cast, crew],
  );

  const stats = useMemo<StatItem[]>(
    () => [
      ...(age !== null ? [{ label: "Age", value: age }] : []),
      {
        label: "Popularity",
        value: Math.round(popularity * 10) / 10,
      },
      { label: "Movies", value: movieCount },
      { label: "TV Shows", value: tvCount },
    ],
    [age, popularity, movieCount, tvCount],
  );

  if (stats.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5 min-w-[110px]"
        >
          <span className="text-white/50 text-[11px] font-semibold uppercase tracking-wider leading-none">
            {stat.label}
          </span>
          <span className="text-white font-bold text-xl tabular-nums leading-none">
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
});

export default ActorStats;

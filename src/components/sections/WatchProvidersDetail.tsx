import { memo, useMemo } from "react";
import { Tv } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import type { WatchProviderRegion } from "@/services/moviesService";

interface WatchProvidersDetailProps {
  providers?: WatchProviderRegion;
  region?: string;
  title?: string;
}

const BASE = "https://image.tmdb.org/t/p/w92";

const SECTIONS = [
  { key: "flatrate" as const, label: "Stream" },
  { key: "free"     as const, label: "Free" },
  { key: "rent"     as const, label: "Rent" },
  { key: "buy"      as const, label: "Buy" },
];

// ── Provider logo pill ────────────────────────────────────────────────────────
const ProviderPill = memo(function ProviderPill({
  provider,
}: {
  provider: { provider_id: number; provider_name: string; logo_path: string | null };
}) {
  return (
    <div className="flex flex-col items-center gap-2 w-20">
      <div className="w-14 h-14 rounded-lg overflow-hidden bg-[var(--provider-logo-bg)] flex items-center justify-center">
        {provider.logo_path ? (
          <OptimizedImage
            src={`${BASE}${provider.logo_path}`}
            alt={provider.provider_name}
            className="w-full h-full"
            objectFit="cover"
          />
        ) : (
          <Tv className="w-6 h-6 text-white/30" />
        )}
      </div>
      <span className="text-[11px] text-[var(--section-meta-color)] text-center leading-tight line-clamp-2">
        {provider.provider_name}
      </span>
    </div>
  );
});

// ── Provider group ────────────────────────────────────────────────────────────
const ProviderGroup = memo(function ProviderGroup({
  label,
  providers,
}: {
  label: string;
  providers: Array<{ provider_id: number; provider_name: string; logo_path: string | null; display_priority?: number }>;
}) {
  if (!providers?.length) return null;

  const sorted = [...providers].sort(
    (a, b) => (a.display_priority ?? 999) - (b.display_priority ?? 999),
  );

  return (
    <div>
      <p className="text-[var(--section-meta-color)] text-xs font-semibold uppercase tracking-widest mb-4">{label}</p>
      <div className="flex flex-wrap gap-4">
        {sorted.map((p) => (
          <ProviderPill key={p.provider_id} provider={p} />
        ))}
      </div>
    </div>
  );
});

// ── Main ──────────────────────────────────────────────────────────────────────
const WatchProvidersDetail = memo(function WatchProvidersDetail({
  providers,
  region = "US",
  title = "Where to Watch",
}: WatchProvidersDetailProps) {
  const hasAny = useMemo(
    () => providers && SECTIONS.some((s) => (providers[s.key]?.length ?? 0) > 0),
    [providers],
  );

  if (!hasAny) {
    return (
      <section className="bg-[var(--section-bg)] py-10">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl text-center py-16">
          <Tv className="w-12 h-12 text-[var(--section-meta-color)] mx-auto mb-3" />
          <p className="text-[var(--section-meta-color)]">No streaming info available for {region}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[var(--section-bg)] py-10">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        <h2 className="text-xl font-semibold text-[var(--section-title-color)] mb-2">{title}</h2>
        <p className="text-[var(--section-meta-color)] text-sm mb-8">Availability in {region}</p>

        <div className="space-y-8">
          {SECTIONS.map((s) =>
            providers?.[s.key]?.length ? (
              <ProviderGroup key={s.key} label={s.label} providers={providers[s.key]!} />
            ) : null,
          )}
        </div>

        <p className="text-[var(--section-meta-color)] text-xs mt-8">
          Prices and availability may vary by region.
        </p>
      </div>
    </section>
  );
});

export default WatchProvidersDetail;

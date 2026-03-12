import HelmetMeta from "@/components/shared/HelmetMeta";

export default function Session() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background-primary)] text-[var(--text-primary)] page-transition">
      <HelmetMeta
        name="Session"
        description="Manage your Netflix session settings."
      />

      <h1>Session</h1>
    </div>
  );
}

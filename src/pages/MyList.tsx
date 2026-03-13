import LazyWrapper from "@/components/ui/lazy-wrapper";
import HelmetMeta from "@/components/shared/HelmetMeta";

export default function MyList() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background-primary)] text-[var(--text-primary)]">
      <HelmetMeta
        name="My List"
        description="Your personal list of saved movies and TV shows on Netflix."
      />

      <LazyWrapper>
        <h1>My List</h1>
      </LazyWrapper>
    </div>
  );
}

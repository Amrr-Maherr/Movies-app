export default function MediaGridSkeleton() {
  const skeletonCount = 12; // Typical starting amount

  return (
    <div className="px-4 sm:px-8 pb-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div
            key={i}
            className="w-full aspect-[2/3] bg-[var(--background-tertiary)]/50 rounded-md animate-pulse shadow-lg"
          >
            <div className="w-full h-full bg-gradient-to-t from-[var(--background-secondary)] via-transparent to-transparent"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

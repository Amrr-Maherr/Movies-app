import { memo } from "react";

export interface Top10BadgeProps {
  rank: number;
}

/**
 * Top 10 Badge Component
 * Displays a large gradient number for top 10 rankings
 */
const Top10Badge = memo(({ rank }: Top10BadgeProps) => {
  return (
    <div className="absolute -left-2 md:-left-4 -bottom-2 md:-bottom-3 z-10">
      <div className="relative">
        <span
          className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-black"
          style={{ WebkitTextStroke: "2px #ddd" }}
        >
          {rank}
        </span>
      </div>
    </div>
  );
});

Top10Badge.displayName = "Top10Badge";

export default Top10Badge;

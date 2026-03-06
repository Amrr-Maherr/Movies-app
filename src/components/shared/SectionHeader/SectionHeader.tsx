import { memo } from "react";
import { LucideIcon } from "lucide-react";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  actionLabel?: string;
  actionHref?: string;
  badgeText?: string;
  badgeColor?: string;
}

// Memoized SectionHeader component - purely presentational, avoids re-renders when parent updates
const SectionHeader = memo(function SectionHeader({
  title,
  subtitle,
  icon: Icon,
  iconColor = "text-white",
  actionLabel,
  actionHref,
  badgeText,
  badgeColor = "text-red-500",
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4 md:mb-6">
      <div className="flex items-center gap-2">
        {Icon && (
          <Icon className={`w-5 h-5 md:w-6 md:h-6 ${iconColor}`} />
        )}
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {badgeText && (
          <span
            className={`text-xs md:text-sm font-semibold uppercase tracking-wider ${badgeColor}`}
          >
            {badgeText}
          </span>
        )}
        {actionLabel && actionHref && (
          <a href={actionHref}>
            <button className="flex items-center gap-1 text-sm md:text-base text-gray-300 hover:text-white transition-colors">
              {actionLabel}
            </button>
          </a>
        )}
      </div>
    </div>
  );
});

export default SectionHeader;

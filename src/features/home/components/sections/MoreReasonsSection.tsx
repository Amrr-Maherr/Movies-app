import { LucideIcon, Tv, Download, Laptop, Users } from "lucide-react";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface FeatureBoxProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * Memoized FeatureBox Component
 *
 * Displays a single feature with icon, title, and description.
 * Memoized to prevent unnecessary re-renders.
 */
const FeatureBox = memo(function FeatureBox({
  icon: Icon,
  title,
  description,
}: FeatureBoxProps) {
  return (
    <div className="flex flex-col items-center text-center p-6 md:p-8">
      <Icon
        className="w-12 h-12 md:w-16 md:h-16 text-white mb-4 md:mb-6"
        strokeWidth={1.5}
      />
      <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">
        {title}
      </h3>
      <p className="text-sm md:text-base text-[#737373] leading-relaxed">
        {description}
      </p>
    </div>
  );
});

/**
 * Memoized MoreReasonsSection Component
 *
 * Displays the "More Reasons to Join" section with feature boxes.
 * Memoized to prevent unnecessary re-renders.
 */
const MoreReasonsSection = memo(function MoreReasonsSection() {
  const { t } = useTranslation();

  const features = useMemo(() => [
    {
      icon: Tv,
      title: t('reasons.enjoyOnTV.title'),
      description: t('reasons.enjoyOnTV.description'),
    },
    {
      icon: Download,
      title: t('reasons.downloadOffline.title'),
      description: t('reasons.downloadOffline.description'),
    },
    {
      icon: Laptop,
      title: t('reasons.watchEverywhere.title'),
      description: t('reasons.watchEverywhere.description'),
    },
    {
      icon: Users,
      title: t('reasons.kidsProfiles.title'),
      description: t('reasons.kidsProfiles.description'),
    },
  ], [t]);

  return (
    <section className="py-12 md:py-20 bg-black border-t border-[#222]">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-8 md:mb-12">
          {t('home.moreReasons')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureBox
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default MoreReasonsSection;

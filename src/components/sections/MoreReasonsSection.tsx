import { LucideIcon, Tv, Download, Laptop, Users } from "lucide-react";
import { memo } from "react";

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

const features = [
  {
    icon: Tv,
    title: "Enjoy on your TV",
    description:
      "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
  },
  {
    icon: Download,
    title: "Download your shows to watch offline",
    description:
      "Save your favorites easily and always have something to watch.",
  },
  {
    icon: Laptop,
    title: "Watch everywhere",
    description:
      "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
  },
  {
    icon: Users,
    title: "Create profiles for kids",
    description:
      "Send kids on adventures with their favorite characters in a space made just for them — free with your membership.",
  },
];

/**
 * Memoized MoreReasonsSection Component
 *
 * Displays the "More Reasons to Join" section with feature boxes.
 * Memoized to prevent unnecessary re-renders.
 */
const MoreReasonsSection = memo(function MoreReasonsSection() {
  return (
    <section className="py-12 md:py-20 bg-black border-t border-[#222]">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
        <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-8 md:mb-12">
          More Reasons to Join
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

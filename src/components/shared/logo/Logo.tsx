import OptimizedImage from "@/components/ui/OptimizedImage";
import logo from "@/assets/logos/vite.svg";
import type { LogoProps } from "@/shared/components/logo/types";
import { memo } from "react";
import { useTranslation } from "react-i18next";

/**
 * Memoized Logo Component
 *
 * Displays the Netflix logo using OptimizedImage.
 * Memoized to prevent unnecessary re-renders when parent components update.
 */
const Logo = memo(function Logo({
  className = "w-[50px] h-[50px]",
}: LogoProps) {
  const { t } = useTranslation();
  return (
    <div className={className}>
      <OptimizedImage
        className="w-full h-full"
        alt={t("common.netflixHome")}
        src={logo}
        objectFit="contain"
      />
    </div>
  );
});

export default Logo;

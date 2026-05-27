import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HelmetMeta from "@/components/shared/HelmetMeta";
import { getLocalizedLink } from "@/lib/utils/i18n";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background-primary)] text-[var(--text-primary)] px-4">
      <HelmetMeta
        name={t('common.pageNotFound')}
        description={t('common.pageNotFoundMessage')}
      />

      <h1 className="text-9xl font-bold text-[var(--netflix-red)] mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">
        {t('common.pageNotFound')}
      </h2>
      <p className="text-[var(--text-secondary)] text-center max-w-md mb-8">
        {t('common.pageNotFoundMessage')}
      </p>
      <Link
        to={getLocalizedLink('/')}
        className="bg-[var(--netflix-red)] text-[var(--text-inverse)] font-medium px-6 py-3 rounded transition-all duration-300 ease-in-out hover:bg-[var(--netflix-red-hover)] hover:scale-105"
      >
        {t('common.netflixHome')}
      </Link>
    </div>
  );
}

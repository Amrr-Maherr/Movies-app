import { useTranslation } from "react-i18next";
import HelmetMeta from "@/components/shared/HelmetMeta";

export default function Session() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background-primary)] text-[var(--text-primary)]">
      <HelmetMeta
        name={t('discover:title')}
        description="Manage your Netflix session settings."
      />

      <h1>{t('discover:title')}</h1>
    </div>
  );
}

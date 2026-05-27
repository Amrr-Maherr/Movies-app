import { useTranslation } from "react-i18next";
import { Building2, Users, Award, Globe } from "lucide-react";
import HelmetMeta from "@/components/shared/HelmetMeta";

export default function CorporateInformation() {
  const { t } = useTranslation();
  const info = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: t('infoPages.corporate.overview'),
      content: t('infoPages.corporate.overviewContent')
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t('infoPages.corporate.globalPresence'),
      content: t('infoPages.corporate.globalPresenceContent')
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('infoPages.corporate.leadership'),
      content: t('infoPages.corporate.leadershipContent')
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: t('infoPages.corporate.awards'),
      content: t('infoPages.corporate.awardsContent')
    }
  ];

  const stats = [
    { label: t('infoPages.corporate.founded'), value: "1997" },
    { label: t('infoPages.corporate.headquarters'), value: "Los Gatos, California" },
    { label: t('infoPages.corporate.employees'), value: "12,800+" },
    { label: t('infoPages.corporate.subscribers'), value: "260+ Million" }
  ];

  return (
    <div className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]">
      <HelmetMeta
        name={t('infoPages.corporate.title')}
        description={t('infoPages.corporate.description')}
      />

      <div className="container py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('infoPages.corporate.title')}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          {t('infoPages.corporate.subtitle')}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6 text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-[var(--netflix-red)] mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Info Sections */}
        <div className="max-w-4xl space-y-6 mb-12">
          {info.map((item, index) => (
            <div
              key={index}
              className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6"
            >
              <div className="flex items-start gap-4">
                <div className="text-[var(--netflix-red)] mt-1">
                  {item.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">{item.title}</h2>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="max-w-4xl bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-8">
          <h2 className="text-2xl font-bold mb-6">{t('infoPages.corporate.headquarters')}</h2>
          <address className="not-italic text-[var(--text-secondary)] space-y-2">
            <p>100 Winchester Circle</p>
            <p>Los Gatos, CA 95032</p>
            <p>United States</p>
            <p className="mt-4">
              {t('infoPages.corporate.phoneLabel')} <a href="tel:+14085403700" className="text-[var(--netflix-red)] hover:underline">+1 (408) 540-3700</a>
            </p>
          </address>
        </div>
      </div>
    </div>
  );
}

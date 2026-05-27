import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Shield, Lock, Eye, Database } from "lucide-react";
import HelmetMeta from "@/components/shared/HelmetMeta";
import { getLocalizedLink } from "@/lib/utils/i18n";

export default function Privacy() {
  const { t } = useTranslation();
  const sections = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('infoPages:privacy.sections.collect'),
      content: t('infoPages:privacy.sections.collectContent')
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: t('infoPages:privacy.sections.use'),
      content: t('infoPages:privacy.sections.useContent')
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: t('infoPages:privacy.sections.sharing'),
      content: t('infoPages:privacy.sections.sharingContent')
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: t('infoPages:privacy.sections.retention'),
      content: t('infoPages:privacy.sections.retentionContent')
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('infoPages:privacy.sections.rights'),
      content: t('infoPages:privacy.sections.rightsContent')
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: t('infoPages:privacy.sections.security'),
      content: t('infoPages:privacy.sections.securityContent')
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]">
      <HelmetMeta
        name={t('infoPages:privacy.title')}
        description={t('infoPages:privacy.description')}
      />

      <div className="container py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('infoPages:privacy.title')}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          {t('infoPages:privacy.subtitle')}
        </p>

        {/* Content */}
        <div className="max-w-4xl space-y-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6"
            >
              <div className="flex items-start gap-4">
                <div className="text-[var(--netflix-red)] mt-1">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">
                    {section.title}
                  </h2>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mt-12 bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-8">
          <h2 className="text-2xl font-bold mb-4">{t('infoPages.privacy.contactUs')}</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            {t('infoPages.privacy.contactDesc')}
          </p>
          <a
            href="mailto:privacy@netflix.com"
            className="text-[var(--netflix-red)] hover:underline text-lg"
          >
            privacy@netflix.com
          </a>
        </div>

        {/* Related Links */}
        <div className="max-w-4xl mt-8 pt-8 border-t border-[var(--card-border)]">
          <p className="text-[var(--text-secondary)] mb-4">{t('infoPages.privacy.relatedPolicies')}</p>
          <div className="flex flex-wrap gap-4">
            <Link to={getLocalizedLink('/terms-of-use')} className="text-[var(--netflix-red)] hover:underline">
              {t('infoPages.terms.title')}
            </Link>
            <Link to={getLocalizedLink('/cookie-preferences')} className="text-[var(--netflix-red)] hover:underline">
              {t('infoPages.cookies.title')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

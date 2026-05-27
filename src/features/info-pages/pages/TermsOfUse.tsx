import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HelmetMeta from "@/components/shared/HelmetMeta";
import { getLocalizedLink } from "@/lib/utils/i18n";

export default function TermsOfUse() {
  const { t } = useTranslation();
  const sections = [
    {
      title: t('infoPages.terms.section1'),
      content: t('infoPages.terms.section1Content')
    },
    {
      title: t('infoPages.terms.section2'),
      content: t('infoPages.terms.section2Content')
    },
    {
      title: t('infoPages.terms.section3'),
      content: t('infoPages.terms.section3Content')
    },
    {
      title: t('infoPages.terms.section4'),
      content: t('infoPages.terms.section4Content')
    },
    {
      title: t('infoPages.terms.section5'),
      content: t('infoPages.terms.section5Content')
    },
    {
      title: t('infoPages.terms.section6'),
      content: t('infoPages.terms.section6Content')
    },
    {
      title: t('infoPages.terms.section7'),
      content: t('infoPages.terms.section7Content')
    },
    {
      title: t('infoPages.terms.section8'),
      content: t('infoPages.terms.section8Content')
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]">
      <HelmetMeta
        name={t('infoPages.terms.title')}
        description={t('infoPages.terms.description')}
      />

      <div className="container py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('infoPages.terms.title')}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          {t('infoPages.terms.lastUpdated')}
        </p>

        {/* Content */}
        <div className="max-w-4xl space-y-8">
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Links */}
        <div className="max-w-4xl mt-12 pt-8 border-t border-[var(--card-border)]">
          <p className="text-[var(--text-secondary)] mb-4">
            {t('infoPages.terms.moreInfo')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to={getLocalizedLink('/privacy')} className="text-[var(--netflix-red)] hover:underline">
              {t('infoPages.privacy.title')}
            </Link>
            <Link to={getLocalizedLink('/cookie-preferences')} className="text-[var(--netflix-red)] hover:underline">
              {t('infoPages.cookies.title')}
            </Link>
            <Link to={getLocalizedLink('/legal-notices')} className="text-[var(--netflix-red)] hover:underline">
              {t('infoPages.legal.title')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

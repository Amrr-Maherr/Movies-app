import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FileText, Scale, Shield } from "lucide-react";
import HelmetMeta from "@/components/shared/HelmetMeta";
import { getLocalizedLink } from "@/lib/utils/i18n";

export default function LegalNotices() {
  const { t } = useTranslation();
  const notices = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: t('infoPages.legal.copyright'),
      content: t('infoPages.legal.copyrightContent')
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: t('infoPages.legal.dmca'),
      content: t('infoPages.legal.dmcaContent')
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('infoPages.legal.trademark'),
      content: t('infoPages.legal.trademarkContent')
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: t('infoPages.legal.contentRatings'),
      content: t('infoPages.legal.contentRatingsContent')
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: t('infoPages.legal.accessibility'),
      content: t('infoPages.legal.accessibilityContent')
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('infoPages.legal.childrenPrivacy'),
      content: t('infoPages.legal.childrenPrivacyContent')
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]">
      <HelmetMeta
        name={t('infoPages.legal.title')}
        description={t('infoPages.legal.description')}
      />

      <div className="container py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('infoPages.legal.title')}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          {t('infoPages.legal.subtitle')}
        </p>

        {/* Notices */}
        <div className="max-w-4xl space-y-6">
          {notices.map((notice, index) => (
            <div
              key={index}
              className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6"
            >
              <div className="flex items-start gap-4">
                <div className="text-[var(--netflix-red)] mt-1">
                  {notice.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-3">{notice.title}</h2>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {notice.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="max-w-4xl mt-12 pt-8 border-t border-[var(--card-border)]">
          <h2 className="text-xl font-semibold mb-4">{t('infoPages.legal.additionalInfo')}</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            {t('infoPages.legal.additionalInfoDesc')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to={getLocalizedLink('/terms-of-use')} className="text-[var(--netflix-red)] hover:underline">
              {t('infoPages.terms.title')}
            </Link>
            <Link to={getLocalizedLink('/privacy')} className="text-[var(--netflix-red)] hover:underline">
              {t('infoPages.privacy.title')}
            </Link>
            <Link to={getLocalizedLink('/cookie-preferences')} className="text-[var(--netflix-red)] hover:underline">
              {t('infoPages.cookies.title')}
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div className="max-w-4xl mt-8 pt-8 border-t border-[var(--card-border)]">
          <h2 className="text-xl font-semibold mb-4">{t('infoPages.legal.legalContact')}</h2>
          <p className="text-[var(--text-secondary)] mb-2">
            {t('infoPages.legal.legalContactDesc')}
          </p>
          <a
            href="mailto:legal@netflix.com"
            className="text-[var(--netflix-red)] hover:underline"
          >
            legal@netflix.com
          </a>
        </div>
      </div>
    </div>
  );
}

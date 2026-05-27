import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Cookie, Settings, BarChart3 } from "lucide-react";
import HelmetMeta from "@/components/shared/HelmetMeta";
import { getLocalizedLink } from "@/lib/utils/i18n";

export default function CookiePreferences() {
  const { t } = useTranslation();
  const cookieCategories = [
    {
      icon: <Settings className="w-8 h-8" />,
      name: t('infoPages.cookies.essential'),
      status: "required",
      description: t('infoPages.cookies.essentialDesc')
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      name: t('infoPages.cookies.analytics'),
      status: "optional",
      description: t('infoPages.cookies.analyticsDesc')
    },
    {
      icon: <Cookie className="w-8 h-8" />,
      name: t('infoPages.cookies.personalization'),
      status: "optional",
      description: t('infoPages.cookies.personalizationDesc')
    },
    {
      icon: <Cookie className="w-8 h-8" />,
      name: t('infoPages.cookies.advertising'),
      status: "optional",
      description: t('infoPages.cookies.advertisingDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]">
      <HelmetMeta
        name={t('infoPages.cookies.title')}
        description={t('infoPages.cookies.description')}
      />

      <div className="container py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('infoPages.cookies.title')}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          {t('infoPages.cookies.subtitle')}
        </p>

        {/* Cookie Categories */}
        <div className="max-w-4xl space-y-4">
          {cookieCategories.map((category, index) => (
            <div
              key={index}
              className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="text-[var(--netflix-red)] mt-1">
                    {category.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{category.name}</h3>
                      {category.status === "required" && (
                        <span className="text-xs bg-[var(--netflix-red)] text-white px-2 py-1 rounded">
                          {t('infoPages.cookies.required')}
                        </span>
                      )}
                    </div>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    disabled={category.status === "required"}
                    defaultChecked={category.status === "required"}
                  />
                  <div className="w-14 h-7 bg-[var(--background-tertiary)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--netflix-red)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[var(--netflix-red)] peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="max-w-4xl mt-8 flex flex-wrap gap-4">
          <button className="bg-[var(--netflix-red)] text-white px-8 py-3 rounded font-medium hover:bg-[var(--netflix-red-hover)] transition-colors duration-300">
            {t('buttons.savePreferences')}
          </button>
          <button className="bg-transparent border border-[var(--text-secondary)] text-[var(--text-primary)] px-8 py-3 rounded font-medium hover:border-[var(--netflix-red)] hover:text-[var(--netflix-red)] transition-colors duration-300">
            {t('buttons.rejectAll')}
          </button>
          <button className="bg-transparent border border-[var(--text-secondary)] text-[var(--text-primary)] px-8 py-3 rounded font-medium hover:border-[var(--netflix-red)] hover:text-[var(--netflix-red)] transition-colors duration-300">
            {t('buttons.acceptAll')}
          </button>
        </div>

        {/* Info Section */}
        <div className="max-w-4xl mt-12 pt-8 border-t border-[var(--card-border)]">
          <h2 className="text-xl font-semibold mb-4">{t('infoPages.cookies.about')}</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            {t('infoPages.cookies.aboutDescription')}
          </p>
          <Link to={getLocalizedLink('/privacy')} className="text-[var(--netflix-red)] hover:underline">
            {t('infoPages.cookies.learnMore')}
          </Link>
        </div>
      </div>
    </div>
  );
}

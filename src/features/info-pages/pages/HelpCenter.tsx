import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HelpCircle, Book, MessageSquare, Phone } from "lucide-react";
import HelmetMeta from "@/components/shared/HelmetMeta";

export default function HelpCenter() {
  const { t } = useTranslation();
  const helpCategories = [
    {
      icon: <Book className="w-8 h-8" />,
      title: t('infoPages:helpCenter.categories.accountBilling'),
      description: t('infoPages:helpCenter.categories.accountBillingDesc')
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: t('infoPages:helpCenter.categories.watching'),
      description: t('infoPages:helpCenter.categories.watchingDesc')
    },
    {
      icon: <HelpCircle className="w-8 h-8" />,
      title: t('infoPages:helpCenter.categories.plans'),
      description: t('infoPages:helpCenter.categories.plansDesc')
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: t('infoPages:helpCenter.categories.contact'),
      description: t('infoPages:helpCenter.categories.contactDesc')
    }
  ];

  const quickLinks = [
    t('infoPages:helpCenter.quickLinks.resetPassword'),
    t('infoPages:helpCenter.quickLinks.updatePayment'),
    t('infoPages:helpCenter.quickLinks.cancelMembership'),
    t('infoPages:helpCenter.quickLinks.browseTvGenre'),
    t('infoPages:helpCenter.quickLinks.browseMoviesGenre')
  ];

  return (
    <div className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]">
      <HelmetMeta
        name={t('infoPages:helpCenter.title')}
        description={t('infoPages:helpCenter.description')}
      />

      <div className="container py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('infoPages:helpCenter.title')}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          {t('infoPages:helpCenter.subtitle')}
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder={t('infoPages:helpCenter.searchPlaceholder')}
              className="w-full bg-[var(--background-secondary)] border border-[var(--input-border)] text-[var(--text-primary)] px-4 py-3 rounded-md focus:outline-none focus:border-[var(--netflix-red)] transition-colors duration-300"
            />
          </div>
        </div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {helpCategories.map((category, index) => (
            <div
              key={index}
              className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-6 cursor-pointer hover:border-[var(--netflix-red)] transition-colors duration-300"
            >
              <div className="text-[var(--netflix-red)] mb-4">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {category.title}
              </h3>
              <p className="text-[var(--text-secondary)]">
                {category.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold mb-6">{t('infoPages:helpCenter.quickLinksTitle')}</h2>
          <ul className="space-y-3">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to="#"
                  className="text-[var(--text-secondary)] hover:text-[var(--netflix-red)] transition-colors duration-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-[var(--netflix-red)] rounded-full"></span>
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

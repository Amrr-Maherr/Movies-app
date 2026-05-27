import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MessageSquare, HelpCircle, ChevronLeft } from "lucide-react";
import HelmetMeta from "@/components/shared/HelmetMeta";
import { getLocalizedLink } from "@/lib/utils/i18n";

export default function ContactUs() {
  const { t } = useTranslation();
  const contactMethods = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: t('infoPages.contact.liveChat'),
      description: t('infoPages.contact.liveChatDesc'),
      action: t('infoPages.contact.startChat'),
      available: true
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: t('infoPages.contact.callUs'),
      description: t('infoPages.contact.callUsDesc'),
      action: "1-866-579-7172",
      available: true
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: t('infoPages.contact.emailSupport'),
      description: t('infoPages.contact.emailSupportDesc'),
      action: "support@netflix.com",
      available: true
    }
  ];

  const faqLinks = [
    t('infoPages.contact.faq1'),
    t('infoPages.contact.faq2'),
    t('infoPages.contact.faq3'),
    t('infoPages.contact.faq4'),
    t('infoPages.contact.faq5')
  ];

  return (
    <div className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]">
      <HelmetMeta
        name={t('infoPages.contact.title')}
        description={t('infoPages.contact.description')}
      />

      <div className="container py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('infoPages.contact.title')}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">
          {t('infoPages.contact.subtitle')}
        </p>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md p-8 text-center hover:border-[var(--netflix-red)] transition-colors duration-300"
            >
              <div className="text-[var(--netflix-red)] flex justify-center mb-6">
                {method.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{method.title}</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                {method.description}
              </p>
              <button
                className={`w-full py-3 rounded font-medium transition-colors duration-300 ${
                  method.action.includes("@") || method.action.includes("-")
                    ? "bg-transparent border border-[var(--netflix-red)] text-[var(--netflix-red)] hover:bg-[var(--netflix-red)] hover:text-white"
                    : "bg-[var(--netflix-red)] text-white hover:bg-[var(--netflix-red-hover)]"
                }`}
              >
                {method.action}
              </button>
              {method.available && (
                <span className="inline-block mt-4 text-sm text-[#46d369]">
                  ● {t('infoPages.contact.available247')}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Quick FAQ */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-[var(--netflix-red)]" />
            <h2 className="text-2xl font-bold">{t('infoPages.contact.quickAnswers')}</h2>
          </div>
          <ul className="space-y-3">
            {faqLinks.map((link, index) => (
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
          <Link
            to={getLocalizedLink('/faq')}
            className="inline-flex items-center gap-2 text-[var(--netflix-red)] font-medium mt-6 hover:underline"
          >
            {t('infoPages.contact.viewAllFaqs')}
            <ChevronLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}

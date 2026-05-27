import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HelmetMeta from "@/components/shared/HelmetMeta";
import { getLocalizedLink } from "@/lib/utils/i18n";

export default function FAQ() {
  const { t } = useTranslation();
  const faqs = [
    {
      question: t('infoPages:faq.questions.whatIsNetflix'),
      answer: t('infoPages:faq.questions.whatIsNetflixAnswer')
    },
    {
      question: t('infoPages:faq.questions.howMuch'),
      answer: t('infoPages:faq.questions.howMuchAnswer')
    },
    {
      question: t('infoPages:faq.questions.whereWatch'),
      answer: t('infoPages:faq.questions.whereWatchAnswer')
    },
    {
      question: t('infoPages:faq.questions.howCancel'),
      answer: t('infoPages:faq.questions.howCancelAnswer')
    },
    {
      question: t('infoPages:faq.questions.whatWatch'),
      answer: t('infoPages:faq.questions.whatWatchAnswer')
    },
    {
      question: t('infoPages:faq.questions.goodForKids'),
      answer: t('infoPages:faq.questions.goodForKidsAnswer')
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]">
      <HelmetMeta
        name={t('infoPages:faq.title')}
        description={t('infoPages:faq.description')}
      />

      {/* Header */}
      <div className="container py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          {t('infoPages:faq.title')}
        </h1>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[var(--background-secondary)] border border-[var(--card-border)] rounded-md overflow-hidden"
            >
              <h3 className="text-lg md:text-xl font-medium p-4 md:p-6 cursor-pointer hover:bg-[var(--background-tertiary)] transition-colors duration-300">
                {faq.question}
              </h3>
              <div className="px-4 md:px-6 pb-4 md:pb-6">
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className="text-[var(--text-secondary)] mb-6">
            {t('infoPages:faq.moreQuestions')}{" "}
            <Link
              to={getLocalizedLink('/help-center')}
              className="text-[var(--netflix-red)] hover:underline"
            >
              {t('infoPages:helpCenter.title')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

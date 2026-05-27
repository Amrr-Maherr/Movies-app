"use client";

import { memo, useState, useCallback, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const AskedQuestions = memo(function AskedQuestions() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const faqs = useMemo(() => [
    { question: t('home.faqQuestion1'), answer: t('home.faqAnswer1') },
    { question: t('home.faqQuestion2'), answer: t('home.faqAnswer2') },
    { question: t('home.faqQuestion3'), answer: t('home.faqAnswer3') },
    { question: t('home.faqQuestion4'), answer: t('home.faqAnswer4') },
    { question: t('home.faqQuestion5'), answer: t('home.faqAnswer5') },
    { question: t('home.faqQuestion6'), answer: t('home.faqAnswer6') },
  ], [t]);

  return (
    <section className="py-16">
      <div className="container">
        <div className="space-y-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
              {t('home.faq')}
            </h2>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
              {t('home.faqSupportText')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-zinc-900 rounded-sm border border-zinc-800 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full text-base md:text-lg font-semibold text-white hover:bg-zinc-800 py-4 px-4 flex items-center justify-between transition-colors"
                  >
                    <span className="text-left">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="text-gray-300 text-sm md:text-base leading-relaxed pb-4 px-4">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              {t('home.readyToStart')}
            </h3>
            <p className="text-base text-gray-400 mb-6">
              {t('home.signUpPrompt')}
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-md font-semibold transition-colors text-sm md:text-base">
              {t('buttons.getStarted')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default AskedQuestions;

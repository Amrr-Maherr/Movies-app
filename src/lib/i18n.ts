import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enCommon from '../locales/en/common.json' assert { type: 'json' };
import arCommon from '../locales/ar/common.json' assert { type: 'json' };

const resources = {
  en: {
    common: enCommon,
  },
  ar: {
    common: arCommon,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: localStorage.getItem('app_language') || 'en',
    defaultNS: 'common',
    debug: import.meta.env.DEV,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'querystring', 'cookie'],
      caches: ['localStorage'],
      lookupLocalStorage: 'app_language',
    },
  });

// Set document direction based on language
const setDocumentDirection = (lng: string) => {
  const isRTL = lng === 'ar';
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
};

// Set initial direction
setDocumentDirection(i18n.language);

// Update direction on language change
i18n.on('languageChanged', (lng) => {
  setDocumentDirection(lng);
});

export default i18n;

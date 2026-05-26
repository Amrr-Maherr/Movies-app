import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import feature-specific translation files
import enCommon from '../locales/en/common.json' assert { type: 'json' };
import arCommon from '../locales/ar/common.json' assert { type: 'json' };
import enAuth from '../features/auth/locales/en.json' assert { type: 'json' };
import arAuth from '../features/auth/locales/ar.json' assert { type: 'json' };
import enMovies from '../features/movies/locales/en.json' assert { type: 'json' };
import arMovies from '../features/movies/locales/ar.json' assert { type: 'json' };
import enTv from '../features/tv-shows/locales/en.json' assert { type: 'json' };
import arTv from '../features/tv-shows/locales/ar.json' assert { type: 'json' };
import enDiscover from '../features/discover/locales/en.json' assert { type: 'json' };
import arDiscover from '../features/discover/locales/ar.json' assert { type: 'json' };
import enPeople from '../features/people/locales/en.json' assert { type: 'json' };
import arPeople from '../features/people/locales/ar.json' assert { type: 'json' };
import enHome from '../features/home/locales/en.json' assert { type: 'json' };
import arHome from '../features/home/locales/ar.json' assert { type: 'json' };
import enSearch from '../features/search/locales/en.json' assert { type: 'json' };
import arSearch from '../features/search/locales/ar.json' assert { type: 'json' };
import enMyList from '../features/my-list/locales/en.json' assert { type: 'json' };
import arMyList from '../features/my-list/locales/ar.json' assert { type: 'json' };

const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
    movies: enMovies,
    tv: enTv,
    discover: enDiscover,
    people: enPeople,
    home: enHome,
    search: enSearch,
    myList: enMyList,
  },
  ar: {
    common: arCommon,
    auth: arAuth,
    movies: arMovies,
    tv: arTv,
    discover: arDiscover,
    people: arPeople,
    home: arHome,
    search: arSearch,
    myList: arMyList,
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
    ns: ['common', 'auth', 'movies', 'tv', 'discover', 'people', 'home', 'search', 'myList'],
    debug: import.meta.env.DEV,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['path', 'localStorage', 'querystring', 'cookie'],
      caches: ['localStorage'],
      lookupLocalStorage: 'app_language',
      lookupFromPathIndex: 0,
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


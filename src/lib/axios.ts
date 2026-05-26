/**
 * Centralized Axios Configuration
 * 
 * Adds a request interceptor to the global axios instance
 * to automatically attach language to all API requests.
 */

import axios from "axios";

/**
 * Get current language from localStorage or URL params
 * Priority: URL params > localStorage > default 'en'
 */
function getCurrentLanguage(): string {
  // Try URL params first
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  if (urlLang) return urlLang;

  // Try localStorage
  const storedLang = localStorage.getItem('app_language');
  if (storedLang) return storedLang;

  // Default to English
  return 'en';
}

/**
 * Request Interceptor
 * Automatically attaches current language to all requests
 * via Accept-Language header and query param
 */
axios.interceptors.request.use(
  (config) => {
    const language = getCurrentLanguage();

    // Attach language as Accept-Language header
    config.headers['Accept-Language'] = language;

    // Also attach as query param for TMDB compatibility
    if (config.params) {
      config.params.language = language;
    } else {
      config.params = { language };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;

/**
 * API Configuration
 * 
 * Centralized configuration for all external API services.
 * Environment variables are accessed through Vite's import.meta.env.
 * 
 * @see https://vitejs.dev/guide/env-and-mode.html
 */

/**
 * TMDB API Configuration
 * The Movie Database API credentials and base URLs
 */
export const tmdbConfig = {
  /** Base API URL for TMDB v3 */
  baseUrl: import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  
  /** API Key for authentication (required) */
  apiKey: import.meta.env.VITE_TMDB_API_KEY,
  
  /** Access Token for v4 API (optional) */
  accessToken: import.meta.env.VITE_TMDB_ACCESS_TOKEN || '',
  
  /** Base URL for images */
  imageBaseUrl: import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p',
} as const;

/**
 * Ecommerce API Configuration
 * Route Misr Ecommerce API for authentication
 */
export const ecommerceConfig = {
  /** Base API URL for ecommerce services */
  baseUrl: import.meta.env.VITE_ECOMMERCE_BASE_URL || 'https://ecommerce.routemisr.com/api/v1',
} as const;

/**
 * Validate required environment variables in development mode
 * This helps catch missing configuration early
 */
if (import.meta.env.DEV) {
  if (!tmdbConfig.apiKey) {
    console.warn(
      '⚠️  TMDB_API_KEY is missing from .env file.\n' +
      'Get your API key from: https://www.themoviedb.org/settings/api\n' +
      'Add it to your .env file as: VITE_TMDB_API_KEY=your_key_here'
    );
  }
}

/**
 * Type guards for configuration validation
 */
export const isTmdbConfigured = (): boolean => {
  return !!tmdbConfig.apiKey;
};

export const isEcommerceConfigured = (): boolean => {
  return !!ecommerceConfig.baseUrl;
};

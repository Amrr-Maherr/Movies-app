import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import viteImagemin from 'vite-plugin-imagemin'
import { visualizer } from 'rollup-plugin-visualizer'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // =========================================================
    // PWA PLUGIN - Progressive Web App Support
    // =========================================================
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Netflix Egypt',
        short_name: 'Netflix',
        description: 'Watch TV Shows Online, Watch Movies Online',
        theme_color: '#141414',
        background_color: '#141414',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/image\.tmdb\.org\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'tmdb-images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/api\.themoviedb\.org\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'tmdb-api',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 1 day
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    }),
    // =========================================================
    // BUNDLE VISUALIZATION - Analyze bundle size and chunks
    // Run 'npm run build' and open dist/stats.html to view
    // =========================================================
    visualizer({
      open: false, // Set to true to auto-open in browser
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html',
      template: 'treemap', // treemap, sunburst, or network
    }),
    // =========================================================
    // IMAGE OPTIMIZATION PLUGIN
    // Compresses and optimizes all images during build
    // =========================================================
    viteImagemin({
      // Enable verbose logging to see compression results
      verbose: true,

      // =========================================================
      // JPEG OPTIMIZATION - Uses mozjpeg for better compression
      // =========================================================
      mozjpeg: {
        // @ts-ignore - mozjpeg options
        quality: 75, // Balance between quality and file size (0-100)
        // @ts-ignore - mozjpeg options
        progressive: true, // Progressive JPEG for better perceived loading
      },

      // =========================================================
      // PNG OPTIMIZATION - Uses optipng for lossless compression
      // =========================================================
      optipng: {
        optimizationLevel: 5, // Compression level (0-7, higher = more compression)
      },

      // =========================================================
      // PNG QUANTIZATION - Uses pngquant for lossy PNG compression
      // Converts PNG to smaller file sizes with quality control
      // =========================================================
      pngquant: {
        // @ts-ignore - pngquant options
        quality: [0.65, 0.8], // Quality range for pngquant (min, max)
        // @ts-ignore - pngquant options
        speed: 4, // Compression speed (1-11, lower = better quality)
      },

      // =========================================================
      // GIF OPTIMIZATION
      // =========================================================
      gifsicle: {
        optimizationLevel: 3, // Compression level (0-7)
        colors: 128, // Reduce color palette (2-256)
        interlaced: false,
      },

      // =========================================================
      // SVG OPTIMIZATION - Uses svgo
      // =========================================================
      svgo: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false, // Preserve viewBox for proper scaling
                convertPathData: false,
                removeUselessDefs: true,
              },
            },
          },
        ],
      },

      // =========================================================
      // WEBP OPTIMIZATION (if WebP images are present)
      // =========================================================
      webp: {
        // @ts-ignore - webp options
        quality: 75, // Quality for WebP compression
        // @ts-ignore - webp options
        method: 6, // Compression method (0-6, higher = better compression)
      },

      // =========================================================
      // JPEG TRANSCOMPRESSION - Additional JPEG optimization
      // =========================================================
      jpegTran: {
        // @ts-ignore - jpegtran options
        quality: 75,
        // @ts-ignore - jpegtran options
        progressive: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'build',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1500,

    // =========================================================
    // ASSET HANDLING - IMAGE OPTIMIZATION
    // =========================================================
    // Inline small images as Base64 to reduce HTTP requests
    // Images smaller than 4KB will be converted to inline data URIs
    assetsInlineLimit: 4096, // 4KB threshold

    // =========================================================
    // CODE SPLITTING - PERFORMANCE OPTIMIZATION
    // Reduces initial bundle size by splitting vendor chunks
    // =========================================================
    rollupOptions: {
      // Enable code splitting for dependencies
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',

        // Manual chunks for better code splitting
        manualChunks: {
          // Separate React core libraries
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Separate animation libraries - lazy loaded
          'animation-vendor': ['framer-motion'],
          // Separate UI libraries
          'ui-vendor': ['radix-ui', 'lucide-react', 'class-variance-authority'],
          // Separate data/state libraries - removed Redux, kept React Query
          'data-vendor': ['@tanstack/react-query', 'axios'],
          // Separate utility libraries
          'utils-vendor': ['clsx', 'tailwind-merge'],
          // Separate swiper as its own chunk - consider replacing with embla
          'swiper-vendor': ['swiper'],
          // Page chunks for route-based code splitting
          'page-home': ['./src/pages/Home.tsx'],
          'page-movie': ['./src/pages/Movie.tsx'],
          'page-tvshow': ['./src/pages/TVShow.tsx'],
          'page-details': ['./src/pages/MovieDetails.tsx', './src/pages/TVShowDetails.tsx'],
          'page-auth': ['./src/pages/auth/Login.tsx', './src/pages/auth/Signup.tsx'],
          'page-footer': [
            './src/pages/FAQ.tsx',
            './src/pages/HelpCenter.tsx',
            './src/pages/Account.tsx',
            './src/pages/MediaCenter.tsx',
            './src/pages/InvestorRelations.tsx',
            './src/pages/Jobs.tsx',
            './src/pages/WaysToWatch.tsx',
            './src/pages/TermsOfUse.tsx',
            './src/pages/Privacy.tsx',
            './src/pages/CookiePreferences.tsx',
            './src/pages/CorporateInformation.tsx',
            './src/pages/ContactUs.tsx',
            './src/pages/SpeedTest.tsx',
            './src/pages/LegalNotices.tsx',
            './src/pages/OnlyOnNetflix.tsx',
          ],
        },
      },
    },

    // Terser options for JS minification
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        // Additional optimizations
        pure_funcs: ['console.log', 'console.info'],
        passes: 2, // Multiple compression passes
      },
      format: {
        comments: false,
      },
      mangle: {
        safari10: true, // Safari 10 compatibility
      },
    },

    // Target modern browsers for smaller bundles
    target: 'esnext',

    // Enable CSS code splitting
    cssCodeSplit: true,
  },

  // =========================================================
  // DEPENDENCY OPTIMIZATION - PERFORMANCE
  // Pre-bundle dependencies for faster dev startup and caching
  // =========================================================
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    // Exclude large dependencies that don't need pre-bundling
    exclude: ['swiper'],
  },

  css: {
    devSourcemap: false,
  },

  server: {
    port: 5173,
    open: true,
    strictPort: true,
    fs: { strict: true },
  },

  // =========================================================
  // WORKER CONFIGURATION
  // =========================================================
  worker: {
    format: 'es',
  },
})

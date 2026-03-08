import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import viteImagemin from 'vite-plugin-imagemin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
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
          // Separate animation libraries
          'animation-vendor': ['framer-motion'],
          // Separate UI libraries
          'ui-vendor': ['radix-ui', 'lucide-react', 'class-variance-authority'],
          // Separate data/state libraries
          'data-vendor': ['@reduxjs/toolkit', 'react-redux', '@tanstack/react-query', 'axios'],
          // Separate utility libraries
          'utils-vendor': ['clsx', 'tailwind-merge', 'react-hook-form'],
          // Separate swiper as its own chunk
          'swiper-vendor': ['swiper'],
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

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
    watch: {
      ignored: ['**/*.crdownload', '**/*.tmp', '**/*.part', '**/.*', '**/media/**', '**/public/media/**'],
    },
  },
  optimizeDeps: {
    entries: ['index.html'],
  },
  esbuild: {
    // SECURITY-HARDENING: Удаление отладочных выводов из production сборки
    drop: ['console', 'debugger'],
  },
  build: {
    // SECURITY-HARDENING: Отключение публикации исходников (source maps)
    sourcemap: false,
    // SECURITY-HARDENING: Агрессивная обфускация и минификация
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
        dead_code: true,
      },
      mangle: {
        toplevel: true, // Обфускация имен на верхнем уровне
      },
      format: {
        comments: false, // Удаление всех комментариев
      },
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
});

